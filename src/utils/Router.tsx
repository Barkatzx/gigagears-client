import { Elements } from "@stripe/react-stripe-js";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Cart from "../components/Cart/Cart";
import Checkout, { stripePromise } from "../components/Checkout/Checkout";
import AdminDashboard from "../components/Dashboard/AdminDashboard/AdminDashboard";
import CustomerDashboard from "../components/Dashboard/CustomerDashboard/CustomerDashboard";
import Dashboard from "../components/Dashboard/Dashboard";
import ProductDescription from "../components/Products/ProductDescription";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import ProductShop from "../components/Shop/ProductShop";
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
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/customer",
        element: <CustomerDashboard />,
      },
      {
        path: "/cart",
        element: (
          <ProtectedRoute allowedRoles={["admin", "customer"]}>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "/product/:id",
        element: <ProductDescription />,
      },
      {
        path: "/checkout",
        element: (
          <Elements stripe={stripePromise}>
            <Checkout />
          </Elements>
        ),
      },
      {
        path: "/shop",
        element: <ProductShop />,
      },
    ],
  },
]);

export default Router;
