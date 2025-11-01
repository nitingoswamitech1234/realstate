import React from "react";
import { motion } from "framer-motion";
import { Home, Image, Heart, Shield } from "lucide-react";

export default function AboutSection() {
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
          {/* Small Tag */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="inline-block bg-[#fef5e4] text-[#d3ac67] px-4 py-1 rounded-full text-sm font-medium mb-3"
          >
            About Us
          </motion.div>

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
            We connect investors and businesses with premium commercial projects
            like <strong>The Galactic City</strong> and{" "}
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
          <motion.button
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="bg-[#d3ac67] text-white font-medium px-6 py-3 rounded hover:bg-[#c1913d] transition-colors duration-300 text-sm sm:text-base"
          >
            Know More
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
