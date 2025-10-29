import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    images: { type: [String], default: [] },   // multiple images
    videos: { type: [String], default: [] },   // multiple videos
    title: { type: String, required: true },
    shortDescription: { type: String },
    fullDescription: { type: String },
    salePrice: { type: Number },
    squareFeet: { type: Number },
    location: { type: String }
  },
  { timestamps: true }
);

const Property = mongoose.model("Property", propertySchema);
export default Property;
