import mongoose from "mongoose";
const customerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phone:{
      type:Number,
      required:true
    },
    isMember: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    productsOwned: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductOrder",
    },
  },
  { timestamps: true }
);
export const Customer = mongoose.model("Customer", customerSchema);
