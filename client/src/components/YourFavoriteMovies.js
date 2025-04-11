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
        const res = await fetch(`http://localhost:5001/api/favorites/${userId}`);
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
      <h2 className="text-2xl font-bold mb-4 text-white">Your Favorite Movies</h2>
      {favorites.length > 0 ? (
        <Slider {...settings}>
          {favorites.map((movie, idx) => (
            <div key={idx} className="px-2">
              <div
                onClick={() => navigate(`/movie/${encodeURIComponent(movie.title)}`)}
                className="cursor-pointer bg-gray-800 rounded-md overflow-hidden shadow-md hover:scale-105 transition duration-300"
              >
                <img src={movie.image} alt={movie.title} className="w-full h-64 object-cover" />
                <div className="p-2">
                  <p className="font-semibold text-sm truncate text-white">{movie.title}</p>
                  <p className="text-xs text-gray-400">IMDb Rating: {movie.rating}</p>
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
