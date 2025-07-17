// src/components/EditProductDialog.jsx
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label"; // COMMENT: Correct Label component for forms
import { toast } from "sonner"; // Assuming sonner is installed and configured
import { setProducts } from "@/redux/productSlice";

const EditProductDialog = ({
  editingProduct,
  setEditingProduct,
  products, // Passed from parent to update Redux state
  dispatch, // Passed from parent to dispatch Redux actions
  axiosInstance, // Passed from parent for API calls
  PRODUCT_API_END_POINT, // Passed from parent for API endpoint
}) => {
  const handleSaveChanges = async () => {
    try {
      // COMMENT: Prepare the updated product data.
      // Split the features string back into an array as the backend likely expects an array.
      const updated = {
        ...editingProduct,
        features: editingProduct.features.split(",").map((f) => f.trim()),
      };

      const res = await axiosInstance.put(
        `${PRODUCT_API_END_POINT}/${editingProduct._id}/updateproduct`,
        updated,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Product updated successfully");
        const updatedProduct = res.data.product;
        // Update the products array in Redux state with the newly updated product
        const updatedProducts = products.map((p) =>
          p._id === updatedProduct._id ? updatedProduct : p
        );
        dispatch(setProducts(updatedProducts)); // Dispatch action to update Redux store
        setEditingProduct(null); // Close the dialog
      } else {
        toast.error(res.data.message || "Update failed");
      }
    } catch (err) {
      console.error("Failed to update product", err);
      toast.error(err.response?.data?.message || "Failed to update product");
    }
  };

  return (
    // Dialog handles its own open/close state via onOpenChange
    <Dialog open={!!editingProduct} onOpenChange={(val) => !val && setEditingProduct(null)}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
        </DialogHeader>
        {editingProduct && ( // Only render form fields if a product is selected for editing
          <div className="space-y-4">
            <Label htmlFor="product-name">Product Name</Label>
            <Input
              id="product-name" // htmlFor for label, id for input
              placeholder="Name"
              value={editingProduct.name}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, name: e.target.value })
              }
            />
            <Label htmlFor="features">Features</Label>
            <Textarea
              id="features"
              placeholder="Features (comma separated)"
              value={editingProduct.features}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, features: e.target.value })
              }
            />
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              placeholder="Price"
              type="number"
              value={editingProduct.price}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, price: e.target.value })
              }
            />
            <Label htmlFor="discount-price">Discount Price</Label>
            <Input
              id="discount-price"
              placeholder="Discount Price"
              type="number"
              value={editingProduct.discountPrice}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, discountPrice: e.target.value })
              }
            />
            <Label htmlFor="warranty">Warranty</Label>
            <Input
              id="warranty"
              placeholder="Warranty (years)"
              type="number"
              value={editingProduct.warranty}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, warranty: e.target.value })
              }
            />

            <Button className="w-full" onClick={handleSaveChanges}>
              Save Changes
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditProductDialog;