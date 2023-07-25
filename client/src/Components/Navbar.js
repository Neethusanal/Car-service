import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUserDetails } from "../Redux/UserSlice";
import { FaShoppingCart } from "react-icons/fa";
import { ServingLocation } from "./ServingLocation";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  const handleLogout = () => {
    localStorage.removeItem("usertoken");
    dispatch(setUserDetails({}));
    navigate("/");
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleCart = () => {
    navigate("/cart");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  return (
    <nav className="bg-black shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <a href="/" className="text-white font-bold text-xl">
              Car Clinic
            </a>
          </div>

          <div className="hidden md:block">
            <ul className="flex space-x-4 mt-5">
              <li>
                <a href="/" className="text-white hover:text-gray-300">
                  Home
                </a>
              </li>
              <li>
                <a href="/staff" className="text-white hover:text-gray-300">
                  Staff
                </a>
              </li>
              <li>
                <a href="/services" className="text-white hover:text-gray-300">
                  Services
                </a>
              </li>
              
              {/* <li>
                <a href="/contact" className="text-white hover:text-gray-300">
                  Contact
                </a>
              </li> */}
              <li>
                <a href="/userservicehistory" className="text-white hover:text-gray-300">
                  ServiceDetails
                </a>
              </li>

              {user.name ? (
                <>
                  <li>
                    <Link
                      to="/cart"
                      className="text-white hover:text-gray-300"
                    >
                      Cart
                    </Link>
                  </li>
                  <li>
                    <ServingLocation />
                  </li>
                 
                </>
              ) : null}
            </ul>
          </div>

          <div className="flex items-center">
            {user.name ? (
              <>
                <span className="text-white">Hi {user.name}</span>
                <button
                  onClick={handleCart}
                  className="text-white hover:text-gray-300 ml-4"
                >
                  {user.cart && user.cart.length > 0 && (
                    <span className="text-white ml-2">{user.cart.length}</span>
                  )}
                  <FaShoppingCart size={20} />
                </button>
                <button
                  onClick={toggleDropdown}
                  className="text-white hover:text-gray-300 ml-4 focus:outline-none"
                >
                  &#9662; {/* Downward arrow character */}
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                    <ul className="py-2">
                      <li>
                        <button
                          onClick={handleProfile}
                          className="block w-full px-4 py-2 text-gray-800 hover:bg-gray-300"
                        >
                          Profile
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={handleLogout}
                          className="block w-full px-4 py-2 text-gray-800 hover:bg-gray-300"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login" className="text-white hover:text-gray-300">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
