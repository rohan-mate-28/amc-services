import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMembers, setLoading, setError } from "@/redux/membersSlice";
import { ADMIN_SERVICE_MEMBER_API_END_POINT } from "@/Utils/constant";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ActiveMembers = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Members, loading } = useSelector((state) => state.members);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        dispatch(setLoading(true));
        const { data } = await axios.get(`${ADMIN_SERVICE_MEMBER_API_END_POINT}/getAllMembers`, {
          withCredentials: true,
        });
        dispatch(setMembers(data.members || []));
      } catch (err) {
        console.error("Fetch members failed", err);
        dispatch(setError("Failed to load members"));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchMembers();
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
          Active AMC Members
        </h2>

        {loading ? (
          <div className="flex justify-center items-center gap-2 py-10 text-blue-600">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Loading members...</span>
          </div>
        ) : Members.length === 0 ? (
          <p className="text-gray-600 text-center py-8">
            No active AMC members found.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Members.map((m) => (
              <Card key={`${m._id}-${m.customer?._id}`} className="border shadow-md">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-gray-800">
                    {m.customer?.firstName} {m.customer?.lastName}
                  </CardTitle>
                  <p className="text-sm text-gray-500">{m.customer?.email}</p>
                </CardHeader>
                <CardContent className="space-y-1 text-sm text-gray-700">
                  <p><strong>Phone:</strong> {m.customer?.phone || "N/A"}</p>
                  <p><strong>Plan:</strong> {m.planType}</p>
                  <p><strong>Start:</strong> {new Date(m.startDate).toLocaleDateString()}</p>
                  <p><strong>End:</strong> {new Date(m.endDate).toLocaleDateString()}</p>
                  <Button
                    size="sm"
                    className="mt-3 bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() =>
                      navigate(`/admin/customer/${m.customer?._id}/service-history`)
                    }
                  >
                    View Service History
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveMembers;
