import React, { useEffect, useState, useCallback } from "react";
import axios from "@/api/axios";
import API_KEY from "@/config";
import { MdCancel } from "react-icons/md";
import ReactPlayer from "react-player";

const MovieRow = ({ title, fetchURL, isLargeRow }) => {
  const [movies, setMovies] = useState([]);
  const [activeTrailer, setActiveTrailer] = useState({
    movieId: null,
    trailerUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [noTrailer, setNoTrailer] = useState("");

  // Fetch movies data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = await axios.get(fetchURL);
        setMovies(request.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
        if (error.response) {
          setMovies(error.request.data);
        } else {
          setMovies([]);
        }
      }
    };
    fetchData();
  }, [fetchURL]);

  // Debounced trailer fetch
  const fetchTrailer = useCallback(async (id) => {
    if (!id) return;
    console.log(id);
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
      );
      const videos = response.data.results;
      console.log(videos);
      if (videos?.length > 0) {
        const trailer =
          videos.find(
            (video) =>
              video.type === "Trailer" &&
              video.name.toLowerCase().includes("official")
          ) ||
          videos.find((video) => video.type === "Trailer") ||
          videos[0];

        if (trailer?.key) {
          setActiveTrailer({
            movieId: id,
            trailerUrl: `https://www.youtube.com/embed/${trailer.key}?autoplay=1`,
          });
          setNoTrailer("");
        } else {
          setNoTrailer("No trailer available");
          setActiveTrailer({ movieId: null, trailerUrl: "" });
        }
      } else {
        setNoTrailer("No trailer available");
        setActiveTrailer({ movieId: null, trailerUrl: "" });
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
      setNoTrailer("Error loading trailer");
      setActiveTrailer({ movieId: null, trailerUrl: "" });
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounced hover handler
  const handleHover = useCallback(
    (id) => {
      const timer = setTimeout(() => {
        if (title !== "NETFLIX ORIGINALS") {
          fetchTrailer(id);
        }
      }, 2500); // Add small delay to prevent unnecessary API calls

      return () => clearTimeout(timer);
    },
    [fetchTrailer]
  );

  const handleMouseLeave = useCallback(() => {
    setActiveTrailer({ movieId: null, trailerUrl: "" });
    setNoTrailer("");
  }, []);

  const handleCancelClick = useCallback(() => {
    setNoTrailer("");
    handleMouseLeave();
  }, [handleMouseLeave]);

  return (
    <div className="row">
      <h1 className="font-semibold">{title}</h1>
      <div className="flex relative overflow-x-scroll p-5 w-full gap-5 row_posters">
        {movies?.map((movie) => (
          <div
            className={`w-80 min-h-[calc(100%-5rem)] relative flex-1 row_poster ${
              isLargeRow && "row_posterLarge"
            }`}
            key={movie.id}
            onMouseEnter={() => handleHover(movie.id)}
            onMouseLeave={handleMouseLeave}
          >
            {activeTrailer.movieId === movie.id && activeTrailer.trailerUrl ? (
              <div className="min-w-80 h-44 relative rounded-md video-wrapper">
                <ReactPlayer
                  url={activeTrailer.trailerUrl}
                  // playing
                  muted
                  loop
                  controls
                  className="react-player"
                  width="100%"
                  height="100%"
                />
              </div>
            ) : (
              <div>
                <img
                  className={isLargeRow ? "min-w-72" : " min-w-80"}
                  src={`https://image.tmdb.org/t/p/w300/${
                    isLargeRow ? movie.poster_path : movie.backdrop_path
                  }`}
                  alt={movie.title || movie.name}
                />
             
              </div>
            )}

            {title !== "NETFLIX ORIGINALS" && (
              <p className="movie-title">{movie?.title || movie?.name} </p>
            )}

            <div>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-info"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 16v-4" />
                  <path d="M12 8h.01" />
                </svg>
              </button>
              <button>
                {
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide lucide-plus"
                  >
                    <path d="M5 12h14" />
                    <path d="M12 5v14" />
                  </svg>
                }
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* {noTrailer && (
        <div className="trail">
          <p className="noTrailer">{noTrailer}</p>
          <span onClick={handleCancelClick}>
            <MdCancel />
          </span>
        </div>
      )} */}
    </div>
  );
};

export default MovieRow;
