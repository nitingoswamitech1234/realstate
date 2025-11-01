import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HiOutlineLocationMarker } from "react-icons/hi";

export default function ProjectTwo() {
  // Slider navigation buttons
  const PrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      aria-label="Previous slide"
      className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-all duration-200"
    >
      <ChevronLeft className="text-gray-800 w-6 h-6" />
    </button>
  );

  const NextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      aria-label="Next slide"
      className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-all duration-200"
    >
      <ChevronRight className="text-gray-800 w-6 h-6" />
    </button>
  );

  const sliderImages = [
    "/assets/jainx.jpg",
    "/assets/galactic.jpg",
    "/assets/jainx.jpg",
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  // Placeholder YouTube video links
  const videos = [
    "https://www.youtube.com/embed/tgbNymZ7vqY",
    "https://www.youtube.com/embed/dQw4w9WgXcQ",
    "https://www.youtube.com/embed/oHg5SJYRHA0",
    "https://www.youtube.com/embed/ysz5S6PUM-U",
  ];

  return (
    <section className="bg-white pb-20">
      {/* Image Slider */}
      <div className="relative w-full h-[50vh] md:h-[75vh] overflow-hidden">
        <Slider {...settings}>
          {sliderImages.map((img, index) => (
            <div key={index} className="relative w-full h-[50vh] md:h-[75vh]">
              <img
                src={img}
                alt={`Jain X Cyber City ${index + 1}`}
                className="w-full h-full"
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 mt-8">

        <div className="md:flex justify-between">
          <div>
            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Galactic City
            </h1>

            {/* Location */}
            <div className="flex items-center text-gray-500 mb-4">
              <HiOutlineLocationMarker size={18} className="mr-2 text-[#d3ac67]" />
              <span>Luxury Residences in Knowledge Park V, Greater Noida</span>
            </div>
          </div>

          {/* Starting Price */}
          <div className="mb-6 md:mb-8">
            <p className="text-gray-500 text-sm tracking-wide uppercase">
              Starting From
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#d4af6a] mt-1">
              ₹36.95 L*
            </h2>
          </div>
        </div>


        {/* Description */}
        <div className="border-t border-gray-300 pt-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Description</h2>

          <p className="text-gray-600 leading-relaxed mb-4">
            Galactic City is a premier commercial plot located in Greater Noida West. With its strategic location next to the Google Data Center and facing the Noida-Greater Noida link road, Galactic City offers a lucrative opportunity for businesses in various industries. Whether you are an educational institution, a BPO, a KPO, a data center, a health club, or a sales and marketing company, Galactic City provides the perfect space for your growth and success.
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            Discover a limitless world of commercial projection at Galactic City, where extraordinary professionals, doctors, recruitment companies, and financial/engineering/legal services thrive. This lucrative commercial plot is the key to success for educational institutions, BPOs, KPOs, data centers, health clubs, and sales & marketing. Strategically located next to the Google Data Center in Greater Noida West, Galactic City is easily approachable from world-class landmarks like Gaur Chowk and City Center, NH09, and Greater Noida.
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            Discover a world of limitless possibilities at Galactic City. With a wide range of IT/ITES working spaces, this commercial plot is the key to success for professionals, recruitment companies, and financial/engineering/legal services. It is also ideal for educational institutions, BPOs, KPOs, data centers, health clubs, and sales & marketing. Located strategically next to the Google Data Center in Greater Noida West, and facing the Noida-Greater Noida link road, Galactic City is easily accessible from renowned landmarks like Gaur Chowk, City Center, NH09, and Greater Noida.
          </p>

          <p className="text-gray-600 leading-relaxed mb-4">
            Galactic City is strategically located next to the Google Data Center in Greater Noida West, and it faces the Noida-Greater Noida link road. This prime location ensures easy accessibility from various world-class landmarks such as Gaur Chowk, City Center, NH09, and Greater Noida. With its convenient location, Galactic City offers a seamless connection to major business hubs and transportation networks.
          </p>

        </div>

        {/* Videos Section */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b border-gray-300 pb-6 ">
            Lastest Videos
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 pt-2">
            {videos.map((link, i) => (
              <div
                key={i}
                className="relative w-full aspect-video rounded-xl overflow-hidden shadow-md hover:shadow-lg transition"
              >
                <iframe
                  src={link}
                  title={`Project Video ${i + 1}`}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
