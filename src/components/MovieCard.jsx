// components/MovieCard.jsx

const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w300";

const MovieCard = ({ movie }) => {
  return (
    <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-lg overflow-hidden shadow-md hover:shadow-amber-300/40 transition-all duration-300 transform hover:scale-102 min-w-[190px] max-w-[200px] cursor-pointer">
      <img
        src={`${POSTER_BASE_URL}${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-[220px] object-cover"
      />
      <div className="p-2">
        <h3 className="text-sm font-semibold text-gray-100 line-clamp-1">
          {movie.title}
        </h3>
        <div className="text-xs text-gray-400 mt-1 flex items-center gap-2">
          <span className="font-medium">
            ⭐ {movie.vote_average?.toFixed(1) || "N/A"}
          </span>
          <span className="px-1.5 py-0.5 bg-gray-500 text-gray-900 rounded text-[10px]">
            {movie.original_language?.toUpperCase()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
