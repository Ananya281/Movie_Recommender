import React from 'react';
import { Link } from 'react-router-dom';
import background from '../assets/images/bg.jpeg';
import introLogo from '../assets/images/logo.png';

const Home = () => {
  return (
    <div
      className="relative h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>

      {/* Centered Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white px-4">
        <img
          src={introLogo}
          alt="Movie Recommender Logo"
          className="w-150 h-100 mb-0 mt-[-140px]"
        />
        <h1 className="text-6xl md:text-5xl font-bold text-center mb-6 text-white mb-6 mt-[-80px]">
          Welcome to Movie Recommender
        </h1>

        <div className="flex gap-4">
          <Link to="/login">
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 text-lg rounded-md transition">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 text-lg rounded-md transition">
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
