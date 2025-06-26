import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import axios from "../Utils/axios/js";
import { useDispatch } from "react-redux";
import { setUser } from "@/Redux/authSlice";
import { useNavigate } from "react-router-dom";
import { ADMIN_API_END_POINT } from "@/Utils/constant";

const Adminlogin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      return toast.error("Please enter both email and password");
    }

    try {
      const { data } = await axios.post(
        `${ADMIN_API_END_POINT}/login`,
        form,
        { withCredentials: true }
      );

      if (data.success) {
        toast.success(data.message || "Admin Login successful");
        dispatch(setUser(data.user));
        navigate("/admin/dashboard");
      }
    } catch (err) {
      console.log("Admin Login error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-4 shadow-lg border">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="email"
              name="email"
              placeholder="Admin Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Adminlogin;
