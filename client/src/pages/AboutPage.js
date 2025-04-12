import React from 'react';
import { useNavigate } from 'react-router-dom';
import bgImage from '../assets/images/bg.jpeg'; // Update path if needed

const About = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center text-white text-center px-6"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="bg-black bg-opacity-60 backdrop-blur-md p-8 rounded-lg max-w-3xl w-full">
        <h1 className="text-4xl font-bold mb-6">About Us</h1>

        <p className="mb-4 text-lg">
          Welcome to <strong>Movie Recommender</strong>! Our mission is to help you discover movies
          that match your taste. We believe that movies have the power to inspire, entertain,
          and bring people together. Our platform leverages advanced algorithms to provide
          personalized recommendations tailored to your preferences.
        </p>

        <p className="mb-6 text-lg">
          Whether you are looking for the latest blockbusters or hidden gems, our team is
          dedicated to enhancing your movie-watching experience. We are a passionate group
          of movie enthusiasts who are committed to delivering the best service possible.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md transition"
          >
            Go Home
          </button>
          <button
            onClick={() => navigate('/contact')}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md transition"
          >
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
