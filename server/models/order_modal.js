import mongoose, { Mongoose }  from "mongoose";
const orderSchema=new mongoose.Schema({
      customer:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Customer",
            required:true
      },
      planType:{
            type:String,
            enum:["1-year","4-year"],
            required:true
      },
      price:{
            type:Number,
            required:true
      },
      paymentType:{
            type:String,
            enum:["qr","call"],
            default:"qr",
      },
      status:{
            type:String,
            enum:["Pending","Confirmed"],
            default:"Pending",
      },
       recepitUrl:{
            type:String,
       },
       startDate:{
            type:Date,
       },
       endDate:{
            type:Date,
       }

},{timestamps:true});
export const Order=mongoose.model("Order",orderSchema);