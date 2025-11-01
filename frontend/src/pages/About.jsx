import React from "react";
import { motion } from "framer-motion";
import { Home, Image, Heart, Shield } from "lucide-react";
import CTABanner from './sections/CTABanner'
import TestimonialsSection from './sections/TestimonialsSection'
import { FloatingWhatsApp } from "react-floating-whatsapp";

export default function About() {
  const iconItems = [
    { icon: <Home size={22} />, text: "Premium Commercial Spaces" },
    { icon: <Image size={22} />, text: "Modern Architecture & Design" },
    { icon: <Heart size={22} />, text: "High Return on Investment" },
    { icon: <Shield size={22} />, text: "Trusted & RERA Approved" },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const fadeLeft = {
    hidden: { opacity: 0, x: 80 },
    show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const fadeRight = {
    hidden: { opacity: 0, x: -80 },
    show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const staggerContainer = {
    show: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <>
      {/* ✅ Banner Section */}
      <section
        className="relative w-full h-[40vh] flex items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: "url('/assets/jainx.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <h1 className="relative text-white text-5xl md:text-6xl font-bold z-10 text-center">
          About
        </h1>
      </section>

      {/* ✅ Main About Section */}
      <section className="py-12 md:p-16 bg-white overflow-hidden">
        <div className="container max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Left Image */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="w-full lg:w-[40%]"
          >
            <img
              src="/assets/galactic.jpg"
              alt="About Galactic City"
              className="w-full h-[300px] sm:h-[400px] md:h-[600px] object-cover rounded-lg shadow-lg"
            />
          </motion.div>

          {/* Right Content */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="w-full lg:w-[60%]"
          >

            {/* Heading */}
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0b2135] leading-snug md:!leading-tight mb-4"
            >
              Building the Future of{" "}
              <br className="hidden md:block" />
              Real Estate Investment
              <span className="text-[#d3ac67]">.</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 mb-6 sm:mb-8 max-w-xl text-base sm:text-lg"
            >
              We connect investors and businesses with premium commercial
              projects like <strong>The Galactic City</strong> and{" "}
              <strong>Jain X Cyber City</strong> — both located in the thriving
              hub of Knowledge Park V, Greater Noida. Our mission is to provide
              trusted opportunities with strong ROI, modern design, and unmatched
              infrastructure.
            </motion.p>

            {/* Icons Grid */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="grid grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8"
            >
              {iconItems.map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  className="flex items-center gap-3"
                >
                  <div className="bg-[#fef5e4] p-3 rounded-full text-[#d3ac67]">
                    {item.icon}
                  </div>
                  <span className="text-[#0b2135] font-medium text-sm sm:text-base">
                    {item.text}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Quote Box */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-[#fef5e4] border-l-4 border-[#d3ac67] p-4 mb-6 sm:mb-8"
            >
              <p className="text-gray-700 italic text-sm sm:text-base">
                “Transforming real estate with innovation, transparency, and
                long-term value — your trusted partner for future-ready
                investments.”
              </p>
            </motion.div>

            {/* Button */}
            {/* <motion.button
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-[#d3ac67] text-white font-medium px-6 py-3 rounded hover:bg-[#c1913d] transition-colors duration-300 text-sm sm:text-base"
            >
              Know More
            </motion.button> */}
          </motion.div>
        </div>
      </section>

      <CTABanner/>

      <section className="py-12 md:p-20 bg-[#f2f6f7]">
        <div className="container max-w-7xl mx-auto px-4 flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16">

          {/* ✅ Right Content (60%) */}
          <div
            className="w-full lg:w-[60%]"
            data-aos="fade-left"
          >
            {/* Small Tag */}
            <div className="inline-block bg-[#fef5e4] text-[#d3ac67] px-4 py-1 rounded-full text-sm font-medium mb-4">
              Our Vision & Mission
            </div>

            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0b2135] leading-snug md:!leading-tight mb-4">
              Guiding You Towards Smarter{" "}
              <br className="hidden md:block" />
              Property Investments<span className="text-[#d3ac67]">.</span>
            </h2>

            {/* Description */}
            <p className="text-gray-600 mb-4 sm:mb-4 max-w-xl text-base sm:text-lg">
              We specialize in connecting investors and businesses with high-growth commercial projects in Greater Noida, such as The Galactic City and Jain X Cyber City.
            </p>

            <p className="text-gray-600 mb-6 sm:mb-8 max-w-xl text-base sm:text-lg">
              From site selection to investment guidance and after-sales support, we make your real estate journey seamless, transparent, and rewarding.
            </p>

            {/* Icons Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
              {[
                "Commercial Project Consultation",
                "End-to-End Investment Guidance",
                "Verified RERA-Approved Properties",
                "High ROI & Future-Ready Locations",
              ].map((text, idx) => (
                <div
                  key={idx}
                  data-aos="fade-up"
                  data-aos-delay={idx * 100}
                  className="flex items-center gap-3"
                >
                  <div className="bg-[#d3ac67] w-3 h-3 rounded-full"></div>
                  <span className="text-[#0b2135] font-medium text-sm sm:text-base">
                    {text}
                  </span>
                </div>
              ))}
            </div>

            {/* Quote Box */}
            <div
              className="bg-[#fef5e4] border-l-4 border-[#d3ac67] p-4 mb-8"
              data-aos="zoom-in"
            >
              <p className="text-gray-700 italic text-sm sm:text-base">
                “We don’t just sell spaces — we build long-term partnerships based on trust, growth, and transparency in every deal we make.”
              </p>
            </div>
          </div>

          {/* ✅ Left Image (40%) */}
          <div
            className="w-full lg:w-[40%]"
            data-aos="fade-right"
          >
            <img
              src="/assets/jainx.jpg"
              alt="About Us"
              className="w-full h-[280px] sm:h-[400px] md:h-[500px] object-cover rounded-lg shadow-lg"
            />
          </div>

        </div>
      </section>

      <TestimonialsSection />


      {/* WhatsApp Integration */}
      <FloatingWhatsApp
        phoneNumber="+917982481132 " // 👈 your WhatsApp number
        accountName="Genesisrealty"
        allowEsc
        allowClickAway
        notification
        notificationSound
        chatMessage="Hello 👋 How can we help you today?"
        avatar="/assets/logo.png" // optional, your logo or icon
      />

    </>
  );
}
