import Property from "../models/property.js";
import path from "path";
import dotenv from "dotenv";
import slugify from "slugify"; // ✅ import slugify
dotenv.config();

// Helper: Convert multer file path to full URL
const makePublicUrl = (filePath) => {
  if (!filePath) return null;
  const parts = filePath.split(path.sep);
  const idx = parts.lastIndexOf("uploads");
  const filename = idx >= 0 ? parts.slice(idx + 1).join("/") : parts[parts.length - 1];
  const base = process.env.BASE_URL || "https://realstate-rurx.onrender.com";
  return `${base}/uploads/${filename}`;
};

// Helper: Safely convert numbers
// const safeNumber = (val) => {
//   const num = Number(val);
//   return isNaN(num) ? undefined : num;
// };

// 🏠 Create Property
export const createProperty = async (req, res, next) => {
  console.log("Creating property with files:", req.files);
  try {
    const {
      title,
      shortDescription,
      fullDescription,
      salePrice,
      squareFeet,
      location,
    } = req.body;

    if (!title)
      return res.status(400).json({ message: "Title is required" });

    // ✅ slugify title
    const slug = slugify(title, { lower: true, strict: true });

    // handle multiple images/videos (optional)
    const images = (req.files?.image || []).map((f) => makePublicUrl(f.path));
    const videos = (req.files?.video || []).map((f) => makePublicUrl(f.path));

    const property = await Property.create({
      title,
      slug,
      shortDescription,
      fullDescription,
      salePrice: salePrice,
      squareFeet:squareFeet,
      location,
      images,
      videos,
    });

    res.status(201).json(property);
  } catch (err) {
    next(err);
  }
};

// 📋 Get All Properties
export const getAllProperties = async (req, res, next) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.json(properties);
  } catch (err) {
    next(err);
  }
};

// 📄 Get Single Property by ID
export const getProperty = async (req, res, next) => {
  try {
    const { id } = req.params;
    const property = await Property.findById(id);
    if (!property)
      return res.status(404).json({ message: "Property not found" });
    res.json(property);
  } catch (err) {
    next(err);
  }
};

// 📄 Get Single Property by Slug ✅
export const getPropertyBySlug = async (req, res, next) => {
  try {
    const { slug } = req.params;
    const property = await Property.findOne({ slug });
    if (!property)
      return res.status(404).json({ message: "Property not found" });
    res.json(property);
  } catch (err) {
    next(err);
  }
};


// ✏️ Update Property
export const updateProperty = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // ✅ Update slug if title changes
    if (updateData.title)
      updateData.slug = slugify(updateData.title, { lower: true, strict: true });

    // handle optional file updates
    if (req.files?.image?.length)
      updateData.images = req.files.image.map((f) => makePublicUrl(f.path));

    if (req.files?.video?.length)
      updateData.videos = req.files.video.map((f) => makePublicUrl(f.path));

    // safely convert numbers
    if (updateData.salePrice)
      updateData.salePrice = updateData.salePrice;
    if (updateData.squareFeet)
      updateData.squareFeet =updateData.squareFeet;

    const property = await Property.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!property)
      return res.status(404).json({ message: "Property not found" });

    res.json(property);
  } catch (err) {
    next(err);
  }
};

// ❌ Delete Property
export const deleteProperty = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Property.findByIdAndDelete(id);
    res.json({ message: "Property deleted successfully" });
  } catch (err) {
    next(err);
  }
};
