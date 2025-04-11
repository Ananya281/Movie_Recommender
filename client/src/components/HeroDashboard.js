import React, { useState } from 'react';
import background from '../assets/images/bg.jpeg';

const HeroDashboard = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const res = await fetch('http://localhost:5001/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });

      const data = await res.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to Your Movie Recommender
        </h1>
        <p className="text-lg mb-8">Get personalized movie recommendations!</p>

        <div className="flex gap-3 mb-6 w-full max-w-md item-center justify-center">
          <input
            type="text"
            placeholder="Search by actor, movie, or genre..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-4 py-3 rounded-md text-black outline-none"
          />
          <button
            onClick={handleSearch}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md transition"
          >
            Recommendations
          </button>
        </div>

        {searchResults.length > 0 && (
  <div className="w-full flex justify-center mt-10">
    <div className="flex gap-4 flex-wrap justify-center max-w-7xl px-4">
      {searchResults.map((movie, idx) => (
        <div
          key={idx}
          className="w-[180px] bg-gray-900 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition duration-300"
        >
          <img
            src={movie.image}
            alt={movie.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-3 text-left">
            <h3 className="font-semibold text-sm truncate">{movie.title}</h3>
            <p className="text-xs text-gray-400">IMDb Rating: {movie.rating}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
)}
      </div>
    </div>
  );
};

export default HeroDashboard;
