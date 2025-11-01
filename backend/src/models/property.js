import mongoose from "mongoose";
import slugify from "slugify";

const propertySchema = new mongoose.Schema(
  {
    images: { type: [String], default: [] },
    videos: { type: [String], default: [] },
    title: { type: String, required: true },
    slug: { type: String, unique: true }, // 👈 added slug field
    shortDescription: { type: String },
    fullDescription: { type: String },
    salePrice: { type: String },
    squareFeet: { type: String },
    location: { type: String },
  },
  { timestamps: true }
);

// 🧠 Auto-generate slug before saving
propertySchema.pre("save", function (next) {
  if (!this.slug && this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

const Property = mongoose.model("Property", propertySchema);
export default Property;
