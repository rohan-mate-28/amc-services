import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import img1 from "@/assets/OIP.jpg";
import img2 from "@/assets/Machine.jpeg";
import img3 from "@/assets/theme.jpeg";
import img4 from "@/assets/Features.jpg";
import img5 from "@/assets/download.webp";


const HeroSection = () => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const images = [img1, img2, img3, img4,img5];

  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll to each snap point every 3 seconds
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % images.length;
        const scrollX = scrollContainer.clientWidth * nextIndex;
        scrollContainer.scrollTo({ left: scrollX, behavior: "smooth" });
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-16 px-4 sm:px-8 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
        
        {/* Image Carousel */}
        <div className="order-1 lg:order-2 flex justify-center w-full">
         <div
  ref={scrollRef}
  className="w-full flex overflow-x-scroll scroll-smooth scrollbar-hide rounded-xl shadow-lg snap-x snap-mandatory"
>
  {images.map((img, index) => (
    <div
      key={index}
      className="flex-shrink-0 w-full aspect-[4/3] snap-center rounded-xl relative overflow-hidden"
    >
      <img
        src={img}
        alt={`Image ${index + 1}`}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  ))}
</div>

        </div>

        {/* Text */}
        <div className="order-2 lg:order-1 text-center lg:text-left space-y-6">
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

      </div>
    </section>
  );
};

export default HeroSection;
