import express from 'express';
import { getBlogCategories, createBlogCategory, updateBlogCategory, deleteBlogCategory } from '../controllers/blogCategoryController.js';

const router = express.Router();

router.get('/', getBlogCategories);
router.post('/', createBlogCategory);
router.put('/:id', updateBlogCategory);
router.delete('/:id', deleteBlogCategory);

export default router;
