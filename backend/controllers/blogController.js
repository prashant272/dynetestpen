import Blog from '../models/Blog.js';
import { uploadToS3, getPresignedUrl, deleteFromS3 } from '../utils/s3.js';
import multer from 'multer';
import FacebookConfig from '../models/FacebookConfig.js';
// Configure multer for memory storage
const storage = multer.memoryStorage();
export const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'), false);
        }
    }
});

// Helper: lazily load GoogleGenAI if needed
const getGenAI = async () => {
    try {
        const { GoogleGenAI } = await import('@google/genai');
        return GoogleGenAI;
    } catch {
        return null;
    }
};
const triggerFacebookPost = async (blog) => {
    try {
        const config = await FacebookConfig.findOne();
        if (!config || !config.pageAccessToken) return;

        const liveDomain = "https://www.careercommando.in";
        const blogUrl = `${liveDomain}/blog/${blog.slug}`;
        const caption = `🌟 ${blog.title}\n\n${blog.excerpt}\n\n🔗 Read more: ${blogUrl}`;

        let fbData;

        // If blog has a thumbnail, post with photo
        if (blog.thumbnailUrl) {
            // Generate a fresh presigned URL so Facebook can fetch the image
            let imageUrl = blog.thumbnailUrl;
            if (blog.thumbnailUrl.startsWith('career-commando/')) {
                try {
                    imageUrl = await getPresignedUrl(blog.thumbnailUrl);
                } catch (e) {
                    console.warn('Could not generate presigned URL for FB post:', e.message);
                }
            }

            // POST to /photos — uploads image + caption together
            const photoResponse = await fetch(`https://graph.facebook.com/v19.0/${config.pageId}/photos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    url: imageUrl,
                    caption: caption,
                    access_token: config.pageAccessToken
                })
            });

            fbData = await photoResponse.json();
        } else {
            // Fallback: text + link post (no image)
            const feedResponse = await fetch(`https://graph.facebook.com/v19.0/${config.pageId}/feed`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: caption,
                    link: blogUrl,
                    access_token: config.pageAccessToken
                })
            });

            fbData = await feedResponse.json();
        }

        if (fbData.error) {
            console.error('FB Auto-Post Graph Error:', fbData.error.message);
        } else {
            console.log(`✅ Auto-posted to Facebook with photo: ${fbData.id || fbData.post_id}`);
        }
    } catch (error) {
        console.error('Error triggering FB Post:', error);
    }
};

/**
 * Get cached presigned URL or generate new one if expired
 * @param {Object} blog - Blog document
 * @returns {Promise<Object>} - { url: string, updated: boolean }
 */
async function getCachedOrGenerateUrl(blog) {
    const now = new Date();

    // Check if we have a valid cached URL
    if (blog.cachedPresignedUrl && blog.urlExpiresAt && blog.urlExpiresAt > now) {
        console.log(`✓ Using cached URL for blog: ${blog.slug}`);
        return { url: blog.cachedPresignedUrl, updated: false };
    }

    try {
        // Generate new presigned URL
        console.log(`⟳ Generating new presigned URL for blog: ${blog.slug}`);
        const presignedUrl = await getPresignedUrl(blog.thumbnailUrl);

        // Cache expires in 7 days (same as presigned URL validity)
        const expiresAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

        // Update cache
        blog.cachedPresignedUrl = presignedUrl;
        blog.urlExpiresAt = expiresAt;

        return { url: presignedUrl, updated: true };
    } catch (error) {
        console.error(`❌ Failed to generate presigned URL for ${blog.slug}:`, error.message);
        // Fallback to original key so the app doesn't crash
        return { url: blog.thumbnailUrl, updated: false };
    }
}


