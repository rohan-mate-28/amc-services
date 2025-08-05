import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { CUSTOMER_ORDER_API_END_POINT } from "@/Utils/constant";
import axiosInstance from "../Utils/axios.js";

const plans = [
  {
    title: "1-Year Plan",
    price: " ₹5,000",
    originalPrice: "₹5,999",
    duration: "Valid for 12 months",
    discount: "33% OFF",
    features: [
      "Every 3/Month Services",
      "Free Part Replacement",
      "Priority Support",
      "Expert Technician Visit",
    ],
    gradient: "from-blue-50 to-white",
    border: "border-blue-500",
    planType: "1-year",
  },
  {
    title: "4-Year Plan",
    price: "₹14,000",
    originalPrice: "₹15,999",
    duration: "Valid for 48 months",
    discount: "33% OFF",
    features: [
      "Every 3/Month Services",
      "Free Part Replacement Anytime",
      "Dedicated Technician",
      "Priority Call Handling",
      "Full System Checkup",
    ],
    gradient: "from-blue-100 to-blue-50",
    border: "border-blue-700",
    planType: "4-year",
  },
];

const AMCPlans = () => {
  const navigate = useNavigate();
  const [loadingPlan, setLoadingPlan] = useState(null);
  const [activeOrder, setActiveOrder] = useState(null);

  useEffect(() => {
    const checkExistingPlan = async () => {
      try {
        const res = await axiosInstance.get(`${CUSTOMER_ORDER_API_END_POINT}/myOrders`, {
          withCredentials: true,
        });

        const orders = res.data.orders;
        const today = new Date();
        const active = orders.find((order) => new Date(order.endDate) > today);

        if (active) setActiveOrder(active);
      } catch (err) {
        console.error("Error fetching active plan", err);
      }
    };

    checkExistingPlan();
  }, []);

  const handlePlanSelect = async (planType) => {
    setLoadingPlan(planType);
    try {
      const { data } = await axiosInstance.post(
        `${CUSTOMER_ORDER_API_END_POINT}/buyplan`,
        { planType },
        { withCredentials: true }
      );

      if (data.success) {
        toast.success(data.message || "Plan purchased successfully!");
        navigate("/ConfirmOrder");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-20 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
          Choose Your AMC Plan
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Get the best protection & maintenance for your Aqua and Water Filter systems.
        </p>

        {activeOrder && (
          <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 p-4 rounded mt-6 text-sm">
            You already have an active AMC plan ({activeOrder.planType}) until{" "}
            <strong>{new Date(activeOrder.endDate).toLocaleDateString()}</strong>.
          </div>
        )}
      </div>

      <div className="grid gap-8 md:grid-cols-2 max-w-6xl mx-auto">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`relative p-6 rounded-xl border ${plan.border} bg-gradient-to-br ${plan.gradient} shadow-md hover:shadow-xl transition-all duration-300`}
          >
            <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
              {plan.discount}
            </div>

            <h3 className="text-2xl font-semibold text-gray-900 mb-1">{plan.title}</h3>
            <p className="text-sm text-gray-500 mb-4">{plan.duration}</p>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-blue-700 text-3xl font-bold">{plan.price}</span>
              <span className="text-gray-400 line-through text-lg">{plan.originalPrice}</span>
            </div>

            <ul className="space-y-2 text-gray-700 mb-6 text-left">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>

            <Button
              className="w-full"
              size="lg"
              onClick={() => handlePlanSelect(plan.planType)}
              disabled={!!activeOrder || loadingPlan === plan.planType}
            >
              {loadingPlan === plan.planType ? (
                <span className="flex items-center gap-2 justify-center">
                  <Loader2 className="w-4 h-4 animate-spin" /> Processing...
                </span>
              ) : activeOrder ? (
                "Already Active"
              ) : (
                "Get This Plan"
              )}
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AMCPlans;
