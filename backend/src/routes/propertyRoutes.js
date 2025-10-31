import express from "express";
import multer from "multer";
import path from "path";
import {
  createProperty,
  getAllProperties,
  getProperty,
  getPropertyBySlug, // ✅ new
  updateProperty,
  deleteProperty,
} from "../controllers/propertyController.js";

const router = express.Router();

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`),
});

// File filter (optional)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/") || file.mimetype.startsWith("video/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image and video files are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

// Routes
router.get("/test", (req, res) => res.send("✅ Property route is connected"));

// ✅ Slug-based route (important: must be above “/:id”)
router.get("/slug/:slug", getPropertyBySlug);

router.post(
  "/",
  upload.fields([
    { name: "image", maxCount: 10 },
    { name: "video", maxCount: 5 },
  ]),
  createProperty
);
router.get("/", getAllProperties);
router.get("/:id", getProperty);
router.put(
  "/:id",
  upload.fields([
    { name: "image", maxCount: 10 },
    { name: "video", maxCount: 5 },
  ]),
  updateProperty
);
router.delete("/:id", deleteProperty);

export default router;
