import React from "react";
import { Phone } from "lucide-react";

const OrderConfirmationBox = () => {
  return (
    <div className="w-full max-w-md mx-auto bg-blue-50 border border-blue-300 rounded-xl p-4 sm:p-6 shadow-md mt-6">
      <h2 className="text-lg sm:text-xl font-semibold text-blue-800 text-center">
        Confirm Your Order
      </h2>
      <p className="text-sm sm:text-base text-gray-600 mt-2 text-center">
        Please call our support to confirm your plan or product order.
      </p>

      <div className="flex items-center justify-center gap-2 mt-4 text-blue-700 font-semibold text-lg sm:text-xl">
        <Phone className="h-5 w-5" />
        +91 98765 43210
      </div>

      {/* Call Now Button */}
      <div className="flex justify-center mt-4">
        <a
          href="tel:+919876543210"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg transition duration-200"
        >
          Call Now
        </a>
      </div>

      <p className="text-xs sm:text-sm text-center text-gray-500 mt-2">
        Once confirmed, your product will be activated by our team manually.
      </p>
    </div>
  );
};

export default OrderConfirmationBox;
