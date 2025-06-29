import React from "react";
import aquaPlumber from "@/assets/aquaPlumber.webp";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const HeroSection = () => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-16 px-4 sm:px-8 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
        {/* Text content */}
        <div className="text-center lg:text-left space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-snug">
            Annual Maintenance Plans for Aqua & Water Filters
          </h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-xl mx-auto lg:mx-0">
            Get regular servicing, part replacement & expert support — all included with our AMC plans starting at just ₹4,000.
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-2">
            <Button size="lg" onClick={() => navigate(user ? "/amcplan" : "/login")}>
              View AMC Plans
            </Button>
            {!user && (
              <Button
                size="lg"
                variant="outline"
                className="border-blue-600 text-blue-600 hover:bg-blue-100"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            )}
          </div>
        </div>

        {/* Image */}
        <div className="flex justify-center">
          <div className="w-full max-w-md aspect-[16/10] overflow-hidden rounded-xl shadow-lg">
            <img
              src={aquaPlumber}
              alt="Aqua Services"
              loading="eager"
              decoding="async"
              width={400}
              height={250}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
