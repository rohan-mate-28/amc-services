import { Customer } from "../models/customer_modal.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
dotenv.config();
export const register = async (req, res) => {
  try {
    console.error(req.body);
    const { firstName, lastName, email, password,phone } = req.body;
    if (!firstName || !lastName || !password || !email ||!phone) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    let user = await Customer.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists with this email",
        success: false,
      });
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    await Customer.create({
      firstName,
      lastName,
      email,
      phone,
      password: hashedpassword,
    });
    return res.status(201).json({
      message: "register successfully",
      success: true,
    });
  } catch (e) {
    console.error(e);
    return res.status(401).json({
      message: "some error is occured",
      success: false,
    });
  }
};
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
    let user = await Customer.findOne({ email });
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
      expiresIn: "7d",
    });
    user = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
    };
    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7*24*60*60*1000,
        sameSite: "None",
         
      })
      .json({
        message: `Welcome back ${user.firstName}`,
        user,
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
export const updateprofile = async (req, res) => {
  try {
    const { firstName, lastName, password, phone } = req.body;
    const user = await Customer.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        message: "User not Found",
        success: false,
      });
    }

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (phone) user.phone = phone;
    if (password) {
      const hashedpassword = await bcrypt.hash(password, 10);
      user.password = hashedpassword;
    }

    await user.save();

    // strip password
    const { password: _pw, ...updatedUser } = user.toObject();

    return res.status(200).json({
      message: "Profile updated successfully",
      success: true,
      user: updatedUser,   // <-- key name: user
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Server error", success: false });
  }
}; 