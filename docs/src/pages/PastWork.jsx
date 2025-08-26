import React from "react";
import { motion } from "framer-motion";

// Import images directly
import img1 from "../asset_pastwork/Avinash.jpeg";
import img2 from "../asset_pastwork/Chowk.jpeg";
import img3 from "../asset_pastwork/dragrawal.jpeg";
import img5 from "../asset_pastwork/Mahisgaon.jpeg";
import img6 from "../asset_pastwork/Mishra.jpeg";
import img7 from "../asset_pastwork/Prathamikshala.jpeg";
import img8 from "../asset_pastwork/Rahulkhollam.jpeg";
import img9 from "../asset_pastwork/Sachin.jpeg";
import img10 from "../asset_pastwork/Vighnarta.jpeg";
import img11 from "../asset_pastwork/vishal.jpeg";
import img12 from "../asset_pastwork/dss.jpeg";
const pastWorkItems = [
      { src: img1, title: "Avinash , Spine Road" },
      { src: img2, title: "Chowk , Mumbai" },
      { src: img3, title: "Dr Agrawal Hospital , Viman Nagar" },
      { src: img5, title: "Mahisgaon , AhilyaNagar" },
      { src: img6, title: "Mishra Pimpri" },
      { src: img7, title: "Prathamik Shala , Retawadi" },
      { src: img8, title: "Rahul Khollam,Pimpri" },
      { src: img9, title: "Sachin , Ravet" },
      { src: img10, title: "Vighnaharta Hospital ,Vadgaon" },
      { src: img11, title: "Vishal , Hinjawadi" },
      { src: img12, title: "Filter Replacement Service" },
];

const PastWork = () => {
      return (
            <section className="bg-gray-50 py-16 px-6">
                  <div className="max-w-6xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
                              Our Past Work
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                              {pastWorkItems.map((item, index) => (
                                    <motion.div
                                          key={index}
                                          className="overflow-hidden rounded-2xl shadow-lg bg-white flex flex-col"
                                          initial={{ opacity: 0, scale: 0.9 }}
                                          animate={{ opacity: 1, scale: 1 }}
                                          transition={{ delay: index * 0.15 }}
                                          whileHover={{ scale: 1.03 }}
                                    >
                                          <div className="overflow-hidden aspect-[5/6]">
                                                <img
                                                      src={item.src}
                                                      alt={item.title}
                                                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                                                />
                                          </div>

                                          <div className="p-4 text-center">
                                                <p className="text-lg font-medium text-gray-800">{item.title}</p>
                                          </div>
                                    </motion.div>
                              ))}
                        </div>
                  </div>
            </section>
      );
};

export default PastWork;