// @desc    Get all blogs (with filters)
// @route   GET /api/blogs
// @access  Public
export const getBlogs = async (req, res) => {
    try {
        const { category, status, search } = req.query;
        const filter = {};

        // Handle status filter
        if (status && status !== 'all') {
            filter.status = status;
        } else if (!status) {
            // If no status specified, only show published to public
            filter.status = 'published';
        }
        // If status === 'all', don't add status filter (show all)

        if (category && category !== 'all') {
            filter.category = category;
        }

        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { excerpt: { $regex: search, $options: 'i' } }
            ];
        }

        const blogs = await Blog.find(filter)
            .sort({ publishedDate: -1 })
            .select('-content')
            .populate('category', 'name slug'); // Exclude full content in list view

        // Generate presigned URLs for thumbnails (with caching)
        const blogsToUpdate = [];
        const blogsWithUrls = await Promise.all(
            blogs.map(async (blog) => {
                const blogObj = blog.toObject();
                if (blogObj.thumbnailUrl && blogObj.thumbnailUrl.startsWith('career-commando/')) {
                    // Use cached URL or generate new one
                    const { url, updated } = await getCachedOrGenerateUrl(blog);
                    blogObj.thumbnailUrl = url;

                    // Track blogs that need cache update
                    if (updated) {
                        blogsToUpdate.push(blog);
                    }
                }
                return blogObj;
            })
        );

        // Batch save all blogs with updated cache
        if (blogsToUpdate.length > 0) {
            await Promise.all(blogsToUpdate.map(blog => blog.save()));
            console.log(`💾 Saved ${blogsToUpdate.length} blog(s) with updated cache`);
        }

        res.json(blogsWithUrls);
    } catch (error) {
        console.error('Get Blogs Error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Get single blog by slug
// @route   GET /api/blogs/:slug?lang=hi
// @access  Public
export const getBlogBySlug = async (req, res) => {
    try {
        const { lang = 'en' } = req.query; // Default to English
        const blog = await Blog.findOne({ slug: req.params.slug }).populate('category', 'name slug');

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        // Increment views
        blog.views += 1;

        // Generate presigned URL for thumbnail if it's an S3 key (with caching)
        const blogObj = blog.toObject();
        let cacheUpdated = false;

        if (blogObj.thumbnailUrl && blogObj.thumbnailUrl.startsWith('career-commando/')) {
            try {
                const { url, updated } = await getCachedOrGenerateUrl(blog);
                blogObj.thumbnailUrl = url;
                cacheUpdated = updated;
            } catch (error) {
                console.error(`❌ Failed to generate presigned URL for ${blog.slug}:`, error.message);
                // blogObj.thumbnailUrl already has the original key
            }
        }

        // Save blog (for view count and potentially cache update)
        await blog.save();

        // If requested language is same as original language, return original
        if (lang === blog.language) {
            return res.json(blogObj);
        }

        // Check if translation exists in cache
        if (blog.translations && blog.translations.has(lang)) {
            console.log(`📦 Serving cached translation for ${lang}`);
            const cachedTranslation = blog.translations.get(lang);

            // Return blog with translated content
            return res.json({
                ...blogObj,
                title: cachedTranslation.title,
                excerpt: cachedTranslation.excerpt,
                content: cachedTranslation.content,
                isTranslated: true,
                translatedAt: cachedTranslation.translatedAt
            });
        }

        // Translation not cached, call Google Translate API
        console.log(`🌐 Translation not cached, calling Google Translate API for ${lang}...`);
        const { translateBlog } = await import('../services/translateService.js');

        const translatedContent = await translateBlog(blog, lang);

        // Save translation to cache
        if (!blog.translations) {
            blog.translations = new Map();
        }
        blog.translations.set(lang, translatedContent);
        await blog.save();

        console.log(`✅ Translation cached successfully for ${lang}`);

        // Return translated blog
        res.json({
            ...blogObj,
            title: translatedContent.title,
            excerpt: translatedContent.excerpt,
            content: translatedContent.content,
            isTranslated: true,
            translatedAt: translatedContent.translatedAt
        });
    } catch (error) {
        console.error('Get Blog Error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Create new blog
// @route   POST /api/blogs
// @access  Private (Admin only)
export const createBlog = async (req, res) => {
    try {
        const { title, excerpt, content, category, tags, status, thumbnailUrl } = req.body;

        // Validate required fields
        if (!title || !excerpt || !content) {
            return res.status(400).json({ message: 'Title, excerpt, and content are required' });
        }

        let finalExcerpt = excerpt;
        if (finalExcerpt.length > 300) {
            finalExcerpt = finalExcerpt.substring(0, 297) + '...';
        }


        // Create slug from title
        const slug = title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');

        // Check if slug already exists
        const existingBlog = await Blog.findOne({ slug });
        if (existingBlog) {
            return res.status(400).json({ message: 'A blog with this title already exists' });
        }

        const blog = new Blog({
            title,
            slug,
            excerpt: finalExcerpt,
            content,
            thumbnailUrl: thumbnailUrl || '',
            category: category || 'General',
            tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map(tag => tag.trim()) : []),
            status: status || 'draft'
        });

        await blog.save();
        
        // Auto-post to Facebook if published
        if (blog.status === 'published') {
            triggerFacebookPost(blog);
        }
        
        res.status(201).json(blog);
    } catch (error) {
        console.error('Create Blog Error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Update blog
// @route   PUT /api/blogs/:id
// @access  Private (Admin only)
export const updateBlog = async (req, res) => {
    try {
        const { title, excerpt, content, category, tags, status, thumbnailUrl } = req.body;

        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        // Update fields
        if (title) {
            blog.title = title;
            blog.slug = title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
        }
        if (excerpt) {
            blog.excerpt = excerpt.length > 300 ? excerpt.substring(0, 297) + '...' : excerpt;
        }
        if (content) blog.content = content;
        if (category) blog.category = category;
        if (tags) blog.tags = Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim());
        const wasDraft = blog.status !== 'published';
        if (status) blog.status = status;
        if (thumbnailUrl !== undefined) blog.thumbnailUrl = thumbnailUrl;

        await blog.save();

        // Auto-post to Facebook if transitioned to published
        if (wasDraft && blog.status === 'published') {
            triggerFacebookPost(blog);
        }

        res.json(blog);
    } catch (error) {
        console.error('Update Blog Error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Delete blog
// @route   DELETE /api/blogs/:id
// @access  Private (Admin only)
export const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        // Delete thumbnail from S3 if exists
        if (blog.thumbnailUrl) {
            try {
                await deleteFromS3(blog.thumbnailUrl);
            } catch (error) {
                console.error('Error deleting thumbnail:', error);
            }
        }

        await blog.deleteOne();
        res.json({ message: 'Blog deleted successfully' });
    } catch (error) {
        console.error('Delete Blog Error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// @desc    Upload blog thumbnail
// @route   POST /api/blogs/upload-image
// @access  Private (Admin only)
export const uploadBlogImage = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No image file provided' });
        }

        // Direct buffer upload
        const newFileName = req.file.originalname;
        const key = await uploadToS3(
            req.file.buffer,
            newFileName,
            req.file.mimetype || 'image/jpeg'
        );

        // Generate presigned URL for secure access (works with private buckets)
        const presignedUrl = await getPresignedUrl(key);

        res.json({
            key,
            url: presignedUrl
        });
    } catch (error) {
        console.error('Upload Image Error:', error);
        res.status(500).json({ message: 'Failed to upload image', error: error.message });
    }
};

// @desc    Generate AI Blog
// @route   POST /api/blogs/generate-ai
// @access  Private (Admin only)
export const generateAIBlog = async (req, res) => {
    try {
        const { topic } = req.body;
        
        if (!topic) {
            return res.status(400).json({ message: 'Topic is required to generate AI blog' });
        }
        
        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ message: 'GEMINI_API_KEY not configured in backend' });
        }

        const GenAIClass = await getGenAI();
        if (!GenAIClass) {
            return res.status(500).json({ message: 'Gemini AI library is not available' });
        }
        const ai = new GenAIClass({ apiKey: process.env.GEMINI_API_KEY });
        
        const systemPrompt = `You are an expert educational content writer. The user will provide ONLY the name of a college or university.
Your job is to generate a highly comprehensive, detailed, and completely structured blog post about this specific college. 
IMPORTANT: You MUST write in VERY SIMPLE ENGLISH words so that any student can easily understand it. Avoid heavy jargon.

The content MUST be in HTML format without the \`\`\`html wrapper. Do not wrap the response in markdown blocks. Do not add <html>, <head>, or <body> tags. Just use tags like <h2>, <h3>, <p>, <ul>, <li>, <strong>, <table>, <tr>, <th>, <td>, etc.
CRITICAL: Whenever displaying data like "Courses Offered & Fees Structure" or "Placement Statistics", you MUST use well-formatted HTML tables.

Include the following sections clearly formatted with headings:
1. About the College (Introduction, History, Overview)
2. Location & Campus Life (Infrastructure, Facilities, Hostels)
3. Courses Offered & Fees Structure (MUST be in an HTML table showing Course Name, Eligibility, Duration, and Fees)
4. Admission Process & Eligibility (What exams are accepted, how to apply step-by-step)
5. Placement Statistics (Deep dive into Average Package, Highest Package, Top Recruiters, and past/Next 5-Year placement trends. Use a table for year-wise placement trends if possible.)
6. Conclusion

Also provide a catchy "title" and a short "excerpt" (STRICTLY LESS THAN 250 characters, plain text).
Return your response ONLY as a parseable JSON object with keys "title", "excerpt", and "content" (with the HTML string). Do not add any markdown formatting around the JSON block.`;

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `College Name: ${topic}`,
            config: {
                systemInstruction: systemPrompt,
                responseMimeType: "application/json"
            }
        });
        
        let responseText = response.text;
        
        // Remove markdown JSON wrappers if Gemini accidentally includes them despite the prompt
        if (responseText.startsWith('\`\`\`json')) {
            responseText = responseText.replace(/^\`\`\`json\n/, '').replace(/\n\`\`\`$/, '');
        } else if (responseText.startsWith('\`\`\`')) {
            responseText = responseText.replace(/^\`\`\`\n/, '').replace(/\n\`\`\`$/, '');
        }

        const blogData = JSON.parse(responseText);

        // Ensure excerpt is strictly within Mongoose bounds
        if (blogData.excerpt && blogData.excerpt.length > 300) {
            blogData.excerpt = blogData.excerpt.substring(0, 297) + '...';
        }

        res.json(blogData);
    } catch (error) {
        console.error('Generate AI Blog Error:', error);
        res.status(500).json({ message: 'Failed to generate AI blog', error: error.message });
    }
};

// @desc    Bulk Generate AI Blogs and save as drafts
// @route   POST /api/blogs/generate-ai-bulk
// @access  Private (Admin only)
export const generateAIBulkBlogs = async (req, res) => {
    try {
        const { topics, category = 'General' } = req.body;

        if (!topics || !Array.isArray(topics) || topics.length === 0) {
            return res.status(400).json({ message: 'topics must be a non-empty array' });
        }
        if (topics.length > 10) {
            return res.status(400).json({ message: 'Maximum 10 topics allowed at once' });
        }
        if (!process.env.GEMINI_API_KEY) {
            return res.status(500).json({ message: 'GEMINI_API_KEY not configured' });
        }

        const systemPrompt = `You are an expert educational content writer. The user will provide ONLY the name of a college or university.
Your job is to generate a highly comprehensive, detailed, and completely structured blog post about this specific college. 
IMPORTANT: You MUST write in VERY SIMPLE ENGLISH words so that any student can easily understand it. Avoid heavy jargon.

The content MUST be in HTML format without the \`\`\`html wrapper. Do not wrap the response in markdown blocks. Do not add <html>, <head>, or <body> tags. Just use tags like <h2>, <h3>, <p>, <ul>, <li>, <strong>, <table>, <tr>, <th>, <td>, etc.
CRITICAL: Whenever displaying data like "Courses Offered & Fees Structure" or "Placement Statistics", you MUST use well-formatted HTML tables.

Include the following sections clearly formatted with headings:
1. About the College (Introduction, History, Overview)
2. Location & Campus Life (Infrastructure, Facilities, Hostels)
3. Courses Offered & Fees Structure (MUST be in an HTML table showing Course Name, Eligibility, Duration, and Fees)
4. Admission Process & Eligibility (What exams are accepted, how to apply step-by-step)
5. Placement Statistics (Deep dive into Average Package, Highest Package, Top Recruiters, and past/Next 5-Year placement trends. Use a table for year-wise placement trends if possible.)
6. Conclusion

Also provide a catchy "title" and a short "excerpt" (STRICTLY LESS THAN 250 characters, plain text).
Return your response ONLY as a parseable JSON object with keys "title", "excerpt", and "content" (with the HTML string). Do not add any markdown formatting around the JSON block.`;

        const GenAIClass = await getGenAI();
        if (!GenAIClass) {
            return res.status(500).json({ message: 'Gemini AI library is not available' });
        }
        const ai = new GenAIClass({ apiKey: process.env.GEMINI_API_KEY });

        const results = [];

        for (let i = 0; i < topics.length; i++) {
            const topic = topics[i].trim();
            if (!topic) continue;

            console.log(`📝 Bulk generating [${i + 1}/${topics.length}]: ${topic}`);

            try {
                // Retry up to 3 times on 503 (server overloaded)
                let response = null;
                let lastErr = null;
                for (let attempt = 1; attempt <= 3; attempt++) {
                    try {
                        console.log(`🔄 Attempt ${attempt}/3 for: ${topic}`);
                        response = await ai.models.generateContent({
                            model: 'gemini-2.5-flash',
                            contents: `College Name: ${topic}`,
                            config: { systemInstruction: systemPrompt, responseMimeType: "application/json" }
                        });
                        lastErr = null;
                        break; // success
                    } catch (mErr) {
                        lastErr = mErr;
                        const is503 = mErr.status === 503 || mErr.message?.includes('503') || mErr.message?.includes('high demand') || mErr.message?.includes('UNAVAILABLE');
                        if (is503 && attempt < 3) {
                            const waitSec = attempt * 30; // 30s, 60s
                            console.warn(`⏳ 503 on attempt ${attempt}. Waiting ${waitSec}s before retry...`);
                            await new Promise(r => setTimeout(r, waitSec * 1000));
                        } else {
                            break;
                        }
                    }
                }
                if (lastErr) throw lastErr;

                let responseText = response.text;
                if (responseText.startsWith('```json')) responseText = responseText.replace(/^```json\n/, '').replace(/\n```$/, '');
                else if (responseText.startsWith('```')) responseText = responseText.replace(/^```\n/, '').replace(/\n```$/, '');

                // Safe JSON parse
                let blogData;
                try {
                    blogData = JSON.parse(responseText);
                } catch (parseErr) {
                    throw new Error(`Invalid JSON from AI (truncated response). Try again.`);
                }
                if (blogData.excerpt?.length > 300) blogData.excerpt = blogData.excerpt.substring(0, 297) + '...';

                // Create slug
                const slug = blogData.title
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, '-')
                    .replace(/(^-|-$)/g, '');

                // Skip if slug already exists
                const existing = await Blog.findOne({ slug });
                if (existing) {
                    results.push({ topic, status: 'skipped', reason: 'Blog with this title already exists' });
                    continue;
                }

                const blog = new Blog({
                    title: blogData.title,
                    slug,
                    excerpt: blogData.excerpt,
                    content: blogData.content,
                    category,
                    status: 'draft',
                    thumbnailUrl: ''
                });

                await blog.save();
                results.push({ topic, status: 'success', title: blogData.title, id: blog._id });
                console.log(`✅ Saved draft: "${blogData.title}"`);

            } catch (err) {
                console.error(`❌ Failed for "${topic}":`, err.message);
                results.push({ topic, status: 'failed', error: err.message });
            }

            // 5s delay between topics to let server recover
            if (i < topics.length - 1) {
                await new Promise(r => setTimeout(r, 5000));
            }
        }

        const successCount = results.filter(r => r.status === 'success').length;
        const failedCount = results.filter(r => r.status === 'failed').length;
        const skippedCount = results.filter(r => r.status === 'skipped').length;

        res.json({
            message: `Bulk generation complete: ${successCount} saved, ${failedCount} failed, ${skippedCount} skipped`,
            successCount,
            failedCount,
            skippedCount,
            results
        });
    } catch (error) {
        console.error('Bulk Generate Error:', error);
        res.status(500).json({ message: 'Bulk generation failed', error: error.message });
    }
};
