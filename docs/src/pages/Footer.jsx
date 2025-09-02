import React from "react";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import logo from "../../public/Shaktilogo.png";  
const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t mt-12 shadow-inner">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo & Address */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 text-center md:text-left">
          <img
            src={logo}
            alt="Logo"
            className="h-16 w-auto rounded-sm shadow-md"
          />
          <div>
            <p className="text-gray-600 text-sm mb-1 max-w-xs">
              Reliable AMC for water filters and aqua systems.
            </p>
            <p className="text-gray-800 text-sm font-medium">
              Dehugaon Bazaar Peth, Taluka: Haveli, District: Pune
            </p>
          </div>
        </div>

        {/* Contact */}
        <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-gray-700 font-medium">
          <div className="flex items-center gap-2 hover:text-blue-700 transition">
            <FaPhoneAlt className="text-blue-600" />
            <span>+91 80877 05293</span>
          </div>
          <div className="flex items-center gap-2 hover:text-green-700 transition">
            <FaWhatsapp className="text-green-600" />
            <span>+91 87885 70107</span>
          </div>
        </div>
      </div>

      <div className="text-center py-4 border-t text-xs sm:text-sm text-gray-500">
        © {new Date().getFullYear()} All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;