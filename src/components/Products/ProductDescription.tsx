import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // To get the product ID from URL
import Swal from "sweetalert2";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  categories: string[];
  photo: string;
}

const ProductDescription = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/v1/products/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
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
      Swal.fire({
        title: "Success!",
        text: `${product.name} Added To Cart`,
        icon: "success",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
    }
  };

  if (loading)
    return <p className="text-center text-gray-600">Loading product...</p>;
  if (error) return <p className="text-center text-red-600">Error: {error}</p>;

  return (
    <div className="max-w-6xl mx-auto px-10 py-10">
      {product && (
        <div className="flex gap-10">
          {/* Left side: Product Image */}
          <div className="w-1/3">
            <img
              src={product.photo}
              alt={product.name}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>

          {/* Right side: Product Information */}
          <div className="w-2/3">
            {/* Product Name */}
            <h3 className="font-[Recoleta] text-4xl font-bold">
              {product.name}
            </h3>

            {/* Product Price */}
            <p className="text-xl text-blue-600 font-bold mt-4">
              {product.price} ৳
            </p>

            {/* Add To Cart Button */}
            <button
              onClick={handleAddToCart}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Add to Cart
            </button>

            {/* Product Description */}
            <div className="mt-6">
              <h4 className="font-[Recoleta] font-bold text-xl">
                Product Description
              </h4>
              <p className="mt-2">{product.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDescription;
