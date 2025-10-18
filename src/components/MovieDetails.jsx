import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { PlayIcon } from "@heroicons/react/24/solid";
import {
  StarIcon,
  ClockIcon,
  CalendarDaysIcon,
} from "@heroicons/react/24/solid";
import TheaterSection from "./TheaterSection";

const BACKDROP = "https://image.tmdb.org/t/p/original";
const POSTER = "https://image.tmdb.org/t/p/w500";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState("");
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const API = import.meta.env.VITE_API_URL;
    const fetchDetails = async () => {
      const res = await axios.get(`${API}/movies/${id}`);
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

            {/* Ratings, Runtime, Release Date */}
            <div className="flex items-center gap-4 text-sm text-gray-300">
              {/* Rating */}
              <div className="flex items-center gap-1">
                <StarIcon className="w-4 h-4 text-amber-400" />
                <span>{movie.vote_average?.toFixed(1)}</span>
              </div>

              {/* Runtime */}
              <div className="flex items-center gap-1">
                <ClockIcon className="w-4 h-4 text-amber-400" />
                <span>
                  {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                </span>
              </div>

              {/* Release Date */}
              <div className="flex items-center gap-1">
                <CalendarDaysIcon className="w-4 h-4 text-amber-400" />
                <span>
                  {new Date(movie.release_date).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mt-1">
              {movie.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="px-3 py-1 rounded-full text-xs bg-white/10 text-white backdrop-blur-sm border border-white/20"
                >
                  {genre.name}
                </span>
              ))}
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
      <div className="mt-4 px-6 lg:px-15 pb-16 relative">
        <h2 className="text-xl font-bold mb-6 text-amber-400">Cast</h2>

        {/* Scroll Buttons */}
        <button
          onClick={() =>
            document
              .getElementById("castScroll")
              .scrollBy({ left: -300, behavior: "smooth" })
          }
          className="absolute left-4 top-[40%] transform -translate-y-1/2 z-10 rounded-full bg-black/40 backdrop-blur-md shadow-[0_0_15px_rgba(255,193,7,0.4)] hover:bg-black/60 p-1"
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
          className="absolute right-4 top-[40%] transform -translate-y-1/2 z-10 rounded-full bg-black/40 backdrop-blur-md shadow-[0_0_15px_rgba(255,193,7,0.4)] hover:bg-black/60 p-1"
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
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-8"
        >
          {cast.slice(0, 12).map((actor) => (
            <div
              key={actor.id}
              className="flex-shrink-0 w-24 text-center transition transform hover:scale-105"
            >
              <div className="group">
                <div className="w-20 h-20 rounded-full mx-auto mb-2 relative overflow-hidden transition-shadow duration-300 group-hover:shadow-[0_0_15px_4px_rgba(255,193,7,0.6)]">
                  <img
                    src={
                      actor.profile_path
                        ? `${POSTER}${actor.profile_path}`
                        : "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                    }
                    alt={actor.name}
                    className="w-full h-full object-cover rounded-full"
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
      {/* 🎬 Theaters & Showtimes Section */}
      <TheaterSection />
    </div>
  );
};

export default MovieDetails;
