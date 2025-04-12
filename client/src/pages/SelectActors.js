import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ✅ Static Imports
import ajay from '../assets/images/actors/Ajay Devgn.jpeg';
import akshay from '../assets/images/actors/Akshay Kumar.jpeg';
import amitabh from '../assets/images/actors/Amitabh Bachchan.jpeg';
import anil from '../assets/images/actors/Anil Kapoor.jpeg';
import anushka from '../assets/images/actors/Anushka Sharma.jpeg';
import ayushmann from '../assets/images/actors/Ayushmann Khurrana.jpeg';
import hema from '../assets/images/actors/Hema Malini.jpeg';
import kajol from '../assets/images/actors/Kajol.jpeg';
import kriti from '../assets/images/actors/Kriti Sanon.jpeg';
import priyanka from '../assets/images/actors/Priyanka Chopra.jpeg';
import rishi from '../assets/images/actors/Rishi Kapoor.jpeg';
import vicky from '../assets/images/actors/Vicky Kaushal.jpeg';

const actorsList = [
  'Ajay Devgn', 'Akshay Kumar', 'Amitabh Bachchan', 'Anil Kapoor',
  'Anushka Sharma', 'Ayushmann Khurrana', 'Hema Malini', 'Kajol',
  'Kriti Sanon', 'Priyanka Chopra', 'Rishi Kapoor', 'Vicky Kaushal'
];

const actorImages = {
  'Ajay Devgn': ajay,
  'Akshay Kumar': akshay,
  'Amitabh Bachchan': amitabh,
  'Anil Kapoor': anil,
  'Anushka Sharma': anushka,
  'Ayushmann Khurrana': ayushmann,
  'Hema Malini': hema,
  'Kajol': kajol,
  'Kriti Sanon': kriti,
  'Priyanka Chopra': priyanka,
  'Rishi Kapoor': rishi,
  'Vicky Kaushal': vicky,
};

const SelectActors = () => {
  const [selectedActors, setSelectedActors] = useState([]);
  const navigate = useNavigate();

  const toggleActor = (actor) => {
    setSelectedActors((prev) =>
      prev.includes(actor)
        ? prev.filter((a) => a !== actor)
        : [...prev, actor]
    );
  };

  const handleSavePreferences = async (actors) => {
    const userId = localStorage.getItem('userId');
    const genres = JSON.parse(localStorage.getItem('preferredGenres') || '[]');

    try {
      const res = await fetch(`${process.env.REACT_APP_NODE_API}/auth/preferences`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          favoriteGenres: genres,
          favoriteActors: actors
        }),
      });

      const data = await res.json();
      if (!res.ok) console.error('Error:', data.message);

      navigate('/dashboard');
    } catch (error) {
      console.error('Request failed:', error.message);
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">
        Select Your Favorite Bollywood Actors/Actresses
      </h2>

      {/* Responsive Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {actorsList.map((actor) => (
          <div
            key={actor}
            onClick={() => toggleActor(actor)}
            className={`group relative rounded-md overflow-hidden cursor-pointer border-2 transition-all duration-300 ease-in-out ${
              selectedActors.includes(actor)
                ? 'border-red-500 scale-105'
                : 'border-transparent'
            }`}
          >
            <img
              src={actorImages[actor]}
              alt={actor}
              className="w-full h-40 sm:h-48 md:h-56 object-cover transform transition duration-300 group-hover:scale-105 opacity-70"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center px-2 text-center">
              <span className="text-white text-lg sm:text-xl font-semibold">
                {actor}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="mt-10 flex justify-center flex-wrap gap-4">
        <button
          onClick={() => navigate('/select-genres')}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md transition"
        >
          Back
        </button>

        <button
          onClick={() => handleSavePreferences([])}
          className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-md transition"
        >
          Skip
        </button>

        <button
          onClick={() => handleSavePreferences(selectedActors)}
          className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-md transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SelectActors;
