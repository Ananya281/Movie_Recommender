import React from 'react';
import {
  FaSearch,
  FaHome,
  FaUser,
  FaThLarge,  // ✅ Categories icon
  FaSignOutAlt
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="group fixed top-0 left-0 h-screen w-14 hover:w-56 bg-black bg-opacity-90 text-white shadow-lg transition-all duration-300 ease-in-out z-50 flex flex-col justify-between py-6">

      {/* Top: Search Section */}
      <div className="flex flex-col items-center group-hover:items-start px-3 gap-6">
        <div className="flex items-center gap-2 w-full">
          <FaSearch className="text-white text-sm min-w-[20px]" />
          <input
            type="text"
            placeholder="Search..."
            className="hidden group-hover:block w-full px-3 py-1 rounded-md text-black text-sm transition duration-300"
          />
        </div>
      </div>

      {/* Middle: Navigation Links */}
      <div className="flex flex-col items-center group-hover:items-start px-3 mt-10 gap-6">
        <Link to="/" className="flex items-center gap-3 hover:text-red-400 transition text-sm w-full">
          <FaHome />
          <span className="hidden group-hover:inline">Home</span>
        </Link>

        <Link to="/profile" className="flex items-center gap-3 hover:text-red-400 transition text-sm w-full">
          <FaUser />
          <span className="hidden group-hover:inline">About</span>
        </Link>

        <Link to="/categories" className="flex items-center gap-3 hover:text-red-400 transition text-sm w-full">
          <FaThLarge />
          <span className="hidden group-hover:inline">Categories</span>
        </Link>
      </div>

      {/* Bottom: Logout Button */}
      <div className="flex flex-col items-center group-hover:items-start px-3 gap-6">
        <Link to="/logout" className="flex items-center gap-3 hover:text-red-400 transition text-sm w-full">
          <FaSignOutAlt />
          <span className="hidden group-hover:inline">Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
