import axios from "axios";
import { useEffect, useState } from "react";

const MenuDeshboard = () => {
  // State to store the API data
  const [userData, setUserData] = useState<number | null>(null);
  const [productData, setProductData] = useState<number | null>(null);

  // Check if token is in localStorage
  const token = localStorage.getItem("token");
  // console.log("Token from localStorage:", token); // Debugging line

  useEffect(() => {
    if (!token) {
      // console.error("No token found in localStorage");
      return; // Stop further execution if no token
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
          Authorization: `Bearer ${token}`, // Add Bearer token to headers
        },
      })
      .then((response) => {
        setProductData(response.data.length);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, [token]);

  return (
    <div className="grid md:grid-cols-3 grid-cols-1 gap-5 ">
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
    </div>
  );
};

export default MenuDeshboard;
