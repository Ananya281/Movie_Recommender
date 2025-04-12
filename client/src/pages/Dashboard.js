import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import HeroDashboard from '../components/HeroDashboard';
import TopGenreMovies from '../components/TopGenreMovies';
import YourFavoriteMovies from '../components/YourFavoriteMovies';

const Dashboard = () => {
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const storedId = localStorage.getItem('userId');
    if (storedId) {
      setUserId(storedId);
    }
  }, []);

  return (
    <div className="relative flex bg-black text-white min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 pl-14 md:pl-16 pr-4 pt-6 overflow-y-auto">
        <HeroDashboard />

        {/* Favorite Movies */}
        <div className="py-10 mb-[-70px]">
          {userId ? (
            <YourFavoriteMovies userId={userId} />
          ) : (
            <p className="text-white text-center">Loading user preferences...</p>
          )}
        </div>

        {/* Genre-Based Recommendations */}
        <div className="py-10">
          <TopGenreMovies />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
