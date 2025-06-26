import express from "express";
import { login, logout } from "../controller/admin_controller.js";
import { protuctAdmin } from "../middleware/isAunthicated.js";
const router=express.Router();
router.route("/login").post(login);
router.route("/logout").get(protuctAdmin,logout);
export default router;