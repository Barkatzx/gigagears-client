import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import Divider from "../../context/Divider";

interface ProductForm {
  photo: FileList;
  name: string;
  price: number;
  description: string;
  categories: string[];
}

const AddProduct = () => {
  const { register, handleSubmit, reset } = useForm<ProductForm>();
  const [preview, setPreview] = useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: ProductForm) => {
    const formData = new FormData();
    formData.append("photo", data.photo[0]); // ✅ Handle Image
    formData.append("name", data.name);
    formData.append("price", data.price.toString());
    formData.append("description", data.description);
    formData.append("categories", JSON.stringify([data.categories])); // ✅ Fix array issue

    console.log("Submitting Product:", Object.fromEntries(formData.entries()));

    try {
      const response = await fetch("http://localhost:5000/api/v1/addproducts", {
        method: "POST",
        body: formData, // Do NOT set Content-Type
      });

      const result = await response.json();
      console.log("Response:", result);

      if (response.ok) {
        Swal.fire("Success!", "Product added successfully!", "success");
        reset();
        setPreview(null);
      } else {
        Swal.fire("Error!", result.message || "Something went wrong!", "error");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire("Failed!", "Server error. Try again.", "error");
    }
  };

  return (
    <div className="mx-auto p-6 bg-gray-100 rounded-xl shadow-md">
      <h2 className="font-[Recoleta] text-2xl text-center font-bold mb-4">
        <Divider title="Add Product Here" />
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Image Upload */}
        <div>
          <label className="block font-semibold">Upload Product Photo</label>
          <input
            type="file"
            {...register("photo", { required: true })}
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full p-2 bg-white rounded-md"
          />
          {preview && (
            <img
              src={preview}
              className="mt-2 h-32 object-cover rounded-md bg-white"
            />
          )}
        </div>

        {/* Name Input */}
        <div>
          <label className="block font-semibold">Product Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="mt-1 block w-full p-2 bg-white rounded-md"
          />
        </div>

        {/* Price Input */}
        <div>
          <label className="block font-semibold">Price</label>
          <input
            type="number"
            {...register("price", { required: true })}
            className="mt-1 block w-full p-2 bg-white rounded-md "
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold">Description</label>
          <textarea
            {...register("description")}
            className="mt-1 block w-full p-2 bg-white rounded-md"
          />
        </div>

        {/* Categories (Now Correctly Sent as Array) */}
        <div>
          <label className="block font-semibold">Category</label>
          <select
            {...register("categories", { required: true })}
            className="mt-1 block w-full p-2 bg-white rounded-md"
          >
            <option value="">Select a category</option>
            <option value="headphone">Headphone</option>
            <option value="monitor">Monitor</option>
            <option value="accessories">Accessories</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
