import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const [username, setUserName] = useState();
  const navigate = useNavigate();
  console.log(user);

  const handleLogout = () => {
    localStorage.removeItem("usertoken");
    navigate("/");
  };
  useEffect(() => {
    setUserName(user.name);
  }, []);

  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-white font-bold text-xl">
              Car Service
            </a>
          </div>

          {/* Navigation links */}
          <div className="hidden md:block">
            <ul className="flex space-x-4">
              <li>
                <a href="/" className="text-white hover:text-gray-300">
                  Home
                </a>
              </li>
              <li>
                <a href="/services" className="text-white hover:text-gray-300">
                  Services
                </a>
              </li>
              <li>
                <a href="/about" className="text-white hover:text-gray-300">
                  About
                </a>
              </li>
              <li>
                <a href="/contact" className="text-white hover:text-gray-300">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Login button */}
          <div className="flex items-center">
            {user ? (
              <>
                <span className="text-white">{username}</span>
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-gray-300"
                ></button>
              </>
            ) : (
              <a href="/login" className="text-white hover:text-gray-300">
                Login
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
