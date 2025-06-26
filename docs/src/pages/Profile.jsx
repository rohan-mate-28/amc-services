import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOrder, setLoading } from "@/redux/orderSlice";
import axios from "axios";
import { CUSTOMER_ORDER_API_END_POINT } from "@/Utils/constant";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import UpdateProfileDialog from "@/components/shared/UpdateProfileDialog";
import ServiceHistory from "./ServiceHistory";
import { Link } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orders, Loading } = useSelector((state) => state.order);

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        dispatch(setLoading(true));
        const res = await axios.get(`${CUSTOMER_ORDER_API_END_POINT}/myOrders`, {
          withCredentials: true,
        });
        dispatch(setOrder(res.data.orders));
      } catch (err) {
        console.error("Error fetching orders", err);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchMyOrders();
  }, [dispatch]);

  if (Loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="flex items-center gap-2 text-blue-600">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span className="font-medium">Loading your profile...</span>
        </div>
      </div>
    );
  }

  // Check for valid active order
  const activeOrder = orders?.find(
    (order) =>
      order.status === "Confirmed" && new Date(order.endDate) > new Date()
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <Card className="shadow-lg border border-gray-200 rounded-2xl">
          <CardHeader className="pb-4 border-b">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <CardTitle className="text-2xl font-bold text-gray-800">
                My Profile
              </CardTitle>
              <UpdateProfileDialog user={user} onProfileUpdate={() => window.location.reload()} />
            </div>
          </CardHeader>

          <CardContent className="pt-6 space-y-8">
            {/* User Info */}
            <div className="space-y-1 text-center sm:text-left">
              <h2 className="text-xl font-semibold text-gray-700">
                {user?.firstName} {user?.lastName}
              </h2>
              <p className="text-gray-500">{user?.email}</p>
              <p className="text-gray-500">{user?.phone}</p>
            </div>

            {/* AMC Plan Info */}
            {activeOrder ? (
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-700">
                  Your Active AMC Plan
                </h3>
                <div className="bg-gradient-to-br from-blue-100 to-blue-50 border border-blue-300 p-4 rounded-xl shadow-sm space-y-2 text-sm">
                  <p><span className="font-medium">Plan:</span> {activeOrder.planType}</p>
                  <p><span className="font-medium">Start Date:</span> {new Date(activeOrder.startDate).toLocaleDateString()}</p>
                  <p><span className="font-medium">End Date:</span> {new Date(activeOrder.endDate).toLocaleDateString()}</p>
                </div>

                <div className="pt-4">
                  <Link to="/service-request">
                    <Button size="sm">  Service Request</Button>
                  </Link>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-sm text-center sm:text-left">
                You don't have an active AMC plan.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Service History Section */}
      <ServiceHistory />
    </div>
  );
};

export default Profile;
