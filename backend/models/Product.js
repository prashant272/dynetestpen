import mongoose from 'mongoose';

const infoBoxSchema = new mongoose.Schema({
  title: String,
  value: String,
  icon: String
}, { _id: false });

const overviewFeatureSchema = new mongoose.Schema({
  title: String,
  desc: String,
  icon: String
}, { _id: false });

const faqSchema = new mongoose.Schema({
  question: String,
  answer: String
}, { _id: false });

const specificationSchema = new mongoose.Schema({
  label: String,
  value: String
}, { _id: false });

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  subcategory: { type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory' },
  isSpecial: { type: Boolean, default: false },
  price: { type: Number, default: 0 },
  shortDesc: { type: String },
  longDesc: { type: String },
  images: [{ type: String }],
  videos: [{ type: String }],
  features: [{ type: String }],
  infoBoxes: [infoBoxSchema],
  overviewFeatures: [overviewFeatureSchema],
  overviewText: [{ type: String }],
  faqs: [faqSchema],
  specifications: [specificationSchema],
  seoTitle: { type: String },
  seoDescription: { type: String },
  seoKeywords: { type: String }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
