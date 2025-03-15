import { useEffect, useState } from "react";
import Swal from "sweetalert2";

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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
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

  const handleAddToCart = (product: Product) => {
    Swal.fire({
      title: "Success!",
      text: `${product.name} Added In Cart`,
      icon: "success",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "OK",
    });
  };

  if (loading)
    return <p className="text-center text-gray-600">Loading products...</p>;
  if (error) return <p className="text-center text-red-600">Error: {error}</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-6">Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-gray-100 shadow-md rounded-xl p-5"
          >
            <img
              src={product.photo}
              alt={product.name}
              className="w-full h-48 object-cover rounded-md"
            />
            <h3 className="text-lg font-semibold mt-3">{product.name}</h3>
            <p className="text-blue-600 font-bold mt-2">{product.price} ৳</p>
            <button
              onClick={() => handleAddToCart(product)}
              className="mt-3 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddCart;
