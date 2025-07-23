import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Admin } from "../models/admin_modal.js";
dotenv.config();

///login '
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    let user = await Admin.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email",
        success: false,
      });
    }
    let ispassword = await bcrypt.compare(password, user.password);
    if (!ispassword) {
      return res.status(400).json({
        message: "Incorrect Password",
        success: false,
      });
    }
    const tokenData = {
      id: user._id,
    };
    const token = jwt.sign(tokenData, process.env.JWT_SECRET, {
      expiresIn: "1m",
    });
    user = {
      id: user._id,
      firstName:user.firstName,
      lastName:user.lastName,
      email: user.email,
        
    };
    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge:1*60*1000,
        sameSite: "None",
      })
      .json({
        message: `Welcome back ${user.firstName}`,
        user,
        token,
        success: true,
      });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      message: "Server error during login",
      success: false,
    });
  }
};
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
      
    });
    return res.status(200).json({
      message: "Logout successfully",
      success: true,
    });
  } catch (e) {
    console.error("Logout error:", e);
    return res.status(500).json({
      message: "Logout failed",
      success: false,
    });
  }
};