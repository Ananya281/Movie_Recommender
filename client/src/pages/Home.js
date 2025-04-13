import React from 'react';
import { Link } from 'react-router-dom';
import background from '../assets/images/bg.jpeg';
import introLogo from '../assets/images/logo.png';

const Home = () => {
  return (
    <div
      className="relative min-h-screen w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* Black Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>

      {/* Centered Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-white text-center">
        <img
          src={introLogo}
          alt="Movie Recommender Logo"
          className="w-60 sm:w-48 md:w-56 lg:w-72 xl:w-[400px] 2xl:w-[420px] h-auto mb-[-12px]"
        />

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-lg mt-[-12px]">
          Welcome to Movie Recommender
        </h1>

        <p className="text-base sm:text-lg md:text-xl mb-8 max-w-2xl leading-relaxed text-gray-200 mt-2">
          Discover personalized movie suggestions based on your preferences.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
          <Link to="/login" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg text-base sm:text-lg font-semibold transition duration-300 shadow-lg">
              Login
            </button>
          </Link>
          <Link to="/register" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto bg-transparent border border-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg text-base sm:text-lg font-semibold transition duration-300 shadow-lg">
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
