import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const actorsList = [
    'Ajay Devgn', 'Akshay Kumar', 'Amitabh Bachchan', 'Anil Kapoor',
    'Anushka Sharma', 'Ayushmann Khurrana', 'Hema Malini', 'Kajol',
    'Kriti Sanon', 'Priyanka Chopra', 'Rishi Kapoor', 'Vicky Kaushal'
  ];

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
      if (!res.ok) {
        console.error('Error:', data.message);
      }
  
      navigate('/dashboard');
    } catch (error) {
      console.error('Request failed:', error.message);
      navigate('/dashboard');
    }
  };
  
  

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h2 className="text-3xl font-bold text-center mb-8">Select Your Favorite Bollywood Actors/Actresses</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {actorsList.map((actor) => (
          <div
            key={actor}
            onClick={() => toggleActor(actor)}
            className={`relative rounded-md overflow-hidden cursor-pointer border-2 ${
              selectedActors.includes(actor)
                ? 'border-red-500'
                : 'border-transparent'
            }`}
          >
            <img
              src={`/images/actors/${actor.toLowerCase().replace(/ /g, '-')}.jpg`}
              alt={actor}
              className="w-full h-40 object-cover opacity-70"
            />
            <span className="absolute inset-0 flex items-center justify-center font-bold text-lg text-center px-2">
              {actor}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center gap-4">
        <button
          onClick={() => handleSavePreferences([])} // Skip = save empty actors
          className="bg-gray-600 px-6 py-2 rounded-md"
        >
          Skip
        </button>

        <button
          onClick={() => handleSavePreferences(selectedActors)} // Save selected
          className="bg-red-600 px-6 py-2 rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SelectActors;
