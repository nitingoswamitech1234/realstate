import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import TestimonialCard from "../../components/TestimonialCard";

const testimonials = [
  {
    name: "Rohit Sharma",
    text: "Booking my apartment in Galactic City was one of my best decisions. The team guided me through every step — from paperwork to possession — very professional and transparent service!",
    image: "/images/client1.jpg",
  },
  {
    name: "Anita Verma",
    text: "Loved the way they handled everything so smoothly. JainX Cyber City offers excellent amenities, and the project quality truly matches what was promised. Highly recommend to families!",
    image: "/images/client2.jpg",
  },
  {
    name: "Sandeep Khanna",
    text: "I invested here last year, and the returns have already started showing positive growth. The location advantage and clear documentation made it a safe and smart choice.",
    image: "/images/client3.jpg",
  },
  {
    name: "Meena Patel",
    text: "As a first-time buyer, I was nervous, but the dealer’s team made the entire process stress-free. They’re reliable, responsive, and genuinely care about your needs.",
    image: "/images/client4.jpg",
  },
  {
    name: "Arjun Malhotra",
    text: "Superb experience! The site visits were well-organized, pricing was clear, and there were no hidden costs. The quality of construction exceeded expectations.",
    image: "/images/client5.jpg",
  },
];

export default function TestimonialsSection() {
  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <section
      className="relative py-10 text-white text-center"
      style={{
        backgroundImage: "url('/images/bg-building.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Orange Overlay */}
      <div className="absolute inset-0 bg-[#d3ac67] opacity-90"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <div className="inline-block bg-white text-[#d3ac67] text-3xl px-6 py-2 rounded-t-lg">
            <span>“</span>
          </div>
          <h2 className="text-3xl font-bold mt-4 tracking-wide">
            WHAT CLIENTS SAY
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <Slider {...settings}>
            {testimonials.map((item, i) => (
              <TestimonialCard key={i} {...item} />
            ))}
          </Slider>
        </motion.div>
      </div>
    </section>
  );
}
