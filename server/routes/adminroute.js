import express from "express";
import { login, logout } from "../controller/admin_controller.js";
const router=express.Router();
router.route("/login").post(login);
router.route("/logout").post(logout);
export default router;