import { BsFillTrash2Fill } from "react-icons/bs";
import { FaArrowLeft, FaPlusCircle } from "react-icons/fa";
import { FaCircleMinus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import Divider from "../../context/Divider";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <Link
          to="/"
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <FaArrowLeft className="mr-2" />
          Continue Shopping
        </Link>
        <Divider title="Your Shopping Cart"></Divider>
        <div className="w-24"></div>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl mb-4">Your cart is empty</p>
          <Link to="/" className="text-blue-600 hover:underline">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex flex-col md:flex-row items-center justify-between bg-gray-100 p-5 rounded-lg shadow-md"
            >
              <img
                src={item.photo}
                alt={item.name}
                className="w-32 h-32 object-cover rounded-lg bg-white mb-4 md:mb-0"
              />
              <div className="flex-1 md:ml-6 text-center md:text-left">
                <h3 className="font-[Recoleta] text-xl font-bold ">
                  {item.name}
                </h3>
                <p className="text-gray-600">৳{item.price}</p>
              </div>
              <div className="flex items-center gap-4 mt-4 md:mt-0">
                <div className="flex items-center">
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    className="px-3 py-2 bg-gray-600 text-white"
                  >
                    <FaCircleMinus />
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item._id, parseInt(e.target.value))
                    }
                    className="w-20 px-2 py-1 text-center bg-white"
                    min="1"
                  />
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    className="px-3 py-2 bg-gray-600 text-white"
                  >
                    <FaPlusCircle />
                  </button>
                </div>
                <p className="text-xl font-bold">
                  ৳{item.price * item.quantity}
                </p>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <BsFillTrash2Fill size={30} />
                </button>
              </div>
            </div>
          ))}

          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold font-[Recoleta]">
                Order Summary
              </h2>
              <button
                onClick={clearCart}
                className="text-red-500 hover:text-red-700"
              >
                Clear Cart
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal ({cart.length} items)</span>
                <span className="font-bold">৳{totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Fee</span>
                <span className="font-bold">
                  ৳{totalPrice > 5000 ? 0 : 150}
                </span>
              </div>
              <div className="flex justify-between text-xl font-bold">
                <span className="font-[Recoleta]">Total</span>
                <span className="font-[Recoleta]">
                  ৳{totalPrice + (totalPrice > 5000 ? 0 : 150)}
                </span>
              </div>
            </div>
            <Link to="/checkout">
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg mt-6 hover:bg-blue-700 transition-colors">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
