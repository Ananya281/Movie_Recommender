import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import background from '../assets/images/bg.jpeg';
import Loader from './Loader'; // Adjust path if needed

const HeroDashboard = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_FLASK_API}/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });

      const data = await res.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white px-4 text-center">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
          Welcome to Your Movie Recommender
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
          Discover movies based on your favorite genres, actors, or simply explore top-rated films.
        </p>

        {/* Search input and button */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8 w-full max-w-xl items-center justify-center">
          <input
            type="text"
            placeholder="Search by actor, movie, or genre..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full sm:flex-1 px-4 py-3 rounded-md text-black outline-none shadow focus:ring-2 focus:ring-red-500"
          />
          <button
            onClick={handleSearch}
            className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md transition font-semibold shadow"
          >
            Recommendations
          </button>
        </div>

        {/* Loader */}
        {loading && (
          <div className="flex flex-col items-center gap-2">
            <Loader text="Searching movies..." />
          </div>
        )}

        {/* No results */}
        {!loading && searchResults.length === 0 && query && (
          <p className="text-white text-sm mt-4">
            No movies found for "<span className="font-semibold">{query}</span>"
          </p>
        )}

        {/* Search results */}
        {!loading && searchResults.length > 0 && (
          <div className="w-full flex justify-center mt-10">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-7xl px-4">
              {searchResults.map((movie, idx) => (
                <Link
                  to={`/movie/${encodeURIComponent(movie.title)}`}
                  key={idx}
                  className="bg-white/10 backdrop-blur-sm rounded-md overflow-hidden shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  {/* Movie Poster */}
                  <div className="h-64 w-full overflow-hidden">
                    <img
                      src={movie.image}
                      alt={movie.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Movie Info */}
                  <div className="p-4 text-left">
                    <h3 className="font-semibold text-white text-sm truncate mb-1">{movie.title}</h3>
                    <div className="text-xs text-gray-300 flex items-center gap-2">
                      <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 00-.364 1.118l1.286 3.957c.3.921-.755 1.688-1.54 1.118l-3.388-2.46a1 1 0 00-1.176 0l-3.388 2.46c-.784.57-1.838-.197-1.539-1.118l1.285-3.957a1 1 0 00-.364-1.118l-3.388-2.46c-.784-.57-.38-1.81.588-1.81h4.18a1 1 0 00.951-.69l1.285-3.957z"/>
                      </svg>
                      IMDb: <span className="text-white font-medium">{movie.rating}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroDashboard;
