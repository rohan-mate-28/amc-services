import React from "react"
import aquaPlumber from "@/assets/aquaPlumber.webp"
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const HeroSection = () => {
      const { user } = useSelector((store) => store.auth);
      const navigate = useNavigate();

      return (
            <section className="bg-gradient-to-b from-blue-50 to-white py-16 px-4 sm:px-8 lg:px-24">
                  <div className="max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center justify-between gap-12">

                        {/* Text content */}
                        <div className="text-center lg:text-left flex-1">
                              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
                                    Annual Maintenance Plans for Aqua & Water Filters
                              </h1>
                              <p className="text-gray-600 text-lg mb-8 max-w-xl">
                                    Get regular servicing, part replacement & expert support — all included with our AMC plans starting at just ₹4,000.
                              </p>
                              <div className="mt-6 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                                    <Button size="lg" onClick={() => navigate(user?"/amcplan":"/login")}>
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
                        <div className="flex-1 flex justify-center">
                              <img
                                    loading="lazy"
                                    src={aquaPlumber}
                                    alt="Aqua Services"
                                    className="max-w-sm sm:max-w-md rounded-xl shadow-md object-cover"
                              />
                        </div>
                  </div>
            </section>
      );
};

export default HeroSection;
