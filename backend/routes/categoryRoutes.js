import express from 'express';
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
} from '../controllers/categoryController.js';

const router = express.Router();

router.get('/', getCategories);
router.post('/', createCategory); // In production, add admin auth middleware here
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

export default router;
