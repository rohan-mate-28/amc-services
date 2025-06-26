import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setProducts, setLoading } from "@/redux/productSlice";
import {
      CUSTOMER_PRODUCT_API_END_POINT,
      PRODUCT_API_END_POINT,
} from "@/Utils/constant";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import {
      Dialog,
      DialogTrigger,
      DialogContent,
      DialogHeader,
      DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { Label } from "@radix-ui/react-dropdown-menu";

const ProductCarousel = () => {
      const [editingProduct, setEditingProduct] = useState(null);
      const navigate = useNavigate();
      const { user } = useSelector((store) => store.auth);
      const isAdmin = user?.email !== "rohanmate157@gmail.com";
      const dispatch = useDispatch();
      const { products, loading } = useSelector((state) => state.product);
      const scrollRef = useRef(null);
      const [bookingProductId, setBookingProductId] = useState(null);

      useEffect(() => {
            const fetchProducts = async () => {
                  try {
                        dispatch(setLoading(true));
                        const { data } = await axios.get(
                              `${PRODUCT_API_END_POINT}/getAllProducts`,
                              { withCredentials: true }
                        );
                        dispatch(setProducts(data.products || []));
                  } catch (err) {
                        console.error("Fetch products failed", err);
                  } finally {
                        dispatch(setLoading(false));
                  }
            };

            fetchProducts();
      }, [dispatch]);

      const scroll = (direction) => {
            if (scrollRef.current) {
                  scrollRef.current.scrollBy({
                        left: direction === "left" ? -300 : 300,
                        behavior: "smooth",
                  });
            }
      };

      const handleBookProduct = async (productId) => {
            if (!user) {
                  navigate("/login");
                  return;
            }
            try {

                  setBookingProductId(productId);
                  const res = await axios.post(
                        `${CUSTOMER_PRODUCT_API_END_POINT}/bookproduct`,
                        { productId },
                        { withCredentials: true }
                  );

                  if (res.data.success) {
                        toast.success(res.data.message || "Product booked successfully!");
                        navigate("/ConfirmOrder");
                  } else {
                        toast.error("Booking failed");
                  }



            } catch (err) {
                  console.error("Book product error", err);
                  toast.error(err.response?.data?.message || "Failed to book product");
            } finally {
                  setBookingProductId(null);
            }
      };

      const deletehandlerproduct = async (productId) => {
            try {
                  setBookingProductId(productId);
                  const res = await axios.delete(
                        `${PRODUCT_API_END_POINT}/${productId}/drop`,
                        { withCredentials: true }
                  );

                  if (res.data.success) {
                        toast.success(res.data.message || "Product Deleted successfully!");
                        const updatedProducts = products.filter((p) => p._id !== productId);
                        dispatch(setProducts(updatedProducts));
                  } else {
                        toast.error("Deleting failed");
                  }
            } catch (err) {
                  console.error("Delete product error", err);
                  toast.error(err.response?.data?.message || "Failed to delete product");
            } finally {
                  setBookingProductId(null);
            }
      };

      if (loading) {
            return (
                  <div className="flex justify-center items-center py-10 text-blue-600">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span className="ml-2">Loading Products...</span>
                  </div>
            );
      }
      return (
            <>
                  <Dialog open={!!editingProduct} onOpenChange={(val) => !val && setEditingProduct(null)}>
                        <DialogContent className="max-w-md">
                              <DialogHeader>
                                    <DialogTitle>Edit Product</DialogTitle>
                              </DialogHeader>
                              {editingProduct && (
                                    <div className="space-y-4">
                                          <Label>Product Name</Label>
                                          <Input
                                                placeholder="Name"
                                                value={editingProduct.name}
                                                onChange={(e) =>
                                                      setEditingProduct({ ...editingProduct, name: e.target.value })
                                                }
                                          />
                                          <Label>Features</Label>
                                          <Textarea
                                                placeholder="Features (comma separated)"
                                                value={editingProduct.features}
                                                onChange={(e) =>
                                                      setEditingProduct({ ...editingProduct, features: e.target.value })
                                                }
                                          />
                                          <Label>Prices</Label>
                                          <Input
                                                placeholder="Price"
                                                type="number"
                                                value={editingProduct.price}
                                                onChange={(e) =>
                                                      setEditingProduct({ ...editingProduct, price: e.target.value })
                                                }
                                          />
                                          <Label>Discount Price</Label>
                                          <Input
                                                placeholder="Discount Price"
                                                type="number"
                                                value={editingProduct.discountPrice}
                                                onChange={(e) =>
                                                      setEditingProduct({ ...editingProduct, discountPrice: e.target.value })
                                                }
                                          />
                                          <Label>Warranty</Label>
                                          <Input
                                                placeholder="Warranty (years)"
                                                type="number"
                                                value={editingProduct.warranty}
                                                onChange={(e) =>
                                                      setEditingProduct({ ...editingProduct, warranty: e.target.value })
                                                }
                                          />
                                          
                                          <Button
                                                className="w-full"
                                                onClick={async () => {
                                                      try {
                                                            const updated = {
                                                                  ...editingProduct,
                                                            };

                                                            const res = await axios.put(
                                                                  `${PRODUCT_API_END_POINT}/${editingProduct._id}/updateproduct`,
                                                                  updated,
                                                                  { withCredentials: true }
                                                            );

                                                            if (res.data.success) {
                                                                  toast.success("Product updated successfully");
                                                                  const updatedProduct = res.data.product;
                                                                  const updatedProducts = products.map((p) =>
                                                                        p._id === updatedProduct._id ? updatedProduct : p
                                                                  );
                                                                  dispatch(setProducts(updatedProducts));
                                                                  setEditingProduct(null);
                                                            } else {
                                                                  toast.error("Update failed");
                                                            }
                                                      } catch (err) {
                                                            toast.error("Failed to update product", err);
                                                      }
                                                }}
                                          >
                                                Save Changes
                                          </Button>
                                    </div>
                              )}
                        </DialogContent>
                  </Dialog>



                  <div className="py-8 px-4 bg-gray-50">
                        <div className="flex justify-between items-center mb-4">
                              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                                    Our Products
                              </h2>
                              <div className="flex gap-2">
                                    <Button variant="outline" size="icon" onClick={() => scroll("left")}>
                                          <ChevronLeft className="w-5 h-5" />
                                    </Button>
                                    <Button variant="outline" size="icon" onClick={() => scroll("right")}>
                                          <ChevronRight className="w-5 h-5" />
                                    </Button>
                              </div>
                        </div>

                        <div
                              ref={scrollRef}
                              className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 no-scrollbar"
                        >
                              {products.map((product) => (
                                    <Card
                                          key={product._id}
                                          className="snap-start min-w-[260px] max-w-[280px] min-h-[600]: flex-shrink-0 shadow-md border"
                                    >
                                          <CardContent className="p-4">
                                                <img
                                                      src={product?.image?.url}
                                                      alt={product?.name}
                                                      className="w-full h-40 object-cover rounded mb-2"
                                                />
                                                <h3 className="text-lg font-semibold text-gray-800">
                                                      {product?.name}
                                                </h3>
                                                <ul className="text-sm text-gray-600 list-disc list-inside my-2 max-h-[80px] overflow-auto">
                                                      {Array.isArray(product.features)
                                                            ? product.features.map((feature, index) => (
                                                                  <li key={index}>{feature}</li>
                                                            ))
                                                            : null}

                                                </ul>
                                                <div className="mt-2">
                                                      <p className="text-blue-600 font-semibold">
                                                            ₹{product.discountPrice || product.price}
                                                            {product.discountPrice && (
                                                                  <span className="text-sm text-gray-400 line-through ml-1">
                                                                        ₹{product.price}
                                                                  </span>
                                                            )}
                                                      </p>
                                                      <p className="text-xs text-gray-500">
                                                            Warranty: {product.warranty} year(s)
                                                      </p>
                                                </div>

                                                {isAdmin ? (
                                                      <Button
                                                            className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white"
                                                            onClick={() => handleBookProduct(product._id)}
                                                            disabled={bookingProductId === product._id}
                                                      >
                                                            {bookingProductId === product._id ? (
                                                                  <span className="flex items-center justify-center gap-2">
                                                                        <Loader2 className="animate-spin h-4 w-4" />
                                                                        Booking...
                                                                  </span>
                                                            ) : (
                                                                  "Book Now"
                                                            )}
                                                      </Button>
                                                ) : (
                                                      <div className="flex flex-col gap-2 mt-4">
                                                            <Button
                                                                  className="w-full bg-red-600 hover:bg-red-700 text-white"
                                                                  onClick={() => deletehandlerproduct(product._id)}
                                                                  disabled={bookingProductId === product._id}
                                                            >
                                                                  {bookingProductId === product._id ? (
                                                                        <span className="flex items-center justify-center gap-2">
                                                                              <Loader2 className="animate-spin h-4 w-4" />
                                                                              Deleting...
                                                                        </span>
                                                                  ) : (
                                                                        "Delete Product"
                                                                  )}
                                                            </Button>
                                                            <Button
                                                                  className="w-full bg-gray-700 hover:bg-gray-800 text-white"
                                                                  onClick={() =>
                                                                        setEditingProduct({
                                                                              ...product,
                                                                              features: product.features.join(", "),
                                                                        })
                                                                  }
                                                            >
                                                                  Edit Product
                                                            </Button>

                                                      </div>
                                                )}
                                          </CardContent>
                                    </Card>
                              ))}
                        </div>
                  </div>
            </>
      );
};

export default ProductCarousel;
