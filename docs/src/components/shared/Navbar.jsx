import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { LogOut, User2, Menu, Loader2 } from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../ui/popover";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "../../Utils/axios.js";
import { ADMIN_API_END_POINT, CUSTOMER_API_END_POINT } from "@/Utils/constant";
import { setUser } from "@/redux/authSlice";
import { persistor } from "@/redux/store";

const Navbar = () => {
   const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAdmin = user?.email === "rohanmate157@gmail.com";

  const [loggingOut, setLoggingOut] = useState(false);
const logoutHandler = async () => {
  try {
    setLoggingOut(true);

    const endpoint = isAdmin
      ? `${ADMIN_API_END_POINT}/logout`
      : `${CUSTOMER_API_END_POINT}/logout`;

    const res = await axios.get(endpoint, { withCredentials: true });

    if (res.data.success) {
      
      dispatch(setUser(null));   

      
      await persistor.purge();

      toast.success(res.data.message || "Logout successful");
      navigate("/login");
    }
  } catch (error) {
    toast.error(error?.response?.data?.message || "Logout failed");
  } finally {
    setLoggingOut(false);
  }
};

  const NavLinks = () => (
    <ul className="flex flex-col lg:flex-row gap-4 lg:gap-6 text-sm font-medium">
      {!user && (
        <>
          <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
          <li><Link to="/login" className="hover:text-blue-600">Login</Link></li>
        </>
      )}
      {user && isAdmin && (
        <>
          <li><Link to="/admin/dashboard">Dashboard</Link></li>
          <li><Link to="/admin/members">Members</Link></li>
          <li><Link to="/admin/orders">AMC Orders</Link></li>
          <li><Link to="/admin/request">AMC Requests</Link></li>
          <li><Link to="/admin/products">ADD Products</Link></li>
          <li><Link to="/admin/pendingorders">Products Orders</Link></li>
           
        </>
      )}
      {user && !isAdmin && (
        <>
          <li><Link to="/">Home</Link></li>
           
        </>
      )}
    </ul>
  );

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-primary">
          Aqua<span className="text-blue-600">Services</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
          <NavLinks />
          {user && (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  Welcome, {user.firstName} !
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-4">
                <div className="mb-3">
                  <p className="font-semibold text-sm">{user.firstName} {user.lastName}</p>
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
                    {loggingOut ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LogOut className="mr-2 h-4 w-4" />}
                    Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>

        {/* Mobile Nav */}
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
              <NavLinks />
              {user && (
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
                    {loggingOut ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Logout"}
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
