import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const reviews = [
  {
    id: 1,
    name: "Amit Sharma",
    location: "Nigdi , Pune",
    quote:
      "Amazing AMC service! My RO purifier works perfectly after their maintenance. Totally worth it!",
  },
  {
    id: 2,
    name: "Atharv Khollam",
    location: "Dehuroad, Pune",
    quote:
      "Quick response and professional staff. They even replaced a part for free as promised in the AMC plan.",
  },
  {
    id: 3,
    name: "Ravi Patel",
    location: "Talegoan, Pune",
    quote:
      "Affordable and reliable AMC plan. No more worries about water filter breakdowns. Highly recommended!",
  },
  {
    "id": 4,
    "name": "Priya Singh",
    "location": "Pimpri, Pune",
    "quote": "Excellent service for my water purifier! The technician was knowledgeable and fixed the issue quickly. Very happy with the AMC."
  },
  {
    "id": 5,
    "name": "Sanjay Deshmukh",
    "location": "Kothrud, Pune",
    "quote": "Glad I opted for their AMC. Regular maintenance keeps my RO running smoothly. Great value for money."
  },
  {
    "id": 6,
    "name": "Neha Joshi",
    "location": "Hinjewadi, Pune",
    "quote": "Prompt service and courteous staff. They reminded me about the service due date, which was very helpful. My water quality is consistently good."
  },
  {
    "id": 7,
    "name": "Rajesh Kumar",
    "location": "Hadapsar, Pune",
    "quote": "After-sales support is fantastic. Had a minor issue, and it was resolved within hours under the AMC. Truly reliable."
  },
  {
    "id": 8,
    "name": "Anjali Mehta",
    "location": "Baner, Pune",
    "quote": "The AMC plan is comprehensive. Covers everything from routine checks to part replacements. Peace of mind guaranteed for my water purifier."
  }

];

const CustomerReviews = () => {
  const [current, setCurrent] = useState(0);

  const nextReview = () => setCurrent((prev) => (prev + 1) % reviews.length);
  const prevReview = () => setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length);

  // Auto slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(nextReview, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-blue-50 py-16">
      <div className="container mx-auto px-6 max-w-3xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-gray-800">
          💬 What Our Customers Say
        </h2>

        <div className="relative bg-white/90 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-lg border border-gray-100">
          <AnimatePresence mode="wait">
            <motion.div
              key={reviews[current].id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-gray-700 italic mb-6 text-lg leading-relaxed">
                “{reviews[current].quote}”
              </p>
              <div className="text-center">
                <p className="font-semibold text-gray-900 text-lg">
                  {reviews[current].name}
                </p>
                <p className="text-blue-600 text-sm">{reviews[current].location}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
            <button
              onClick={prevReview}
              className="bg-blue-100 hover:bg-blue-200 rounded-full p-2 shadow-md"
            >
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
          <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
            <button
              onClick={nextReview}
              className="bg-blue-100 hover:bg-blue-200 rounded-full p-2 shadow-md"
            >
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {reviews.map((_, index) => (
              <span
                key={index}
                onClick={() => setCurrent(index)}
                className={`h-3 w-3 rounded-full cursor-pointer transition-all ${
                  current === index ? "bg-blue-600 w-6" : "bg-gray-300"
                }`}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
