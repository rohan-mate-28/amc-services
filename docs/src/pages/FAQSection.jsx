import React from "react";

const faqs = [
  {
    question: "What is included in the AMC plan?",
    answer:
      "Our AMC covers regular cleaning, part replacement if needed, and expert support throughout the plan duration.",
  },
  {
    question: "How do I Make Service  Request  ?",
    answer:
      "Once logged in, click on 'Service Request' from the dashboard and fill in your issue details.",
  },
  {
    question: "Is the part replacement really free?",
    answer:
      "Yes, if you're an active AMC member, any faulty parts will be replaced free of charge.",
  },
  {
    question: "Can I cancel my AMC plan?",
    answer:
      "Currently, AMC plans are non-refundable once confirmed. However, you can contact support for special cases.",
  },
];

const FAQSection = () => {
  return (
    <section className="bg-white py-16 px-4 sm:px-8 lg:px-24">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        <p className="text-gray-600 mb-10">
          Find answers to common questions about our annual maintenance plans and services.
        </p>

        <div className="space-y-6 text-left">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{faq.question}</h3>
              <p className="text-gray-600 text-sm">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
