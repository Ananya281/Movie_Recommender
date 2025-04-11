import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const genresList = [
  'Action', 'Drama', 'Adventure', 'Biography',
  'Comedy', 'Crime', 'Family', 'Horror',
  'Mystery', 'Musical', 'Romance', 'Thriller'
];

const SelectGenres = () => {
  const [selectedGenres, setSelectedGenres] = useState([]);
  const navigate = useNavigate();

  const toggleGenre = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : [...prev, genre]
    );
  };

  const handleNext = () => {
    localStorage.setItem('preferredGenres', JSON.stringify(selectedGenres));
    navigate('/select-actors');
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h2 className="text-3xl font-bold text-center mb-8">Select Your Favorite Genres</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {genresList.map((genre) => (
          <div
            key={genre}
            onClick={() => toggleGenre(genre)}
            className={`relative rounded-md overflow-hidden cursor-pointer border-2 ${
              selectedGenres.includes(genre)
                ? 'border-red-500'
                : 'border-transparent'
            }`}
          >
            <img src={`/images/genres/${genre.toLowerCase()}.jpg`} alt={genre} className="w-full h-40 object-cover opacity-70" />
            <span className="absolute inset-0 flex items-center justify-center font-bold text-xl">{genre}</span>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-center gap-4">
        <button onClick={() => navigate('/select-actors')} className="bg-gray-600 px-6 py-2 rounded-md">Skip</button>
        <button onClick={handleNext} className="bg-red-600 px-6 py-2 rounded-md">Next</button>
      </div>
    </div>
  );
};

export default SelectGenres;
