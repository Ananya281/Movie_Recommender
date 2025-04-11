import React from 'react';
import { FaFilm } from 'react-icons/fa';

const Watchlist = () => {
  // Placeholder watchlist data (you can replace this with dynamic data later)
  const movies = [
    { title: 'Shershaah', poster: '/images/posters/shershaah.jpg' },
    { title: 'Chhichhore', poster: '/images/posters/chhichhore.jpg' },
    { title: 'Queen', poster: '/images/posters/queen.jpg' }
  ];

  return (
    <div className="min-h-screen bg-black text-white px-6 py-10">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold flex justify-center items-center gap-3">
          <FaFilm className="text-red-500" /> Your Watchlist
        </h1>
        <p className="text-gray-400 mt-2 text-lg">Your favorite movies saved for later</p>
      </div>

      {movies.length === 0 ? (
        <p className="text-center text-gray-400">You haven’t added any movies to your watchlist yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {movies.map((movie, index) => (
            <div
              key={index}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition duration-300"
            >
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-60 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold">{movie.title}</h2>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
