import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import bgImage from '../assets/images/bg.jpeg';

const About = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center flex items-center justify-center relative px-4 sm:px-8"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* ✨ Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-0"></div>

      {/* ✨ Content Card */}
      <div className="relative z-10 bg-white/10 border border-white/20 text-white rounded-3xl shadow-2xl p-6 sm:p-10 md:p-14 max-w-5xl w-full transition-all duration-500 backdrop-blur-lg">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6 text-center">
          About <span className="text-red-500">Movie Recommender</span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-200 mb-4 text-center">
          🎬 Welcome to <span className="font-semibold text-red-400">Movie Recommender</span> – your personal movie companion! Whether you're into thrillers, rom-coms, or indie gems, we’ll help you find the perfect film for every mood.
        </p>

        <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-200 mb-6 text-center">
          Powered by smart <span className="font-semibold text-red-400">AI algorithms</span>, our platform learns your preferences and curates movie recommendations just for you. Say goodbye to endless scrolling and hello to unforgettable movie nights 🍿.
        </p>

        {/* ✨ Go to Home Button Only */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full text-sm sm:text-base transition duration-300 shadow-md"
          >
            <FaHome /> Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
