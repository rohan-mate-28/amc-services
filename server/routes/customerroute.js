import express from "express";
import { login, logout, register, updateprofile} from "../controller/customer_controller.js"
import { protuctCustomer } from "../middleware/isAunthicated.js";
const router=express.Router();
router.route("/login").post(login);
router.route("/register").post(register);
router.route("/logout").post(logout);
router.route("/updateprofile").post(protuctCustomer,updateprofile);
export default router;