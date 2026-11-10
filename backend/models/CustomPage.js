import mongoose from 'mongoose';

const CustomPageSchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
  },
  heroImage: {
    type: String,
  },
  heroFeatures: [{
    type: String,
  }],
  section2Title: {
    type: String,
  },
  section2Description: {
    type: String,
  },
  section2Bullets: [{
    type: String,
  }],
  section2Locations: [{
    type: String,
  }],
  citySectionTitle: {
    type: String,
  },
  citySectionDescription: {
    type: String,
  },
  faqs: [{
    question: String,
    answer: String,
  }],
  ctaTitle: {
    type: String,
  },
  ctaDescription: {
    type: String,
  },
  seoTitle: String,
  seoDescription: String,
  seoKeywords: String,
}, { timestamps: true });

const CustomPage = mongoose.model('CustomPage', CustomPageSchema);
export default CustomPage;
