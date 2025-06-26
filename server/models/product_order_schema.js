import mongoose from "mongoose";

const productOrderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Confirmed"],
    default: "Pending",
  },
  paymentType: {
    type: String,
    enum: ["qr", "call"],
    default: "qr",
  },
   startDate: {
    type: Date,
  },
  confirmedAt: {
    type: Date,
  },
  endAt: {
    type: Date,
  }
}, { timestamps: true });

export const ProductOrder = mongoose.model("ProductOrder", productOrderSchema);
