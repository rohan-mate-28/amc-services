import express from "express";
import { login, logout } from "../controller/admin_controller.js";
import { protuctAdmin } from "../middleware/isAunthicated.js";
const router=express.Router();
router.route("/login").post(login);
router.route("/logout").post(logout);
// router.get("/me",protuctAdmin, (req, res) => {
//   res.status(200).json({ user: req.user });
// });
export default router;