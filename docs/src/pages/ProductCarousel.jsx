import React, { useEffect, useRef, useState, lazy, Suspense } from "react";
import axiosInstance from "../Utils/axios.js";
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
import { useNavigate } from "react-router-dom";
 
const LazyEditProductDialog = lazy(() => import("./EditProductDialog"));

const ProductCarousel = () => {
  const [editingProduct, setEditingProduct] = useState(null);
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  
  const isAdmin = user?.email === "rohanmate157@gmail.com";
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.product);
  const scrollRef = useRef(null);
  const [actionProductId, setActionProductId] = useState(null);  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        dispatch(setLoading(true));
        const { data } = await axiosInstance.get(
          `${PRODUCT_API_END_POINT}/getAllProducts`,
          { withCredentials: true }
        );
        dispatch(setProducts(data.products || []));
      } catch (err) {
        console.error("Fetch products failed", err);
        toast.error("Failed to load products. Please try again."); // User-friendly error
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchProducts();
  }, [dispatch]); // Dependency array: fetch once on mount.

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
      setActionProductId(productId); // Set loading state for this specific product
      const res = await axiosInstance.post(
        `${CUSTOMER_PRODUCT_API_END_POINT}/bookproduct`,
        { productId },
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Product booked successfully!");
        navigate("/ConfirmOrder");
      } else {
        toast.error(res.data.message || "Booking failed");
      }
    } catch (err) {
      console.error("Book product error", err);
      toast.error(err.response?.data?.message || "Failed to book product");
    } finally {
      setActionProductId(null); // Reset loading state
    }
  };

  const deletehandlerproduct = async (productId) => {
    try {
      setActionProductId(productId); // Set loading state for this specific product
      const res = await axiosInstance.delete(
        `${PRODUCT_API_END_POINT}/${productId}/drop`,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success(res.data.message || "Product Deleted successfully!");
        // Update the products in Redux state immediately after successful deletion
        const updatedProducts = products.filter((p) => p._id !== productId);
        dispatch(setProducts(updatedProducts));
      } else {
        toast.error(res.data.message || "Deleting failed");
      }
    } catch (err) {
      console.error("Delete product error", err);
      toast.error(err.response?.data?.message || "Failed to delete product");
    } finally {
      setActionProductId(null); // Reset loading state
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
     
      <Suspense fallback={<div>Loading Edit Form...</div>}>
         {editingProduct && (
          <LazyEditProductDialog
            editingProduct={editingProduct}
            setEditingProduct={setEditingProduct}
            products={products} // Pass current products to allow updating Redux state
            dispatch={dispatch} // Pass dispatch function
            axiosInstance={axiosInstance} // Pass axiosInstance for API calls
            PRODUCT_API_END_POINT={PRODUCT_API_END_POINT}  
          />
        )}
      </Suspense>

      <div className="py-8 px-4 bg-gray-50">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            Our Products
          </h2>
          <div className="flex gap-2">
            {/* COMMENT: Added aria-label for accessibility for screen readers */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("left")}
              aria-label="Scroll products left"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("right")}
              aria-label="Scroll products right"
            >
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
              className="snap-start min-w-[260px] sm:min-w-[280px] w-[280px] flex-shrink-0 shadow-md border bg-white"
            >
              <CardContent className="p-4">
                 <div className="w-full aspect-[4/3] rounded overflow-hidden bg-white mb-3">
                  <img
                     loading="lazy"
                     decoding="async"
                     width={280}
                    height={210}
                     
                    src={product?.image?.url.replace(
                      "/upload/",
                      "/upload/f_auto,q_auto,w_280/"
                    )}
                    
                    srcset={`
                      ${product?.image?.url.replace("/upload/", "/upload/f_auto,q_auto,w_260/")} 260w,
                      ${product?.image?.url.replace("/upload/", "/upload/f_auto,q_auto,w_400/")} 400w,
                      ${product?.image?.url.replace("/upload/", "/upload/f_auto,q_auto,w_600/")} 600w
                    `}
               
                    sizes="(max-width: 639px) 260px, (max-width: 767px) 280px, 280px"
                    alt={product?.name || "Water Purifier Product"}
                    className="w-full h-full object-contain" // Tailwind for styling
                  />
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {product?.name}
                </h3>

                 
                <ul className="text-sm text-gray-600 list-disc list-inside my-2 max-h-[80px] overflow-auto pr-1">
                  {Array.isArray(product.features)
                    ? product.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))
                    : null}
                </ul>

                <div className="mt-2 mb-2">
                  <p className="text-blue-600 font-semibold text-base">
                    ₹{product.price || product.discountPrice}
                    {product.price && (
                      <span
                        className="text-sm text-gray-400 line-through ml-1"
                        style={{ color: "#888" }} // COMMENT: Example: Improve contrast if gray-400 is too light
                      >
                        ₹{product.discountPrice}
                      </span>
                    )}
                  </p>
                  <p
                    className="text-xs text-gray-500"
                    style={{ color: "#666" }} // COMMENT: Example: Improve contrast if gray-500 is too light
                  >
                    Warranty: {product.warranty} year(s)
                  </p>
                </div>

                {isAdmin ? ( // Render admin buttons if the user is an admin
                  <div className="flex flex-col gap-2">
                    <Button
                      className="w-full bg-red-600 hover:bg-red-700 text-white"
                      onClick={() => deletehandlerproduct(product._id)}
                      disabled={actionProductId === product._id}
                      aria-label={`Delete ${product.name}`} // Accessible name for screen readers
                    >
                      {actionProductId === product._id ? (
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
                          // Join features back into a comma-separated string for the textarea
                          features: Array.isArray(product.features)
                            ? product.features.join(", ")
                            : "",
                        })
                      }
                      aria-label={`Edit ${product.name}`} // Accessible name
                    >
                      Edit Product
                    </Button>
                  </div>
                ) : (
                  // Render "Book Now" button for regular users
                  <Button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => handleBookProduct(product._id)}
                    disabled={actionProductId === product._id}
                    aria-label={`Book ${product.name}`} // Accessible name
                  >
                    {actionProductId === product._id ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="animate-spin h-4 w-4" />
                        Booking...
                      </span>
                    ) : (
                      "Book Now"
                    )}
                  </Button>
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