import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import api from "../../api/apiBase.js";

export default function LatestProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get("/properties");
        console.log("✅ API Response Data:", res.data);
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
    <section className="py-12 bg-gradient-to-b from-[#f8f9fb] to-white">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-[#0b2135] mb-6"
        >
          Our Featured Projects
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {projects.map((p, i) => {
            // ✅ Directly use slug from backend
            const slug = p.slug || p.title?.toLowerCase().replace(/\s+/g, "-");

            // ✅ Fix image URL
            let imageUrl = "/assets/default.jpg";
            if (p.images?.length > 0) {
              const raw = p.images[1];
              imageUrl = raw.startsWith("http")
                ? raw
                : `${baseURL}${raw.startsWith("/") ? "" : "/"}${raw}`;
            }

            return (
              <motion.div
                key={p._id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
              >
                <Link to={`/projects/${p.slug}`}>
                  <ProjectCard
                    title={p.title}
                    subtitle={p.shortDescription || "No description available"}
                    image={imageUrl}
                  />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ image, title, subtitle }) {
  const [imgSrc, setImgSrc] = useState(image);

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg overflow-hidden">
      <img
        src={imgSrc}
        alt={title}
        className="w-full h-72 transition-transform duration-500 hover:scale-105"
        onError={() => setImgSrc("/assets/default.jpg")}
      />
      <div className="p-5 text-left">
        <h3 className="text-lg font-semibold text-[#0b2135] mb-2">{title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">
          {subtitle.length > 150 ? subtitle.slice(0, 150) + "..." : subtitle}
        </p>
      </div>
    </div>
  );
}
