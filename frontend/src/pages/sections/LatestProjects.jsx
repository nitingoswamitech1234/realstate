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
          className="text-3xl md:text-4xl font-bold text-[#0b2135] mb-10"
        >
          Our Featured Projects
        </motion.h2>

        {/* ✅ Flex Layout */}
        <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
          {projects.map((p) => {
            const slug = p.slug || p.title?.toLowerCase().replace(/\s+/g, "-");

            let imageUrl = "/Designer1.png";
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
                className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 w-full sm:w-[45%] lg:w-[35%]"
              >
                <Link to={`/projects/${slug}`}>
                  <img
                    src={imageUrl}
                    alt={p.title || "Project Poster"}
                    className="w-full h-[500px] transition-transform duration-500 hover:scale-105"
                    onError={(e) => (e.target.src = "/assets/default.jpg")}
                  />
                </Link>
                <div className="p-4 text-left">
                  <h3 className="text-xl font-semibold text-[#0b2135]">
                    {p.title}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {p.shortDescription?.slice(0, 80)}...
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
