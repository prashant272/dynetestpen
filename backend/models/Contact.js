import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    // Personal Details
    name: {
        type: String,
        required: true,
        trim: true
    },
    fatherName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^[0-9]{10}$/.test(v);
            },
            message: 'Phone number must be exactly 10 digits'
        }
    },
    alternateMobile: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^[0-9]{10}$/.test(v);
            },
            message: 'Alternate mobile must be exactly 10 digits'
        }
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    statePreference: {
        type: [String],
        required: true,
        validate: {
            validator: function (v) {
                return v && v.length > 0;
            },
            message: 'At least one state preference must be selected'
        }
    },

    // Course Details
    course: {
        type: String,
        required: true
    },

    // Academic Details
    marks10th: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    marks12th: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    stream12th: {
        type: String,
        required: true,
        enum: ['PCM', 'PCB', 'Commerce', 'Arts', 'Other']
    },
    schoolName12th: {
        type: String,
        required: true,
        trim: true
    },
    examScore: {
        type: String,
        trim: true
    },

    // Optional Message
    message: {
        type: String,
        trim: true
    },

    // Status
    status: {
        type: String,
        enum: ["pending", "contacted", "closed"],
        default: "pending",
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
