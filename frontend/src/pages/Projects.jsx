import React, { useEffect, useState } from "react";
import CTABanner from "./sections/CTABanner";
import { motion } from "framer-motion";
import { FloatingWhatsApp } from "react-floating-whatsapp";
import { Link } from "react-router-dom";
import api from "../api/apiBase.js";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get("/properties");
        console.log("✅ Projects API Response:", res.data);
        setProjects(res.data);
      } catch (err) {
        console.error("❌ Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  if (loading) return <p className="text-center py-10">Loading projects...</p>;

  const baseURL = api.defaults.baseURL.replace(/\/api\/?$/, "");

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
          Projects
        </h1>
      </section>

      {/* ✅ Projects Section */}
      <section className="py-16 bg-gradient-to-b from-[#f8f9fb] to-white">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
            {projects.map((p) => {
              const slug = p.slug || p.title?.toLowerCase().replace(/\s+/g, "-");

              // 🖼️ Image URL handling
              let imageUrl = "/d1.png";
              if (p.poster) {
                imageUrl = p.poster.startsWith("http")
                  ? p.poster
                  : `${baseURL}${p.poster.startsWith("/") ? "" : "/"}${p.poster}`;
              }

              return (
                <motion.div
                  key={p._id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 w-full sm:w-[45%] lg:w-[45%] bg-white"
                >
                  <Link to={`/projects/${slug}`}>
                    <img
                      src={imageUrl}
                      alt={p.title || "Project Poster"}
                      className="w-full h-[500px] transition-transform duration-500 hover:scale-105"
                      onError={(e) => (e.target.src = "/assets/default.jpg")}
                    />
                  </Link>
                  <div className="p-4 text-left flex flex-col justify-between h-[180px]">
                    <div>
                      <h3 className="text-xl font-semibold text-[#0b2135]">
                        {p.title}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1">
                        {p.shortDescription?.slice(0, 80)}...
                      </p>
                    </div>

                    {/* ✅ See More Details Button */}
                    <Link
                      to={`/projects/${slug}`}
                      className="inline-block mt-4 text-center px-5 py-2 rounded-full bg-[#0b2135] text-white font-medium hover:bg-[#173b5b] transition-all duration-300"
                    >
                      See More Details →
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ✅ CTA Banner */}
      <CTABanner />

      {/* ✅ WhatsApp Floating Button */}
      <FloatingWhatsApp
        phoneNumber="+917982481132"
        accountName="Genesisrealty"
        allowEsc
        allowClickAway
        notification
        notificationSound
        chatMessage="Hello 👋 How can we help you today?"
        avatar="/assets/logo.png"
      />
    </>
  );
}
