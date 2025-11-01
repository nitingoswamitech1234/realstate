import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Mail, MapPin, X } from "lucide-react";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // change bg after 50px scroll
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 left-0 w-full z-50">
      {/* ✅ Top bar — hidden on mobile */}
      <div className="hidden md:flex bg-[#252942] text-white text-sm py-2 px-4 justify-between items-center md:px-12 lg:px-20 border-white border-b-[1px]">
        <div className="flex items-center gap-6 px-6">
          <div className="flex items-center gap-2">
            <Mail size={14} className="text-white" />
            <a
              href="mailto:genesisrealitynoida@gmail.com"
              className="text-white"
            >
              enquiry.genesisrealty@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-4 text-[#0b2135]">
            <i className="fa-solid fa-phone-volume fa-shake text-white"></i>
            <a href="tel:+917982481132" className="text-white">
              +91 7982481132
            </a>
            <a href="tel:+919971777831" className="text-white ">
              +91 9971777831
            </a>
          </div>

        </div>
        <div className="flex items-center gap-4 px-6">
          <a href="#" className="hover:text-[color:var(--brand)]">
            <FaFacebookF />
          </a>
          <a href="#" className="hover:text-[color:var(--brand)]">
            <FaInstagram />
          </a>
          <a
            href="https://wa.me/+917982481132"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[color:var(--brand)]"
          >
            <FaWhatsapp />
          </a>
        </div>
      </div>

      {/* ✅ Main Navbar */}
      <div
        className={`transition-all duration-300 ${
          isScrolled
            ? "bg-[#252942] shadow-md"
            : "bg-[#252942] backdrop-blur-md shadow-sm"
        } md:px-12 lg:px-20`}
      >
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <Link to="/" className="text-white text-2xl font-bold">
            <img src="/assets/genesis-logo.png" alt="genesis-logo" width="180px" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-8 text-white font-medium items-center">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/projects">Projects</Link>
            <Link
              to="/contact"
              className="bg-[color:var(--brand)] px-5 py-2 rounded-md shadow hover:opacity-90 transition"
            >
              Contact
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <div
            className="md:hidden text-white text-2xl cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : "☰"}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#252942] text-white flex flex-col items-center gap-4 py-6 animate-fadeIn">
            <Link onClick={() => setIsMenuOpen(false)} to="/">
              Home
            </Link>
            <Link onClick={() => setIsMenuOpen(false)} to="/about">
              About
            </Link>
            <Link onClick={() => setIsMenuOpen(false)} to="/projects">
              Projects
            </Link>
            <Link
              onClick={() => setIsMenuOpen(false)}
              to="/contact"
              className="bg-[color:var(--brand)] px-5 py-2 rounded-md shadow hover:opacity-90 transition"
            >
              Contact
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
