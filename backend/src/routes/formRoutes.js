import express from "express";
import {
  createForm,
  getAllForms,
  downloadFormsCSV,
} from "../controllers/formController.js";

const router = express.Router();

// POST form details
router.post("/", createForm);

// GET all forms
router.get("/", getAllForms);

// DOWNLOAD all forms as CSV
router.get("/forms/download", downloadFormsCSV);

export default router;
