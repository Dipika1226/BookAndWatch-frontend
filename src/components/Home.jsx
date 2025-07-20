import { useEffect, useState } from "react";
import axios from "axios";
import "swiper/css";
import "swiper/css/navigation";
import HeroCarousel from "./HeroCarousal";
import MovieCard from "./MovieCard";

const MovieSection = ({ title, movies, loading }) => (
  <section className="px-6 py-4">
    <h2 className="text-2xl font-semibold mb-3">{title}</h2>
    <div className="flex overflow-x-auto gap-4 scrollbar-hide">
      {loading
        ? [...Array(5)].map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-zinc-800 rounded w-[180px] h-[320px]"
            />
          ))
        : movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
    </div>
  </section>
);

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
        console.log(now.data);
        setUpcoming(up.data);
        setPopular(pop.data);
      } catch (err) {
        console.error("Failed to fetch movies:", err);
      } finally {
        setLoadingNow(false);
        setLoadingUpcoming(false);
        setLoadingPopular(false);
      }
    };
    fetchMovies();
  }, []);

  return (
    <main className="pb-12">
      {/* Hero Carousel */}
      <HeroCarousel />
      {/* Movie Sections */}
      <MovieSection
        title="🎬 Now Showing"
        movies={nowPlaying}
        loading={loadingNow}
      />
      <MovieSection
        title="Upcoming Movies"
        movies={upcoming}
        loading={loadingUpcoming}
      />
      <MovieSection
        title="Popular Picks"
        movies={popular}
        loading={loadingPopular}
      />
    </main>
  );
};

export default Home;
