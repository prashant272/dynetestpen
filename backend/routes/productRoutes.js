import express from 'express';
import {
  getProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:slug', getProductBySlug);
router.post('/', createProduct); // In production, add admin auth middleware here
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;
