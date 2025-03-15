import { FaArrowLeft, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

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
          to="/products"
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <FaArrowLeft className="mr-2" />
          Continue Shopping
        </Link>
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <div className="w-24"></div>
      </div>

      {cart.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl mb-4">Your cart is empty</p>
          <Link to="/products" className="text-blue-600 hover:underline">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex flex-col md:flex-row items-center justify-between bg-white p-4 rounded-lg shadow-md"
            >
              <img
                src={item.photo}
                alt={item.name}
                className="w-32 h-32 object-cover rounded-lg mb-4 md:mb-0"
              />
              <div className="flex-1 md:ml-6 text-center md:text-left">
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-gray-600">৳{item.price}</p>
              </div>
              <div className="flex items-center gap-4 mt-4 md:mt-0">
                <div className="flex items-center">
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    className="px-3 py-1 border rounded-l bg-gray-100"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item._id, parseInt(e.target.value))
                    }
                    className="w-16 text-center border-y"
                    min="1"
                  />
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    className="px-3 py-1 border rounded-r bg-gray-100"
                  >
                    +
                  </button>
                </div>
                <p className="text-xl font-bold">
                  ৳{item.price * item.quantity}
                </p>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrash size={20} />
                </button>
              </div>
            </div>
          ))}

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Order Summary</h2>
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
                <span>Shipping</span>
                <span className="font-bold">
                  ৳{totalPrice > 5000 ? 0 : 150}
                </span>
              </div>
              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>
                <span>৳{totalPrice + (totalPrice > 5000 ? 0 : 150)}</span>
              </div>
            </div>
            <button className="w-full bg-green-600 text-white py-3 rounded-lg mt-6 hover:bg-green-700 transition-colors">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
