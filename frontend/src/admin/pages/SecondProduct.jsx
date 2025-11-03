import React, { useState } from "react";
import AdminLayout from "../AdminLayout";

export default function ProductSecond() {
  const [form, setForm] = useState({
    image: "",
    title: "",
    shortDescription: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product Data:", form);
    alert("Product saved successfully!");
  };

  return (
    <div className="flex flex-col md:flex-row bg-[#f9fafb] min-h-screen">
      {/* Sidebar */}
      <AdminLayout />

      {/* Main Content */}
      <div className="flex-1 bg-white p-8">
        <h1 className="text-3xl font-bold text-[#252942] mb-6 border-b-2 border-[#d4af6a] pb-3">
          Second Project
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Image Upload */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">
              Upload Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 
              text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 
              focus:ring-[#d4af6a] focus:border-[#d4af6a] transition-all"
            />
          </div>

          {/* Other Fields */}
          {["title", "shortDescription",].map(
            (key) => (
              <div key={key} className="flex flex-col">
                <label className="text-sm font-semibold text-gray-700 mb-2 capitalize">
                  {key.replace(/([A-Z])/g, " $1")}
                </label>
                <input
                  name={key}
                  value={form[key]}
                  onChange={handleChange}
                  placeholder={`Enter ${key.replace(/([A-Z])/g, " $1")}`}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 
                  text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 
                  focus:ring-[#d4af6a] focus:border-[#d4af6a] transition-all"
                />
              </div>
            )
          )}
          

          {/* Submit Button */}
          <div className="col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-[#252942] hover:bg-[#d4af6a] hover:text-[#252942] text-white font-semibold 
              px-8 py-3 rounded-lg shadow-sm transition-all duration-300 transform hover:scale-[1.03]"
            >
              Save Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
