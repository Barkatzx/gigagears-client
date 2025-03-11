import axios from "axios";
import { useEffect, useState } from "react";
import AdminRoute from "./adminRoute";

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState("");

  useEffect(() => {
    const fetchAdminDashboardData = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(
          "http://localhost:5000/dashboard/admin",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setDashboardData(response.data.message);
      } catch (error) {
        console.error("Failed to fetch admin dashboard data:", error);
      }
    };

    fetchAdminDashboardData();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <AdminRoute />
      <p>{dashboardData}</p>
    </div>
  );
};

export default AdminDashboard;
