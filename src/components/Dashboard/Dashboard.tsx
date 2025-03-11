import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      // Check if user is authenticated
      if (!token || !user) {
        navigate("/login"); // Redirect to login if not authenticated
        return;
      }

      // Navigate based on user role
      if (user.role === "admin") {
        navigate("/dashboard/admin");
      } else if (user.role === "customer") {
        navigate("/dashboard/customer");
      } else {
        // Handle unknown roles
        navigate("/login");
      }
    };

    fetchDashboardData();
  }, [navigate]);

  return null; // No need to render anything here
};

export default Dashboard;
