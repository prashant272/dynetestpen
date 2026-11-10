import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import blogRoutes from "./routes/blogRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import enquiryRoutes from "./routes/enquiryRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import subcategoryRoutes from "./routes/subcategoryRoutes.js";
import couponRoutes from "./routes/couponRoutes.js";
import instagramRoutes from "./routes/instagramRoutes.js";
import sitemapRoutes from "./routes/sitemapRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

// Enable completely open CORS for all origins and domains
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-razorpay-signature', 'x-razorpay-event-id'],
}));

// Configure express.json with rawBody preservation for cryptographic webhook verification
app.use(express.json({
    verify: (req, res, buf) => {
        req.rawBody = buf;
    }
}));

// Request and Error logging middleware (PID: ${process.pid})
app.use((req, res, next) => {
    console.log(`📡 [${req.method}] ${req.url}`);
    const oldResJson = res.json;
    res.json = function (data) {
        if (res.statusCode >= 400) {
            console.error(`❌ API Error [${req.method}] ${req.url}:`, JSON.stringify(data, null, 2));
            if (req.method !== 'GET') {
                console.error(`📦 Request Body:`, JSON.stringify(req.body, null, 2));
            }
        }
        return oldResJson.apply(res, arguments);
    };
    next();
});

app.get("/api/health", (req, res) => res.json({ status: "ok", message: "Backend is reachable" }));
app.get("/api/wakeup", (req, res) => res.status(200).json({ success: true, message: 'Server is awake' }));
app.get("/", (req, res) => res.status(200).json({ success: true, message: "ownvibes  server running..." }));

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
        });
        console.log("✅ MongoDB Connected");
    } catch (err) {
        console.warn("⚠️ MongoDB Initial Connection Notice:", err.message);
    }
};
connectDB();

app.use("/api/blogs", blogRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/enquiry", enquiryRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/subcategories", subcategoryRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/instagram", instagramRoutes);
app.use("/api/sitemap.xml", sitemapRoutes);
app.use("/api/reviews", reviewRoutes);

console.log('✅ Routes mounted: /api/auth, /api/products, /api/blogs, /api/orders, /api/payment, /api/upload, /api/admin, /api/enquiry, /api/coupons, /api/instagram, /api/reviews');

// Serve static frontend files if built in public folder (Single-Container Production Mode)
const publicPath = path.join(__dirname, "public");
app.use(express.static(publicPath));

// For SPA client routing (React Router fallback)
app.get("/*", (req, res, next) => {
    if (req.url.startsWith("/api")) {
        return next();
    }
    const indexPath = path.join(publicPath, "index.html");
    res.sendFile(indexPath, (err) => {
        if (err) {
            res.status(404).send("API Server Running. Frontend build not found.");
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));