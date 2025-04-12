import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// ✅ Static image imports
import action from '../assets/images/genres/Action.jpeg';
import adventure from '../assets/images/genres/Adventure.jpeg';
import biography from '../assets/images/genres/Biography.jpeg';
import comedy from '../assets/images/genres/Comedy.jpg';
import crime from '../assets/images/genres/Crime.jpeg';
import drama from '../assets/images/genres/Drama.jpeg';
import family from '../assets/images/genres/Family.jpeg';
import horror from '../assets/images/genres/Horror.jpeg';
import musical from '../assets/images/genres/Musical.jpeg';
import mystery from '../assets/images/genres/Mystery.jpeg';
import romance from '../assets/images/genres/Romance.jpg';
import thriller from '../assets/images/genres/Thriller.jpeg';

const genresList = [
  'Action', 'Adventure', 'Biography', 'Comedy',
  'Crime', 'Drama', 'Family', 'Horror',
  'Musical', 'Mystery', 'Romance', 'Thriller'
];

const genreImages = {
  Action: action,
  Adventure: adventure,
  Biography: biography,
  Comedy: comedy,
  Crime: crime,
  Drama: drama,
  Family: family,
  Horror: horror,
  Musical: musical,
  Mystery: mystery,
  Romance: romance,
  Thriller: thriller
};

const SelectGenres = () => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const navigate = useNavigate();

  const toggleGenre = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : [...prev, genre]
    );
  };

  const handleSavePreferences = (genres) => {
    localStorage.setItem('preferredGenres', JSON.stringify(genres));
    navigate('/select-actors');
  };

  return (
    <div className="min-h-screen bg-black text-white px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">
        Select Your Favorite Genres
      </h2>

      {/* Responsive grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {genresList.map((genre) => (
          <div
            key={genre}
            onClick={() => toggleGenre(genre)}
            className={`group relative rounded-md overflow-hidden cursor-pointer border-2 transition-all duration-300 ease-in-out ${
              selectedGenres.includes(genre)
                ? 'border-red-500 scale-105'
                : 'border-transparent'
            }`}
          >
            <img
              src={genreImages[genre]}
              alt={genre}
              className="w-full h-40 sm:h-48 md:h-56 object-cover transform transition duration-300 group-hover:scale-105 opacity-70"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center px-2 text-center">
              <span className="text-white text-lg sm:text-xl font-semibold">
                {genre}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="mt-10 flex justify-center flex-wrap gap-4">
        <button
          onClick={() => handleSavePreferences([])}
          className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-md transition"
        >
          Skip
        </button>
        <button
          onClick={() => handleSavePreferences(selectedGenres)}
          className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-md transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SelectGenres;
