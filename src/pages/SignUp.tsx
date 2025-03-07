import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaUpload, FaUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

const SignUp = () => {
  // Image Upload State
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle File Selection
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission (send data to your server or API)
  };

  const handleRegisterWithGoogle = () => {
    // Implement Google authentication logic here
    console.log("Registering with Google");
  };

  return (
    <div className="flex items-center justify-center py-5 px-3 gap-10 lg:px-30 min-h-screen">
      {/* Image Section (hidden on smaller screens) */}
      <div className="hidden lg:block w-1/2">
        <img
          src="/src/assets/img/signup.jpg"
          alt="Login"
          className="object-cover rounded-3xl"
        />
      </div>
      <div className="bg-white p-5 shadow-lg rounded-lg w-full lg:w-1/2">
        {/* Sign Up Form Section */}
        <h3 className="font-[Recoleta] text-3xl font-bold mb-5 text-center">
          🚀 Ready to Register?
        </h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Profile Picture Upload */}
          <div className="mb-6 p-6 rounded-lg text-left bg-gray-100">
            {/* Display Image Preview If Available */}
            {image ? (
              <img
                src={image}
                alt="Uploaded Preview"
                className="w-32 h-32 mb-2 rounded-lg"
              />
            ) : (
              <p className="text-gray-700">No image uploaded</p>
            )}

            {/* Upload Button */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium cursor-pointer flex items-center gap-2 hover:bg-blue-700 transition"
            >
              <FaUpload />
              Upload Image
            </button>

            {/* Hidden File Input */}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileUpload}
            />
          </div>
          {/* Name Input */}
          <div className="mb-6">
            <label
              htmlFor="name"
              className="flex gap-2 items-center text-gray-700 font-bold mb-2"
            >
              <FaUser /> Name
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              id="name"
              className="w-full px-3 py-2 border border-gray-100 bg-gray-100 rounded-lg focus:outline-none focus:border-indigo-500"
              placeholder="Enter Your Name"
            />
            {errors.name && (
              <span className="text-red-600">Name is required</span>
            )}
          </div>

          {/* Email Input */}
          <div className="mb-6">
            <label
              htmlFor="email"
              className="text-gray-700 font-bold mb-2 flex gap-2 items-center "
            >
              <MdEmail /> Email
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              id="email"
              className="w-full px-3 py-2 border border-gray-100 bg-gray-100 rounded-lg focus:outline-none focus:border-indigo-500"
              placeholder="Enter Your Email"
            />
            {errors.email && (
              <span className="text-red-600">Email is required</span>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="text-gray-700 font-bold mb-2 flex gap-2 items-center "
            >
              <RiLockPasswordFill /> Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 20,
                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
              })}
              id="password"
              className="w-full px-3 py-2 border border-gray-100 bg-gray-100 rounded-lg focus:outline-none focus:border-indigo-500"
              placeholder="Enter Your Password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-600">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-600">
                Password must be at least 6 characters
              </p>
            )}
            {errors.password?.type === "maxLength" && (
              <p className="text-red-600">
                Password must be less than 20 characters
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-600">
                Password must contain at least one uppercase, one lowercase, one
                number, and one special character.
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-black text-white rounded-lg px-4 py-2 font-semibold hover:bg-blue-600 transition-colors w-full mb-4"
          >
            Sign Up
          </button>

          {/* Divider */}
          <div className="flex items-center justify-center mb-4">
            <div className="border-t border-gray-300 w-16"></div>
            <span className="text-gray-500 mx-2">Or Sign Up With</span>
            <div className="border-t border-gray-300 w-16"></div>
          </div>

          {/* Google Sign Up Button */}
          <button
            type="button"
            onClick={handleRegisterWithGoogle}
            className="bg-blue-600 text-white rounded-lg px-4 py-2 font-semibold hover:bg-black transition-colors w-full flex items-center justify-center"
          >
            <FcGoogle className="mr-2" size={20} />
            Sign Up With Google
          </button>

          {/* Login Link */}
          <p className="mt-4 text-center text-gray-600">
            Already have an account?{" "}
            <a href="/login">
              <span className="text-indigo-800">Log In</span>
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
