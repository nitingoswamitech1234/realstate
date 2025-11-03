import React, { useState } from "react";
import AdminLayout from "../AdminLayout";
import api from "../../api/apiBase"; // 🟢 axios instance

export default function ProductInfo() {
  const [form, setForm] = useState({
    image: [],
    video: [],
    poster: null, // ✅ Added poster
    title: "",
    shortDescription: "",
    fullDescription: "",
    salePrice: "",
    squareFeet: "",
    location: "",
    apartmentType: "", // ✅ added
  });

  const [loading, setLoading] = useState(false);

  // 🟡 Handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // 🟢 Handle file inputs
  const handleFileChange = (e) => {
    const { name, files } = e.target;

    if (name === "poster") {
      setForm({ ...form, poster: files[0] }); // single file
    } else {
      setForm({ ...form, [name]: Array.from(files) });
    }
  };

  // 🟠 Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      (form.image || []).forEach((img) => formData.append("image", img));
      (form.video || []).forEach((vid) => formData.append("video", vid));
      if (form.poster) formData.append("poster", form.poster); // ✅ add poster

      formData.append("title", form.title);
      formData.append("shortDescription", form.shortDescription);
      formData.append("fullDescription", form.fullDescription);
      formData.append("salePrice", form.salePrice);
      formData.append("squareFeet", form.squareFeet);
      formData.append("location", form.location);
      formData.append("apartmentType", form.apartmentType);

      const response = await api.post("/properties", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("✅ API Response:", response.data);
      alert("Project added successfully!");

      // Reset form
      setForm({
        image: [],
        video: [],
        poster: null,
        title: "",
        shortDescription: "",
        fullDescription: "",
        salePrice: "",
        squareFeet: "",
        location: "",
        apartmentType: "",
      });
    } catch (error) {
      console.error("❌ Error adding project:", error.response || error);
      alert("Error while saving project!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-[#f9fafb] min-h-screen">
      <AdminLayout />

      <div className="flex-1 bg-white p-8">
        <h1 className="text-3xl font-bold text-[#252942] mb-6 border-b-2 border-[#d4af6a] pb-3">
          Add Project Details
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* 🖼️ Poster Upload (Single) */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">
              Upload Poster Image
            </label>
            <input
              type="file"
              name="poster"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 
              text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#d4af6a]"
            />
          </div>

          {/* 🖼️ Multiple Images Upload */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">
              Upload Images
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 
              text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#d4af6a]"
            />
          </div>

          {/* 🎥 Video Upload */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">
              Upload Videos
            </label>
            <input
              type="file"
              name="video"
              accept="video/*"
              multiple
              onChange={handleFileChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 
              text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#d4af6a]"
            />
          </div>

          {/* 🏷️ Text Inputs */}
          {["title", "shortDescription", "salePrice", "squareFeet", "location"].map(
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
                  text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#d4af6a]"
                />
              </div>
            )
          )}

          {/* 🏢 Apartment Type Dropdown */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">
              Apartment Type
            </label>
            <select
              name="apartmentType"
              value={form.apartmentType}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 
              text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#d4af6a]"
            >
              <option value="">Select Apartment Type</option>
              <option value="Residential Apartment">Residential Apartment</option>
              <option value="Cyberpark Corporate Suite">Cyberpark Corporate Suite</option>
            </select>
          </div>

          {/* 📝 Full Description */}
          <div className="col-span-2 flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">
              Full Description
            </label>
            <textarea
              name="fullDescription"
              value={form.fullDescription}
              onChange={handleChange}
              rows="6"
              placeholder="Enter full project details"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 
              text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#d4af6a]"
            ></textarea>
          </div>

          {/* 🔘 Submit Button */}
          <div className="col-span-2 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`${
                loading ? "bg-gray-400" : "bg-[#252942] hover:bg-[#d4af6a]"
              } text-white font-semibold px-8 py-3 rounded-lg shadow-sm transition-all duration-300`}
            >
              {loading ? "Saving..." : "Save Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
