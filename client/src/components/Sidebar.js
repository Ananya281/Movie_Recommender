import React from 'react';
import {
  FaSearch,
  FaHome,
  FaUser,
  FaThLarge,
  FaSignOutAlt
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="group fixed top-0 left-0 h-screen w-14 hover:w-56 bg-black bg-opacity-90 text-white shadow-lg transition-all duration-300 ease-in-out z-50 flex flex-col justify-between py-6">

      {/* 🔍 Search */}
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

      {/* 🧭 Navigation */}
      <div className="flex flex-col items-center group-hover:items-start px-3 mt-10 gap-6">
        <SidebarLink to="/" icon={<FaHome />} label="Home" />
        <SidebarLink to="/profile" icon={<FaUser />} label="About" />
        <SidebarLink to="/categories" icon={<FaThLarge />} label="Categories" />
      </div>

      {/* 🚪 Logout */}
      <div className="flex flex-col items-center group-hover:items-start px-3 gap-6">
        <SidebarLink to="/" icon={<FaSignOutAlt />} label="Logout" />
      </div>
    </div>
  );
};

// 🔁 Reusable Sidebar Link Component
const SidebarLink = ({ to, icon, label }) => (
  <Link
    to={to}
    className="flex items-center gap-3 hover:text-red-400 transition text-sm w-full"
  >
    {icon}
    <span className="hidden group-hover:inline">{label}</span>
  </Link>
);

export default Sidebar;
