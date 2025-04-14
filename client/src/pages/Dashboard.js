import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import HeroDashboard from '../components/HeroDashboard';
import TopGenreMovies from '../components/TopGenreMovies';
import YourFavoriteMovies from '../components/YourFavoriteMovies';
import { useLocation } from 'react-router-dom';

const Dashboard = () => {
  const [userId, setUserId] = useState('');
  const location = useLocation();

  // Fetch userId from localStorage
  useEffect(() => {
    const storedId = localStorage.getItem('userId');
    if (storedId) {
      setUserId(storedId);
    }
  }, []);

  // Scroll to Hero if hash is present
  useEffect(() => {
    if (location.hash === '#hero') {
      const heroElement = document.getElementById('hero');
      if (heroElement) {
        heroElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div className="relative flex bg-black text-white min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 pl-14 md:pl-16 pr-4 pt-6 overflow-y-auto">
        
        {/* 🎬 Hero Section */}
        <div id="hero">
          <HeroDashboard />
        </div>

        {/* ❤️ Favorite Movies */}
        <div className="py-10 mb-[-70px]">
          {userId ? (
            <YourFavoriteMovies userId={userId} />
          ) : (
            <p className="text-white text-center">Loading user preferences...</p>
          )}
        </div>

        {/* 🎞️ Genre-Based Recommendations */}
        <div className="py-10">
          <TopGenreMovies />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
