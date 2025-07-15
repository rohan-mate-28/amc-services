import React, { useEffect, useState } from "react";
import axiosInstance from "../Utils/axios.js";
import { useDispatch, useSelector } from "react-redux";
import {
      setRequest,
      setloading,
} from "@/redux/requestSlice"; // make sure the reducer name matches
import { toast } from "sonner";
import {
      Card,
      CardHeader,
      CardTitle,
      CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

 
import { Loader2 } from "lucide-react";
import { ADMIN_SERVICE_MEMBER_API_END_POINT } from "@/Utils/constant";

const AdminServiceRequests = () => {
      const dispatch = useDispatch();
      const { requests, loading } = useSelector((state) => state.request);
      const [formData, setFormData] = useState({}); // { requestId: { serviceType, partsReplaced, notes } }

      // Fetch pending service requests
      useEffect(() => {
            const fetchRequests = async () => {
                  try {
                        dispatch(setloading(true));
                        const { data } = await axiosInstance.get(`${ADMIN_SERVICE_MEMBER_API_END_POINT}/getPendingServiceRequests`, {
                              withCredentials: true,
                        });
                        dispatch(setRequest(data.requests || []));
                  } catch (err) {
                        console.error("Error fetching service requests", err);
                        toast.error("Failed to load service requests");
                  } finally {
                        dispatch(setloading(false));
                  }
            };

            fetchRequests();
      }, [dispatch]);

      const handleInputChange = (id, field, value) => {
            setFormData((prev) => ({
                  ...prev,
                  [id]: {
                        ...prev[id],
                        [field]: value,
                  },
            }));
      };

      const handleComplete = async (id) => {
            const payload = formData[id];
            if (!payload?.serviceType || !payload?.notes) {
                  return toast.error("Please fill in service type and notes");
            }

            try {
                  dispatch(setloading(true));
                  const res = await axiosInstance.post(
                        `${ADMIN_SERVICE_MEMBER_API_END_POINT}/${id}/completeServiceRequest`,
                        payload,
                        {
                              withCredentials: true,
                        }
                  );

                  if (res.data.success) {
                        toast.success(res.data.message);
                        // Remove the completed request from UI
                        dispatch(setRequest(requests.filter((r) => r._id !== id)));
                        dispatch(setloading(false));
                  }
            } catch (err) {
                  console.error("Complete request error", err);
                  toast.error(err.response?.data?.message || "Something went wrong");
            }
      };

      if (loading) {
            return (
                  <div className="min-h-screen flex items-center justify-center">
                        <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
                        <span className="ml-2 text-blue-700">Loading service requests...</span>
                  </div>
            );
      }

      return (
            <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8 bg-gray-50">
                  <div className="max-w-5xl mx-auto space-y-6">
                        <h2 className="text-2xl font-bold text-gray-800">Pending Service Requests</h2>

                        {requests.length === 0 ? (
                              <p className="text-gray-500 text-center">No pending requests found.</p>
                        ) : (
                              requests.map((req) => (
                                    <Card key={req._id} className="shadow-md border rounded-xl">
                                          <CardHeader>
                                                <CardTitle className="text-lg font-semibold">
                                                      {req.customer?.firstName} {req.customer?.lastName} — {req.customer?.email}
                                                </CardTitle>
                                                <p className="text-sm text-gray-500">{req.customer?.phone}</p>
                                          </CardHeader>
                                          <CardContent className="space-y-4">
                                                <div>
                                                      <p className="text-sm text-gray-700">
                                                            <strong>Message:</strong> {req.message}
                                                      </p>
                                                      <p className="text-sm text-gray-500">
                                                            <strong>Date:</strong>{" "}
                                                            {new Date(req.requestDate).toLocaleDateString()}
                                                      </p>
                                                </div>

                                                <div className="grid gap-3 sm:grid-cols-2">
                                                      <Input
                                                            placeholder="Service Type"
                                                            value={formData[req._id]?.serviceType || ""}
                                                            onChange={(e) =>
                                                                  handleInputChange(req._id, "serviceType", e.target.value)
                                                            }
                                                      />
                                                      <Input
                                                            placeholder="Parts Replaced"
                                                            value={formData[req._id]?.partsReplaced || ""}
                                                            onChange={(e) =>
                                                                  handleInputChange(req._id, "partsReplaced", e.target.value)
                                                            }
                                                      />
                                                </div>
                                                <Textarea
                                                      placeholder="Service Notes"
                                                      value={formData[req._id]?.notes || ""}
                                                      onChange={(e) =>
                                                            handleInputChange(req._id, "notes", e.target.value)
                                                      }
                                                />

                                                <div className="text-right">
                                                      <Button
                                                            onClick={() => handleComplete(req._id)}
                                                            className="bg-green-600 hover:bg-green-700 text-white"
                                                      >
                                                            Mark as Completed
                                                      </Button>
                                                </div>
                                          </CardContent>
                                    </Card>
                              ))
                        )}
                  </div>
            </div>
      );
};

export default AdminServiceRequests;
