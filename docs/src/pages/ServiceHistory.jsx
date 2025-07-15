import React, { useEffect, useState } from "react";
import axiosInstance from "../Utils/axios.js";
import { CUSTOMER_SERVICE_API_END_POINT } from "@/Utils/constant";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

const ServiceHistory = () => {
const [records, setRecords] = useState([]);
const [loading, setLoading] = useState(false);

const fetchHistory = async () => {
try {
setLoading(true);
const { data } = await axiosInstance.get(
`${CUSTOMER_SERVICE_API_END_POINT}/getMyServiceHistory`,
{ withCredentials: true }
);
setRecords(data.records);
} catch (error) {
console.error("Error fetching history", error);
} finally {
setLoading(false);
}
};

useEffect(() => {
fetchHistory();
}, []);

if (loading) {
return (
<div className="min-h-screen flex justify-center items-center bg-gray-50">
<div className="flex items-center gap-2 text-blue-600">
<Loader2 className="w-5 h-5 animate-spin" />
<span className="font-medium">Loading service history...</span>
</div>
</div>
);
}

return (
<section className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
<div className="max-w-4xl mx-auto">
<h2 className="text-2xl font-bold text-gray-800 mb-6 text-center sm:text-left">
Service History
</h2>

 
    {records.length === 0 ? (
      <p className="text-gray-600 text-center sm:text-left">
        You have no completed service records yet.
      </p>
    ) : (
      <div className="space-y-6">
        {records.map((record, idx) => (
          <Card key={idx} className="border rounded-xl shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-blue-700">
                Service on {new Date(record.servicesDate).toLocaleDateString()}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-700 space-y-1">
              <p><strong>Service:</strong> {record.workDone}</p>
              <p><strong>Parts Replaced:</strong> {record.partchanged || "None"}</p>
              <p><strong>Notes:</strong> {record.notes || "No additional notes."}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    )}
  </div>
</section>
);
};

export default ServiceHistory;