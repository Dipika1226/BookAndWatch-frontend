import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { PlayIcon, TicketIcon } from "@heroicons/react/24/solid";

const BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original";

const HeroCarousel = () => {
  const [nowPlaying, setNowPlaying] = useState([]);
  const [activeTrailerKey, setActiveTrailerKey] = useState(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [trailerPlayedForSlide, setTrailerPlayedForSlide] = useState({});
  const iframeRef = useRef(null);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const res = await axios.get("http://localhost:7777/movies/now-playing");
        setNowPlaying(res.data.slice(0, 5));
      } catch (err) {
        console.error("Error fetching now playing movies:", err.message);
      }
    };
    fetchNowPlaying();
  }, []);

  useEffect(() => {
    if (
      nowPlaying.length &&
      activeSlideIndex === 0 &&
      !trailerPlayedForSlide[0]
    ) {
      fetchTrailer(nowPlaying[0].id, 0);
    }
  }, [activeSlideIndex, nowPlaying]);

  const fetchTrailer = async (movieId, slideIndex) => {
    try {
      const res = await axios.get(
        `http://localhost:7777/movies/trailer/${movieId}`
      );
      const trailer = res.data.results.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );
      if (trailer) {
        setActiveTrailerKey(trailer.key);
        setTrailerPlayedForSlide((prev) => ({
          ...prev,
          [slideIndex]: true,
        }));
      }
    } catch (err) {
      console.error("Error fetching trailer:", err.message);
    }
  };

  const stopVideo = () => {
    if (iframeRef.current) {
      iframeRef.current.src = "";
    }
  };

  return (
    <div className="w-full animate-slide-fade">
      <Swiper
        modules={[Navigation, Pagination, EffectFade]}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet !bg-amber-500",
        }}
        effect="fade"
        loop={nowPlaying.length > 1}
        className="w-full h-[65vh] sm:h-[75vh]"
        onSlideChange={(swiper) => {
          stopVideo(); // pause trailer on slide change
          setActiveSlideIndex(swiper.realIndex);
          setActiveTrailerKey(null);
        }}
      >
        {nowPlaying.map((movie, index) => {
          const showTrailer = activeTrailerKey && trailerPlayedForSlide[index];

          return (
            <SwiperSlide key={movie.id}>
              <div className="relative w-full h-[65vh] sm:h-[75vh] overflow-hidden shadow-xl shadow-black/50">
                {showTrailer ? (
                  <div className="absolute top-0 left-0 w-full h-full z-20 backdrop-blur-sm bg-black/60 rounded-md">
                    <iframe
                      ref={iframeRef}
                      className="absolute top-0 left-0 w-full h-full rounded-md"
                      src={`https://www.youtube.com/embed/${activeTrailerKey}?autoplay=1&mute=0&controls=0&rel=0&modestbranding=1&showinfo=0&fs=0&enablejsapi=1`}
                      title={movie.title}
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                      frameBorder="0"
                    />
                  </div>
                ) : (
                  <div
                    className="w-full h-full bg-cover bg-center relative transition-all duration-1000"
                    style={{
                      backgroundImage: `url(${BACKDROP_BASE_URL}${movie.backdrop_path})`,
                      backgroundSize: "110%",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundSize = "115%";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundSize = "110%";
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10" />
                    <div className="relative z-20 px-4 sm:px-8 md:px-16 text-white/85 max-w-xl h-full flex flex-col justify-center space-y-4 animate-fade-in">
                      <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold leading-tight drop-shadow-lg">
                        {movie.title}
                      </h1>
                      <p className="text-sm sm:text-base md:text-lg line-clamp-3 drop-shadow">
                        {movie.overview}
                      </p>
                      <div className="flex gap-4">
                        <button
                          onClick={() => fetchTrailer(movie.id, index)}
                          className="flex items-center gap-2 px-6 py-2 rounded-full backdrop-blur-sm bg-white/10 text-white border border-white/30 hover:border-amber-500 hover:shadow-[0_0_15px_rgba(255,191,0,0.5)] transition-all duration-300"
                        >
                          <PlayIcon className="w-5 h-5" />
                          Play Trailer
                        </button>
                        <button className="flex items-center gap-2 px-6 py-2 rounded-full backdrop-blur-sm bg-white/70 text-black border border-black/20 hover:bg-white hover:shadow-md transition-all duration-300">
                          <TicketIcon className="w-5 h-5" />
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </SwiperSlide>
          );
        })}

        {/* Custom Arrows */}
        <div className="custom-prev absolute z-30 left-3 top-1/2 transform -translate-y-1/2">
          <button className="w-10 h-10 rounded-full bg-white/30 text-black text-lg shadow-md hover:scale-110 transition">
            ❮
          </button>
        </div>
        <div className="custom-next absolute z-30 right-3 top-1/2 transform -translate-y-1/2">
          <button className="w-10 h-10 rounded-full bg-white/30 text-black text-lg shadow-md hover:scale-110 transition">
            ❯
          </button>
        </div>
      </Swiper>
    </div>
  );
};

export default HeroCarousel;
