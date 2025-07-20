// components/MovieCard.jsx

import React from "react";
const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w300";

const MovieCard = ({ movie }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 min-w-[190px] cursor-pointer">
      <img
        src={`${POSTER_BASE_URL}${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-[270px] object-cover"
      />
      <div className="p-3">
        <h3 className="text-md font-semibold text-gray-900 line-clamp-1">
          {movie.title}
        </h3>
        <div className="text-sm text-gray-700 mt-1 flex items-center gap-2">
          <span className="font-medium">
            ⭐ {movie.vote_average?.toFixed(1) || "N/A"}
          </span>
          <span className="px-2 py-0.5 bg-gray-200 text-gray-800 rounded text-xs">
            {movie.original_language?.toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
