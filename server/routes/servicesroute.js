import express from "express";
import { protuctAdmin, protuctCustomer } from "../middleware/isAunthicated.js";
import { completeServiceRequest, getAllAMCMembers, getCustomerServices, getMyServiceHistory, getPendingServiceRequests, raiseServiceRequest } from "../controller/service_controller.js";
const router=express.Router();
router.route("/raiseServiceRequest").post(protuctCustomer,raiseServiceRequest)
router.route("/getPendingServiceRequests").get(protuctAdmin,getPendingServiceRequests);
router.route("/:id/completeServiceRequest").post(protuctAdmin,completeServiceRequest);
router.route("/:customerId/getCustomerServices").get(protuctAdmin,getCustomerServices);
router.route("/getMyServiceHistory").get(protuctCustomer,getMyServiceHistory)
router.route("/getAllMembers").get(protuctAdmin,getAllAMCMembers);

export default router;