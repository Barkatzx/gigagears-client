import { useEffect, useState } from "react";
import { FaSearch, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { RiLoginBoxFill } from "react-icons/ri";
import { SiGnuprivacyguard } from "react-icons/si";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.png";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  // Load cart items from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    if (token) {
      setIsLoggedIn(true);
    }
    setCartItems(cart);
  }, []);

  // Update cart count when localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartItems(cart);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className="container mx-auto bg-white shadow-sm lg:px-40 py-5 px-5">
      <div className="flex items-center justify-between">
        {/* Left: Logo */}
        <Link to="/">
          <img src={logo} className="w-36" alt="Logo" />
        </Link>

        {/* Center: Navigation Links */}
        <ul className="hidden md:flex space-x-6 text-sm font-semibold">
          <li>
            <Link to="/" className="hover:text-blue-600">
              Home
            </Link>
          </li>
          <li>
            <Link to="/shop" className="hover:text-blue-600">
              Shop
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-blue-600">
              Contact
            </Link>
          </li>
        </ul>

        {/* Right: Search, Cart, User */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative hidden md:flex">
            <input
              type="text"
              placeholder="Search for products..."
              className="bg-gray-100 px-3 py-3 rounded-full pl-10 focus:outline-none"
            />
            <FaSearch className="absolute left-4 top-4 text-gray-600" />
          </div>

          {/* Dynamic Cart Icon */}
          <Link to="/cart" className="relative">
            <FaShoppingCart className="text-2xl hover:text-blue-600" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-xs text-white rounded-full px-2 py-1">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* User Avatar Dropdown */}
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <FaUserCircle className="text-2xl cursor-pointer hover:text-blue-600" />
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-gray-100 rounded-md w-48"
            >
              {isLoggedIn ? (
                <>
                  <li>
                    <Link to="/dashboard">Profile</Link>
                  </li>
                  <hr className="my-1 text-gray-200" />
                  <li>
                    <button onClick={handleLogout}>Log Out</button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login" className="flex items-center gap-2">
                      <RiLoginBoxFill /> Login
                    </Link>
                  </li>
                  <hr className="my-1 text-gray-200" />
                  <li>
                    <Link to="/signup" className="flex items-center gap-2">
                      <SiGnuprivacyguard /> Sign Up
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
