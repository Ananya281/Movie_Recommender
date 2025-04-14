import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const YourFavoriteMovies = ({ userId }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    swipeToSlide: true,
    accessibility: true,
    responsive: [
      { breakpoint: 1280, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_FLASK_API}/favorites/${userId}`);
        const data = await res.json();
        setFavorites(data);
      } catch (err) {
        console.error("Error fetching favorite movies:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchFavorites();
    }
  }, [userId]);

  if (loading) return <p className="text-white px-4">Loading your favorite movies...</p>;

  return (
    <div className="px-4 mt-10">
      {/* Title & View All */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Your Favorite Movies</h2>
        <button
          onClick={() => navigate('/favorites')}
          className="text-sm text-blue-400 hover:text-blue-200 transition"
        >
          View All →
        </button>
      </div>

      {favorites.length > 0 ? (
        <Slider {...settings}>
          {favorites.map((movie, idx) => (
            <div key={idx} className="px-2">
              <div
                tabIndex={0}
                onClick={() => navigate(`/movie/${encodeURIComponent(movie.title)}`)}
                className="group relative rounded-lg overflow-hidden transition-transform duration-300 hover:scale-[1.03] cursor-pointer focus:outline-none"
              >
                {/* Poster */}
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-48 object-cover"
                />

                {/* Title below */}
                <div className="text-white mt-2 text-sm font-semibold truncate px-1">
                  {movie.title}
                </div>

                {/* Fade-Up Overlay on Hover */}
                <div className="absolute bottom-0 left-0 right-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out text-white text-sm">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
                  <div className="relative px-4 py-6 z-10">
                    <p className="font-semibold text-sm leading-tight mb-1">{movie.title}</p>
                    <p className="text-xs text-gray-300">IMDb: {movie.rating}</p>
                    <p className="mt-2 underline text-red-500 text-xs">View More Details →</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <p className="text-gray-400">No recommendations found based on your preferences.</p>
      )}
    </div>
  );
};

export default YourFavoriteMovies;
