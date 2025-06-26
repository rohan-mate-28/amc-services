import { Product } from "../models/product_modal.js";
import { v2 as cloudinary } from "cloudinary";
import getDataUri from "../Utils/dataUri.js";
import dotenv from "dotenv";
dotenv.config();
// ✅ Add Product
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export default cloudinary;
export const addProduct = async (req, res) => {
  try {
    const { name, features, price, discountPrice, warranty } = req.body;

    if (!req.file) {
      return res
        .status(400)
        .json({ message: "Product image is required", success: false });
    }
    const image = req.file;
    const imageUri = getDataUri(image);
    const cludResponse = await cloudinary.uploader.upload(imageUri.content);
    console.log(cludResponse.public_id);
    const product = await Product.create({
      name,
      features: features.split(",").map((f) => f.trim()),
      price,
      discountPrice,
      warranty,
      image: {
        url:cludResponse.secure_url,
        public_id: cludResponse.public_id,
      },
    });

    return res
      .status(201)
      .json({ message: "Product added", product, success: true });
  } catch (err) {
    console.error("Add Product Error:", err);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

// ✅ Update Product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (updateData.features && typeof updateData.features === "string") {
      updateData.features = updateData.features.split(",").map((f) => f.trim());
    }

    const product = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found", success: false });
    }

    return res
      .status(200)
      .json({ message: "Product updated", product, success: true });
  } catch (err) {
    console.error("Update Product Error:", err);
    return res.status(500).json({ message: "Server error", success: false });
  }
};
// GET /api/v1/crudsproduct/all
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    return res.status(200).json({
      message: "All products fetched successfully",
      products,
      success: true,
    });
  } catch (err) {
    console.error("Get All Products Error:", err);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

// ✅ Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found", success: false });
    }

    const publicId = product.image?.public_id;
    console.log("Public ID to delete from Cloudinary:", publicId);

    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }

    await product.deleteOne();

    return res.status(200).json({ message: "Product and image deleted", success: true });
  } catch (err) {
    console.error("Delete Product Error:", err);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

