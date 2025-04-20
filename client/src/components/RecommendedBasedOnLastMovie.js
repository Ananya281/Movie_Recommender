import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RecommendedBasedOnLastMovie = ({ userId }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_FLASK_API}/recommendations/based-on-last/${userId}`);
        const data = await res.json();
  
        console.log("🎯 Received Recommendations:", data); // ✅ Add this line
  
        if (res.ok && Array.isArray(data)) {
          setRecommendations(data);
        }
      } catch (err) {
        console.error("❌ Failed to fetch recommendations:", err);
      } finally {
        setLoading(false);
      }
    };
  
    if (userId) fetchRecommendations();
  }, [userId]);
  

  if (loading || recommendations.length === 0) return null;

  return (
    <div className="px-4 py-10 text-white">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Because you watched something recently</h2>
      </div>

      <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {recommendations.map((movie, idx) => (
          <div
            key={idx}
            onClick={() => navigate(`/movie/${encodeURIComponent(movie.title)}`)}
            className="group relative rounded-lg overflow-hidden transition-all duration-300 bg-black hover:shadow-xl cursor-pointer"
          >
            <img src={movie.image} alt={movie.title} className="w-full h-48 object-cover" />
            <div className="text-white mt-2 text-sm font-semibold truncate px-1">{movie.title}</div>
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
    </div>
  );
};

export default RecommendedBasedOnLastMovie;
