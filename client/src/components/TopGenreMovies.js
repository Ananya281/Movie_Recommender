import React from 'react';
import { getTopMoviesByGenre } from '../utils/ml';

const genres = ['Action', 'Comedy', 'Romance', 'Thriller'];

const TopGenreMovies = () => {
  return (
    <div className="space-y-10">
      {genres.map((genre) => {
        const movies = getTopMoviesByGenre(genre);
        return (
          <div key={genre}>
            <h2 className="text-xl font-bold mb-4">Top 5 {genre} Movies</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {movies.map((movie, idx) => (
                <div key={idx} className="bg-gray-800 rounded-md overflow-hidden shadow-md">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-2">
                    <p className="font-semibold text-sm">{movie.title}</p>
                    <p className="text-xs text-gray-400">IMDb Rating: {movie.rating}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TopGenreMovies;
