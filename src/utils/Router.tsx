import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import AdminDashBoard from "../components/Dashboard/AdminDashboard/AdminDashboard";
import CustomerDashBoard from "../components/Dashboard/CustomerDashboard/customerDashBoard";
import Dashboard from "../components/Dashboard/Dashboard";
import ProtectedRoute from "../components/ProtectedRoute/protectedRoute"; // Import ProtectedRoute
import LogIn from "../pages/LogIn";
import SignUp from "../pages/SignUp";
import Home from "./Home";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <LogIn />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dashboard/admin",
        element: (
          <ProtectedRoute allowedRoles={["admin"]}>
            {" "}
            {/* Pass allowedRoles */}
            <AdminDashBoard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/customer",
        element: (
          <ProtectedRoute allowedRoles={["customer"]}>
            {" "}
            {/* Pass allowedRoles */}
            <CustomerDashBoard />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default Router;
