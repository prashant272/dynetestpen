import express from 'express';
import jwt from 'jsonwebtoken';
import Order from '../models/Order.js';
import User from '../models/User.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Test route
router.get('/test', (req, res) => {
    res.json({ message: 'Admin routes working!' });
});

// @desc    Admin login (Strict Backend Authentication & JWT generation)
// @route   POST /api/admin/login
// @access  Public
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!password) {
        return res.status(400).json({ success: false, message: 'Password is required' });
    }

    const expectedPassword = process.env.ADMIN_PASSWORD || 'admin@2026';
    const expectedEmail = process.env.ADMIN_EMAIL;

    // Allow login by password only (or email+password if email is provided)
    const isPasswordValid = (password === expectedPassword);
    const isEmailValid = !expectedEmail || !email || (email === expectedEmail);

    if (isPasswordValid && isEmailValid) {
        const secret = process.env.JWT_SECRET || 'career-commando-secret-key-2026-secure';
        
        // Generate real JWT token signed with JWT_SECRET
        const token = jwt.sign(
            { 
                role: 'admin', 
                name: 'Master Admin',
                email: email || 'admin@imagetechindustries.com',
                timestamp: Date.now() 
            },
            secret,
            { expiresIn: '30d' }
        );

        return res.json({
            success: true,
            token,
            admin: {
                role: 'admin',
                name: 'Master Admin',
                email: email || 'admin@imagetechindustries.com'
            },
            message: 'Login successful'
        });
    } else {
        return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
    }
});

// @desc    Verify admin token with backend
// @route   POST /api/admin/verify
// @access  Public
router.post('/verify', (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(401).json({ valid: false, message: 'No token provided' });
    }

    try {
        const secret = process.env.JWT_SECRET || 'career-commando-secret-key-2026-secure';
        const decoded = jwt.verify(token, secret);

        if (decoded.role === 'admin') {
            return res.json({ 
                valid: true, 
                admin: { 
                    role: 'admin', 
                    name: decoded.name || 'Master Admin',
                    email: decoded.email 
                } 
            });
        } else {
            return res.status(403).json({ valid: false, message: 'Not an admin role' });
        }
    } catch (error) {
        return res.status(401).json({ valid: false, message: 'Token expired or invalid' });
    }
});

// @desc    Get Admin Dashboard Stats
// @route   GET /api/admin/stats
// @access  Private/Admin
router.get('/stats', protect, admin, async (req, res) => {
    try {
        const totalUsers = await User.countDocuments().catch(() => 0);
        const totalOrders = await Order.countDocuments().catch(() => 0);
        
        const orders = await Order.find({}).catch(() => []);
        const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || order.total || 0), 0);
        const pendingOrders = orders.filter(o => o.status === 'pending' || o.orderStatus === 'Processing').length;

        res.json({
            totalUsers,
            totalOrders,
            totalRevenue,
            pendingOrders
        });
    } catch (error) {
        console.error('Error fetching admin stats:', error);
        res.status(500).json({ 
            totalUsers: 0, 
            totalOrders: 0, 
            totalRevenue: 0, 
            pendingOrders: 0 
        });
    }
});

export default router;
