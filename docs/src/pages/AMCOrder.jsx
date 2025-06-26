import React, { useEffect } from "react";
import axios from "../Utils/axios/js";
import { useDispatch, useSelector } from "react-redux";
import { ADMIN_GET_ORDER_API_END_POINT } from "@/Utils/constant";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { setAMCOrders, setAMCOrderLoading } from "@/redux/amcOrderSlice";

const AMCOrder = () => {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.amcOrder);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        dispatch(setAMCOrderLoading(true));
        const { data } = await axios.get(`${ADMIN_GET_ORDER_API_END_POINT}/getAllOrder`, {
          withCredentials: true,
        });
        dispatch(setAMCOrders(data.orders || []));
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch AMC Orders");
      } finally {
        dispatch(setAMCOrderLoading(false));
      }
    };

    fetchOrders();
  }, [dispatch]);

  const handleConfirmOrder = async (orderId) => {
    try {
      dispatch(setAMCOrderLoading(true));

      const confirmRes = await axios.patch(
        `${ADMIN_GET_ORDER_API_END_POINT}/${orderId}/confirmOrder`,
        {},
        { withCredentials: true }
      );

      if (confirmRes.data.success) {
        toast.success(confirmRes.data.message);
        const allOrdersRes = await axios.get(`${ADMIN_GET_ORDER_API_END_POINT}/getAllOrder`, {
          withCredentials: true,
        });
        dispatch(setAMCOrders(allOrdersRes.data.orders));
      }
    } catch (err) {
      console.error("Confirm order failed", err);
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      dispatch(setAMCOrderLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Card className="shadow-md border rounded-xl">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl font-bold text-gray-800">
              AMC Orders
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center gap-2 py-10 text-blue-600">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Loading orders...</span>
              </div>
            ) : orders.length === 0 ? (
              <p className="text-gray-600 text-center py-8">No AMC orders found.</p>
            ) : (
              <>
                {/* Desktop Table View */}
                <div className="hidden md:block">
                  <ScrollArea className="w-full overflow-x-auto rounded-md border">
                    <table className="w-full table-auto border-collapse text-sm">
                      <thead className="bg-blue-100 text-left font-semibold text-gray-700">
                        <tr>
                          <th className="px-4 py-2">Customer</th>
                          <th className="px-4 py-2">Email</th>
                          <th className="px-4 py-2">Plan</th>
                          <th className="px-4 py-2">Payment</th>
                          <th className="px-4 py-2">Status</th>
                          <th className="px-4 py-2">Date</th>
                          <th className="px-4 py-2">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order) => (
                          <tr
                            key={order._id}
                            className="border-t hover:bg-gray-50 text-gray-700"
                          >
                            <td className="px-4 py-2">
                              {order.customer?.firstName} {order.customer?.lastName}
                            </td>
                            <td className="px-4 py-2">{order.customer?.email}</td>
                            <td className="px-4 py-2">{order.planType}</td>
                            <td className="px-4 py-2">{order.paymentType}</td>
                            <td className="px-4 py-2">
                              <span
                                className={`text-sm px-2 py-1 rounded-full ${
                                  order.status === "Confirmed"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-yellow-100 text-yellow-700"
                                }`}
                              >
                                {order.status}
                              </span>
                            </td>
                            <td className="px-4 py-2">
                              {new Date(order.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-4 py-2">
                              {order.status === "Pending" && (
                                <Button
                                  size="sm"
                                  onClick={() => handleConfirmOrder(order._id)}
                                >
                                  Confirm
                                </Button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </ScrollArea>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden space-y-4 mt-4">
                  {orders.map((order) => (
                    <Card key={order._id} className="border shadow-sm">
                      <CardContent className="p-4 space-y-2 text-sm text-gray-700">
                        <p><strong>Customer:</strong> {order.customer?.firstName} {order.customer?.lastName}</p>
                        <p><strong>Email:</strong> {order.customer?.email}</p>
                        <p><strong>Plan:</strong> {order.planType}</p>
                        <p><strong>Payment:</strong> {order.paymentType}</p>
                        <p>
                          <strong>Status:</strong>{" "}
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${
                              order.status === "Confirmed"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {order.status}
                          </span>
                        </p>
                        <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                        {order.status === "Pending" && (
                          <Button
                            size="sm"
                            onClick={() => handleConfirmOrder(order._id)}
                            className="mt-2"
                          >
                            Confirm
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AMCOrder;
