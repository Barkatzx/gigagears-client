import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useCart } from "../../context/CartContext";

interface ShippingAddress {
  name: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingAddress>();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingCost = subtotal > 5000 ? 0 : 150;
  const total = subtotal + shippingCost;

  const onSubmit = async (data: ShippingAddress) => {
    try {
      const orderData = {
        shippingAddress: data,
        orderItems: cart.map((item) => ({
          product: item._id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          photo: item.photo,
        })),
        totalPrice: total,
      };

      // Simulate API call
      const response = await fetch("http://localhost:5000/api/v1/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) throw new Error("Order submission failed");

      await Swal.fire({
        title: "Order Placed!",
        text: "Your order has been successfully placed",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Continue Shopping",
      });

      clearCart();
      navigate("/");
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to place order. Please try again.",
        icon: "error",
        confirmButtonColor: "#d33",
        confirmButtonText: "OK",
      });
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl mb-4">Your cart is empty</h2>
        <Link to="/" className="text-blue-600 hover:underline">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Shipping Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>

          <div>
            <label className="block mb-2">Full Name</label>
            <input
              {...register("name", { required: "Name is required" })}
              className="w-full p-2 border rounded"
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>

          <div>
            <label className="block mb-2">Email</label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full p-2 border rounded"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>

          <div>
            <label className="block mb-2">Address</label>
            <input
              {...register("address", { required: "Address is required" })}
              className="w-full p-2 border rounded"
            />
            {errors.address && (
              <span className="text-red-500 text-sm">
                {errors.address.message}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2">City</label>
              <input
                {...register("city", { required: "City is required" })}
                className="w-full p-2 border rounded"
              />
              {errors.city && (
                <span className="text-red-500 text-sm">
                  {errors.city.message}
                </span>
              )}
            </div>

            <div>
              <label className="block mb-2">Postal Code</label>
              <input
                {...register("postalCode", {
                  required: "Postal Code is required",
                  minLength: {
                    value: 4,
                    message: "Postal code must be at least 4 characters",
                  },
                })}
                className="w-full p-2 border rounded"
              />
              {errors.postalCode && (
                <span className="text-red-500 text-sm">
                  {errors.postalCode.message}
                </span>
              )}
            </div>
          </div>

          <div>
            <label className="block mb-2">Country</label>
            <input
              {...register("country", { required: "Country is required" })}
              className="w-full p-2 border rounded"
            />
            {errors.country && (
              <span className="text-red-500 text-sm">
                {errors.country.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700"
          >
            Place Order
          </button>
        </form>

        {/* Order Summary */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item._id} className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600">
                    {item.quantity} x ৳{item.price.toLocaleString()}
                  </p>
                </div>
                <p>৳{(item.price * item.quantity).toLocaleString()}</p>
              </div>
            ))}

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>৳{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>৳{shippingCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>৳{total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
