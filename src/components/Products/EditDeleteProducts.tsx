import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2"; // Import SweetAlert

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  photo: string;
  categories: string[];
}

const EditDeleteProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editedName, setEditedName] = useState("");
  const [editedPrice, setEditedPrice] = useState(0);
  const [editedDescription, setEditedDescription] = useState("");
  const [editedPhoto, setEditedPhoto] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();

        // Map API response to match the Product interface
        const formattedProducts = data.map(
          (product: {
            _id: string;
            name: string;
            price: number;
            description: string;
            photo: string;
            categories: string | string[];
          }) => ({
            id: product._id, // Map _id to id
            name: product.name,
            price: product.price,
            description: product.description,
            photo: product.photo,
            categories: Array.isArray(product.categories)
              ? product.categories // Use directly if it's already an array
              : JSON.parse(product.categories || "[]"), // Parse stringified array or default to empty array
          })
        );

        setProducts(formattedProducts);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Handle edit button click
  const handleEditClick = (product: Product) => {
    setEditingProduct(product);
    setEditedName(product.name);
    setEditedPrice(product.price);
    setEditedDescription(product.description);
  };

  // Handle save changes (update product via API)
  const handleSaveChanges = async () => {
    if (!editingProduct || !editingProduct.id) {
      setError("No product selected for editing");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", editedName);
      formData.append("price", editedPrice.toString());
      formData.append("description", editedDescription);
      if (editedPhoto) {
        formData.append("photo", editedPhoto);
      }

      const response = await fetch(
        `http://localhost:5000/api/v1/products/${editingProduct.id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      const updatedProduct = await response.json();

      // Update the products list with the updated product
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === updatedProduct._id
            ? {
                ...p,
                name: updatedProduct.name,
                price: updatedProduct.price,
                description: updatedProduct.description,
                photo: updatedProduct.photo,
              }
            : p
        )
      );

      setEditingProduct(null); // Reset editingProduct after saving
      setError(null);

      // Show SweetAlert success message
      Swal.fire({
        icon: "success",
        title: "Changes Saved!",
        text: "The product has been updated successfully.",
      });
    } catch (err) {
      setError((err as Error).message);

      // Show SweetAlert error message
      Swal.fire({
        icon: "error",
        title: "Error",
        text: (err as Error).message,
      });
    }
  };

  // Handle delete button click (delete product via API)
  const handleDeleteClick = async (productId: string) => {
    try {
      // Retrieve the authentication token (e.g., from localStorage)
      const token = localStorage.getItem("token"); // Replace with your token storage logic

      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await fetch(
        `http://localhost:5000/api/v1/products/${productId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the request headers
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      // Remove the deleted product from the list
      setProducts((prevProducts) =>
        prevProducts.filter((p) => p.id !== productId)
      );
      setError(null);

      // Show SweetAlert success message
      Swal.fire({
        icon: "success",
        title: "Product Deleted!",
        text: "The product has been deleted successfully.",
      });
    } catch (err) {
      setError((err as Error).message);

      // Show SweetAlert error message
      Swal.fire({
        icon: "error",
        title: "Error",
        text: (err as Error).message,
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="font-[Recoleta] text-2xl font-bold mb-4">
        Product Management
      </h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Product</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <div className="flex items-center space-x-4">
                    <div className="avatar">
                      <div className="w-12 h-12">
                        <img
                          src={product.photo}
                          alt={product.name}
                          className="rounded-full"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{product.name}</div>
                      <div className="text-sm">${product.price.toFixed(2)}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex space-x-2">
                    <button
                      className="btn btn-sm btn-ghost"
                      onClick={() => handleEditClick(product)}
                    >
                      <FaEdit className="h-5 w-5" />
                    </button>
                    <button
                      className="btn btn-sm btn-ghost"
                      onClick={() => handleDeleteClick(product.id)}
                    >
                      <FaTrash className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingProduct && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Edit Product</h3>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                type="number"
                value={editedPrice}
                onChange={(e) => setEditedPrice(parseFloat(e.target.value))}
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                value={editedDescription}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="textarea textarea-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo</span>
              </label>
              <input
                type="file"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setEditedPhoto(e.target.files[0]);
                  }
                }}
                className="file-input file-input-bordered"
              />
            </div>
            <div className="modal-action">
              <button className="btn" onClick={handleSaveChanges}>
                Save Changes
              </button>
              <button className="btn" onClick={() => setEditingProduct(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditDeleteProducts;
