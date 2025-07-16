import mongoose from "mongoose";

const scholarshipSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  eligibility: String,
  deadline: Date,
  fundingAmount: Number,
  applicationLink: String,
}, { _id: false });

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
  country: {
    type: String,
    required: true,
    trim: true,
  },
  ranking: {
    type: Number,
    required: true,
    min: 1,
  },
  website: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: (v) => /^https?:\/\/.+/.test(v),
      message: "Website must start with http or https",
    },
  },
  logoUrl: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  acceptsInternationalStudents: {
    type: Boolean,
    default: true,
  },
  intakePeriods: [String], // e.g., ["Fall 2025", "Spring 2026"]
  applicationFee: {
    type: Number,
  },
  languageRequirements: {
    ielts: { type: Number }, // e.g., 6.5
    gre: { type: Number },   // e.g., 310
    otherLanguages: [String], // e.g., ["TOEFL", "Duolingo"]
  },
  languagesOfInstruction: [String], // e.g., ["English", "French"]
  scholarships: [scholarshipSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const University = mongoose.model("University", universitySchema);
