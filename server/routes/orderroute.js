import express from "express";
import { protuctAdmin, protuctCustomer } from "../middleware/isAunthicated.js";
import { buyPlan, confirmOrder, getAllOrders, myOrders } from "../controller/order_controller.js";
const router=express.Router();
router.route("/buyplan").post(protuctCustomer,buyPlan);
router.route("/myOrders").get(protuctCustomer,myOrders);
router.route("/getAllorder").get(protuctAdmin,getAllOrders);
router.route("/:id/confirmOrder").patch(protuctAdmin,confirmOrder);

export default router;