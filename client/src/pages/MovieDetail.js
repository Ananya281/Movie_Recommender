import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

const MovieDetail = () => {
  const { title } = useParams();
  const navigate = useNavigate();
  const decodedTitle = decodeURIComponent(title);
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_FLASK_API}/api/movie-detail`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: decodedTitle }),
        });

        const data = await res.json();
        if (res.ok) {
          setMovie(data);
        } else {
          setError(data.error || 'Failed to fetch movie details');
        }
      } catch (err) {
        setError('Server error while fetching movie');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [decodedTitle]);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <Loader />
      <p className="mt-4">Loading movie details...</p>
    </div>
  );

  if (error) return (
    <div className="text-red-500 p-10 text-center bg-black min-h-screen flex items-center justify-center">
      {error}
    </div>
  );

  return (
    <div
      className="min-h-screen bg-cover bg-center relative text-white"
      style={{ backgroundImage: `url(${movie.poster_path})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-70 z-0" />

      <div className="relative z-10 px-4 py-16 flex flex-col items-center justify-center min-h-screen text-center">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{movie.title}</h1>
          <p className="text-lg mb-2"><span className="font-semibold">IMDb Rating:</span> {movie.imdb_rating}</p>
          <p className="text-lg mb-2"><span className="font-semibold">Genres:</span> {movie.genres}</p>
          <p className="text-lg mb-2"><span className="font-semibold">Actors:</span> {movie.actors}</p>

          <p className="mt-6 text-md text-gray-300 leading-relaxed max-w-3xl mx-auto">
            <span className="font-semibold text-white">Overview:</span> {movie.story}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md">Watch Trailer</button>
            <button className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-md">More Info</button>
            <button
              onClick={() => navigate(-1)}
              className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-md"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
