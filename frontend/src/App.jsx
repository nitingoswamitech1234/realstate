import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import ProjectOne from "./pages/ProjectDetail.jsx";
import ProjectTwo from "./pages/ProjectTwo";
import Login from "./admin/pages/Login";
import ProductInfo from "./admin/pages/ProductInfo";
// import FirstProduct from "./admin/pages/FirstProduct";
// import SecondProduct from "./admin/pages/SecondProduct";
import ProductList from "./admin/pages/ProductList";
import EnquiryList from "./admin/pages/EnquiryList";
import EditProject from "./admin/pages/EditProject";
import LatestProjects from "./pages/sections/LatestProjects.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";
import { Scroll } from "lucide-react";
import ScrollToTop from "./ScrollToTop.jsx";


export default function App() {
  const location = useLocation();

  // ✅ All admin base routes
  const adminPaths = [
    "/login",
    "/admin/project",
    // "/admin/first-project",
    // "/admin/second-project",
    "/admin/project-list",
    "/admin/enquiries",
  ];

  // ✅ Detect if current route starts with /admin
  const isAdminRoute =
    location.pathname.startsWith("/admin") || location.pathname === "/login";

  return (
    <div className="min-h-screen flex flex-col">
      {/* ✅ Hide Header/Footer only for admin routes */}
      {!isAdminRoute && <Header />}

      <main className="flex-1">
        <ScrollToTop/>
        <Routes>
          {/* --- Public Routes --- */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />

          {/* 👇 Projects related routes */}
          <Route path="/projects" element={<Projects />} />
          {/* <Route path="/projects/latest" element={<LatestProjects />} /> */}
          <Route path="/projects/:slug" element={<ProjectDetail />} />

          {/* --- Admin Routes --- */}
          <Route path="/login" element={<Login />} />
          <Route path="/admin/project" element={<ProductInfo />} />
          <Route path="/admin/project-list" element={<ProductList />} />
          <Route path="/admin/enquiries" element={<EnquiryList />} />
          <Route path="/admin/edit-project/:id" element={<EditProject />} />
        </Routes>

      </main>

      {!isAdminRoute && <Footer />}
    </div>
  );
}
