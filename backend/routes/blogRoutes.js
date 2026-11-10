import express from 'express';
import {
    getBlogs,
    getBlogBySlug,
    createBlog,
    updateBlog,
    deleteBlog,
    uploadBlogImage,
    upload,
    generateAIBlog,
    generateAIBulkBlogs
} from '../controllers/blogController.js';

const router = express.Router();

// Public routes
router.get('/', getBlogs);
router.get('/:slug', getBlogBySlug);

// Admin routes (will add auth middleware later if needed)
router.post('/', createBlog);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlog);
router.post('/upload-image', upload.single('image'), uploadBlogImage);

// AI Generation Routes
router.post('/generate-ai', generateAIBlog);
router.post('/generate-ai-bulk', generateAIBulkBlogs);

export default router;
