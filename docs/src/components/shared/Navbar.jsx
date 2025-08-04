// import React, { useEffect, useState, useRef } from "react";

import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { LogOut, User2, Menu, Loader2 } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axiosInstance from "../../Utils/axios.js";
import { ADMIN_API_END_POINT, CUSTOMER_API_END_POINT } from "@/Utils/constant";
import { logout as logoutAction } from "@/redux/authSlice";
import { persistor } from "@/redux/store";
import { useState } from "react";
import logo from "../../../public/logo.jpeg";
// Admin email logic
const ADMIN_EMAIL = "rohanmate157@gmail.com";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth); // user can be null, false, or user object
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Check if admin
  const isAdmin = user && user !== false && user.email === ADMIN_EMAIL;

  // ---------------------------------------
  // AUTH CHECK ONCE AT APP LOAD
  // ---------------------------------------
  // const hasCheckedRef = useRef(false);
  // useEffect(() => {
  //   if (user !== null) return; // Already resolved
  //   if (hasCheckedRef.current) return;
  //   hasCheckedRef.current = true;

  //   const checkAuth = async () => {
  //     try {
  //       const { data } = await axiosInstance.get(`${ADMIN_API_END_POINT}/me`, { withCredentials: true });
  //       dispatch(setUser({ ...data.user, role: "admin" }));
  //       return;
  //     } catch (e) {
  //               console.warn("No active session:", e?.response?.status);

  //     }

  //     try {
  //       const { data } = await axiosInstance.get(`${CUSTOMER_API_END_POINT}/me`, { withCredentials: true });
  //       dispatch(setUser({ ...data.user, role: "customer" }));
  //       return;
  //     } catch (err) {
  //       console.warn("No active session:", err?.response?.status);
  //       dispatch(logoutAction()); // user = false
  //     }
  //   };

  //   checkAuth();
  // }, [user, dispatch]);

  // ---------------------------------------
  // LOGOUT HANDLER
  // ---------------------------------------
  const [loggingOut, setLoggingOut] = useState(false);

  const logoutHandler = async () => {
    if (loggingOut) return;
    setLoggingOut(true);

    const endpoint = isAdmin
      ? `${ADMIN_API_END_POINT}/logout`
      : `${CUSTOMER_API_END_POINT}/logout`;

    try {
      await axiosInstance.post(endpoint, null, { withCredentials: true }); // ✅ FIXED
      toast.success("Logged out");
    } catch (error) {
      console.warn("Logout request error:", error?.response?.status, error?.message);
     } finally {
      // Always clear client auth
      dispatch(logoutAction());      // user = false
      await persistor.purge?.();     // clear persisted redux
      navigate("/");
      setLoggingOut(false);
    }
  };

  // ---------------------------------------
  // NAV LINKS
  // ---------------------------------------
  const NavLinks = () => {
    if (user === null) {
      return (
        <li className="text-xs text-muted-foreground flex items-center gap-1">
          <Loader2 className="h-3 w-3 animate-spin" /> Checking...
        </li>
      );
    }

    if (user === false) {
      return (
        <>
          <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
          <li><Link to="/login" className="hover:text-blue-600">Login</Link></li>
        </>
      );
    }

    if (isAdmin) {
      return (
        <>
          <li><Link to="/admin/members">Members</Link></li>
          <li><Link to="/admin/orders">AMC Orders</Link></li>
          <li><Link to="/admin/request">AMC Requests</Link></li>
          <li><Link to="/admin/products">ADD Products</Link></li>
          <li><Link to="/admin/pendingorders">Products Orders</Link></li>
        </>
      );
    }

    return (
      <>
        <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
        <li><Link to="/amcplan" className="hover:text-blue-600">AMC Plans</Link></li>
      </>
    );
  };

  // ---------------------------------------
  // RENDER
  // ---------------------------------------
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
         <Link to="/" className="block max-w-[10rem] sm:max-w-[12rem] md:max-w-[16rem]">
  <img
    src={logo}
    alt="Shakti Logo"
    className="w-full h-auto max-h-16 object-contain"
  />
</Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-6">
          <ul className="flex flex-row gap-6 text-sm font-medium">
            <NavLinks />
          </ul>

          {user && user !== false && (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  Welcome, {user.firstName || "User"}!
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-4">
                <div className="mb-3">
                  <p className="font-semibold text-sm">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <div className="flex flex-col gap-2">
                  {!isAdmin && (
                    <Button asChild variant="ghost" className="justify-start w-full">
                      <Link to="/profile">
                        <User2 className="mr-2 h-4 w-4" /> My Profile
                      </Link>
                    </Button>
                  )}
                  <Button
                    onClick={logoutHandler}
                    variant="ghost"
                    className="justify-start w-full"
                    disabled={loggingOut}
                  >
                    {loggingOut
                      ? <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      : <LogOut className="mr-2 h-4 w-4" />}
                    Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Mobile */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 p-6">
              <SheetHeader>
                <SheetTitle className="sr-only">Menu</SheetTitle>
              </SheetHeader>
              <ul className="flex flex-col gap-4 text-sm font-medium">
                <NavLinks />
              </ul>
              {user && user !== false && (
                <div className="mt-6 space-y-2">
                  {!isAdmin && (
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/profile">My Profile</Link>
                    </Button>
                  )}
                  <Button
                    onClick={logoutHandler}
                    variant="destructive"
                    className="w-full"
                    disabled={loggingOut}
                  >
                    {loggingOut ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      "Logout"
                    )}
                  </Button>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
