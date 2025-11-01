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

  const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const staggerContainer = {
    show: {
      transition: { staggerChildren: 0.2 },
    },
  };

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
      <section className="py-16 bg-gradient-to-b from-[#f8f9fb] to-white overflow-hidden">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto"
          >
            {projects.map((p, i) => {
              const slug = p.slug || p.title?.toLowerCase().replace(/\s+/g, "-");

              let imageUrl = "/assets/default.jpg";
              if (p.images?.length > 0) {
                const raw = p.images[0];
                imageUrl = raw.startsWith("http")
                  ? raw
                  : `${baseURL}${raw.startsWith("/") ? "" : "/"}${raw}`;
              }

              return (
                <motion.div
                  key={p._id}
                  variants={fadeUp}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link to={`/projects/${slug}`}>
                    <ProjectCard
                      image={imageUrl}
                      title={p.title}
                      subtitle={p.shortDescription || "No description available"}
                    />
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ✅ CTA Banner */}
      <CTABanner />

      {/* WhatsApp Integration */}
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

function ProjectCard({ image, title, subtitle }) {
  const [imgSrc, setImgSrc] = useState(image);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="relative overflow-hidden">
        <img
          src={imgSrc}
          alt={title}
          className="w-full h-[400px] object-cover transform transition-transform duration-500 hover:scale-110"
          onError={() => setImgSrc("/assets/default.jpg")}
        />
      </div>
      <div className="p-6 text-left">
        <h3 className="text-xl font-bold text-[#0b2135] transition-colors duration-300 hover:text-[#d3ac67]">
          {title}
        </h3>
        <p className="text-sm text-gray-600 mt-3 leading-relaxed">
          {subtitle.length > 150 ? subtitle.slice(0, 150) + "..." : subtitle}
        </p>
      </div>
    </div>
  );
}
