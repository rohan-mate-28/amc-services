import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import axios from "../Utils/axios.js";
import { PRODUCT_API_END_POINT } from "@/Utils/constant";
 
const AddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState({
    name: "",
    features: "",
    price: "",
    discountPrice: "",
    warranty: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleFileChange = (e) => {
    setProductData({ ...productData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productData.image) {
      toast.error("Please upload a product image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("features", productData.features);
    formData.append("price", productData.price);
    formData.append("discountPrice", productData.discountPrice);
    formData.append("warranty", productData.warranty);
    formData.append("image", productData.image);

    try {
      setLoading(true);
      const res = await axios.post(
        `${PRODUCT_API_END_POINT}/addproduct`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success("Product added successfully!");
        setProductData({
          name: "",
          features: "",
          price: "",
          discountPrice: "",
          warranty: "",
          image: null,
        });
      } else {
        toast.error("Failed to add product.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto mt-6 bg-white shadow-md rounded-md">
      <h2 className="text-lg font-bold mb-4 text-center">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Name</Label>
          <Input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            placeholder="Enter product name"
          />
        </div>
        <div>
          <Label>Features (comma separated)</Label>
          <Textarea
            name="features"
            value={productData.features}
            onChange={handleChange}
            placeholder="e.g. durable, compact, efficient"
          />
        </div>
        <div>
          <Label>Price</Label>
          <Input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Discount Price</Label>
          <Input
            type="number"
            name="discountPrice"
            value={productData.discountPrice}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Warranty (in years)</Label>
          <Input
            type="number"
            name="warranty"
            value={productData.warranty}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label>Product Image</Label>
          <Input type="file" name="file" accept="image/*" onChange={handleFileChange} />
        </div>

        <Button type="submit" className="w-full mt-2" disabled={loading}>
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="animate-spin h-4 w-4" />
              Uploading...
            </span>
          ) : (
            "Add Product"
          )}
        </Button>
      </form>
    </div>
  );
};

export default AddProduct;
