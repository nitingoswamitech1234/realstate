import express from "express";
import { registerAdmin, adminLogin } from "../controllers/adminController.js";

const router = express.Router();

// Only for one-time use — to register admin
router.post("/register", registerAdmin);

// Login route
router.post("/login", adminLogin);

export default router;
