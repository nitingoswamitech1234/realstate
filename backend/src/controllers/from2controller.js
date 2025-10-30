import Form from "../models/form.js";
import { Parser } from "json2csv";
import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// 📩 Create Form Entry
export const createForm = async (req, res, next) => {
  try {
    const { name, phone, city, message } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ message: "Name and phone are required" });
    }

    // Save form to DB
    const form = await Form.create({ name, phone, city, message });

    // ✅ Send email notification
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Real Estate Inquiry" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO, // your email where you receive leads
      subject: "📬 New Form Submission Received",
      html: `
        <h2>New Inquiry Received</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>City:</b> ${city || "Not provided"}</p>
        <p><b>Message:</b> ${message || "Not provided"}</p>
        <hr/>
        <p>This email was sent automatically from your Real Estate website.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ success: true, message: "Form submitted & email sent", form });
  } catch (err) {
    console.error("❌ Error in createForm:", err);
    next(err);
  }
};

// 📋 Get All Forms
export const getAllForms = async (req, res, next) => {
  try {
    const forms = await Form.find().sort({ createdAt: -1 });
    res.json(forms);
  } catch (err) {
    next(err);
  }
};

// 📥 Download All Forms as CSV
export const downloadFormsCSV = async (req, res, next) => {
  try {
    const forms = await Form.find().sort({ createdAt: -1 });

    if (!forms.length) {
      return res.status(404).json({ message: "No form data found" });
    }

    const fields = ["name", "phone", "city", "message", "createdAt"];
    const parser = new Parser({ fields });
    const csv = parser.parse(forms);

    const filePath = path.join("uploads", `forms-${Date.now()}.csv`);
    fs.writeFileSync(filePath, csv);

    res.download(filePath, "all-forms.csv", (err) => {
      if (err) console.error("CSV download error:", err);
      fs.unlinkSync(filePath);
    });
  } catch (err) {
    next(err);
  }
};
