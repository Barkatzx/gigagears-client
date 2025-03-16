import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRoles: string[];
  children?: React.ReactNode; // Optional children
}

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  // Get user data from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // If user role is not found, redirect to login
  if (!user?.role) {
    return <Navigate to="/login" />;
  }

  // Check if the user's role is allowed
  if (allowedRoles.includes(user.role)) {
    // If children are provided, render them
    if (children) {
      return children;
    }
    // Otherwise, render the nested routes via Outlet
    return <Outlet />;
  }

  // If the user's role is not allowed, redirect to unauthorized page
  return <Navigate to="/signup" />;
};

export default ProtectedRoute;
