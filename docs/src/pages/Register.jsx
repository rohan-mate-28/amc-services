import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import axiosInstance from "../Utils/axios.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CUSTOMER_API_END_POINT } from "@/Utils/constant";
import { Loader2 } from "lucide-react";
import { setloading } from "@/redux/authSlice";

const Register = () => {
  const { loading } = useSelector((store) => store.auth);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      dispatch(setloading(true));
      const { data } = await axiosInstance.post(`${CUSTOMER_API_END_POINT}/register`,
        form,
        { withCredentials: true }
      );
      if (data.success) {
        toast.success("Registration successful");
         
        navigate("/login");
      }
    } catch (err) {
      console.error(err);
       
    } finally {
      dispatch(setloading(false));
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <Card className="w-full max-w-md p-4">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Create an Account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <Input type="text" name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} required />
              <Input type="text" name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} required />
            </div>
            <Input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
            <Input
              type="tel"
              name="phone"
              maxLength={10}
              pattern="\d{10}"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              required
            />
            <Input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
            {
              loading ? (
                <Button type="submit" className="w-full">
                  <Loader2 />
                  Please wait
                </Button>
              ) : (

                <Button type="submit" className="w-full">
                  Register
                </Button>
              )
            }
          </form>
          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;