import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom"; // For redirection
import Swal from "sweetalert2";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        data
      );

      // Handle JWT token (if returned in response)
      if (response.data.token) {
        localStorage.setItem("token", response.data.token); // Store token in localStorage
      }
      console.log(response.data);
      Swal.fire({
        icon: "success",
        title: "Sign Up Successful!",
        text: "Your account has been created successfully.",
      }).then(() => {
        navigate("/login"); // Redirect to login page after successful signup
      });
    } catch (error) {
      console.error("Error Sign Up", error);
      Swal.fire({
        icon: "error",
        title: "Sign Up Failed!",
        text: "Something went wrong. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-5 px-3 gap-10 lg:px-30 min-h-screen">
      {/* Image Section */}
      <div className="hidden lg:block w-1/2">
        <img
          src="./src/assets/img/signup.jpg"
          alt="Sign Up Image"
          className="object-cover rounded-3xl"
        />
      </div>

      {/* Form Section */}
      <div className="bg-white p-5 shadow-lg rounded-lg w-full lg:w-1/2">
        <h3 className="font-[Recoleta] text-3xl font-bold mb-5 text-center">
          🚀 Ready to Register?
        </h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name Input */}
          <div className="mb-6">
            <label className="flex gap-2 items-center text-gray-700 font-bold mb-2">
              <FaUser /> Name
            </label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="w-full px-3 py-2 border border-gray-100 bg-gray-100 rounded-lg focus:outline-none focus:border-indigo-500"
              placeholder="Enter Your Name"
            />
            {errors.name && (
              <span className="text-red-600">Name is required</span>
            )}
          </div>

          {/* Email Input */}
          <div className="mb-6">
            <label className="text-gray-700 font-bold mb-2 flex gap-2 items-center">
              <MdEmail /> Email
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="w-full px-3 py-2 border border-gray-100 bg-gray-100 rounded-lg focus:outline-none focus:border-indigo-500"
              placeholder="Enter Your Email"
            />
            {errors.email && (
              <span className="text-red-600">Email is required</span>
            )}
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label className="text-gray-700 font-bold mb-2 flex gap-2 items-center">
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
              className="w-full px-3 py-2 border border-gray-100 bg-gray-100 rounded-lg focus:outline-none focus:border-indigo-500"
              placeholder="Enter Your Password"
            />
            {errors.password && (
              <p className="text-red-600">
                Password must be 6-20 characters, include at least one uppercase
                letter, one lowercase letter, one number, and one special
                character.
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`bg-black text-white rounded-lg px-4 py-2 font-semibold hover:bg-blue-600 transition-colors w-full mb-4 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>

          {/* Google Sign In */}
          <div className="flex items-center justify-center my-4">
            <div className="border-t border-gray-300 w-16"></div>
            <span className="text-gray-500 mx-2">Or Sign In With</span>
            <div className="border-t border-gray-300 w-16"></div>
          </div>

          {/* Google Sign Up Button */}
          <button
            type="button"
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
