import React from 'react';


const Navbar = () => {
 
  return (
   
    
    <nav className="bg-gray-800 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-white font-bold text-xl">Car Service</a>
          </div>

          {/* Navigation links */}
          <div className="hidden md:block">
            <ul className="flex space-x-4">
              <li><a href="/" className="text-white hover:text-gray-300">Home</a></li>
              <li><a href="/services" className="text-white hover:text-gray-300">Services</a></li>
              <li><a href="/about" className="text-white hover:text-gray-300">About</a></li>
              <li><a href="/contact" className="text-white hover:text-gray-300">Contact</a></li>
            </ul>
          </div>

          {/* Login button */}
          {/* <div className="flex items-center">
            <a href="/login" className="text-white hover:text-gray-300">
              Login
            </a>
          </div> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

 