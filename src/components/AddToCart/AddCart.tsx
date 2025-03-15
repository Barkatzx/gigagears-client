import { useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useCart } from "../../context/CartContext";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  categories: string[];
  photo: string;
}

const AddCart = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { cart, addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/products");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({ ...product, quantity: 1 });
    Swal.fire({
      title: "Added!",
      text: `${product.name} added to cart`,
      icon: "success",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "OK",
    });
  };

  const handleProductClick = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  if (loading) return <p className="text-center py-8">Loading products...</p>;
  if (error) return <p className="text-center text-red-500 py-8">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="font-[Recoleta] text-4xl font-bold text-center mb-8">
        Featured Products
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-gray-100 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 relative"
          >
            <div className="p-5">
              <img
                src={product.photo}
                alt={product.name}
                className="w-full h-48 object-cover rounded-xl"
              />
              <div
                onClick={() => handleProductClick(product._id)}
                className="cursor-pointer mt-4"
              >
                <h3 className="text-lg font-bold">{product.name}</h3>
                <p className="text-blue-600 font-bold mt-2">৳{product.price}</p>
              </div>
              <button
                onClick={(e) => handleAddToCart(product, e)}
                className="absolute top-4 right-4 bg-blue-500 p-2 rounded-full text-white hover:bg-blue-600 transition-colors"
              >
                <FaShoppingCart size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* <div className="mt-8 text-center">
        <Link
          to="/cart"
          className="inline-flex items-center bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FaShoppingCart className="mr-2" />
          View Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
        </Link>
      </div> */}
    </div>
  );
};

export default AddCart;
