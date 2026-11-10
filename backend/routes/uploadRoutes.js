import express from 'express';
import { upload, uploadToS3 } from '../controllers/uploadController.js';

const router = express.Router();

const handleUpload = (req, res, next) => {
  upload.any()(req, res, (err) => {
    if (err) {
      console.error('Upload error:', err);
      return res.status(400).json({ message: err.message || 'File upload error' });
    }
    if (req.files && req.files.length > 0) {
      req.file = req.files[0];
    }
    next();
  });
};

router.post('/', handleUpload, uploadToS3);

export default router;
