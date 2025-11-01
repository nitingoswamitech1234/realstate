import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MoreVertical } from "lucide-react"; // for 3-dot icon
import AdminLayout from "../AdminLayout";
import api from "../../api/apiBase";

export default function ProductList() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [openMenu, setOpenMenu] = useState(null);

  // ✅ Fetch data
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/properties");
      console.log("✅ Products fetched:", res.data);
      if (Array.isArray(res.data)) {
        setProducts(res.data);
      } else {
        console.error("Unexpected response:", res.data);
      }
    } catch (err) {
      console.error("❌ Error fetching products:", err);
    }
  };

  // ✅ Delete product by ID
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await api.delete(`/properties/${id}`);
      alert("✅ Product deleted successfully!");
      fetchProducts();
    } catch (err) {
      console.error("❌ Delete failed:", err);
      alert("Failed to delete product.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-[#f9fafb] min-h-screen">
      <AdminLayout />

      <div className="flex-1 bg-white p-8 relative">
        <h1 className="text-3xl font-bold text-[#252942] mb-6 border-b-2 border-[#d4af6a] pb-3">
          Projects List
        </h1>

        {products.length === 0 ? (
          <div className="bg-white shadow-md rounded-lg p-6 text-center text-gray-600">
            No Projects found.
          </div>
        ) : (
          <div className="overflow-x-auto bg-white shadow-md rounded-xl border border-gray-200">
            <table className="min-w-full text-sm">
              <thead className="bg-[#252942] text-white">
                <tr>
                  <th className="p-4 text-left">#</th>
                  <th className="p-4 text-left">Image</th>
                  <th className="p-4 text-left">Title</th>
                  <th className="p-4 text-left">Sale Price</th>
                  <th className="p-4 text-left">Location</th>
                  <th className="p-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item, index) => (
                  <tr
                    key={item._id}
                    className="border-b hover:bg-[#f9f6f1] transition-all duration-200"
                  >
                    <td className="p-4 font-medium text-gray-700">{index + 1}</td>
                    <td className="p-4">
                      {item.images?.length > 0 ? (
                        <img
                          src={item.images[0]}
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded-lg border border-gray-300"
                        />
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="p-4 font-semibold text-gray-800">
                      {item.title || "-"}
                    </td>
                    <td className="p-4 text-[#252942] font-medium">
                      {item.salePrice ? `₹ ${item.salePrice}` : "-"}
                    </td>
                    <td className="p-4 text-gray-700">{item.location || "-"}</td>

                    {/* Actions */}
                    <td className="relative p-4">
                      <button
                        onClick={() =>
                          setOpenMenu(openMenu === item._id ? null : item._id)
                        }
                        className="p-2 rounded-full hover:bg-gray-100"
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>

                      {openMenu === item._id && (
                        <div className="absolute bg-white shadow-md border rounded-md right-4 top-10 w-32 z-10">
                          <button
                            onClick={() => navigate(`/admin/edit-project/${item._id}`)}
                            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
