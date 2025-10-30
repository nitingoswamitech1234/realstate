import express from "express";

import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import propertyRoutes from "./src/routes/propertyRoutes.js";
import errorHandler from "./src/middleware/errorHandler.js";
import formRoutes from "./src/routes/formRoutes.js";
import adminRoutes from './src/routes/adminRoutes.js';
import form2Routes from "./src/routes/form2routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Connect DB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // <-- for form-data support

app.use("/uploads", express.static(path.resolve("uploads")));

// Routes
app.use("/api/properties", propertyRoutes);
app.use("/api/form",formRoutes);
app.use("/api/form2",form2Routes);
app.use("/api/admin", adminRoutes);

// Home route
app.get("/", (req, res) => res.send("🏠 Real Estate API Running..."));

// Error handling
app.use(errorHandler);

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
