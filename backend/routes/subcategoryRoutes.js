import express from 'express';
import {
  getSubcategories,
  createSubcategory,
  updateSubcategory,
  deleteSubcategory
} from '../controllers/subcategoryController.js';

const router = express.Router();

router.get('/', getSubcategories);
router.post('/', createSubcategory);
router.put('/:id', updateSubcategory);
router.delete('/:id', deleteSubcategory);

export default router;
