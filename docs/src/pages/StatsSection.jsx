import React from "react";
import { motion } from "framer-motion";
import { Users, Package, Smile, Award } from "lucide-react";

const stats = [
  {
    id: 1,
    icon: <Users className="w-6 h-6 text-white" />,
    value: "30+",
    label: "Active AMC Members",
    bg: "from-blue-500 to-indigo-600",
  },
  {
    id: 2,
    icon: <Package className="w-6 h-6 text-white" />,
    value: "78+",
    label: "Products Sold",
    bg: "from-green-500 to-emerald-600",
  },
  {
    id: 3,
    icon: <Smile className="w-6 h-6 text-white" />,
    value: "150+",
    label: "Happy Customers",
    bg: "from-pink-500 to-rose-600",
  },
  {
    id: 4,
    icon: <Award className="w-6 h-6 text-white" />,
    value: "5+",
    label: "Years Experience",
    bg: "from-yellow-400 to-orange-500",
  },
];

const StatsSection = () => {
  return (
    <section className="bg-gradient-to-br from-gray-50 to-white py-16">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12">
          Our Achievements
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((item, index) => (
            <motion.div
              key={item.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition p-6 flex flex-col items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <div
                className={`w-14 h-14 rounded-full bg-gradient-to-br ${item.bg} flex items-center justify-center shadow-md mb-4`}
              >
                {item.icon}
              </div>
              <h3 className="text-3xl font-extrabold text-gray-900">{item.value}</h3>
              <p className="text-gray-500 mt-1 text-sm">{item.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
