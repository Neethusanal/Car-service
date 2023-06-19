import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userlogout } from "../Redux/UserSlice";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const [username, setUserName] = useState();
  const navigate = useNavigate();
  const dispatch=useDispatch()
  console.log(user);

  const handleLogout = () => {
    localStorage.removeItem("usertoken");
    dispatch(userlogout()); 
    navigate("/");
  };

  useEffect(() => {
    setUserName(user.name);
  }, [user]);

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
            {user.isUserAuth ? (
              <>
                <span className="text-white">{username}</span>
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-gray-300 ml-4"
                >
                  Logout
                </button>
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
