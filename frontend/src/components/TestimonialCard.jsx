import React from "react";
import { motion } from "framer-motion";

export default function TestimonialCard({ name, text, image }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
      className="flex flex-col items-center justify-center"
    >
      <p className="text-lg italic leading-relaxed mb-8 max-w-5xl">
        {text}
      </p>
      <div className="flex flex-col items-center">
        {/* <img
          src={image}
          alt={name}
          className="w-20 h-20 rounded-md object-cover mb-4"
        /> */}
        <h4 className="text-xl font-semibold italic">"{name}"</h4>
        {/* <p className="text-sm opacity-90">Happy Client</p> */}
      </div>
    </motion.div>
  );
}
