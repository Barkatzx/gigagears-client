import { Navigate, Outlet } from "react-router-dom";

interface ProtectedRouteProps {
  allowedRoles: string[];
  children?: React.ReactNode; // Add this to allow children
}

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!user?.role) return <Navigate to="/login" />;

  return allowedRoles.includes(user.role) ? (
    children ? (
      children
    ) : (
      <Outlet />
    )
  ) : (
    <Navigate to="/unauthorized" />
  );
};

export default ProtectedRoute;
