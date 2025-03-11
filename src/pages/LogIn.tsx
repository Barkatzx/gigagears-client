import axios from "axios";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user)); // Store user data
        console.log(response.data);
        Swal.fire({
          title: "Login Successful!",
          text: "You are now logged in.",
          icon: "success",
          confirmButtonText: "Go to Dashboard",
        }).then(() => {
          navigate("/dashboard");
        });
      } else {
        setError(response.data.message || "Login failed, please try again.");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Invalid credentials or server error."
      );
      console.error("Login error:", err);
    }
  };

  return (
    <div className="flex items-center justify-center py-5 px-3 gap-10 lg:px-30">
      {/* Image Section (hidden on smaller screens) */}
      <div className="hidden lg:block w-1/2">
        <img
          src="./src/assets/img/login.jpg"
          alt="Login"
          className="object-cover rounded-3xl"
        />
      </div>

      {/* Login Form Section */}
      <div className="bg-white p-5 shadow-lg rounded-lg w-full lg:w-1/2">
        <h3 className="font-[Recoleta] text-3xl font-bold mb-5 text-center">
          🕵️‍♂️ Log in Now!
        </h3>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleLogin}>
          {/* Email Input */}
          <div className="mb-6">
            <label className="flex gap-2 items-center text-gray-700 font-bold mb-2">
              <MdEmail /> Email
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border bg-gray-100 rounded-lg focus:outline-none focus:border-black"
              placeholder="Enter Your Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label className="text-gray-700 font-bold mb-2 flex gap-2 items-center">
              <RiLockPasswordFill /> Password
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border bg-gray-100 rounded-lg focus:outline-none focus:border-black"
              placeholder="Enter Your Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="bg-black text-white rounded-lg px-4 py-2 font-semibold hover:bg-gray-800 transition-colors w-full mb-4"
          >
            Sign In
          </button>

          {/* Google Sign In */}
          <div className="flex items-center justify-center my-4">
            <div className="border-t border-gray-300 w-16"></div>
            <span className="text-gray-500 mx-2">Or Sign In With</span>
            <div className="border-t border-gray-300 w-16"></div>
          </div>

          <button
            type="button"
            className="bg-red-500 text-white rounded-lg px-4 py-2 font-semibold hover:bg-red-600 transition-colors w-full flex items-center justify-center"
          >
            <FcGoogle className="mr-2" size={30} />
            Sign In with Google
          </button>

          {/* Sign up Link */}
          <p className="mt-4 text-center text-gray-600">
            Don't have an account?{" "}
            <a href="/signup" className="text-indigo-800 hover:underline">
              Create new account
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
