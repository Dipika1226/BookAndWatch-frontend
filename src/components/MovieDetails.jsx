import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { PlayIcon } from "@heroicons/react/24/solid";

const BACKDROP = "https://image.tmdb.org/t/p/original";
const POSTER = "https://image.tmdb.org/t/p/w500";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState("");
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      const res = await axios.get(`http://localhost:7777/movies/${id}`);
      setMovie(res.data.movie);
      setCast(res.data.cast);
      const trailer = res.data.videos.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );
      if (trailer) setTrailerKey(trailer.key);
    };
    fetchDetails();
  }, [id]);

  if (!movie) return <div className="text-white p-10">Loading...</div>;

  return (
    <div className="text-white min-h-screen bg-[#1C1D1D]">
      {/* Hero Section */}
      <div
        className="relative w-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${BACKDROP}${movie.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#1C1D1D]/95 via-[#1C1D1D]/80 to-transparent backdrop-blur-md"></div>

        <div className="relative z-10 flex flex-col lg:flex-row items-start gap-10 px-6 py-10 lg:px-20 lg:py-20">
          {/* Poster */}
          <div className="w-full sm:w-72 md:w-80 lg:w-[300px] shadow-lg rounded-lg overflow-hidden relative z-20 group transition-transform duration-500 hover:scale-105">
            <img
              src={`${POSTER}${movie.poster_path}`}
              alt={movie.title}
              className="w-full object-cover rounded-lg"
            />
          </div>

          {/* Right Content */}
          <div className="text-white max-w-2xl space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-amber-400">
              {movie.title}
            </h1>

            <div className="text-sm text-gray-400 space-y-1">
              {/* Runtime & Release Date in same line */}
              <p>
                {movie.runtime} mins • {movie.release_date}
              </p>

              {/* Genres in next line */}
              {/* Genres */}
              <div className="flex flex-wrap gap-2 mt-2">
                {movie.genres.map((g) => (
                  <span
                    key={g.id}
                    className="bg-white/20 text-white text-xs px-3 py-1 rounded-full border border-white/30 backdrop-blur-sm"
                  >
                    {g.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-3 text-sm text-gray-300">
              <span className="text-amber-400 font-semibold text-lg">
                ⭐ {movie.vote_average.toFixed(1)}/10
              </span>
              <span className="text-gray-500">
                ({movie.vote_count.toLocaleString()} votes)
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-300 leading-relaxed">{movie.overview}</p>

            {/* Trailer Button */}
            {trailerKey && (
              <a
                href={`https://youtube.com/watch?v=${trailerKey}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-amber-500 text-black font-semibold hover:bg-amber-600 transition"
              >
                <PlayIcon className="w-5 h-5" />
                Watch Trailer
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Cast Section */}
      <div className="mt-10 px-6 lg:px-20 pb-16 relative">
        <h2 className="text-2xl font-bold mb-6 text-amber-400">Cast</h2>

        {/* Scroll Buttons */}
        <button
          onClick={() =>
            document
              .getElementById("castScroll")
              .scrollBy({ left: -300, behavior: "smooth" })
          }
          className="absolute left-4 top-[60%] transform -translate-y-1/2 z-10 rounded-full bg-black/40 backdrop-blur-md shadow-[0_0_15px_rgba(255,193,7,0.4)] hover:bg-black/60 p-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>

        <button
          onClick={() =>
            document
              .getElementById("castScroll")
              .scrollBy({ left: 300, behavior: "smooth" })
          }
          className="absolute right-4 top-[60%] transform -translate-y-1/2 z-10 rounded-full bg-black/40 backdrop-blur-md shadow-[0_0_15px_rgba(255,193,7,0.4)] hover:bg-black/60 p-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="white"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>

        {/* Cast List */}
        <div
          id="castScroll"
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth px-8"
        >
          {cast.slice(0, 12).map((actor) => (
            <div
              key={actor.id}
              className="flex-shrink-0 w-24 text-center transition transform hover:scale-105"
            >
              <div className="group">
                <div className="w-24 h-24 rounded-full mx-auto mb-2 relative overflow-hidden">
                  <img
                    src={
                      actor.profile_path
                        ? `${POSTER}${actor.profile_path}`
                        : "https://via.placeholder.com/100x150"
                    }
                    alt={actor.name}
                    className="w-full h-full object-cover rounded-full transition duration-300 group-hover:shadow-[0_0_15px_4px_rgba(255,193,7,0.5)]"
                  />
                </div>
                <p className="text-sm font-semibold text-white truncate">
                  {actor.name}
                </p>
                <p className="text-xs text-gray-400 truncate">
                  {actor.character}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
