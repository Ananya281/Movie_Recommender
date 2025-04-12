import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';

// ✅ Your YouTube API Key (hardcoded)
const YOUTUBE_API_KEY = "AIzaSyDF7STVtzqgx4F2Xi7QEA70IUGSvNGULEo";

const MovieDetail = () => {
  const { title } = useParams();
  const navigate = useNavigate();
  const decodedTitle = decodeURIComponent(title);
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerId, setTrailerId] = useState('');
  const [trailerLoading, setTrailerLoading] = useState(false);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_FLASK_API}/movie-detail`, {
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

  const fetchTrailerId = async (movieTitle) => {
    try {
      setTrailerLoading(true);
      const res = await axios.get(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
          movieTitle + ' official trailer'
        )}&key=${YOUTUBE_API_KEY}&maxResults=1&type=video`
      );
      const videoId = res.data.items[0]?.id?.videoId;
      if (videoId) setTrailerId(videoId);
    } catch (err) {
      console.error('Failed to fetch trailer:', err);
    } finally {
      setTrailerLoading(false);
    }
  };

  const openTrailerModal = () => {
    if (movie?.title) {
      fetchTrailerId(movie.title);
      setShowTrailer(true);
    }
  };

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

  const wikipediaUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(movie.title)}`;
  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(movie.title + ' trailer')}`;

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
            <button
              onClick={openTrailerModal}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md transition"
            >
              Watch Trailer
            </button>
            <a
              href={wikipediaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-md transition"
            >
              More Info
            </a>
            <button
              onClick={() => navigate(-1)}
              className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-md transition"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>

      {/* ✅ Trailer Modal */}
      {showTrailer && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
          <div className="bg-[#111] rounded-lg overflow-hidden shadow-lg w-full max-w-3xl mx-4">
            <div className="p-4 text-white font-bold text-xl border-b border-gray-700">
              Trailer
            </div>
            <div className="w-full aspect-video bg-black flex items-center justify-center">
              {trailerLoading ? (
                <p className="text-gray-400">Loading trailer...</p>
              ) : trailerId ? (
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${trailerId}`}
                  title="YouTube Trailer"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <p className="text-gray-400">Trailer not found.</p>
              )}
            </div>
            <div className="flex justify-between p-4 bg-[#1a1a1a] border-t border-gray-700">
  <a
    href={`https://www.youtube.com/watch?v=${trailerId}`}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white text-sm"
  >
    Open in New Tab
  </a>
  <button
    onClick={() => {
      setShowTrailer(false);
      setTrailerId('');
    }}
    className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded text-white text-sm"
  >
    Close
  </button>
</div>

          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
