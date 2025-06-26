import { Service } from "../models/services_record_modal.js";
import { Customer } from "../models/customer_modal.js";
import { ServiceRequest } from "../models/servicesrequest_modal.js";
import { Order } from "../models/order_modal.js";

 
export const getAllAMCMembers = async (req, res) => {
  try {
     const orders = await Order.find({ status: "Confirmed" })
      .populate("customer", "-password")
      .sort({ startDate: -1 });

    return res.status(200).json({
      members: orders,  
      success: true,
    });
  } catch (err) {
    console.error("Fetch AMC Members Error:", err);
    return res.status(500).json({
      message: "Server error while fetching members",
      success: false,
    });
  }
};


// Customer raises a service request
export const raiseServiceRequest = async (req, res) => {
  try {
    const { issue } = req.body;

    const request = await ServiceRequest.create({
      customer: req.user._id,
      message:issue,
      status: "Pending",
      requestDate: new Date(),
    });

    return res.status(201).json({ message: "Service request raised", request, success: true });
  } catch (err) {
    console.error("Raise Service Request Error:", err);
    return res.status(500).json({ message: "Server error", success: false });
  }
};


// Admin gets all pending service requests for today
export const getPendingServiceRequests = async (req, res) => {
  try {
    const requests = await ServiceRequest.find({
      status: "Pending",
    }).populate("customer", "firstName lastName email phone");

    return res.status(200).json({ requests, success: true });
  } catch (err) {
    console.error("Get Pending Service Requests Error:", err);
    return res.status(500).json({ message: "Server error", success: false });
  }
};





// Admin completes a service request and adds service record
export const completeServiceRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { serviceType, partsReplaced, notes } = req.body;

    const request = await ServiceRequest.findById(id);
    if (!request) {
      return res.status(404).json({ message: "Request not found", success: false });
    }

    request.status = "Completed";
    await request.save();

    const record = await Service.create({
      customer: request.customer,
      workDone:serviceType,
      partchanged:partsReplaced,
      notes,
      servicesDate: new Date(),
    });

    return res.status(200).json({ message: "Service completed and recorded", record, success: true });
  } catch (err) {
    console.error("Complete Service Request Error:", err);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

// Admin or customer gets all services for a specific customer
export const getCustomerServices = async (req, res) => {
  try {
    const { customerId } = req.params;

    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found", success: false });
    }

    const records = await Service.find({ customer: customerId }).sort({ date: -1 });

    return res.status(200).json({ records, success: true });
  } catch (err) {
    console.error("Get Service Records Error:", err);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

// Customer gets only their own services
export const getMyServiceHistory = async (req, res) => {
  try {
    const records = await Service.find({ customer: req.user._id }).sort({ date: -1 });

    return res.status(200).json({ records, success: true });
  } catch (err) {
    console.error("My Services Error:", err);
    return res.status(500).json({ message: "Server error", success: false });
  }
};
