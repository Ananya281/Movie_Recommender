import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const GenrePage = () => {
  const { genre } = useParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGenreMovies = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_FLASK_API}/top/${genre}`);
        const data = await res.json();
        setMovies(data);
      } catch (err) {
        console.error("Error fetching genre movies:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGenreMovies();
  }, [genre]);

  return (
    <div className="min-h-screen bg-black px-6 py-10 text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold capitalize">Top {genre} Movies</h1>
        <button
          onClick={() => navigate('/dashboard#hero')}
          className="text-blue-400 text-sm hover:text-blue-200 transition"
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* Loading State */}
      {loading ? (
        <p className="text-white">Loading movies...</p>
      ) : (
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {movies.map((movie, idx) => (
            <div
              key={idx}
              onClick={() => navigate(`/movie/${encodeURIComponent(movie.title)}`)}
              className="group relative rounded-lg overflow-hidden transition-all duration-300 bg-black hover:shadow-xl cursor-pointer"
            >
              {/* Poster */}
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-48 object-cover"
              />

              {/* Title (always visible) */}
              <div className="text-white mt-2 text-sm font-semibold truncate px-1">
                {movie.title}
              </div>

              {/* Hover Overlay */}
              <div className="absolute bottom-0 left-0 right-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out text-white text-sm">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
                <div className="relative px-4 py-12 z-10">
                  <p className="font-semibold text-sm leading-tight mb-1">{movie.title}</p>
                  <p className="text-xs text-gray-300">IMDb: {movie.rating}</p>
                  <p className="mt-2 underline text-red-500 text-xs">View More Details →</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GenrePage;
