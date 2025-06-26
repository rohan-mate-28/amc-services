import express from "express";
import { protuctAdmin, protuctCustomer } from "../middleware/isAunthicated.js";
import { bookProduct } from "../controller/product_booking_controller.js";
import { confirmProductBooking, getPendingProductOrders } from "../controller/product_confirm_admin.js";
const router=express.Router();
router.route("/pendingproduct").get(protuctAdmin, getPendingProductOrders);
router.route("/bookproduct").post(protuctCustomer,bookProduct);
router.route("/:id/confirm").patch(protuctAdmin,confirmProductBooking);
export default router;