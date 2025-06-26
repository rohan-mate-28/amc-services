import React, { useEffect, useState } from "react";
import axios from "../Utils/axios/js";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setloadings, setPendingProduct } from "@/redux/pendingproductSlice";

const AdminPendingOrders = () => {
  const dispatch = useDispatch();
  const { PendingProduct, loadings } = useSelector((state) => state.pendingProduct); // ✅ Fix spelling
   const [confirmingId, setConfirmingId] = useState(null);

  useEffect(() => {
    const fetchPendingOrders = async () => {
      dispatch(setloadings(true));
      try {
        const res = await axios.get("http://localhost:3020/app/v1/product/pendingproduct", {
          withCredentials: true,
        });
        dispatch(setPendingProduct(res.data.orders || [])); // ✅ Use `orders` not `products`
      } catch (err) {
        toast.error("Failed to fetch pending orders",err);
      } finally {
        dispatch(setloadings(false));
      }
    };

    fetchPendingOrders();
  }, [dispatch]);

  const handleConfirm = async (productId) => {
    try {
      setConfirmingId(productId);
      const res = await axios.patch(
        `http://localhost:3020/app/v1/product/${productId}/confirm`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Product order confirmed");
        dispatch(setPendingProduct(PendingProduct.filter((p) => p._id !== productId)));
      } else {
        toast.error("Failed to confirm product");
      }
    } catch (err) {
      toast.error("Error confirming product",err);
    } finally {
      setConfirmingId(null);
    }
  };

  if (loadings) {
    return (
      <div className="flex justify-center items-center h-40 text-blue-600">
        <Loader2 className="w-5 h-5 animate-spin mr-2" />
        Loading pending orders...
      </div>
    );
  }

  if (PendingProduct.length === 0) {
    return <p className="text-center text-gray-500 mt-10">No pending product orders.</p>;
  }

  return (
    <div className="p-4 max-w-3xl mx-auto space-y-4">
      <h2 className="text-xl font-bold mb-4">Pending Product Orders</h2>
      {PendingProduct.map((order) => (
        <Card key={order._id}>
          <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center text-sm">
                {order.product?.name || "No Name"}
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  {order.product?.name || "Unnamed Product"}
                </h3>
                <p className="text-sm text-gray-600">
                  ₹{order.product?.price} | Ordered by:{" "}
                  {order.customer?.firstName} {order.customer?.lastName}{order.customer?.phone}
                </p>
              </div>
            </div>
            <Button
              disabled={confirmingId === order._id}
              className="bg-green-600 hover:bg-green-700 text-white"
              onClick={() => handleConfirm(order._id)}
            >
              {confirmingId === order._id ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="animate-spin h-4 w-4" />
                  Confirming...
                </span>
              ) : (
                "Confirm Order"
              )}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AdminPendingOrders;
