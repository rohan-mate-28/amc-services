import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../Utils/axios.js";
import { useDispatch, useSelector } from "react-redux";
import {
  setMemberHistoryLoading,
  setMemberHistoryRecords,
  setMemberHistoryError,
} from "@/redux/memberHistorySlice";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import {ADMIN_SERVICE_MEMBER_API_END_POINT} from "../Utils/constant"
const MemberHistory = () => {
  const { customerId } = useParams();
  const dispatch = useDispatch();
  const { loading, error, records } = useSelector((state) => state.memberHistory);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        dispatch(setMemberHistoryLoading(true));
        const { data } = await axiosInstance.get(`${ADMIN_SERVICE_MEMBER_API_END_POINT}/${customerId}/getCustomerServices`, {
          withCredentials: true,
        });
        dispatch(setMemberHistoryRecords(data.records || []));
      } catch (err) {
        dispatch(setMemberHistoryError("Failed to load service history"));
        console.error("Failed to fetch service history", err);
      } finally {
        dispatch(setMemberHistoryLoading(false));
      }
    };
    fetchHistory();
  }, [customerId, dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
        <span className="ml-2 text-blue-700">Loading service history...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="shadow-md border rounded-xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-gray-800">
              Service History
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {error ? (
              <p className="text-red-500 text-center">{error}</p>
            ) : records.length === 0 ? (
              <p className="text-gray-600 text-center">No service history found.</p>
            ) : (
              records.map((record) => (
                <div key={record._id} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm" >
                  <p className="text-sm text-gray-700">
                    <strong>Service:</strong> {record.workDone}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Parts Changed:</strong> {record.partchanged || "None"}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong>Notes:</strong> {record.notes}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Date:</strong>{" "}
                    {new Date(record.servicesDate).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MemberHistory;