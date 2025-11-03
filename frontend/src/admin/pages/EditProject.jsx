import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../AdminLayout";
import api from "../../api/apiBase";

export default function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    image: [],
    video: [],
    poster: null, // 🆕 poster added
    title: "",
    shortDescription: "",
    fullDescription: "",
    salePrice: "",
    squareFeet: "",
    location: "",
    apartmentType: "",
  });

  // ✅ Fetch existing data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/properties/${id}`);
        const data = res.data.property || res.data;

        setForm({
          image: data.images || [],
          video: data.videos || [],
          poster: data.poster || null,
          title: data.title || "",
          shortDescription: data.shortDescription || "",
          fullDescription: data.fullDescription || "",
          salePrice: data.salePrice || "",
          squareFeet: data.squareFeet || "",
          location: data.location || "",
          apartmentType: data.apartmentType || "",
        });
      } catch (error) {
        console.error("❌ Error fetching project:", error);
        alert("Failed to load project details.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // ✅ Handle text change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // ✅ Handle file change
  const handleFileChange = (e) => {
    const { name, files } = e.target;

    if (name === "poster") {
      setForm({ ...form, poster: files[0] }); // 🆕 single poster file
    } else {
      setForm({ ...form, [name]: Array.from(files) });
    }
  };

  // ✅ Submit update form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      // 🟢 Poster
      if (form.poster instanceof File) {
        formData.append("poster", form.poster);
      }

      // 🟢 Images & Videos
      (form.image || []).forEach((img) => formData.append("image", img));
      (form.video || []).forEach((vid) => formData.append("video", vid));

      // 🟢 Text fields
      formData.append("title", form.title);
      formData.append("shortDescription", form.shortDescription);
      formData.append("fullDescription", form.fullDescription);
      formData.append("salePrice", form.salePrice);
      formData.append("squareFeet", form.squareFeet);
      formData.append("location", form.location);
      formData.append("apartmentType", form.apartmentType);

      await api.put(`/properties/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Project updated successfully!");
      navigate("/admin/project-list");
    } catch (error) {
      console.error("❌ Error updating project:", error);
      alert("Update failed! Check console for more info.");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 text-lg">Loading project...</p>
      </div>
    );

  return (
    <div className="flex flex-col md:flex-row bg-[#f9fafb] min-h-screen">
      <AdminLayout />

      <div className="flex-1 bg-white p-8">
        <h1 className="text-3xl font-bold text-[#252942] mb-6 border-b-2 border-[#d4af6a] pb-3">
          Edit Project
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* 🆕 🖼️ Poster Upload */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">
              Project Poster
            </label>
            <input
              type="file"
              name="poster"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50"
            />
            {form.poster && (
              <img
                src={
                  typeof form.poster === "string"
                    ? form.poster
                    : URL.createObjectURL(form.poster)
                }
                alt="poster preview"
                className="w-32 h-32 object-cover mt-3 rounded-lg border"
              />
            )}
          </div>

          {/* 🖼️ Image Upload */}
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
              className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50"
            />
            <div className="flex flex-wrap mt-2 gap-2">
              {form.image.map((img, i) => (
                <img
                  key={i}
                  src={typeof img === "string" ? img : URL.createObjectURL(img)}
                  alt="preview"
                  className="w-16 h-16 object-cover rounded border"
                />
              ))}
            </div>
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
              className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50"
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
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50"
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
              className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50"
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
              className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50"
            ></textarea>
          </div>

          {/* 🔘 Submit Button */}
          <div className="col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-[#252942] hover:bg-[#d4af6a] hover:text-[#252942] text-white font-semibold px-8 py-3 rounded-lg shadow-sm transition-all duration-300"
            >
              Update Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
