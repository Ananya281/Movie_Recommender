import React, { useState } from 'react';
import {
  FaSearch,
  FaHome,
  FaUser,
  FaThLarge,
  FaSignOutAlt
} from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = async (e) => {
    if (e.key === 'Enter' && searchQuery.trim() !== '') {
      const query = searchQuery.trim();

      try {
        const res = await fetch(`${process.env.REACT_APP_FLASK_API}/movie-detail`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: query })
        });

        if (res.ok) {
          const data = await res.json();
          navigate(`/movie/${encodeURIComponent(data.title)}`);
          setSearchQuery('');
          setNotFound(false);
        } else {
          setNotFound(true);
        }
      } catch (err) {
        console.error("Search error:", err);
        setNotFound(true);
      }
    }
  };

  return (
    <div className="group fixed top-0 left-0 h-screen w-10 hover:w-60 bg-gradient-to-t from-black via-black/20 to-transparent transition-all duration-500 ease-in-out z-50 flex flex-col justify-between py-6 px-2">

      {/* 🔍 Search */}
      <div className="relative w-full px-2">
        <div className="flex items-center gap-2 w-full px-0.01 py-2 
          transition-all duration-500 ease-in-out
          bg-transparent group-hover:bg-white/10 group-hover:backdrop-blur-md group-hover:shadow-md">

          <FaSearch className="text-white text-sm min-w-[30px]" />

          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setNotFound(false);
            }}
            onKeyDown={handleSearchSubmit}
            className="hidden group-hover:inline-block w-full bg-transparent outline-none text-white placeholder-white text-sm transition-all duration-500"
          />
        </div>

        {/* ❌ Movie Not Found Message */}
        {notFound && (
          <p className="text-red-400 text-xs mt-1 pl-2 group-hover:block hidden">
            Movie Not Found
          </p>
        )}
      </div>

      {/* 🧭 Navigation */}
      <div className="flex flex-col gap-4 mt-10">
        <SidebarLink to="/dashboard" icon={<FaHome />} label="Home" />
        <SidebarLink to="/about" icon={<FaUser />} label="About" />
        <SidebarLink to="/categories" icon={<FaThLarge />} label="Categories" />
      </div>

      {/* 🚪 Logout */}
      <div className="mt-auto">
        <SidebarLink to="/" icon={<FaSignOutAlt />} label="Logout" />
      </div>
    </div>
  );
};

const SidebarLink = ({ to, icon, label }) => (
  <NavLink
    to={to}
    end
    className={({ isActive }) =>
      `flex items-center px-3 py-3 rounded-lg transition-all duration-500 ease-in-out font-medium text-sm 
       ${isActive ? 'text-white font-semibold' : 'text-white/50 hover:text-white'}`
    }
  >
    {/* Icon */}
    <div className="min-w-[24px] text-lg flex justify-center items-center transition-all duration-500">
      {icon}
    </div>

    {/* Label */}
    <span className="ml-3 hidden group-hover:inline opacity-0 group-hover:opacity-100 translate-x-[-8px] group-hover:translate-x-0 transition-all duration-1000 ease-in-out delay-100">
      {label}
    </span>
  </NavLink>
);

export default Sidebar;
