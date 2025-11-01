import React, { useState } from "react";
import { Phone, MapPin } from "lucide-react";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import { motion } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";
import api from "../api/apiBase.js";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    city: "",
    message: "",
  });

  // Animation Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const staggerContainer = {
    show: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Submitting your enquiry...");

    try {
      const res = await api.post("/form", formData);
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
    <>
      {/* ✅ Toast Container */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* ✅ Banner Section */}
      <section
        className="relative w-full h-[40vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: "url('/assets/jainx.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <h1 className="relative text-white text-5xl md:text-6xl font-bold z-10 text-center">
          Contact
        </h1>
      </section>

      {/* ✅ Contact Section */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="py-12 md:py-16 bg-[#f8fbff]"
      >
        <div className="container max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-start">
          {/* Left Info Section */}
          <motion.div variants={fadeUp}>
            <h5 className="text-[#d3ac67] font-semibold mb-2">Get In Touch</h5>
            <h2 className="text-4xl md:text-5xl font-bold text-[#0a1e35] leading-tight mb-6">
              We are always ready to assist you and answer your questions.
            </h2>
            <p className="text-gray-600 mb-8">
              For any inquiries, suggestions, or concerns, feel free to call us
              directly. Our team is available to help you during business hours.
            </p>

            {/* Info Grid */}
            <div className="grid sm:grid-cols-2 gap-6 text-gray-700">
              <div>
                <div className="flex items-center gap-2 font-semibold text-[#d3ac67]">
                  <MapPin size={18} /> Office Location
                </div>
                <p className="mt-2 text-sm leading-relaxed">
                  Galactic City Plot No. 6 Knowledge Park 5 Greater, Noida West
                  (Noida Extension) Uttar Pradesh
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 font-semibold text-[#d3ac67]">
                  <Phone size={18} /> Call Us Directly
                </div>
                <p className="mt-2 text-sm leading-relaxed">
                  +91 7982481132 , +91 9971777831
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Form Section */}
          <motion.div
            variants={fadeUp}
            className="bg-[#f0f5fb] rounded-2xl p-8 shadow-sm"
          >
            <h3 className="text-xl font-semibold text-[#0a1e35] mb-6">
              Have a question about your home? Let’s talk!
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full p-3 rounded-md border border-gray-200 focus:ring-2 focus:ring-[#d3ac67] outline-none bg-white"
                required
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full p-3 rounded-md border border-gray-200 focus:ring-2 focus:ring-[#d3ac67] outline-none bg-white"
                required
              />
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                className="w-full p-3 rounded-md border border-gray-200 focus:ring-2 focus:ring-[#d3ac67] outline-none bg-white"
                required
              />
              <textarea
                rows="4"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                className="w-full p-3 rounded-md border border-gray-200 focus:ring-2 focus:ring-[#d3ac67] outline-none bg-white"
                required
              ></textarea>

              <button
                type="submit"
                className="w-full bg-[#d3ac67] hover:bg-[#c1913d] text-white font-semibold py-3 rounded-md transition"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </motion.section>

      {/* ✅ Map Section */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="w-full"
      >
        <iframe
          title="Genesisrealty Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d448577.27661710035!2d76.87271118164067!3d28.554445197361634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cebf8fabce4c9%3A0x8b64644005f2539c!2sGalactic%20City!5e0!3m2!1sen!2sin!4v1761653375875!5m2!1sen!2sin"
          width="100%"
          height="450"
          style={{ border: "0" }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-none md:rounded-xl shadow-sm"
        ></iframe>
      </motion.section>

      {/* ✅ WhatsApp Integration */}
      <FloatingWhatsApp
        phoneNumber="+917982481132"
        accountName="Genesisrealty"
        allowEsc
        allowClickAway
        notification
        notificationSound
        chatMessage="Hello 👋 How can we help you today?"
        avatar="/assets/logo.png"
      />
    </>
  );
}
