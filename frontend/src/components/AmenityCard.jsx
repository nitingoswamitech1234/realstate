import React from "react";
import { ArrowRight } from "lucide-react";

export default function AmenityCard({ icon, label }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group hover:bg-[#d3ac67]">
  {/* Icon Circle */}
  <div className="w-20 h-20 flex items-center justify-center bg-[#fef5e4] rounded-full mb-6 text-[#072a35] text-4xl transition-all duration-300 group-hover:bg-white group-hover:text-[#d3ac67]">
    {icon}
  </div>

  {/* Label */}
  <h3 className="text-[#0b2135] text-lg font-semibold mb-6 text-center transition-all duration-300 group-hover:text-white">
    {label}
  </h3>

  {/* Arrow Button */}
  <div className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-full shadow-sm transition-all duration-300 group-hover:bg-[#d3ac67] group-hover:text-white group-hover:border-white">
    <ArrowRight size={20} />
  </div>
</div>

  );
}
