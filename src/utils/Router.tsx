import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Cart from "../components/Cart/Cart";
import AdminDashboard from "../components/Dashboard/AdminDashboard/AdminDashboard";
import CustomerDashboard from "../components/Dashboard/CustomerDashboard/CustomerDashboard";
import Dashboard from "../components/Dashboard/Dashboard";
import ProductDescription from "../components/Products/ProductDescription";
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
        element: <AdminDashboard />,
      },
      {
        path: "/dashboard/customer",
        element: <CustomerDashboard />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/product/:id",
        element: <ProductDescription />,
      },
    ],
  },
]);

export default Router;
