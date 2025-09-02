import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { lazy, Suspense } from "react"
import { Toaster } from "./components/ui/sonner.jsx"
const PastWork = lazy(() => import("./pages/PastWork.jsx"));
const Home = lazy(() => import("./pages/Home.jsx"))
const Login = lazy(() => import("./pages/Login.jsx"))
const Register = lazy(() => import("./pages/Register.jsx"))
const AMCPlans = lazy(() => import("./pages/AMCPlan.jsx"))
const Profile = lazy(() => import("./pages/Profile.jsx"))
const RequestService = lazy(() => import("./pages/RequestService.jsx"))
const ActiveMembers = lazy(() => import("./pages/ActiveMembers.jsx"))
const AMCOrder = lazy(() => import("./pages/AMCOrder.jsx"))
const AdminServiceRequests = lazy(() => import("./pages/AdminServicesRequest.jsx"))
const MemberHistory = lazy(() => import("./pages/MemberHistory.jsx"))
const AddProduct = lazy(() => import("./pages/AddProduct.jsx"))
const AdminPendingOrders = lazy(() => import("./pages/AdminPendingOrders.jsx"))
const OrderConfirmationDialog = lazy(() => import("./pages/OrderConfirmationDialog.jsx"))

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
  },
  {
    path: "/past-work",
    element: <PastWork/>
  }
])

function App() {

  return (
    <>
    {/* <AuthValidotor/> */}
    <Suspense fallback={<div className="text-center py-10 text-blue-600">Loading Page...</div>}>
      <RouterProvider router={appRouter} />
    </Suspense>
      <Toaster richColors position="top-right" />
       
    </>
  )
}

export default App
