import React, { useState, useEffect, useRef } from "react";
import axios from "@/api/axios";
import API_KEY from "@/config";
import ReactPlayer from "react-player";
import { motion, AnimatePresence } from "framer-motion";
import ReactDOM from "react-dom";
import MoreInfoModal from "./MoreInfoModal";

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// HoverCard Component
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// HoverCard component excerpt
const HoverCard = ({ hoverData, previewPos, onClose, isMuted, onUnmuteClick , onMoreInfoClick}) => {
  if (typeof document === "undefined") return null;

  return ReactDOM.createPortal(
    <AnimatePresence mode="wait">
      {hoverData && previewPos && (
        <motion.div
          key={hoverData.id}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.25 }}
          className="absolute z-50 bg-neutral-900 rounded-lg shadow-xl"
          style={{
            top: previewPos.top + window.scrollY, // Adjust for scroll position
            left: previewPos.left,
            width: previewPos.width,
          }}
          onMouseEnter={() => onClose("cancel")}
          onMouseLeave={() => onClose("leave")}
        >
          {hoverData.trailerUrl ? (
            <div className="relative w-full h-52">
              <ReactPlayer
                url={hoverData.trailerUrl}
                playing
                muted={isMuted}
                controls={false}
                width="100%"
                height="200px"
                style={{
                  borderTopLeftRadius: "0.5rem",
                  borderTopRightRadius: "0.5rem",
                }}
              />
              {isMuted && (
                <div 
                  className="absolute inset-0 flex items-center justify-center text-white cursor-pointer" 
                  onClick={onUnmuteClick} // ⬅️ The onClick handler is now on this div
                >
                  <span className="bg-gray-800 bg-opacity-75 p-3 rounded-full text-xl">
                    🔇 Click to unmute
                  </span>
                </div>
              )}
            </div>
          ) : (
            <img
              src={`https://image.tmdb.org/t/p/w500${hoverData.backdrop_path}`}
              alt={hoverData.title}
              className="w-full h-40 object-cover rounded-t-lg"
            />
          )}

          <div className="p-3 space-y-2">
            <div className="flex gap-3">
              <button className="bg-white text-black px-3 py-1 rounded font-semibold hover:bg-gray-300">
                ▶ Play
              </button>
              <button className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-600">
                + My List
              </button>
              <button onClick={() => onMoreInfoClick(hoverData)} className="bg-gray-700 text-white px-3 py-1 rounded hover:bg-gray-600">
                More Info
              </button>
            </div>
            <h3 className="text-white text-md font-semibold font-['Poppins']">
              {hoverData.title || hoverData.name}
            </h3>
            <p className="text-gray-300 text-xs line-clamp-2">
              {hoverData.overview}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.getElementById("hover-root")
  );
};

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// MovieRow Component
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const MovieRow = ({ title, fetchURL, isLargeRow = false }) => {
  const [movies, setMovies] = useState([]);
  const [hoverData, setHoverData] = useState(null);
  const [previewPos, setPreviewPos] = useState(null);
  const [moreInfoData, setMoreInfoData] = useState(null);
  // State to manage the muted status of the player in the hover card
  const [isPlayerMuted, setIsPlayerMuted] = useState(true);

  // Use refs for timeouts to ensure current values and prevent stale closures
  const hoverTimeoutRef = useRef(null);
  const leaveTimeoutRef = useRef(null);
  const currentHoveredMovieIdRef = useRef(null); // To track the ID of the currently hovered movie for transition logic

  // Fetch movies data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = await axios.get(fetchURL);
        setMovies(request.data.results || []);
      } catch (error) {
        console.error(error);
        setMovies([]);
      }
    };
    fetchData();

    // Cleanup timeouts on component unmount
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);
    };
  }, [fetchURL]);

  // Function to fetch movie trailer details
