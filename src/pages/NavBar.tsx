import { Menu } from "@headlessui/react";
import { useState } from "react";
import { FaSearch, FaShoppingCart, FaUserCircle } from "react-icons/fa";
import { RiLoginBoxFill } from "react-icons/ri";
import { SiGnuprivacyguard } from "react-icons/si";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <nav className=" bg-white shadow-sm lg:px-40 py-5 px-5">
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
            <FaShoppingCart className="text-2xl hover:text-gray-400" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full px-1">
              2
            </span>
          </a>

          {/* User Avatar Dropdown */}
          <Menu as="div" className="relative">
            <Menu.Button className="focus:outline-none">
              <FaUserCircle className="text-3xl cursor-pointer hover:text-gray-400" />
            </Menu.Button>
            <Menu.Items className="absolute right-0 mt-2 w-48 bg-gray-100 text-black rounded-sm shadow-sm overflow-hidden">
              {isLoggedIn ? (
                <>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="/profile"
                        className={`block px-4 py-2 ${
                          active ? "bg-gray-200" : ""
                        }`}
                      >
                        Profile
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="/settings"
                        className={`block px-4 py-2 ${
                          active ? "bg-gray-200" : ""
                        }`}
                      >
                        Settings
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`block w-full text-left px-4 py-2 ${
                          active ? "bg-gray-200" : ""
                        }`}
                        onClick={() => setIsLoggedIn(false)}
                      >
                        Log Out
                      </button>
                    )}
                  </Menu.Item>
                </>
              ) : (
                <>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="/login"
                        className={`block px-4 py-2 flex gap-2 items-center ${
                          active ? "bg-gray-200" : ""
                        }`}
                      >
                        <RiLoginBoxFill /> Login
                      </a>
                    )}
                  </Menu.Item>
                  <hr className=" text-gray-300" />
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="/signup"
                        className={`block px-4 py-2 flex gap-2 items-center ${
                          active ? "bg-gray-200" : ""
                        }`}
                      >
                        <SiGnuprivacyguard /> Sign Up
                      </a>
                    )}
                  </Menu.Item>
                </>
              )}
            </Menu.Items>
          </Menu>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
