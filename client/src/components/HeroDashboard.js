import React from 'react';
import background from '../assets/images/bg.jpeg';

const HeroDashboard = () => {
  return (
    <div
      className="relative h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to Your Movie Recommender
        </h1>
        <p className="text-lg mb-8">Get personalized movie recommendations!</p>

        {/* Search input */}
        <input
          type="text"
          placeholder="Search for movies..."
          className="px-6 py-3 w-72 rounded-md text-black outline-none mb-4"
        />

        {/* Recommendations button on next line */}
        <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md transition">
          Recommendations
        </button>
      </div>
    </div>
  );
};

export default HeroDashboard;
