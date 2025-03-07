import { FcGoogle } from "react-icons/fc";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

const LogIn = () => {
  return (
    <div className="flex items-center justify-center py-5 px-3 gap-10 lg:px-30">
      {/* Image Section (hidden on smaller screens) */}
      <div className="hidden lg:block w-1/2">
        <img
          src="/src/assets/img/login.jpg"
          alt="Login"
          className="object-cover rounded-3xl"
        />
      </div>

      {/* Login Form Section */}
      <div className="bg-white p-5 shadow-lg rounded-lg w-full lg:w-1/2">
        <h3 className="font-[Recoleta] text-3xl font-bold mb-5 text-center">
          🕵️‍♂️ Log in Now!
        </h3>

        <form>
          {/* Email Input */}
          <div className="mb-6">
            <label
              htmlFor="email"
              className="flex gap-2 items-center text-gray-700 font-bold mb-2"
            >
              <MdEmail /> Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="w-full px-3 py-2 border border-gray-100 bg-gray-100 rounded-lg focus:outline-none focus:border-black"
              placeholder="Enter Your Email"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="text-gray-700 font-bold mb-2 flex gap-2 items-center"
            >
              <RiLockPasswordFill /> Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-100 bg-gray-100 rounded-lg focus:outline-none focus:border-black"
              placeholder="Enter Your Password"
              required
            />
          </div>

          {/* Sign In Button */}
          <button
            type="submit"
            className="bg-black text-white rounded-lg px-4 py-2 font-semibold hover:bg-blue-600 transition-colors w-full mb-4"
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
            className="bg-blue-600 text-white rounded-lg px-4 py-2 font-semibold hover:bg-red-600 transition-colors w-full flex items-center justify-center"
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
