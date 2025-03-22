import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import Divider from "../../context/Divider";

interface Order {
  _id: string;
  userId: string;
  shippingAddress: {
    name: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
    phoneNumber: string;
  };
  orderItems: {
    product: string;
    name: string;
    quantity: number;
    price: number;
    photo: string;
  }[];
  totalPrice: number;
  paymentId: string;
  status: string;
}

const ManageOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/orders");
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        setOrders(Array.isArray(data) ? data : data.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleApprove = async (orderId: string) => {
    try {
      await fetch(`http://localhost:5000/api/v1/orders/${orderId}/approve`, {
        method: "PUT",
      });
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: "approved" } : o))
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Failed to approve order");
    }
  };

  const handleDecline = async (orderId: string) => {
    try {
      await fetch(`http://localhost:5000/api/v1/orders/${orderId}/decline`, {
        method: "PUT",
      });
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: "declined" } : o))
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError("Failed to decline order");
    }
  };

  if (loading) return <div>Loading orders...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto">
      <Divider title="Manage Orders" />
      <h1 className="text-xl font-bold text-gray-800 mb-6 font-[Recoleta]">
        Total Orders: {orders.length}
      </h1>
      <div className="space-y-2">
        {orders.map((order) => (
          <div
            key={order._id}
            className="grid grid-cols-1 md:grid-cols-3 gap-10 bg-white shadow-lg p-6 rounded-xl border border-gray-200 items-center"
          >
            {/* Shipping Details */}
            <div className="space-y-3 text-gray-700">
              <h1 className="font-[Recoleta] text-lg">Shipping Details</h1>
              <p className="font-semibold">
                Name:{" "}
                <span className="text-gray-600">
                  {order.shippingAddress.name}
                </span>
              </p>
              <p className="font-semibold">
                Email:{" "}
                <span className="text-gray-600">
                  {order.shippingAddress.email}
                </span>
              </p>
              <p className="font-semibold">
                Phone:{" "}
                <span className="text-gray-600">
                  {order.shippingAddress.phoneNumber || "N/A"}
                </span>
              </p>
              <p className="font-semibold">
                Address:{" "}
                <span className="text-gray-600">
                  {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                  {order.shippingAddress.country},{" "}
                  {order.shippingAddress.postalCode}
                </span>
              </p>
            </div>

            {/* Order Details */}
            <div className="space-y-3 text-gray-700">
              <h1 className="font-[Recoleta] text-lg">Order Details</h1>
              {order.orderItems.map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <img
                    src={item.photo}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div>
                    <p className="font-semibold">
                      {item.name} (x{item.quantity})
                    </p>
                    <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  </div>
                </div>
              ))}
              <p className="font-semibold">
                Total Price:{" "}
                <span className="text-gray-600">
                  ${order.totalPrice.toFixed(2)}
                </span>
              </p>
            </div>

            {/* Approval Actions */}
            <div className="flex flex-col items-center space-y-3">
              <span
                className={`px-4 py-1 rounded-full text-white text-sm font-semibold ${
                  order.status === "approved"
                    ? "bg-green-500"
                    : order.status === "declined"
                    ? "bg-red-500"
                    : "bg-yellow-500"
                }`}
              >
                {order.status}
              </span>
              <div className="flex space-x-3">
                <button
                  onClick={() => handleApprove(order._id)}
                  disabled={order.status === "approved"}
                  className={`px-4 py-2 rounded-lg text-white font-semibold flex items-center gap-2 transition-all transform hover:scale-105 ${
                    order.status === "approved"
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600"
                  }`}
                >
                  <FaCheckCircle /> Approve
                </button>
                <button
                  onClick={() => handleDecline(order._id)}
                  disabled={order.status === "declined"}
                  className={`px-4 py-2 rounded-lg text-white font-semibold flex items-center gap-2 transition-all transform hover:scale-105 ${
                    order.status === "declined"
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-red-500 hover:bg-red-600"
                  }`}
                >
                  <FaTimesCircle /> Decline
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageOrders;
