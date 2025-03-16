import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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

const ProductDescription = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart(); // Get addToCart function from cart context

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/v1/products/${id}`
        );
        if (!response.ok) throw new Error("Failed to fetch product details");
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        ...product,
        quantity: 1, // Add quantity property required by cart context
      });

      Swal.fire({
        title: "Added to Cart!",
        text: `${product.name} has been added to your cart`,
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
    }
  };

  if (loading) return <p className="text-center py-8">Loading product...</p>;
  if (error) return <p className="text-center text-red-500 py-8">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {product && (
        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Image */}
          <div className="md:w-1/2 rounded-xl">
            <img
              src={product.photo}
              alt={product.name}
              className="w-full h-96 object-contain rounded-xl bg-gray-100 p-10"
            />
          </div>

          {/* Product Details */}
          <div className="md:w-1/2 space-y-6">
            <h1 className="font-[Recoleta] text-4xl font-bold">
              {product.name}
            </h1>
            <p className="text-3xl font-bold text-blue-600">
              ৳{product.price.toLocaleString()}
            </p>

            <button
              onClick={handleAddToCart}
              className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              disabled={!product}
            >
              Add to Cart
            </button>

            <div className="space-y-4">
              <h2 className="font-[Recoleta] text-2xl font-bold">
                Product Description
              </h2>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* <div className="space-y-2">
              <h3 className="text-lg font-semibold">Categories</h3>
              <div className="flex flex-wrap gap-2">
                {product.categories.map((category) => (
                  <span
                    key={category}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDescription;
