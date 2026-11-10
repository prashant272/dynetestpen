import express from 'express';
import {
  getCustomPages,
  getCustomPageBySlug,
  createCustomPage,
  updateCustomPage,
  deleteCustomPage
} from '../controllers/customPageController.js';

const router = express.Router();

// Public routes
router.get('/', getCustomPages);
router.get('/:slug', getCustomPageBySlug);

// Admin routes (You may want to add authentication middleware here if you have one)
router.post('/', createCustomPage);
router.put('/:id', updateCustomPage);
router.delete('/:id', deleteCustomPage);

export default router;
