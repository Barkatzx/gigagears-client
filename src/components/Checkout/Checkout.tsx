import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useCart } from "../../context/CartContext";
import Divider from "../../context/Divider";

// eslint-disable-next-line react-refresh/only-export-components
export const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);

interface ShippingAddress {
  name: string;
  email: string;
  address: string;
  city: string;
  postalCode: string; // Added postalCode
  country: string;
  phoneNumber: string;
}

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingAddress>();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingCost = subtotal > 100 ? 0 : 5;
  const total = subtotal + shippingCost;

  const onSubmit = async (data: ShippingAddress) => {
    if (!stripe || !elements) {
      Swal.fire({
        title: "Loading...",
        text: "Payment system is initializing",
        icon: "info",
      });
      return;
    }

    try {
      // Step 1: Create payment intent
      const paymentIntentResponse = await fetch(
        "http://localhost:5000/api/v1/create-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currency: "usd",
            amount: total * 100, // Convert total to cents
          }),
        }
      );

      if (!paymentIntentResponse.ok) {
        const errorResponse = await paymentIntentResponse.json();
        throw new Error(
          errorResponse.error || "Failed to create payment intent"
        );
      }

      const responseData = await paymentIntentResponse.json();
      const { clientSecret } = responseData.data;

      if (!clientSecret) {
        throw new Error("Client secret is missing");
      }

      // Step 2: Confirm card payment
      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement)!,
            billing_details: {
              name: data.name,
              email: data.email,
              address: {
                line1: data.address,
                city: data.city,
                postal_code: data.postalCode, // Added postalCode
                country: "US",
              },
              phone: data.phoneNumber,
            },
          },
        });

      if (stripeError) {
        throw stripeError;
      }

      if (!paymentIntent) {
        throw new Error("Payment failed");
      }

      // Step 3: Create order
      const orderData = {
        shippingAddress: {
          ...data,
          postalCode: data.postalCode, // Ensure postalCode is included
        },
        orderItems: cart.map((item) => ({
          product: item._id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          photo: item.photo,
        })),
        totalPrice: total,
        paymentId: paymentIntent.id,
      };

      const orderResponse = await fetch("http://localhost:5000/api/v1/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!orderResponse.ok) {
        const errorResponse = await orderResponse.json();
        throw new Error(errorResponse.error || "Order submission failed");
      }

      const orderResult = await orderResponse.json();
      console.log("Order Result:", orderResult); // Log the order result

      await Swal.fire({
        title: "Payment Successful!",
        text: "Your order has been placed",
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "Continue Shopping",
      });

      clearCart();
      navigate("/");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Payment failed";
      console.error("Payment Error:", error);
      Swal.fire({
        title: "Error!",
        text: message,
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
      <Divider title="Checkout"></Divider>

      <div className="grid md:grid-cols-2 gap-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <h2 className="font-[Recoleta] text-xl font-semibold mb-4">
            Shipping Information
          </h2>

          {/* Shipping Form Fields */}
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
            <select
              {...register("country", { required: "Country is required" })}
              className="w-full p-2 border rounded"
              defaultValue="US"
            >
              <option value="US">United States</option>
            </select>
            {errors.country && (
              <span className="text-red-500 text-sm">
                {errors.country.message}
              </span>
            )}
          </div>

          <div>
            <label className="block mb-2">Phone Number</label>
            <input
              type="tel"
              {...register("phoneNumber", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Must be 10 digits",
                },
              })}
              className="w-full p-2 border rounded"
            />
            {errors.phoneNumber && (
              <span className="text-red-500 text-sm">
                {errors.phoneNumber.message}
              </span>
            )}
          </div>

          {/* Stripe Card Element */}
          <div className="border p-3 rounded-lg">
            <label className="block mb-2 font-medium">Card Details</label>
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            disabled={!stripe || cart.length === 0}
          >
            Pay ${total.toLocaleString()}
          </button>
        </form>

        {/* Order Summary */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
          <h2 className="font-[Recoleta] text-xl font-semibold mb-4">
            Order Summary
          </h2>

          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item._id} className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600">
                    {item.quantity} x ${item.price.toLocaleString()}
                  </p>
                </div>
                <p>${(item.price * item.quantity).toLocaleString()}</p>
              </div>
            ))}

            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shippingCost.toLocaleString()}</span>
              </div>
              <div className="font-[Recoleta] flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
