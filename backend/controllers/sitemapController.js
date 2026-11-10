import Product from '../models/Product.js';
import Blog from '../models/Blog.js';
import Location from '../models/Location.js';

export const generateSitemap = async (req, res) => {
  try {
    const baseUrl = 'https://imagetechindustries.com';

    // Static Routes
    const staticRoutes = [
      '/',
      '/about',
      '/products',
      '/industries',
      '/blog',
      '/pricing',
      '/contact'
    ];

    // Fetch dynamic content
    const products = await Product.find({}, 'slug updatedAt');
    const blogs = await Blog.find({ status: 'Published' }, 'slug updatedAt');
    const locations = await Location.find({ status: 'Active' }, 'slug');

    // Generate XML
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Add static routes
    staticRoutes.forEach((route) => {
      sitemap += `
  <url>
    <loc>${baseUrl}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`;
    });

    // Add Product URLs
    products.forEach((product) => {
      // Base Product URL
      sitemap += `
  <url>
    <loc>${baseUrl}/products/${product.slug}</loc>
    <lastmod>${product.updatedAt.toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>`;

      // pSEO Product-in-Location URLs
      locations.forEach((location) => {
        sitemap += `
  <url>
    <loc>${baseUrl}/products/${product.slug}-in-${location.slug}</loc>
    <lastmod>${product.updatedAt.toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
      });
    });

    // Add Blog URLs
    blogs.forEach((blog) => {
      sitemap += `
  <url>
    <loc>${baseUrl}/blog/${blog.slug}</loc>
    <lastmod>${blog.updatedAt.toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
    });

    // Add Global Location URLs (pSEO)
    locations.forEach((location) => {
      // Location Home
      sitemap += `
  <url>
    <loc>${baseUrl}/${location.slug}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
      // Location About
      sitemap += `
  <url>
    <loc>${baseUrl}/${location.slug}/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
      // Location Contact
      sitemap += `
  <url>
    <loc>${baseUrl}/${location.slug}/contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
    });

    sitemap += `\n</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(sitemap);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).send('Error generating sitemap');
  }
};
