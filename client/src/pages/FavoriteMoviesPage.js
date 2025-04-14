import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FavoriteMoviesPage = ({ userId }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_FLASK_API}/favorites/${userId}`);
        const data = await res.json();
        setFavorites(data);
      } catch (err) {
        console.error("Error loading favorite movies:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchFavorites();
    }
  }, [userId]);

  if (loading) return <p className="text-white px-6 mt-6">Loading your favorite movies...</p>;

  return (
    <div className="min-h-screen bg-black px-4 py-10 text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">All Your Favorite Movies</h1>
        <button
          onClick={() => navigate('/dashboard#hero')}
          className="text-sm text-blue-400 hover:text-blue-200 transition"
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* Movies Grid */}
      {favorites.length > 0 ? (
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {favorites.map((movie, idx) => (
            <div
              key={idx}
              onClick={() => navigate(`/movie/${encodeURIComponent(movie.title)}`)}
              className="group relative rounded-lg overflow-hidden transition-all duration-300 bg-black hover:shadow-xl cursor-pointer"
            >
              {/* Thumbnail */}
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-48 object-cover"
              />

              {/* Title */}
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
      ) : (
        <div className="mt-20 text-center text-gray-400">
          <p className="text-lg">You haven't added any favorites yet.</p>
          <p className="text-sm mt-2">Explore movies and mark them as favorite to see them here!</p>
        </div>
      )}
    </div>
  );
};

export default FavoriteMoviesPage;
