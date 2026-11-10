import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  slug: { 
    type: String, 
    required: true, 
    unique: true 
  },
  state: { 
    type: String 
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  }
}, { timestamps: true });

export default mongoose.model('Location', locationSchema);
