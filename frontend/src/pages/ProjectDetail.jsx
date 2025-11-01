import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import API from "../api/apiBase.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ProjectDetail() {
  const { slug } = useParams(); // ✅ slug from URL
  const [project, setProject] = useState(null);

  useEffect(() => {
  const fetchProject = async () => {
    try {
      const res = await API.get(`/properties/slug/${slug}`);
      console.log("✅ Project detail:", res.data);
      setProject(res.data);
    } catch (err) {
      console.error("❌ Error fetching project:", err);
    }
  };
  if (slug) fetchProject();
}, [slug]);

  if (!project) return <p className="text-center py-20">Loading...</p>;

  // ✅ Format file path
  const makeFullUrl = (filePath) => {
    if (!filePath) return "/assets/default.jpg";
    if (filePath.startsWith("http")) return filePath;
    return `${API.defaults.baseURL.replace(/\/api\/?$/, "")}${filePath.startsWith("/") ? "" : "/"}${filePath}`;
  };

  const sliderImages = project.images?.map((img) => makeFullUrl(img)) || [];
  const videos = project.videos?.map((vid) => makeFullUrl(vid)) || [];

  // ✅ Custom slider arrows
  const PrevArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      aria-label="Previous slide"
      className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100"
    >
      <ChevronLeft className="text-gray-800 w-6 h-6" />
    </button>
  );

  const NextArrow = ({ onClick }) => (
    <button
      onClick={onClick}
      aria-label="Next slide"
      className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-100"
    >
      <ChevronRight className="text-gray-800 w-6 h-6" />
    </button>
  );

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

  const displayPrice = project.salePrice
    ? project.salePrice.toString().match(/^\d+$/)
      ? `₹${Number(project.salePrice).toLocaleString()}*`
      : `₹${project.salePrice}*`
    : null;

  return (
    <section className="bg-white pb-20">
      {/* 🖼️ Slider */}
      <div className="relative w-full h-[50vh] md:h-[75vh] overflow-hidden">
        <Slider {...settings}>
          {sliderImages.length > 0 ? (
            sliderImages.map((img, i) => (
              <div key={i} className="w-full h-[50vh] md:h-[75vh]">
                <img
                  src={img}
                  alt={`Slide ${i}`}
                  className="w-full h-full"
                  onError={(e) => (e.target.src = "/assets/default.jpg")}
                />
              </div>
            ))
          ) : (
            <img
              src="/assets/default.jpg"
              alt="Default"
              className="w-full h-[50vh] md:h-[75vh] object-cover"
            />
          )}
        </Slider>
      </div>

      {/* 🏗️ Details */}
      <div className="max-w-7xl mx-auto px-6 mt-8">
        <div className="md:flex justify-between items-start">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {project.title}
            </h1>
            <div className="flex items-center text-gray-500 mb-4">
              <HiOutlineLocationMarker
                size={18}
                className="mr-2 text-[#d3ac67]"
              />
              <span>{project.location || "Location not specified"}</span>
            </div>
          </div>

          {displayPrice && (
            <div className="mb-6 md:mb-8 text-right">
              <p className="text-gray-500 text-sm tracking-wide uppercase">
                Starting From
              </p>
              <h2 className="text-3xl md:text-5xl font-extrabold text-[#d4af6a] mt-1">
                {displayPrice}
              </h2>
            </div>
          )}
        </div>

        {project.fullDescription && (
          <div className="border-t border-gray-300 pt-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Description
            </h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {project.fullDescription}
            </p>
          </div>
        )}

        {videos.length > 0 && (
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b border-gray-300 pb-6">
              Latest Videos
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {videos.map((link, i) => (
                <div
                  key={i}
                  className="aspect-video rounded-xl overflow-hidden shadow-md"
                >
                  <video controls className="w-full h-full object-cover">
                    <source src={link} type="video/mp4" />
                  </video>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
