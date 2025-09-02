import React from "react";

const TermsAndConditions = () => {
  return (
    <section className="max-w-4xl mx-auto px-6 py-12">
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
          Terms & Conditions
        </h2>
        <ul className="space-y-4 text-gray-700 leading-relaxed">
          <li className="flex items-start gap-3">
            <span className="text-blue-600 font-bold">•</span>
            <span>
              Our service team doesn't visit every 2 days. Please check TDS
              yourself regularly.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 font-bold">•</span>
            <span>
              Physical damage and body damage are not considered in AMC Plans.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-600 font-bold">•</span>
            <span>
              For Aqua Service, maximum time is 2 days (within 2 days service
              will complete).
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default TermsAndConditions;
