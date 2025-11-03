import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import API from "../api/apiBase.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ProjectDetail() {
  const { slug } = useParams();
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

  const makeFullUrl = (filePath) => {
    if (!filePath) return "/assets/default.jpg";
    if (filePath.startsWith("http")) return filePath;
    return `${API.defaults.baseURL.replace(/\/api\/?$/, "")}${filePath.startsWith("/") ? "" : "/"
      }${filePath}`;
  };

  const sliderImages = project.images?.map((img) => makeFullUrl(img)) || [];
  const videos = project.videos?.map((vid) => makeFullUrl(vid)) || [];
  const posterUrl = project.poster ? makeFullUrl(project.poster) : "/assets/default.jpg";

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
      {/* 🖼️ Image Slider */}
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
              className="w-full h-[50vh] md:h-[75vh]"
            />
          )}
        </Slider>
      </div>

      {/* 🏠 Project Details */}
      <div className="max-w-7xl mx-auto px-6 mt-10">
        {/* Title & Location */}
        <div className="text-center md:text-left mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            {project.title}
          </h1>
          <div className="flex items-center justify-center md:justify-start text-gray-600">
            <HiOutlineLocationMarker size={20} className="mr-2 text-[#d3ac67]" />
            <span className="text-lg">
              {project.location || "Location not specified"}
            </span>
          </div>
        </div>

        {/* ✅ Flex Layout Section */}
        <div className="flex flex-col  md:flex-row gap-10 items-center">
          {/* Left Poster */}
          <div className="md:w-[40%] rounded-2xl overflow-hidden shadow-lg">
            <img
              src={posterUrl}
              alt="Project Poster"
              className="w-full h-[650px]"
              onError={(e) => (e.target.src = "/assets/default.jpg")}
            />
          </div>

          {/* Right Content */}
          <div className="md:w-1/2 flex flex-col space-y-6">
            {displayPrice && (
              <div>
                <p className="text-gray-500 text-sm tracking-wide uppercase mb-2">
                  Starting From
                </p>
                <h2 className="text-4xl font-extrabold text-[#d4af6a]">
                  {displayPrice}
                </h2>
              </div>
            )}

            {project.fullDescription && (
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                  Project Overview
                </h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {project.fullDescription}
                </p>
              </div>
            )}

            <div className="border-t border-gray-300 pt-4 space-y-1">
              <p className="text-gray-600 text-sm">
                <span className="font-medium text-gray-800">Apartment Type:</span>{" "}
                {project.apartmentType || "N/A"}
              </p>
              <p className="text-yellow-600 text-sm">
                <span className="font-medium text-gray-800">Square Feet:</span>{" "}
                {project.squareFeet || "N/A"}
              </p>
              {/* <p className="text-gray-600 text-sm">
                <span className="font-medium text-gray-800">Description:</span>{" "}
                {project.
                  fullDescription
                  || "N/A"}
              </p> */}
            </div>
          </div>
        </div>

        {/* 🎥 Videos */}
        {videos.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b border-gray-300 pb-4">
              Project Videos
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

      {/* 🏗️ ABOUT SECTION */}
      {project.title === "Jain X Cyber City" && (
        <>
          <section className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
              {/* 🖋️ Left - Text Content */}
              <div className="md:w-1/2 space-y-6">
                <h2 className="text-3xl font-bold text-[#0b2135] mb-3">About</h2>
                <h3 className="text-2xl font-semibold text-[#d4af6a] mb-4">
                  Jain X Cyber City Park
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Jain X Cyber City Park is a landmark 25-acre mixed-use development in
                  Greater Noida, designed to redefine modern urban living. With a blend
                  of IT Parks, Premium Residences, and High-Street Commercial, it’s set to
                  become the future hub for work, leisure, and lifestyle.
                </p>
              </div>

              {/* 🖼️ Right - About Image (Static) */}
              <div className="md:w-1/2">
                <img
                  src="/j1.png"
                  alt="About Project"
                  className="rounded-2xl shadow-lg w-full h-[400px] object-cover"
                  onError={(e) => (e.target.src = '/assets/default.jpg')}
                />
              </div>
            </div>
          </section>

          {/* 🏙️ PROJECT INTRODUCTION SECTION */}
          <section className="bg-[#f8f9fb] py-16">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row-reverse items-center gap-10">
              {/* 🖋️ Right - Text Content */}
              <div className="md:w-1/2 space-y-6">
                <h2 className="text-3xl font-bold text-[#0b2135] mb-3">Project Introduction</h2>
                <ul className="text-gray-600 leading-relaxed space-y-2 list-disc list-inside">
                  <li><strong>Project Name:</strong> Jain X Cyber City Park</li>
                  <li><strong>Location:</strong> Greater Noida (Sector 5)</li>
                  <li><strong>Total Area:</strong> 25 Acres</li>
                  <li><strong>Development Mix:</strong> IT Park | Residential | Commercial</li>
                  <li>
                    <strong>Concept:</strong> A landmark destination for work, life & leisure.
                  </li>
                </ul>
              </div>

              {/* 🖼️ Left - Introduction Image (Static) */}
              <div className="md:w-1/2">
                <img
                  src="/j2.png"
                  alt="Project Introduction"
                  className="rounded-2xl shadow-lg w-full h-[400px] object-cover"
                  onError={(e) => (e.target.src = '/assets/default.jpg')}
                />
              </div>
            </div>
          </section>

          {/* 🏗️ MASTER PLAN SECTION */}
          <section className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
              {/* Left - Text */}
              <div className="md:w-1/2 space-y-6">
                <h2 className="text-3xl font-bold text-[#0b2135] mb-3">Master Plan Concept</h2>
                <ul className="text-gray-600 leading-relaxed space-y-2 list-disc list-inside">
                  <li>Thoughtfully designed integrated ecosystem</li>
                  <li>Seamless zoning: IT Towers | Residential Blocks | Retail Spaces</li>
                  <li>Landscaped greens with lakeside promenades</li>
                  <li>A community where business, living & entertainment converge</li>
                </ul>
              </div>

              {/* Right - Image */}
              <div className="md:w-1/2">
                <img
                  src="/j3.png"
                  alt="Master Plan"
                  className="rounded-2xl shadow-lg w-full h-[400px] object-cover"
                />
              </div>
            </div>
          </section>

          {/* 🏡 RESIDENTIAL ZONE SECTION */}
          <section className="bg-[#f8f9fb] py-16">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row-reverse items-center gap-10">
              <div className="md:w-1/2 space-y-6">
                <h2 className="text-3xl font-bold text-[#0b2135] mb-3">Residential Zone</h2>
                <ul className="text-gray-600 leading-relaxed space-y-2 list-disc list-inside">
                  <li>Premium 3BHK & 4BHK apartments</li>
                  <li>Spacious layouts with modern interiors</li>
                  <li>Clubhouse, gym, swimming pool, kids’ play area</li>
                  <li>24x7 gated security, ample parking</li>
                  <li>Designed for families seeking luxury & convenience</li>
                </ul>
              </div>

              <div className="md:w-1/2">
                <img
                  src="/j4.png"
                  alt="Residential Zone"
                  className="rounded-2xl shadow-lg w-full h-[400px] object-cover"
                />
              </div>
            </div>
          </section>

          {/* 💼 IT PARK ZONE SECTION */}
          <section className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
              <div className="md:w-1/2 space-y-6">
                <h2 className="text-3xl font-bold text-[#0b2135] mb-3">IT Park Zone</h2>
                <ul className="text-gray-600 leading-relaxed space-y-2 list-disc list-inside">
                  <li>Grade A office spaces with flexible layouts</li>
                  <li>Smart infrastructure: high-speed internet, power backup</li>
                  <li>Business lounges, conference facilities, food courts</li>
                  <li>Designed for startups, MNCs & IT giants</li>
                  <li>A hub for productivity & innovation</li>
                </ul>
              </div>

              <div className="md:w-1/2">
                <img
                  src="/j5.png"
                  alt="IT Park Zone"
                  className="rounded-2xl shadow-lg w-full h-[400px] object-cover"
                />
              </div>
            </div>
          </section>

          {/* 🏬 COMMERCIAL ZONE SECTION */}
          <section className="bg-[#f8f9fb] py-16">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row-reverse items-center gap-10">
              <div className="md:w-1/2 space-y-6">
                <h2 className="text-3xl font-bold text-[#0b2135] mb-3">Commercial Zone</h2>
                <ul className="text-gray-600 leading-relaxed space-y-2 list-disc list-inside">
                  <li>High-street retail & lifestyle promenade</li>
                  <li>Cafés, restaurants, multiplex, entertainment hub</li>
                  <li>Convenience shopping & daily essentials</li>
                  <li>A vibrant destination for residents & visitors</li>
                </ul>
              </div>

              <div className="md:w-1/2">
                <img
                  src="/j6.png"
                  alt="Commercial Zone"
                  className="rounded-2xl shadow-lg w-full h-[400px] object-cover"
                />
              </div>
            </div>
          </section>

          {/* 🌿 AMENITIES SECTION */}
          <section className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
              <div className="md:w-1/2 space-y-6">
                <h2 className="text-3xl font-bold text-[#0b2135] mb-3">Amenities & Lifestyle</h2>
                <ul className="text-gray-600 leading-relaxed space-y-2 list-disc list-inside">
                  <li>Clubhouse & Wellness Centre</li>
                  <li>Yoga decks & jogging tracks</li>
                  <li>Amphitheatre, sports courts, golf simulator</li>
                  <li>EV charging stations & smart parking</li>
                  <li>Designed for a holistic living experience</li>
                </ul>
              </div>

              <div className="md:w-1/2">
                <img
                  src="/j7.png"
                  alt="Amenities"
                  className="rounded-2xl shadow-lg w-full h-[400px] object-cover"
                />
              </div>
            </div>
          </section>

          {/* 🌱 GREEN & SMART FEATURES */}
          <section className="bg-[#f8f9fb] py-16">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row-reverse items-center gap-10">
              <div className="md:w-1/2 space-y-6">
                <h2 className="text-3xl font-bold text-[#0b2135] mb-3">Green & Smart Features</h2>
                <ul className="text-gray-600 leading-relaxed space-y-2 list-disc list-inside">
                  <li>25% open green area</li>
                  <li>Rainwater harvesting, solar energy utilization</li>
                  <li>AQI-controlled environment</li>
                  <li>Smart digital access & home automation</li>
                  <li>Promoting sustainable & healthy living</li>
                </ul>
              </div>

              <div className="md:w-1/2">
                <img
                  src="/j8.png"
                  alt="Green Features"
                  className="rounded-2xl shadow-lg w-full h-[400px] object-cover"
                />
              </div>
            </div>
          </section>

          {/* 🚉 CONNECTIVITY SECTION */}
          <section className="bg-white py-16">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
              <div className="md:w-1/2 space-y-6">
                <h2 className="text-3xl font-bold text-[#0b2135] mb-3">Connectivity & Location Advantage</h2>
                <ul className="text-gray-600 leading-relaxed space-y-2 list-disc list-inside">
                  <li>Well-connected to Noida Expressway & Metro</li>
                  <li>7 km to the airport, 6 km to the railway station</li>
                  <li>Schools, hospitals & retail nearby</li>
                  <li>Located in Greater Noida’s fastest-growing sector</li>
                </ul>
              </div>

              <div className="md:w-1/2">
                <img
                  src="/j9.png"
                  alt="Connectivity"
                  className="rounded-2xl shadow-lg w-full h-[400px] object-cover"
                />
              </div>
            </div>
          </section>

          {/* 💰 INVESTMENT EDGE SECTION */}
          <section className="bg-[#f8f9fb] py-16">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row-reverse items-center gap-10">
              <div className="md:w-1/2 space-y-6">
                <h2 className="text-3xl font-bold text-[#0b2135] mb-3">Investment Edge</h2>
                <ul className="text-gray-600 leading-relaxed space-y-2 list-disc list-inside">
                  <li>Mixed-use advantage: IT + Residential + Commercial</li>
                  <li>Potential for high rental yields from offices & retail</li>
                  <li>Growing demand in Greater Noida Sector 5</li>
                  <li>Perfect for investors & end-users</li>
                </ul>
              </div>

              <div className="md:w-1/2">
                <img
                  src="/j10.png"
                  alt="Investment Edge"
                  className="rounded-2xl shadow-lg w-full h-[400px] object-cover"
                />
              </div>
            </div>
          </section>
          <section className="bg-[#f8f9fb] py-16 flex items-center justify-center ">
            <img src="/j12.png" alt="" />

          </section>
          <section className="bg-white py-16 flex items-center justify-center ">
            <img src="/j11.png" alt="" />

          </section>
          <section className="bg-white py-16 flex items-center justify-center ">
            <img src="/j16.png" alt="" />

          </section>
          <section className="bg-white py-16 flex items-center justify-center ">
            <img src="/j14.png" alt="" />

          </section>
          <section className="bg-white py-16 flex items-center justify-center ">
            <img src="/j15.png" alt="" />

          </section>
        </>
      )}





    </section>
  );
}
