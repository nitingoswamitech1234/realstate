import React, { useState, useEffect } from "react";
import AdminLayout from "../AdminLayout";
import api from "../../api/apiBase.js"; // 👈 import your axios instance

export default function EnquiryList() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch enquiries from backend
  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const res = await api.get("/form"); // 👈 your backend route
        console.log("✅ Enquiries fetched:", res.data);
        setEnquiries(res.data); // assuming res.data = array of enquiries
      } catch (error) {
        console.error("❌ Error fetching enquiries:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEnquiries();
  }, []);

  // ✅ CSV download
  const downloadCSV = () => {
    const csv = [
      ["Name", "Phone", "City", "Message"],
      ...enquiries.map((e) => [e.name, e.phone, e.city, e.message]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "enquiries.csv";
    a.click();
  };

  return (
    <div className="flex flex-col md:flex-row bg-[#f9fafb] min-h-screen">
      {/* Sidebar */}
      <AdminLayout />

      {/* Main Content */}
      <div className="flex-1 bg-white p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 border-b-2 border-[#d4af6a] pb-3">
          <h1 className="text-3xl font-bold text-[#252942] mb-4 md:mb-0">
            Enquiry Form List
          </h1>
          <button
            onClick={downloadCSV}
            className="bg-[#252942] hover:bg-[#d4af6a] hover:text-[#252942] text-white font-medium px-6 py-2 rounded-lg shadow-md transition-all duration-300"
          >
            Download CSV
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-xl border border-gray-200 shadow-md">
          {loading ? (
            <p className="text-center py-10 text-gray-500 font-medium">
              Loading enquiries...
            </p>
          ) : enquiries.length > 0 ? (
            <table className="min-w-full text-left text-sm text-gray-700">
              <thead className="bg-[#252942] text-white uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-semibold">Name</th>
                  <th className="px-6 py-4 font-semibold">Phone</th>
                  <th className="px-6 py-4 font-semibold">City</th>
                  <th className="px-6 py-4 font-semibold">Message</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map((e, i) => (
                  <tr
                    key={i}
                    className={`transition-all duration-200 ${
                      i % 2 === 0 ? "bg-[#f9f6f1]" : "bg-white"
                    } hover:bg-[#f0e7d6]`}
                  >
                    <td className="px-6 py-4 border-t border-gray-200 text-[#252942] font-medium">
                      {e.name}
                    </td>
                    <td className="px-6 py-4 border-t border-gray-200 text-[#252942]">
                      {e.phone}
                    </td>
                    <td className="px-6 py-4 border-t border-gray-200 text-[#252942]">
                      {e.city}
                    </td>
                    <td className="px-6 py-4 border-t border-gray-200 text-gray-700">
                      {e.message}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center py-10 text-gray-500 font-medium">
              No enquiries found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
