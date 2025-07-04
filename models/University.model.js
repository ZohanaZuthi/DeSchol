import mongoose from "mongoose";

const universitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  website: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: (v) => /^https?:\/\/.+/.test(v),
      message: "Please enter a valid website URL (must start with http/https)",
    },
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  country: {
    type: String,
    trim: true,
  },
  ranking: {
    type: Number,
    min: 1,
  },
  logoUrl: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const University = mongoose.model("University", universitySchema);