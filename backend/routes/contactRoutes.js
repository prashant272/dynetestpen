import express from "express";
import Contact from "../models/Contact.js";

const router = express.Router();

// @route   POST api/contact/submit
// @desc    Submit a contact enquiry
// @access  Public
router.post("/submit", async (req, res) => {
    try {
        const {
            name,
            fatherName,
            email,
            phone,
            alternateMobile,
            address,
            course,
            marks10th,
            marks12th,
            stream12th,
            schoolName12th,
            message
        } = req.body;

        // Validate required fields
        if (!name || !fatherName || !email || !phone || !alternateMobile || !address || !course || !marks10th || !marks12th || !stream12th || !schoolName12th) {
            return res.status(400).json({ msg: "Please fill all required fields" });
        }

        const newContact = new Contact({
            name,
            fatherName,
            email,
            phone,
            alternateMobile,
            address,
            course,
            marks10th: parseFloat(marks10th),
            marks12th: parseFloat(marks12th),
            stream12th,
            schoolName12th,
            message,
        });

        await newContact.save();

        res.status(200).json({ msg: "Enquiry submitted successfully" });
    } catch (err) {
        console.error('Contact submission error:', err.message);
        res.status(500).json({ msg: "Server Error", error: err.message });
    }
});

// @route   GET api/contact/all
// @desc    Get all contact enquiries (for admin dashboard later)
// @access  Public (Should be protected in production)
router.get("/all", async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json(contacts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

export default router;
