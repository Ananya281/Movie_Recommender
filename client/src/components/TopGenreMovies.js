import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useNavigate } from 'react-router-dom';

const genres = ['Action', 'Comedy', 'Romance', 'Thriller'];

const fallbackMovie = {
  title: 'Movie Not Available',
  rating: 'N/A',
  image: 'https://via.placeholder.com/300x400?text=No+Image',
};

const TopGenreMovies = () => {
  const [moviesByGenre, setMoviesByGenre] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ]
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const newData = {};
      for (const genre of genres) {
        try {
          const res = await fetch(`${process.env.REACT_APP_FLASK_API}/top/${genre.toLowerCase()}`);
          const data = await res.json();
          newData[genre] = Array.isArray(data) && data.length > 0 ? data : [fallbackMovie];
        } catch (err) {
          console.warn(`${genre} fetch failed`, err);
          newData[genre] = [fallbackMovie];
        }
      }
      setMoviesByGenre(newData);
      setLoading(false);
    };
    fetchMovies();
  }, []);

  if (loading) return <p className="text-white text-lg">Loading top movies...</p>;

  return (
    <div className="space-y-14 mt-10 px-4">
      {genres.map((genre) => (
        <div key={genre}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-white">Top {genre} Movies</h2>
            <button
              onClick={() => navigate(`/top/${genre.toLowerCase()}`)}
              className="text-sm text-blue-400 hover:text-blue-200 transition"
            >
              View All →
            </button>
          </div>

          <Slider {...settings}>
            {(moviesByGenre[genre] || []).map((movie, idx) => (
              <div key={idx} className="px-2">
                <Link to={`/movie/${encodeURIComponent(movie.title)}`}>
                  <div className="group relative rounded-lg overflow-hidden transition-all duration-300 bg-black hover:shadow-xl cursor-pointer">
                    <img
                      src={movie.image}
                      alt={movie.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="text-white mt-2 text-sm font-semibold truncate px-1">
                      {movie.title}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out text-white text-sm">
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
                      <div className="relative px-4 py-12 z-10">
                        <p className="font-semibold text-sm leading-tight mb-1">
                          {movie.title}
                        </p>
                        <p className="text-xs text-gray-300">
                          {movie.episode || `IMDb: ${movie.rating}`} • {movie.date || '13 Apr'}
                        </p>
                        <p className="mt-2 underline text-red-500 text-xs">
                          View More Details →
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      ))}
    </div>
  );
};

export default TopGenreMovies;
