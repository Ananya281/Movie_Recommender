import React from 'react';
import Sidebar from '../components/Sidebar';
import HeroDashboard from '../components/HeroDashboard';
import TopGenreMovies from '../components/TopGenreMovies';

const Dashboard = () => {
  return (
    <div className="relative flex bg-black text-white">
      {/* Sidebar is fixed, so we offset the main content */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 pl-14 md:pl-16 pr-4 pt-6 overflow-y-auto min-h-screen">
        <HeroDashboard />
        <div className="py-10">
          <TopGenreMovies />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
