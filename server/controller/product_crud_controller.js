import { Product } from "../models/product_modal.js";
import { v2 as cloudinary } from "cloudinary";
import getDataUri from "../Utils/dataUri.js";
import dotenv from "dotenv";
dotenv.config();

// Define cache variables here, outside of any function,
// so they persist across requests.
let cachedProducts = null;
let lastCacheTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

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
        url: cludResponse.secure_url,
        public_id: cludResponse.public_id,
      },
    });

    // --- CHANGE 1: Cache Invalidation in addProduct ---
    cachedProducts = null;
    lastCacheTime = 0;
    // Effect: After a new product is added, the cached list of products
    // is cleared. This ensures the next request to getAllProducts
    // will fetch the *latest* list from the database, including the new product.

    return res
      .status(201)
      .json({ message: "Product added", product, success: true });
  } catch (err) {
    console.error("Add Product Error:", err);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

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

    // --- CHANGE 2: Cache Invalidation in updateProduct ---
    cachedProducts = null;
    lastCacheTime = 0;
    // Effect: After a product is updated, the cached list of products
    // is cleared. This ensures the next request to getAllProducts
    // will fetch the *latest* data for products, reflecting the update.

    return res
      .status(200)
      .json({ message: "Product updated", product, success: true });
  } catch (err) {
    console.error("Update Product Error:", err);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    // --- CHANGE 3: Cache Read Logic in getAllProducts ---
    if (cachedProducts && (Date.now() - lastCacheTime < CACHE_DURATION)) {
      console.log("Serving products from cache"); // You can remove this console.log in production
      return res.status(200).json({
        message: "All products fetched successfully (from cache)",
        products: cachedProducts,
        success: true,
      });
    }

    // --- CHANGE 4: Query Optimization (Projection & lean()) in getAllProducts ---
    console.log("Fetching products from DB and updating cache"); // You can remove this console.log in production
    const products = await Product.find(
      {}, // Filter: empty object means find all documents
      {
        // Projection: Include ONLY the fields your frontend needs.
        // This reduces data transfer and processing load.
        name: 1,
        price: 1,
        discountPrice: 1,
        warranty: 1,
        features: 1,
        'image.url': 1, // Accessing nested URL
        _id: 1 // _id is typically needed by the frontend
      }
    )
    .sort({ createdAt: -1 })
    .lean(); // Convert Mongoose documents to plain JavaScript objects for performance

    // Effect of CHANGE 4:
    // - Projection: Reduces the amount of data transferred from MongoDB
    //   to your Node.js server. If a product document has 20 fields but
    //   your carousel only uses 6, you only ask for those 6. Less data = faster.
    // - lean(): Mongoose usually returns "smart" Mongoose Document objects.
    //   .lean() tells Mongoose to return simple, plain JavaScript objects instead.
    //   This skips the overhead of creating those "smart" objects,
    //   significantly speeding up the query, especially for many documents.

    // --- CHANGE 5: Cache Write Logic in getAllProducts ---
    cachedProducts = products;
    lastCacheTime = Date.now();
    // Effect: After fetching products from the database, they are stored
    // in the `cachedProducts` variable along with the `lastCacheTime`.
    // Subsequent requests within the `CACHE_DURATION` will be served
    // from this cache, making them extremely fast (milliseconds).

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

    // --- CHANGE 6: Cache Invalidation in deleteProduct ---
    cachedProducts = null;
    lastCacheTime = 0;
    // Effect: After a product is deleted, the cached list of products
    // is cleared. This ensures the next request to getAllProducts
    // will fetch the *latest* data from the database, excluding the deleted product.

    return res.status(200).json({ message: "Product and image deleted", success: true });
  } catch (err) {
    console.error("Delete Product Error:", err);
    return res.status(500).json({ message: "Server error", success: false });
  }
};