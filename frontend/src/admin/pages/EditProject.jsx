import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../AdminLayout";
import api from "../../api/apiBase"; // ✅ correct import

export default function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    images: [],
    videos: [],
    title: "",
    shortDescription: "",
    fullDescription: "",
    salePrice: "",
    squareFeet: "",
    location: "",
  });

  // ✅ Fetch product by ID
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/properties/${id}`); // ✅ lowercase api
        const data = res.data.property || res.data;

        setForm({
          images: data.images || [],
          videos: data.videos || [],
          title: data.title || "",
          shortDescription: data.shortDescription || "",
          fullDescription: data.fullDescription || "",
          salePrice: data.salePrice || "",
          squareFeet: data.squareFeet || "",
          location: data.location || "",
        });
      } catch (error) {
        console.error("❌ Error fetching product:", error);
        alert("Failed to fetch product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // ✅ Handle form changes
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setForm({ ...form, [name]: Array.from(files) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // ✅ Handle update (PUT request)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("shortDescription", form.shortDescription);
      formData.append("fullDescription", form.fullDescription);
      formData.append("salePrice", form.salePrice);
      formData.append("squareFeet", form.squareFeet);
      formData.append("location", form.location);

      form.images.forEach((file) => formData.append("images", file));
      form.videos.forEach((file) => formData.append("videos", file));

      await api.put(`/properties/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Project updated successfully!");
      navigate("/admin/project-list");
    } catch (error) {
      console.error("❌ Error updating product:", error);
      alert("Failed to update product. Check console for details.");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 text-lg">Loading product data...</p>
      </div>
    );

  return (
    <div className="flex flex-col md:flex-row bg-[#f9fafb] min-h-screen">
      <AdminLayout />

      {/* ✅ Main Content */}
      <div className="flex-1 bg-white p-8">
        <h1 className="text-3xl font-bold text-[#252942] mb-6 border-b-2 border-[#d4af6a] pb-3">
          Edit Project
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Images */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">
              Upload Images (Multiple)
            </label>
            <input
              type="file"
              name="images"
              accept="image/*"
              multiple
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50"
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {form.images.map((img, i) => (
                <img
                  key={i}
                  src={typeof img === "string" ? img : URL.createObjectURL(img)}
                  alt="preview"
                  className="w-16 h-16 object-cover rounded border"
                />
              ))}
            </div>
          </div>

          {/* Videos */}
          <div className="flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">
              Upload Videos (Multiple)
            </label>
            <input
              type="file"
              name="videos"
              accept="video/*"
              multiple
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50"
            />
          </div>

          {/* Text Inputs */}
          {[
            "title",
            "shortDescription",
            "salePrice",
            "squareFeet",
            "location",
          ].map((key) => (
            <div key={key} className="flex flex-col">
              <label className="text-sm font-semibold text-gray-700 mb-2 capitalize">
                {key.replace(/([A-Z])/g, " $1")}
              </label>
              <input
                name={key}
                value={form[key]}
                onChange={handleChange}
                placeholder={`Enter ${key}`}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 
                focus:outline-none focus:ring-2 focus:ring-[#d4af6a]"
              />
            </div>
          ))}

          {/* Full Description */}
          <div className="col-span-2 flex flex-col">
            <label className="text-sm font-semibold text-gray-700 mb-2">
              Full Description
            </label>
            <textarea
              name="fullDescription"
              value={form.fullDescription}
              onChange={handleChange}
              rows="5"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 
              focus:outline-none focus:ring-2 focus:ring-[#d4af6a]"
            />
          </div>

          {/* Submit */}
          <div className="col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-[#252942] hover:bg-[#d4af6a] hover:text-[#252942] text-white font-semibold 
              px-8 py-3 rounded-lg shadow-sm transition-all duration-300 transform hover:scale-[1.03]"
            >
              Update Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
