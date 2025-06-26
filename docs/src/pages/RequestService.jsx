import React, { useState } from "react";
import axios from "axios";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CUSTOMER_SERVICE_API_END_POINT } from "@/Utils/constant";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const RequestService = () => {
      const [issue, setissue] = useState("");
      const [loading, setLoading] = useState(false);

      const handleRequestSubmit = async (e) => {
            e.preventDefault();
            if (!issue.trim()) {
                  toast.error("Please enter a message");
                  return;
            }


            try {
                  setLoading(true);
                  const res = await axios.post(
                        `${CUSTOMER_SERVICE_API_END_POINT}/raiseServiceRequest`,
                        { issue },
                        { withCredentials: true }
                  );

                  if (res.data.success) {
                        toast.success("Service request submitted successfully!");
                        setissue("");
                  }
            } catch (error) {
                  console.error(error);
                  toast.error(error.response?.data?.message || "Something went wrong");
            } finally {
                  setLoading(false);
            }
      };

      return (
            <section className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
                  <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-md">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                              Request a Service
                        </h2>
                        <p className="text-gray-600 text-sm mb-6 text-center">
                              If you’re facing any issue with your aqua/filter system, raise a service request and our team will get in touch with you.
                        </p>


                        <form onSubmit={handleRequestSubmit} className="space-y-4">
                              <label className="block text-sm font-medium text-gray-700">
                                    Describe the issue
                              </label>
                              <Textarea
                                    placeholder="E.g. Water flow is low, filter not working, etc."
                                    rows={4}
                                    value={issue}
                                    onChange={(e) => setissue(e.target.value)}
                              />

                              <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={loading}
                              >
                                    {loading ? (
                                          <div className="flex items-center gap-2">
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                                Submitting...
                                          </div>
                                    ) : (
                                          "Submit Request"
                                    )}
                              </Button>
                        </form>
                  </div>
            </section>
      );
};

export default RequestService;