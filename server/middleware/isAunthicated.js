import jwt from "jsonwebtoken";
import {Customer} from "../models/customer_modal.js"
import  { Admin } from "../models/admin_modal.js"
const protuctCustomer = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "Login Please",
        success: false,
      });
    }
    const decode = await jwt.verify(token, process.env.JWT_SECRET);
    const customer=await Customer.findById(decode.id).select("-password");
    if (!customer) {
      return res.status(401).json({
        message: "customer not found",
        success: false,
      });
    }
    req.user = customer;
    next();
  } catch (err) {
    console.log(err);
     return res.status(401).json({
      message: "Invalid or expired token",
      success: false,
    });
  }
};

  const protuctAdmin=async(req,res,next)=>{
  try{
    const token=req.cookies.token;
    if(!token){
      return res.status(401).json({
        message:"Login Please",
        success:false,
      });
    }
      const decode=jwt.verify(token,process.env.JWT_SECRET);
      const admin=await Admin.findById(decode.id).select("-password");
      if(!decode){
        return res.status(401).json({
          message:"Admin not fount",
          success:false,
        });
      }
      req.user=admin;
      next();
  }catch(err){
    console.log(err);
    return res.status(401).json({
      message:"some error is occured",
      success:false,
    });
  }
}
export  { protuctCustomer, protuctAdmin };
