import express from "express";
import Enquiry from "../models/Enquiry.js";
import { verifyAdmin } from "../middleware/auth.js";
import { sendEnquiryNotificationEmail } from "../utils/emailService.js";

const router = express.Router();

// Simple in-memory rate limiter helper (avoids external dependency)
const requestCounts = new Map();
const enquiryLimiter = (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress || 'unknown';
    const now = Date.now();
    const windowMs = 15 * 60 * 1000;
    const max = 20;

    const record = requestCounts.get(ip) || { count: 0, resetTime: now + windowMs };
    if (now > record.resetTime) {
        record.count = 0;
        record.resetTime = now + windowMs;
    }

    record.count++;
    requestCounts.set(ip, record);

    if (record.count > max) {
        return res.status(429).json({ success: false, message: "Too many enquiries. Please try again after a few minutes." });
    }
    next();
};

// Submit new enquiry (public route)
router.post("/submit", enquiryLimiter, async (req, res) => {
    try {
        const { name, company, email, phone, subject, message, website } = req.body;

        // HONEYPOT: If the hidden 'website' field is filled, it's a bot.
        // Return success so the bot thinks it worked, but don't save.
        if (website) {
            return res.status(200).json({ success: true, message: "Enquiry submitted successfully" });
        }

        if (!name || !company || !email || !phone || !subject || !message) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields"
            });
        }

        // REGEX VALIDATION
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, message: "Invalid email format" });
        }

        const phoneRegex = /^[0-9\+\-\s\(\)]{7,20}$/;
        if (!phoneRegex.test(phone)) {
            return res.status(400).json({ success: false, message: "Invalid phone number format" });
        }

        // Reject if message contains http/https links
        const urlRegex = /(http|https):\/\/[^\s]+/;
        if (urlRegex.test(message) || urlRegex.test(subject)) {
            return res.status(400).json({ success: false, message: "Links/URLs are not allowed in the message" });
        }

        const enquiry = new Enquiry({
            name,
            company,
            email,
            phone,
            subject,
            message
        });

        await enquiry.save();

        // Send email notification to sales team
        sendEnquiryNotificationEmail(enquiry).catch((err) => {
            console.error("Non-blocking error in sending enquiry email:", err);
        });

        res.status(201).json({
            success: true,
            message: "Enquiry submitted successfully",
            data: enquiry
        });
    } catch (error) {
        console.error("Error submitting enquiry:", error);
        res.status(500).json({
            success: false,
            message: "Failed to submit enquiry",
            error: error.message
        });
    }
});

// Get all enquiries (admin only)
router.get("/all", verifyAdmin, async (req, res) => {
    try {
        const enquiries = await Enquiry.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: enquiries.length,
            data: enquiries
        });
    } catch (error) {
        console.error("Error fetching enquiries:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch enquiries",
            error: error.message
        });
    }
});

// Update enquiry status (admin only)
router.put("/:id/status", verifyAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!["new", "read", "replied"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status value"
            });
        }

        const enquiry = await Enquiry.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!enquiry) {
            return res.status(404).json({
                success: false,
                message: "Enquiry not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Status updated successfully",
            data: enquiry
        });
    } catch (error) {
        console.error("Error updating status:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update status",
            error: error.message
        });
    }
});

// Delete enquiry (admin only)
router.delete("/:id", verifyAdmin, async (req, res) => {
    try {
        const { id } = req.params;

        const enquiry = await Enquiry.findByIdAndDelete(id);

        if (!enquiry) {
            return res.status(404).json({
                success: false,
                message: "Enquiry not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Enquiry deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting enquiry:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete enquiry",
            error: error.message
        });
    }
});

export default router;
