import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import HeroDashboard from '../components/HeroDashboard';
import TopGenreMovies from '../components/TopGenreMovies';
import YourFavoriteMovies from '../components/YourFavoriteMovies';
import RecommendedBasedOnLastMovie from '../components/RecommendedBasedOnLastMovie';
import UserUserRecommendations from '../components/UserUserRecommendations';
import { useLocation } from 'react-router-dom';

const Dashboard = () => {
  const [userId, setUserId] = useState('');
  const location = useLocation();

  // ✅ Fetch userId from localStorage
  useEffect(() => {
    const storedId = localStorage.getItem('userId');
    if (storedId) {
      setUserId(storedId);
    }
  }, []);

  // ✅ Scroll to Hero section if #hero hash is present in the URL
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

        {/* ❤️ Your Favorite Movies */}
        <div className="py-10">
          {userId ? (
            <YourFavoriteMovies userId={userId} />
          ) : (
            <p className="text-white text-center">Loading your favorite movies...</p>
          )}
        </div>

        {/* 🍿 Because You Watched Last Movie */}
        <div className="py-10">
          {userId && <RecommendedBasedOnLastMovie userId={userId} />}
        </div>

        {/* 👥 User-User Collaborative Filtering Recommendations */}
        <div>
          {userId && <UserUserRecommendations userId={userId} />}
        </div>

        {/* 🎞️ Top Genre-Based Recommendations */}
        <div className="py-10">
          <TopGenreMovies />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
