import express from 'express';
import {
    getFacebookAuthUrl,
    handleFacebookCallback,
    getManagedPages,
    savePageConfig,
    getFacebookStatus
} from '../controllers/facebookController.js';

const router = express.Router();

// Admin routes for facebook integration
router.get('/auth-url', getFacebookAuthUrl);
router.get('/callback', handleFacebookCallback);
router.get('/pages', getManagedPages);
router.post('/save-page', savePageConfig);
router.get('/status', getFacebookStatus);

export default router;
