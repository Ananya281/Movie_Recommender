import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';

const genres = ['Action', 'Comedy', 'Romance', 'Thriller'];

const fallbackMovie = {
  title: 'Movie Not Available',
  rating: 'N/A',
  image: 'https://via.placeholder.com/300x400?text=No+Image',
};

const TopGenreMovies = () => {
  const [moviesByGenre, setMoviesByGenre] = useState({});
  const [loading, setLoading] = useState(true);

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
          <h2 className="text-2xl font-bold mb-4 text-white">Top {genre} Movies</h2>
          <Slider {...settings}>
  {(moviesByGenre[genre] || []).map((movie, idx) => (
    <div key={idx} className="px-2">
      <Link to={`/movie/${encodeURIComponent(movie.title)}`}>
        <div className="bg-gray-800 rounded-md overflow-hidden shadow-md hover:scale-105 transition duration-300">
          <img
            src={movie.image}
            alt={movie.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-2">
            <p className="font-semibold text-sm truncate text-white">{movie.title}</p>
            <p className="text-xs text-gray-400">IMDb Rating: {movie.rating}</p>
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
