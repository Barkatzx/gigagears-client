import axios from "axios";
import { useEffect, useState } from "react";

const CustomerDashboard = () => {
  const [dashboardData, setDashboardData] = useState("");

  useEffect(() => {
    const fetchCustomerDashboardData = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(
          "http://localhost:5000/dashboard/customer",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setDashboardData(response.data.message);
      } catch (error) {
        console.error("Failed to fetch customer dashboard data:", error);
      }
    };

    fetchCustomerDashboardData();
  }, []);

  return (
    <div>
      <h1>Customer Dashboard</h1>
      <p>{dashboardData}</p>
    </div>
  );
};

export default CustomerDashboard;
