import React, { useState } from "react";
import AdminLayout from "../AdminLayout";
import api from "../../api/apiBase"; // 🟢 common axios instance (like we made for login)

export default function ProductInfo() {
  const [form, setForm] = useState({
    image: [],
    video: [],
    title: "",
    shortDescription: "",
    fullDescription: "",
    salePrice: "",
    squareFeet: "",
    location: "",
  });

  const [loading, setLoading] = useState(false);

  // 🟡 Handle change for text fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // 🟢 Handle file uploads (multiple)
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setForm({ ...form, [name]: Array.from(files) });
  };

  // 🟠 Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      (form.image || []).forEach((img) => formData.append("image", img));
      (form.video || []).forEach((vid) => formData.append("video", vid));

      formData.append("title", form.title);
      formData.append("shortDescription", form.shortDescription);
      formData.append("fullDescription", form.fullDescription);
      formData.append("salePrice", form.salePrice);
      formData.append("squareFeet", form.squareFeet);
      formData.append("location", form.location);

      // Debugging: print all keys to confirm
      for (let [key, val] of formData.entries()) {
        console.log(`${key}:`, val);
      }

      const response = await api.post("/properties", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("✅ API Response:", response.data);
      alert("Project added successfully!");

      // Reset form
      setForm({
        image: [],
        video: [],
        title: "",
        shortDescription: "",
        fullDescription: "",
        salePrice: "",
        location: "",
      });
    } catch (error) {
      console.error("❌ Error adding product:", error.response || error);
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
          {/* Multiple Image Upload */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">
              Upload Images
            </label>
            <input
              type="file"
              name="image" // ✅ backend expects "image"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 
              text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#d4af6a] transition-all"
            />
          </div>

          {/* Multiple Video Upload */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">
              Upload Videos
            </label>
            <input
              type="file"
              name="video" // ✅ backend expects "video"
              accept="video/*"
              multiple
              onChange={handleFileChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 
              text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#d4af6a] transition-all"
            />
          </div>

          {/* Other Fields */}
          {["title", "shortDescription", "salePrice", "location"].map(
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
                  text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#d4af6a] transition-all"
                />
              </div>
            )
          )}

          {/* Full Description */}
          <div className="col-span-2 flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">
              Full Description
            </label>
            <textarea
              name="fullDescription"
              value={form.fullDescription}
              onChange={handleChange}
              rows="6"
              placeholder="Enter full details"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 
              text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#d4af6a] transition-all"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="col-span-2 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`${
                loading ? "bg-gray-400" : "bg-[#252942] hover:bg-[#d4af6a] transition-all"
              } text-white font-semibold px-8 py-3 rounded-lg shadow-sm duration-300`}
            >
              {loading ? "Saving..." : "Save Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
