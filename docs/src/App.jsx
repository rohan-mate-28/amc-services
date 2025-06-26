import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import AMCPlans from "./pages/AMCPlan.jsx"
import { Toaster } from "./components/ui/sonner.jsx"
import Profile from "./pages/Profile.jsx"
import RequestService from "./pages/RequestService.jsx"
import ActiveMembers from "./pages/ActiveMembers.jsx"
import AMCOrder from "./pages/AMCOrder.jsx"
import AdminServiceRequests from "./pages/AdminServicesRequest.jsx"
import MemberHistory from "./pages/MemberHistory.jsx"
import AddProduct from "./pages/AddProduct.jsx"
import AdminPendingOrders from "./pages/AdminPendingOrders.jsx"
import OrderConfirmationDialog from "./pages/OrderConfirmationDialog.jsx"

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/amcplan",
    element: <AMCPlans />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/service-request",
    element: <RequestService />
  },
  {
    path: "/admin/members",
    element: <ActiveMembers />
  },
  {
    path: "/admin/orders",
    element: <AMCOrder />
  },
  {
    path: "/admin/request",
    element: <AdminServiceRequests />
  },
  {
    path: "/admin/customer/:customerId/service-history",
    element: <MemberHistory />
  },
  {
    path: "/admin/products",
    element: <AddProduct />
  },
  {
    path: "/admin/pendingorders",
    element: <AdminPendingOrders />
  },
  {
    path: "/ConfirmOrder",
    element: <OrderConfirmationDialog/>
  }
])

function App() {

  return (
    <>
      <RouterProvider router={appRouter} />
      <Toaster richColors position="top-right" />

    </>
  )
}

export default App
