import express from "express";
import multer from "multer";
import path from "path";
import {
  createProperty,
  getAllProperties,
  getProperty,
  getPropertyBySlug,
  updateProperty,
  deleteProperty,
} from "../controllers/propertyController.js";

const router = express.Router();

// 🗂️ Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`),
});

// ✅ File filter
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/") || file.mimetype.startsWith("video/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image and video files are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

// ✅ Test route
router.get("/test", (req, res) => res.send("✅ Property route is connected"));

// ✅ Get property by slug (must be before /:id)
router.get("/slug/:slug", getPropertyBySlug);

// ✅ Create property (poster + images + videos)
router.post(
  "/",
  upload.fields([
    { name: "poster", maxCount: 1 }, // 🟢 Added poster field
    { name: "image", maxCount: 10 },
    { name: "video", maxCount: 5 },
  ]),
  createProperty
);

// ✅ Other CRUD routes
router.get("/", getAllProperties);
router.get("/:id", getProperty);

router.put(
  "/:id",
  upload.fields([
    { name: "poster", maxCount: 1 }, // 🟢 Added poster here too
    { name: "image", maxCount: 10 },
    { name: "video", maxCount: 5 },
  ]),
  updateProperty
);

router.delete("/:id", deleteProperty);

export default router;
