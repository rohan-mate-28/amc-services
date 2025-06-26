import React from "react";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Branding */}
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-bold text-blue-600 mb-1">
            Aqua<span className="text-gray-900">Services</span>
          </h2>
          <p className="text-gray-600 text-sm">
            Reliable AMC for water filters and aqua systems.
          </p>
        </div>

        {/* Contact */}
        <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <FaPhoneAlt className="text-blue-600" />
            <span>+91 98765 43210</span>
          </div>
          <div className="flex items-center gap-2">
            <FaWhatsapp className="text-green-600" />
            <span>+91 98765 43210</span>
          </div>
        </div>
      </div>

      <div className="text-center py-4 border-t text-sm text-gray-500">
        © {new Date().getFullYear()} Aqua Services. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