const fetchMovieTrailer = async (movie) => {
  try {
    // fallback: if movie has no title, it's probably a TV show
    const type = movie.media_type || (movie.title ? "movie" : "tv");

    const res = await axios.get(
      `https://api.themoviedb.org/3/${type}/${movie.id}/videos?api_key=${API_KEY}&language=en-US`
    );

    const videos = res.data.results || [];
    const trailer = videos.find((v) => v.type === "Trailer") || videos[0];

    return {
      trailerUrl: trailer
        ? `https://www.youtube.com/watch?v=${trailer.key}`
        : null,
      ...movie,
    };
  } catch (err) {
    console.error(err);
    return null;
  }
};


  const showHoverCard = async (movie, rect) => {
    // Only show if the movie is still the one currently intended to be hovered
    if (movie.id !== currentHoveredMovieIdRef.current) {
      return;
    }

    const data = await fetchMovieTrailer(movie);
    console.log("Fetched hover data for movie:", movie.name, data);
    if (data && movie.id === currentHoveredMovieIdRef.current) {
      setHoverData(data);
      setPreviewPos({
        top: rect.top, // Card covers the thumbnail
        left: rect.left,
        width: rect.width * 1.25, // Card slightly bigger
      });
    }
  };

  const handleMoreInfoClick = (movie) => {
    // Hide the hover card immediately
    setHoverData(null); 
    setPreviewPos(null);

    // Set the movie data to open the modal
    setMoreInfoData(movie);
  };

  // Handler for mouse entering a movie thumbnail
  const handleMouseEnterMovie = (movie, e) => {
    // if (isLargeRow) return;
    console.log("Hovering over movie:", movie)

    // Clear any pending timeouts
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    if (leaveTimeoutRef.current) clearTimeout(leaveTimeoutRef.current);

    const rect = e.currentTarget.getBoundingClientRect();

    // If a different movie is currently hovered, or no movie is hovered,
    // we need to set hoverData to null first to trigger the exit animation.
    if (!hoverData || hoverData.id !== movie.id) {
      // Reset the player to muted for the new card
      setIsPlayerMuted(true);
      // Clear current hover state to trigger exit animation on old card
      setHoverData(null);
      setPreviewPos(null);
      // Set the ID of the movie we are *about* to show
      currentHoveredMovieIdRef.current = movie.id;

      // Wait for the old card to exit (transition duration: 0.25s), then show the new one
      hoverTimeoutRef.current = setTimeout(() => {
        showHoverCard(movie, rect);
      }, 300); // Slightly more than the exit transition duration
    } else {
      // If it's the same movie, just ensure the card is still shown
      currentHoveredMovieIdRef.current = movie.id;
      hoverTimeoutRef.current = setTimeout(() => {
        showHoverCard(movie, rect);
      }, 500); // Standard delay for initial hover
    }
  };

  // Handler for mouse leaving a movie thumbnail
  const handleMouseLeaveMovie = () => {
    if (isLargeRow) return;

    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }

    // Indicate that no movie is actively being hovered from the thumbnails
    currentHoveredMovieIdRef.current = null;

    leaveTimeoutRef.current = setTimeout(() => {
      setHoverData(null);
      setPreviewPos(null);
    }, 200); // Delay before hiding the card
  };

  // Handler for mouse interactions with the HoverCard itself
  const handleCloseHoverCard = (type) => {
    if (type === "cancel") {
      // Mouse entered the hover card, so cancel any pending leave timeout
      // to keep the card visible.
      if (leaveTimeoutRef.current) {
        clearTimeout(leaveTimeoutRef.current);
        leaveTimeoutRef.current = null;
      }
      // If the mouse re-enters the card, ensure currentHoveredMovieIdRef is still set
      // to the movie whose card is currently displayed. This prevents premature hiding.
      if (hoverData) {
         currentHoveredMovieIdRef.current = hoverData.id;
      }
    } else if (type === "leave") {
      // Mouse left the hover card, set a new leave timeout to hide it.
      // Clear any existing leave timeout first to avoid multiple timers.
      if (leaveTimeoutRef.current) {
        clearTimeout(leaveTimeoutRef.current);
      }
      // Indicate that no movie is actively being hovered from the card itself
      currentHoveredMovieIdRef.current = null;

      leaveTimeoutRef.current = setTimeout(() => {
        setHoverData(null);
        setPreviewPos(null);
      }, 200);
    }
  };

  // New handler to unmute the player, passed to HoverCard.
  const handlePlayerUnmute = () => {
    setIsPlayerMuted(false);
  };

  return (
    <div className="w-full relative ">
      <h1 className="text-white text-lg font-bold mb-3">{title}</h1>

      <div className="flex overflow-x-scroll scrollbar-hide [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden h-full overflow-y-hidden space-x-4 p-4 ">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className={`relative flex-shrink-0 cursor-pointer transition-transform duration-200 hover:scale-105 ${
              isLargeRow ? "w-40 md:w-52 h-60" : "w-64 md:w-80 h-36"
            }`}
            onMouseEnter={(e) => handleMouseEnterMovie(movie, e)}
            onMouseLeave={handleMouseLeaveMovie}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.title}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        ))}
      </div>
      {moreInfoData && (
        <MoreInfoModal movie={moreInfoData} onClose={() => setMoreInfoData(null)} />
      )}

      <HoverCard
        hoverData={hoverData}
        previewPos={previewPos}
        onClose={handleCloseHoverCard}
        onMoreInfoClick={handleMoreInfoClick}
        isMuted={isPlayerMuted} // Pass the muted state
        onUnmuteClick={handlePlayerUnmute} // Pass the unmute handler
      />
    </div>
  );
};

export default MovieRow;