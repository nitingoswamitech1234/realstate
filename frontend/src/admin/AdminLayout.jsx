import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function AdminLayout() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex bg-[#f4f6fa]">
      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-full md:w-64 bg-[#252942] text-white transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex items-center justify-between px-6 py-5 md:p-6 border-b-2 border-[#d4af6a] pb-3">
          {/* <h2 className="text-xl font-bold tracking-wide text-[#d4af6a]">
            Admin Panel
          </h2> */}
            <img src="/assets/genesis-logo.png" alt="genesis-logo" width="180px" />
          {/* Close Button (Mobile) */}
          <button
            className="md:hidden text-white hover:text-[#d4af6a]"
            onClick={() => setIsOpen(false)}
          >
            <X size={22} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">

          {/* <NavLink
            to="/admin/first-project"
            className={({ isActive }) =>
              `block py-2.5 px-4 rounded-lg font-medium ${
                isActive
                  ? "bg-[#d4af6a] text-[#252942]"
                  : "text-gray-300 hover:bg-[#3a3e5b]"
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            First Project
          </NavLink>

          <NavLink
            to="/admin/second-project"
            className={({ isActive }) =>
              `block py-2.5 px-4 rounded-lg font-medium ${
                isActive
                  ? "bg-[#d4af6a] text-[#252942]"
                  : "text-gray-300 hover:bg-[#3a3e5b]"
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            Second Project
          </NavLink>           */}

          <NavLink
            to="/admin/project"
            className={({ isActive }) =>
              `block py-2.5 px-4 rounded-lg font-medium ${
                isActive
                  ? "bg-[#d4af6a] text-[#252942]"
                  : "text-gray-300 hover:bg-[#3a3e5b]"
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            Projects Detail
          </NavLink>        

          <NavLink
            to="/admin/project-list"
            className={({ isActive }) =>
              `block py-2.5 px-4 rounded-lg font-medium ${
                isActive
                  ? "bg-[#d4af6a] text-[#252942]"
                  : "text-gray-300 hover:bg-[#3a3e5b]"
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            Projects List
          </NavLink>          

          <NavLink
            to="/admin/enquiries"
            className={({ isActive }) =>
              `block py-2.5 px-4 rounded-lg font-medium ${
                isActive
                  ? "bg-[#d4af6a] text-[#252942]"
                  : "text-gray-300 hover:bg-[#3a3e5b]"
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            Enquiry List
          </NavLink>

          <NavLink
            to="/login"
            className={({ isActive }) =>
              `block py-2.5 px-4 rounded-lg font-medium ${
                isActive
                  ? "bg-[#d4af6a] text-[#252942]"
                  : "text-gray-300 hover:bg-[#3a3e5b]"
              }`
            }
            onClick={() => setIsOpen(false)}
          >
            Logout
          </NavLink>
          
        </nav>
      </aside>

      {/* Top Bar for Mobile */}
      <header className="md:hidden flex items-center justify-between w-full bg-[#252942] text-white px-4 py-4 shadow-md">
        <button onClick={() => setIsOpen(true)} className="hover:text-[#d4af6a]">
          <Menu size={24} />
        </button>
        <h1 className="text-lg font-semibold text-[#d4af6a]"></h1>
        <div className="w-6"></div> {/* Empty for layout balance */}
      </header>

    </div>
  );
}
