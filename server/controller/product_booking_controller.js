import { ProductOrder } from "../models/product_order_schema.js";
import { Product } from "../models/product_modal.js";

export const bookProduct = async (req, res) => {
  try {
    const { productId } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found", success: false });
    }

    const order = await ProductOrder.create({
      customer: req.user._id,
      product: productId,
      status: "Pending",
    });

    return res.status(201).json({
      message: "Product booking received. Please scan/call to confirm.",
      order,
      success: true,
    });
  } catch (err) {
    console.error("Product Booking Error:", err);
    return res.status(500).json({ message: "Server error", success: false });
  }
};
