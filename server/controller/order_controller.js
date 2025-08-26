import { Order } from "../models/order_modal.js";
import { Customer } from "../models/customer_modal.js";

 export const buyPlan = async (req, res) => {
  try {
    const { planType } = req.body;

    if (!["1-year", "4-year"].includes(planType)) {
      return res.status(400).json({
        message: "Invalid plan type",
        success: false,
      });
    }

    const price = planType === "1-year" ? 4000 : 10000;

    const order = await Order.create({
      customer: req.user._id,
      planType,
      price,
      status: "Pending",
    });

    return res.status(201).json({
      message: "Plan ordered. Please scan and call to confirm payment.",
      order,
      success: true,
    });
  } catch (err) {
    console.error("Buy Plan Error:", err);
    return res.status(500).json({
      message: "Server error while creating order",
      success: false,
    });
  }
};

 export const myOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.user._id }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      orders,
      success: true,
    });
  } catch (err) {
    console.error("My Orders Error:", err);
    return res.status(500).json({
      message: "Unable to fetch orders",
      success: false,
    });
  }
};

 
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("customer", "-password")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      orders,
      success: true,
    });
  } catch (err) {
    console.error("Get All Orders Error:", err);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const deleteOrder = async (req, res) => {
  try {
     
    const { id } = req.params; // get id properly
    console.log("DELETE order route hit with id:", id);

    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({
        message: "Order not found",
        success: false,
      });
    }
    if (order.status === "Confirmed") {
      await Customer.findByIdAndUpdate(order.customer, { isMember: false });
    }
    await Order.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (err) {
    console.error("Cannot Delete Order Now", err);
    return res.status(500).json({
      message: "Server Issue. Cannot Delete Order Now",
      success: false,
    });
  }
};

 export const confirmOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res
        .status(404)
        .json({ message: "Order not found", success: false });
    }

    if (order.status === "Confirmed") {
      return res
        .status(400)
        .json({ message: "Order already confirmed", success: false });
    }
    const duration = order.planType === "1-year" ? 1 : 4;
    const endDate = new Date();
    endDate.setFullYear(endDate.getFullYear() + duration);

    
    order.status = "Confirmed";
    order.startDate = new Date();
    order.endDate=endDate;
    await order.save();

     
    const customer = await Customer.findById(order.customer);
    if (customer) {
      customer.isMember = true;
      await customer.save();
    }

    return res.status(200).json({
      message: "Order confirmed and customer marked as member",
      success: true,
    });
  } catch (err) {
    console.error("Confirm Order Error:", err);
    return res.status(500).json({
      message: "Server error while confirming order",
      success: false,
    });
  }
};
