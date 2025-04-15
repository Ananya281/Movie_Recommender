import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';
import { ArrowLeft, PlayCircle, Info } from 'lucide-react';

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
  const hasSavedHistory = useRef(false); // ✅ persist flag across renders

  const handleGoBack = () => {
    navigate('/dashboard#hero');
  };

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

          const userId = localStorage.getItem('userId');
          if (userId && data?.title && !hasSavedHistory.current) {
            hasSavedHistory.current = true; // ✅ set true only once
            await fetch(`${process.env.REACT_APP_NODE_API}/history`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ userId, title: data.title })
            });
          }
        } else {
          setError(data?.error || 'Failed to fetch movie details');
        }

      } catch (err) {
        console.error("❌ Movie fetch failed:", err);
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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
        <Loader />
        <p className="mt-4">Loading movie details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 p-10 text-center bg-black min-h-screen flex items-center justify-center">
        {error}
      </div>
    );
  }

  const wikipediaUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(movie.title)}`;

  return (
    <div
      className="min-h-screen bg-cover bg-center relative text-white"
      style={{ backgroundImage: `url(${movie.poster_path})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 z-0" />
      <div className="relative z-10 px-4 py-20 lg:py-28 flex flex-col items-center justify-center min-h-screen text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">{movie.title}</h1>

          <div className="text-base sm:text-lg text-gray-300 space-y-2">
            <p><span className="font-semibold text-white">IMDb Rating:</span> {movie.imdb_rating}</p>
            <p><span className="font-semibold text-white">Genres:</span> {movie.genres}</p>
            <p><span className="font-semibold text-white">Actors:</span> {movie.actors}</p>
          </div>

          <p className="text-sm sm:text-base text-gray-400 leading-relaxed max-w-2xl mx-auto">
            <span className="font-semibold text-white">Overview:</span> {movie.story}
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <button
              onClick={openTrailerModal}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-md transition"
            >
              <PlayCircle className="w-5 h-5" /> Watch Trailer
            </button>

            <a
              href={wikipediaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded-md transition"
            >
              <Info className="w-5 h-5" /> More Info
            </a>

            <button
              onClick={handleGoBack}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-2 rounded-md transition"
            >
              <ArrowLeft className="w-5 h-5" /> Go Back
            </button>
          </div>
        </div>
      </div>

      {showTrailer && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center px-4">
          <div className="bg-[#111] rounded-lg overflow-hidden shadow-xl w-full max-w-3xl animate-fade-in">
            <div className="p-4 border-b border-gray-700 flex justify-between items-center">
              <h2 className="text-lg font-bold text-white">Trailer</h2>
              <button
                onClick={() => {
                  setShowTrailer(false);
                  setTrailerId('');
                }}
                className="text-gray-400 hover:text-white transition text-xl"
              >
                ✕
              </button>
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

            <div className="flex justify-between items-center p-4 border-t border-gray-700 bg-[#1a1a1a]">
              <a
                href={`https://www.youtube.com/watch?v=${trailerId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
              >
                Open in New Tab
              </a>
              <button
                onClick={() => {
                  setShowTrailer(false);
                  setTrailerId('');
                }}
                className="text-sm px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
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
