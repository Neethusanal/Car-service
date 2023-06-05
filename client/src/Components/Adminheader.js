import React, { useState } from 'react';


const Adminheader = () => {
  const [mechDetails,setmechDetails]=useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogin = () => {
    setIsLoggedIn(true);
    // Perform login logic here
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Perform logout logic here
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    // Perform search logic here
  };

  return (
    <header className="bg-gray-800 text-white p-4  h-20 w-auto flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="text-xl font-bold ">My Website</h1>
        <div className="ml-4 flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search..."
            className="px-2 py-1 rounded-sm focus:outline-none"
          />
        </div>
      </div>
      <div>
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-sm focus:outline-none"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={handleLogin}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-sm focus:outline-none"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Adminheader;