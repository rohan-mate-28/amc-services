 import { ProductOrder } from "../models/product_order_schema.js";
import { Customer } from "../models/customer_modal.js";
import {Product} from "../models/product_modal.js";
export const confirmProductBooking = async (req, res) => {
  try {
    const order = await ProductOrder.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: "Order not found", success: false });
    }

    if (order.status === "Confirmed") {
      return res.status(400).json({ message: "Already confirmed", success: false });
    }

    order.status = "Confirmed";
    order.startDate = new Date();
    order.confirmedAt = new Date();
    const product = await Product.findById(order.product);
    const warrantyYears = product?.warranty || 1;

    // Set endDate based on warranty
    const endDate = new Date(order.startDate);
    endDate.setFullYear(endDate.getFullYear() + warrantyYears);
    order.endAt  = endDate;
    await order.save();

    // Mark customer as product AMC member
    const customer = await Customer.findById(order.customer);
    if (customer) {
      customer.isMember = true;
      await customer.save();
    }

    return res.status(200).json({
      message: "Booking confirmed and customer added to AMC for this product",
      success: true,
    });
  } catch (err) {
    console.error("Confirm Product Booking Error:", err);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

    export const getPendingProductOrders = async (req, res) => {
      try {
        const pendingOrders = await ProductOrder.find({ status: "Pending" })
          .populate("customer", "firstName lastName email phone")
          .populate("product", "name price");

        return res.status(200).json({
          orders: pendingOrders,
          success: true,
        });
      } catch (err) {
        console.error("Fetch Pending Product Orders Error:", err);
        return res.status(500).json({
          message: "Failed to fetch pending product orders",
          success: false,
        });
      }
    };
