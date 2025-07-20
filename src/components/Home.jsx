// components/Home.jsx

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "swiper/css";
import "swiper/css/navigation";

import HeroCarousel from "./HeroCarousal";
import MovieCard from "./MovieCard";

const ScrollArrow = ({ direction, onClick }) => (
  <button
    onClick={onClick}
    className={`absolute top-1/2 -translate-y-1/2 z-10 p-2 bg-white/35 rounded-full shadow-md hover:bg-gray-500 transition ${
      direction === "left" ? "left-2" : "right-2"
    }`}
  >
    {direction === "left" ? <FaChevronLeft /> : <FaChevronRight />}
  </button>
);

const MovieSection = ({ title, movies, loading }) => {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      const amount = dir === "left" ? -300 : 300;
      scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
    }
  };

  return (
    <section className="relative px-6 py-5">
      <h2 className="text-2xl font-bold text-gray-300 mb-4">{title}</h2>

      {/* Arrows */}
      <ScrollArrow direction="left" onClick={() => scroll("left")} />
      <ScrollArrow direction="right" onClick={() => scroll("right")} />

      {/* Movie Cards */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-2 scroll-smooth no-scrollbar"
      >
        {loading
          ? Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse w-[180px] h-[320px] rounded-lg bg-gray-300/50 shadow"
              />
            ))
          : movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </section>
  );
};

const Home = () => {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [popular, setPopular] = useState([]);

  const [loadingNow, setLoadingNow] = useState(true);
  const [loadingUpcoming, setLoadingUpcoming] = useState(true);
  const [loadingPopular, setLoadingPopular] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const [now, up, pop] = await Promise.all([
          axios.get("http://localhost:7777/movies/now-playing"),
          axios.get("http://localhost:7777/movies/upcoming"),
          axios.get("http://localhost:7777/movies/popular"),
        ]);
        setNowPlaying(now.data);
        setUpcoming(up.data);
        setPopular(pop.data);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      } finally {
        setLoadingNow(false);
        setLoadingUpcoming(false);
        setLoadingPopular(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <main className="pb-16 ">
      <HeroCarousel/>
      <MovieSection
        title="🎬 Now Playing"
        movies={nowPlaying}
        loading={loadingNow}
        
      />
      <MovieSection
        title="🎟️ Upcoming Movies"
        movies={upcoming}
        loading={loadingUpcoming}
      />
      <MovieSection
        title="🔥 Popular Picks"
        movies={popular}
        loading={loadingPopular}
      />
    </main>
  );
};

export default Home;
