import React from 'react';
import { useNavigate } from 'react-router-dom';

import Action from '../assets/images/genres/Action.jpeg';
import Drama from '../assets/images/genres/Drama.jpeg';
import Adventure from '../assets/images/genres/Adventure.jpeg';
import Biography from '../assets/images/genres/Biography.jpeg';
import Comedy from '../assets/images/genres/Comedy.jpg';
import Crime from '../assets/images/genres/Crime.jpeg';
import Family from '../assets/images/genres/Family.jpeg';
import Horror from '../assets/images/genres/Horror.jpeg';
import Mystery from '../assets/images/genres/Mystery.jpeg';
import Musical from '../assets/images/genres/Musical.jpeg';
import Romance from '../assets/images/genres/Romance.jpg';
import Thriller from '../assets/images/genres/Thriller.jpeg';

const genres = [
  { name: 'Action', image: Action },
  { name: 'Drama', image: Drama },
  { name: 'Adventure', image: Adventure },
  { name: 'Biography', image: Biography },
  { name: 'Comedy', image: Comedy },
  { name: 'Crime', image: Crime },
  { name: 'Family', image: Family },
  { name: 'Horror', image: Horror },
  { name: 'Mystery', image: Mystery },
  { name: 'Musical', image: Musical },
  { name: 'Romance', image: Romance },
  { name: 'Thriller', image: Thriller },
];

const Categories = () => {
  const navigate = useNavigate();

  const handleGenreClick = (genreName) => {
    navigate(`/top/${genreName.toLowerCase()}`);
  };

  return (
    <div className="min-h-screen bg-black text-white px-6 py-12">
      <div className="flex justify-between items-center mb-10 max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold">Select on the basis of Genre</h1>
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-white text-sm"
        >
          ⬅ Back to Dashboard
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {genres.map((genre) => (
          <div
            key={genre.name}
            onClick={() => handleGenreClick(genre.name)}
            className="relative overflow-hidden rounded-lg shadow-md cursor-pointer group transition duration-300"
          >
            <img
              src={genre.image}
              alt={genre.name}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300 opacity-80"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-50 flex items-center justify-center">
              <h3 className="text-xl font-semibold">{genre.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
