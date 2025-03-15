import axios from "axios";
import { useEffect, useState } from "react";

const useCustomer = () => {
  const [isCustomer, setIsCustomer] = useState(false);

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/users", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setIsCustomer(response.data.role === "customer");
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    fetchUserRole();
  }, []);

  return [isCustomer];
};

export default useCustomer;
