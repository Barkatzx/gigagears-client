import { useEffect, useState } from "react";
import { IoBagAdd } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useCart } from "../../context/CartContext";
import Divider from "../../context/Divider";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  categories: string[];
  photo: string;
}

const ProductShop = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<string>(""); // Sorting state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 8;
  const navigate = useNavigate();
  const { addToCart } = useCart();

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

  // Sorting logic
  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === "low-to-high") return a.price - b.price;
    if (sortOrder === "high-to-low") return b.price - a.price;
    return 0;
  });

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

  if (loading) return <p className="text-center py-8">Loading products...</p>;
  if (error) return <p className="text-center text-red-500 py-8">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="font-[Recoleta] text-4xl font-bold text-center mb-8">
        <Divider title="All Products" />
      </h2>

      {/* Sorting Dropdown */}
      <div className="mb-6">
        <select
          className="px-4 py-2 border rounded-md"
          value={sortOrder}
          onChange={(e) => { setSortOrder(e.target.value); }}
        >
          <option value="">Sort By</option>
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
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
                onClick={() => { handleProductClick(product._id); }}
                className="cursor-pointer mt-4"
              >
                <h3 className="text-lg font-bold">{product.name}</h3>
                <p className="text-blue-600 font-bold mt-2">
                  {product.price} ৳
                </p>
              </div>
              <button
                onClick={(e) => { handleAddToCart(product, e); }}
                className="absolute top-4 right-4 bg-blue-500 p-2 rounded-full text-white hover:bg-blue-800 transition-colors cursor-pointer"
              >
                <IoBagAdd size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-4 py-2 border rounded-md ${
              currentPage === i + 1
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            }`}
            onClick={() => { setCurrentPage(i + 1); }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductShop;
