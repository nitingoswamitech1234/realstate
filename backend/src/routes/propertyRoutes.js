import express from "express";
import multer from "multer";
import path from "path";
import {
  createProperty,
  getAllProperties,
  getProperty,
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
  const allowed = ["image/jpeg", "image/png", "image/jpg", "video/mp4"];
  if (allowed.includes(file.mimetype)) cb(null, true);
  else cb(new Error("Only image and video files are allowed"), false);
};

const upload = multer({ storage, fileFilter });

// Routes
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
