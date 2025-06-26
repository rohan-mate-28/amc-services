import mongoose from "mongoose";
const servicesRequestSchema=mongoose.Schema({
      customer:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Customer",
            required:true,
      },
      message:{
            type:String,
            required:true,
      },
      status:{
            type:String,
            enum:["Pending","Completed"],
            default:"Pending",
      },
      requestDate:{
            type:Date,
            default:Date.now,
      }
},{timestamps:true});
export const ServiceRequest=mongoose.model("ServiceRequest",servicesRequestSchema)