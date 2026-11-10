import mongoose from 'mongoose';

const facebookConfigSchema = new mongoose.Schema({
    pageId: {
        type: String,
        required: true
    },
    pageName: {
        type: String,
        required: true
    },
    pageAccessToken: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const FacebookConfig = mongoose.model('FacebookConfig', facebookConfigSchema);

export default FacebookConfig;
