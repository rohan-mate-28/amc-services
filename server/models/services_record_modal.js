import mongoose from "mongoose";
const serviceSchema=mongoose.Schema({
      customer:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"Customer",
      },
      servicesDate:{
            type:Date,
            required:true,
      },
      workDone:{
            type:String,
            required:true,
      },
      partchanged:{
            type:String,
      },
      notes:{
            type:String
      }

},{timestamps:true});
export const Service=mongoose.model("Service",serviceSchema);