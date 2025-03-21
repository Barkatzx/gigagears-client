import axios from "axios";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const MenuDeshboard = () => {
  const [userData, setUserData] = useState<number | null>(null);
  const [productData, setProductData] = useState<number | null>(null);
  const [orderData, setOrderData] = useState<number | null>(null);
  const [totalSells, setTotalSells] = useState<number | null>(null);
  const [sellsData, setSellsData] = useState<{ date: string; total: number }[]>(
    []
  ); // State for chart data

  // Check if token is in localStorage
  const token = localStorage.getItem("token");
  // console.log("Token from localStorage:", token); // Debugging line

  useEffect(() => {
    if (!token) {
      // console.error("No token found in localStorage");
      return;
    }

    // Fetch total users
    axios
      .get("http://localhost:5000/api/v1/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // console.log("User API Response:", response.data); // Debugging log
        setUserData(response.data.length); // Count total users
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });

    // Fetch total products
    axios
      .get("http://localhost:5000/api/v1/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setProductData(response.data.length);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });

    // Fetch total Orders and calculate total sells
    axios
      .get("http://localhost:5000/api/v1/orders", {
        headers: {
          Authorization: `Bearer ${token}`, // Add Bearer token to headers
        },
      })
      .then((response) => {
        console.log("Orders API Response:", response.data); // Debugging log
        if (response.data && Array.isArray(response.data.data)) {
          setOrderData(response.data.data.length); // Set total orders

          // Calculate total sells
          const total = response.data.data.reduce(
            (sum: number, order: { totalPrice: number }) =>
              sum + order.totalPrice,
            0
          );
          setTotalSells(total); // Set total sells

          // Prepare data for the chart
          const chartData = response.data.data.map(
            (order: { createdAt: string; totalPrice: number }) => ({
              date: formatDate(new Date(order.createdAt)), // Format date as "22 Mar 2025"
              total: order.totalPrice,
            })
          );
          setSellsData(chartData); // Set chart data
        } else {
          console.error("Invalid orders data format");
          setOrderData(0);
          setTotalSells(0);
        }
      })
      .catch((error) => {
        console.error("Error fetching order data:", error);
      });
  }, [token]);

  // Function to format date as "22 Mar 2025"
  const formatDate = (date: Date): string => {
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  return (
    <div>
      {/* Cards Section */}
      <div className="grid md:grid-cols-4 grid-cols-1 gap-5 mb-8">
        {/* Total Users */}
        <div className="bg-blue-600 p-10 text-center text-white rounded-2xl font-[Recoleta] ">
          <p className="text-4xl">
            {userData !== null ? userData : "Loading..."}
          </p>
          <h2 className="text-xl font-bold">Total Users</h2>
        </div>

        {/* Total Products */}
        <div className="bg-blue-600 p-10 text-center text-white rounded-2xl font-[Recoleta] ">
          <p className="text-4xl">
            {productData !== null ? productData : "Loading..."}
          </p>
          <h2 className="text-xl font-bold">Total Products</h2>
        </div>

        {/* Total Orders */}
        <div className="bg-blue-600 p-10 text-center text-white rounded-2xl font-[Recoleta] ">
          <p className="text-4xl">
            {orderData !== null ? orderData : "Loading..."}
          </p>
          <h2 className="text-xl font-bold">Total Orders</h2>
        </div>

        {/* Total Sells */}
        <div className="bg-blue-600 p-10 text-center text-white rounded-2xl font-[Recoleta] ">
          <p className="text-4xl">
            {totalSells !== null
              ? `$${totalSells.toLocaleString()}`
              : "Loading..."}
          </p>
          <h2 className="text-xl font-bold">Total Sells</h2>
        </div>
      </div>

      {/* Sells Chart Section */}
      <div className="">
        <h2 className="font-[Recoleta] text-2xl font-bold mb-4">
          Sells Over Time
        </h2>
        <div className="w-full h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={sellsData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default MenuDeshboard;
