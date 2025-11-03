import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineLocationMarker, HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#1a1d2e] text-gray-300">
  {/* Main Footer Section */}
  <div className="container mx-auto py-8 md:py-12 px-6 md:px-24 grid grid-cols-1 md:grid-cols-12 gap-10">
    {/* Column 1 */}
    <div className="md:col-span-5">
      <Link to="/" className="text-white text-2xl font-bold">
        <img
          src="/assets/genesis-logo.png"
          alt="genesis-logo"
          width="180px"
          className="mb-4"
        />
      </Link>
      <p className="text-gray-400 leading-relaxed mb-2">
        Building trust, transparency, and timeless properties — helping you
        find your perfect investment with confidence.
      </p>
      <p className="text-gray-400 leading-relaxed">
        Turning your real estate dreams into reality — one project, one happy
        home at a time.
      </p>
    </div>

    {/* Column 2 */}
    <div className="md:col-span-3">
      <h4 className="text-white text-xl font-semibold mb-4">Quick Links</h4>
      <ul className="space-y-3 text-gray-400">
        <li>
          <Link
            to="/"
            className="hover:text-white cursor-pointer transition block"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className="hover:text-white cursor-pointer transition block"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            to="/projects"
            className="hover:text-white cursor-pointer transition block"
          >
            Projects
          </Link>
        </li>
        <li>
          <Link
            to="/contact"
            className="hover:text-white cursor-pointer transition block"
          >
            Contact
          </Link>
        </li>
      </ul>
    </div>

    {/* Column 3 */}
    <div className="md:col-span-4">
      <h4 className="text-white text-xl font-semibold mb-4">Info</h4>
      <ul className="space-y-3 text-gray-400 text-sm sm:text-base">
        <li className="flex items-start gap-3">
          <HiOutlineLocationMarker className="text-[#d3ac67] flex-shrink-0 mt-[4px] text-lg sm:text-xl" />
          <span>
            Galactic City Plot No. 6 Knowledge Park 5 Greater Noida West (Noida
            Extension) Uttar Pradesh
          </span>
        </li>

        <li className="flex items-center gap-3">
          <HiOutlinePhone className="text-[#d3ac67] text-lg sm:text-xl flex-shrink-0" />
          <div className="flex flex-col sm:flex-row sm:gap-3">
            <a
              href="tel:+917982481132"
              className="hover:text-[#d3ac67] transition"
            >
              +91 7982481132
            </a>
            <a
              href="tel:+919971777831"
              className="hover:text-[#d3ac67] transition"
            >
              +91 9971777831
            </a>
          </div>
        </li>

        <li className="flex items-center gap-3">
          <HiOutlineMail className="text-[#d3ac67] text-lg sm:text-xl flex-shrink-0" />
          <a
            href="mailto:genesisrealitynoida@gmail.com"
            className="hover:text-[#d3ac67] transition"
          >
            enquiry.genesisrealty@gmail.com
          </a>
        </li>
      </ul>

      {/* Social Icons */}
      <div className="flex gap-4 mt-5 text-gray-400">
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

      <div className="text-white text-sm mt-4 font-medium">
        Design &amp; Developed by{" "}
        <a
          href="https://www.onlinesportstech.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-[#d3ac67] hover:text-white transition"
        >
          OST
        </a>
      </div>

    </div>
  </div>

  {/* Copyright Section */}
  <div className="bg-[#212433] py-5 text-center text-sm text-gray-400 border-t border-gray-700">
    Genesis Realty © {new Date().getFullYear()} Copyright. All Rights Reserved.
  </div>
</footer>

  );
}
