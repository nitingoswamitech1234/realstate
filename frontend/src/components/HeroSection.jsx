import React, { useState } from "react";
import { motion } from "framer-motion";
import api from "../api/apiBase.js";
import { toast, Toaster } from "react-hot-toast";

export default function HeroSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("📤 Sending data:", formData);

    toast.loading("Submitting your enquiry...");

    try {
      const res = await api.post("/form", formData);
      // console.log("✅ Response:", res.data);
      toast.dismiss();

      if (res.data.success) {
        toast.success(" Your enquiry has been submitted successfully!");
        setFormData({ name: "", phone: "", city: "", message: "" });
      } else {
        toast.error("❌ Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("❌ Error details:", error.response || error.message);
      toast.dismiss();
      toast.error("❌ Error submitting the form. Please try again.");
    }
  };

  return (
    <section className="relative md:h-[700px] w-full overflow-hidden flex items-center justify-center">
      {/* Toast Container */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/assets/banner.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center md:justify-between w-full h-full px-4 sm:px-6 md:px-12 lg:px-20 py-8 gap-10">
        {/* Left Section */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left md:w-1/2">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight drop-shadow-lg uppercase"
          >
            Find Your Dream Property with Us
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
            className="mt-4 text-white text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed"
          >
            Explore premium shops, offices, and modern studio apartments in
            Greater Noida’s top projects — The Galactic City & Jain X Cyber
            City. Trusted real estate experts and easy buying assistance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
            className="mt-6"
          >
            <a
              href="/projects"
              className="inline-block bg-[color:var(--brand)] text-white px-6 py-3 rounded-md shadow-lg hover:opacity-95 transition"
            >
              Explore Projects
            </a>
          </motion.div>
        </div>

        {/* Right Section - Enquiry Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
          className="w-full sm:w-[90%] md:w-[380px] bg-white bg-opacity-90 rounded-xl shadow-2xl p-6 md:p-8 backdrop-blur-sm"
        >
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 text-center">
            Enquiry Form
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-[color:var(--brand)] outline-none"
              required
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-[color:var(--brand)] outline-none"
              required
            />
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="City"
              className="p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-[color:var(--brand)] outline-none"
              required
            />
            <textarea
              rows="2"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-[color:var(--brand)] outline-none bg-white"
              required
            ></textarea>

            <button
              type="submit"
              className="bg-[color:var(--brand)] text-white py-3 rounded-md font-semibold hover:opacity-90 transition"
            >
              Submit
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
