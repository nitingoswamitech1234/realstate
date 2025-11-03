import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AboutSection() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="py-12 md:p-16 bg-[#f2f6f7]">
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
  );
}
