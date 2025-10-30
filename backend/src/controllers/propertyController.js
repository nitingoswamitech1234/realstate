import Property from "../models/property.js";
import path from "path";

// Helper: Convert multer file path to full URL
const makePublicUrl = (filePath) => {
  if (!filePath) return null;
  const parts = filePath.split(path.sep);
  const idx = parts.lastIndexOf("uploads");
  const filename =
    idx >= 0 ? parts.slice(idx + 1).join("/") : parts[parts.length - 1];
  const base =
    process.env.BASE_URL ||
    `${process.env.HOST || "http://localhost"}:${process.env.PORT || 5000}`;
  return `${base}/uploads/${filename}`;
};

// Helper: Safely convert numbers
const safeNumber = (val) => {
  const num = Number(val);
  return isNaN(num) ? undefined : num;
};

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

    // handle multiple images/videos (optional)
    const images = (req.files?.image || []).map((f) => makePublicUrl(f.path));
    const videos = (req.files?.video || []).map((f) => makePublicUrl(f.path));

    const property = await Property.create({
      title,
      shortDescription,
      fullDescription,
      salePrice: safeNumber(salePrice),
      squareFeet: safeNumber(squareFeet),
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

// 📄 Get Single Property
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

// ✏️ Update Property
export const updateProperty = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    // handle optional file updates
    if (req.files?.image?.length)
      updateData.images = req.files.image.map((f) => makePublicUrl(f.path));

    if (req.files?.video?.length)
      updateData.videos = req.files.video.map((f) => makePublicUrl(f.path));

    // safely convert numbers
    if (updateData.salePrice)
      updateData.salePrice = safeNumber(updateData.salePrice);
    if (updateData.squareFeet)
      updateData.squareFeet = safeNumber(updateData.squareFeet);

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
