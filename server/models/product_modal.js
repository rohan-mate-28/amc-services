import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  features: {
    type: [String],  
    required: true,
  },
  image:{
    url:{
      type:String
    },
    public_id:{
      type:String,
      required:true
    }
    
},
  price: {
    type: Number,
    required: true,
  },
  discountPrice: {
    type: Number,
  },
  warranty: {
    type: Number,  
    required: true,
  },
}, { timestamps: true });

export const Product = mongoose.model("Product", productSchema);
