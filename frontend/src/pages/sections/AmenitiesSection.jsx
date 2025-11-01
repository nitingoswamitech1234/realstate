import React from "react";
import { motion } from "framer-motion";
import AmenityCard from "../../components/AmenityCard";
import {
  FaCar,
  FaSwimmer,
  FaLock,
  FaHospital,
  FaBook,
  FaBed,
  FaHome,
  FaChild,
} from "react-icons/fa";

export default function AmenitiesSection() {
  const items = [
    { icon: <FaCar />, label: "Parking Space" },
    { icon: <FaSwimmer />, label: "Swimming Pool" },
    { icon: <FaLock />, label: "Private Security" },
    { icon: <FaHospital />, label: "Medical Center" },
    { icon: <FaBook />, label: "Library Area" },
    { icon: <FaBed />, label: "King Size Beds" },
    { icon: <FaHome />, label: "Smart Homes" },
    { icon: <FaChild />, label: "Kid’s Playland" },
  ];

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section className="py-12 md:py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Section Title */}
        {/* <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="inline-block bg-[#fef5e4] text-[#d3ac67] text-sm font-semibold py-1 px-4 rounded-full mb-4"
        >
          Our Amenities
        </motion.div> */}

        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          transition={{ delay: 0.2 }}
          className="text-3xl md:text-4xl font-extrabold text-[#0b2135] mb-6"
        >
          Building Amenities
        </motion.h2>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-2xl mx-auto text-gray-600 mb-12 text-sm md:text-base"
        >
          Experience exceptional amenities that redefine lifestyle — from premium comfort to smart convenience, crafted for modern living.
        </motion.p>

        {/* Amenities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {items.map((it, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: i * 0.1 }}
            >
              <AmenityCard {...it} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
