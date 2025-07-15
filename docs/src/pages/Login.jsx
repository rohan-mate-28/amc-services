import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import axiosInstance from "../Utils/axios.js";
import { useDispatch, useSelector } from "react-redux";
import { setloading, setUser } from "@/redux/authSlice";
import { useNavigate } from "react-router-dom";
import { ADMIN_API_END_POINT, CUSTOMER_API_END_POINT } from "@/Utils/constant";
import { Loader2 } from "lucide-react";

const Login = () => {
  const { loading } = useSelector((store) => store.auth);
  const [form, setForm] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      return toast.error("Please fill in both fields");
    }


    try {
      dispatch(setloading(true));
      const endpoint =
        form?.email === "rohanmate157@gmail.com"
          ? `${ADMIN_API_END_POINT}/login`
          : `${CUSTOMER_API_END_POINT}/login`;
      const { data } = await axiosInstance.post(
        `${endpoint}`,
        form,
        { withCredentials: true }
      );

      if (data.success) {
        toast.success(data.message || "Login successful");
        dispatch(setUser(data.user));
        if (data.user.email === "rohanmate157@gmail.com") {
          navigate("/");
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      console.log("Login error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Login failed");
    }
    finally {
      dispatch(setloading(false));
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md p-4 shadow-lg border">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Login to Aqua Services</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              type="email"
              name="email"
              placeholder="Email"
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
            {
              loading ? (
                <Button type="submit" className="w-full">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please Wait </Button>

              ) : (
                <Button type="submit" className="w-full">Login</Button>
              )}

          </form>
          <p className="text-sm text-center mt-4">
            Don’t have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </p>
        </CardContent>
      </Card>
    </div >
  );
};

export default Login;
