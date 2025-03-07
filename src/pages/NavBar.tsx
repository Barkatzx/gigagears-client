import { useState } from "react";
import { FaSearch, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { RiLoginBoxFill } from "react-icons/ri";
import { SiGnuprivacyguard } from "react-icons/si";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <nav className="container mx-auto bg-white shadow-sm lg:px-40 py-5 px-5">
      <div className="flex items-center justify-between">
        {/* Left: Logo */}
        <a href="/" className="text-2xl font-bold">
          <img src="./src/assets/img/logo.png" className="w-36" />
        </a>

        {/* Center: Navigation Links */}
        <ul className="hidden md:flex space-x-6 text-sm font-semibold">
          <li>
            <a href="/shop" className="hover:text-blue-600">
              Shop
            </a>
          </li>
          <li>
            <a href="/about" className="hover:text-blue-600">
              About
            </a>
          </li>
          <li>
            <a href="/contact" className="hover:text-blue-600">
              Contact
            </a>
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

          {/* Cart Icon */}
          <a href="/cart" className="relative">
            <FaShoppingCart className="text-2xl hover:text-blue-600" />
            <span className="absolute -top-2 -right-2 bg-blue-600 text-xs text-white rounded-full px-1">
              2
            </span>
          </a>

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
                    <a href="/profile">Profile</a>
                  </li>
                  <li>
                    <a href="/settings">Settings</a>
                  </li>
                  <li>
                    <button onClick={() => setIsLoggedIn(false)}>
                      Log Out
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <a href="/login" className="flex items-center gap-2">
                      <RiLoginBoxFill /> Login
                    </a>
                  </li>
                  <hr className="my-1 text-gray-200" />
                  <li>
                    <a href="/signup" className="flex items-center gap-2">
                      <SiGnuprivacyguard /> Sign Up
                    </a>
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
