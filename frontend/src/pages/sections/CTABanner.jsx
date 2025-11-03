import React from "react";
import { motion } from "framer-motion";

export default function CTABanner() {
  // Animation Variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const fadeRight = {
    hidden: { opacity: 0, x: -60 },
    show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  const fadeLeft = {
    hidden: { opacity: 0, x: 60 },
    show: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
    <section className="bg-[#d3ac67] py-8 md:py-8 overflow-hidden">
      <motion.div
        variants={fadeRight}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="container flex flex-col md:flex-row items-center justify-center gap-6 md:gap-32 px-6"
      >
        {/* Text */}
        <motion.h2
          variants={fadeRight}
          className="text-white text-center md:text-left text-xl md:text-2xl font-semibold tracking-wide leading-snug"
        >
          Partner with Trusted Developers. Invest Where Growth Begins.
        </motion.h2>

        {/* Contact Button */}
        <motion.a
          variants={fadeLeft}
          whileHover={{
            scale: 1.08,
            backgroundColor: "#fff",
            color: "#d3ac67",
            transition: { duration: 0.3 },
          }}
          href="tel:+919971777831"
          className="flex items-center gap-2 text-white border border-white rounded-full px-8 py-3 text-lg font-semibold transition-all duration-300"
        >
          <i className="fa-solid fa-phone-volume fa-shake transition-colors duration-300" /> 
          Get Free Consultation
        </motion.a>

      </motion.div>
    </section>
  );
}
