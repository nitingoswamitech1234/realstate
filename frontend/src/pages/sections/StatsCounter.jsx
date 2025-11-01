import React, { useEffect, useState } from "react";
import { Ruler, Building2, Hammer, Armchair } from "lucide-react";

const statsData = [
  { id: 1, icon: <Ruler size={60} color="#ff4f32" />, end: 560, label: "Total Area Sq" },
  { id: 2, icon: <Building2 size={60} color="#ff4f32" />, end: 197, suffix: "K", label: "Apartments Sold" },
  { id: 3, icon: <Hammer size={60} color="#ff4f32" />, end: 268, label: "Total Constructions" },
  { id: 4, icon: <Armchair size={60} color="#ff4f32" />, end: 340, label: "Apartio Rooms" },
];

export default function StatsCounter() {
  const [counts, setCounts] = useState(statsData.map(() => 0));

  useEffect(() => {
    const intervals = statsData.map((stat, i) => {
      let start = 0;
      const duration = 3000; // 2 seconds
      const stepTime = Math.abs(Math.floor(duration / stat.end));
      const interval = setInterval(() => {
        start += 1;
        if (start >= stat.end) {
          clearInterval(interval);
          start = stat.end;
        }
        setCounts((prev) => {
          const newCounts = [...prev];
          newCounts[i] = start;
          return newCounts;
        });
      }, stepTime);
      return interval;
    });
    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <section className="bg-[#f5f9fa] py-16">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
        {statsData.map((stat, i) => (
          <div key={stat.id} className="flex flex-col items-center space-y-4">
            {stat.icon}
            <h3 className="text-3xl font-extrabold text-[#0b2135]">
              {counts[i]}
              {stat.suffix || ""}+
            </h3>
            <p className="text-gray-600 text-sm md:text-base">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
