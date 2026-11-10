// Dual Backend Architecture:
// 1. PRODUCTS_API_URL: Live ImageTech Industrial Catalog (Always fetches live Dyne Test Pens & Inks)
// 2. API_BASE_URL: Your local/custom backend for Orders, Enquiries, RFQ Leads, and Blogs

export const PRODUCTS_API_URL = 'https://api.imagetechindustries.com/api';
export const REMOTE_API_BASE_URL = PRODUCTS_API_URL;

// Local/Custom Backend URL for Orders, Enquiries, Admin & Blogs
// In production with single-origin Nginx/Docker, '/api' points directly to backend
export const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_BASE_URL || '/api';
