import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "@/api/axios";
import API_KEY from "@/config";
import ReactPlayer from "react-player";
import { motion, AnimatePresence } from "framer-motion";

interface Movie {
  poster_path: string | undefined;
  id: number;
  media_type?: string;
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
  backdrop_path?: string;
  overview?: string;
  vote_average?: number;
  runtime?: number;
  number_of_seasons?: number;
  credits?: {
    cast?: { name: string }[];
  };
  genres?: { name: string }[];
  videos?: {
    results?: { key: string; type: string }[];
  };
}

interface MoreInfoModalProps {
  movie: Movie;
  onClose: () => void;
}

const MoreInfoModal: React.FC<MoreInfoModalProps> = ({ movie, onClose }) => {
  const [fullDetails, setFullDetails] = useState<Movie | null>(null);
  const [similarContent, setSimilarContent] = useState<Movie[]>([]);
  const [isPlayerMuted, setIsPlayerMuted] = useState(true);

  // Determine media type (movie or tv) based on the movie object
  const mediaType = movie.media_type || (movie.hasOwnProperty("title") ? "movie" : "tv");

  useEffect(() => {
    // Fetch detailed movie/show information
    const fetchDetails = async () => {
      try {
        const detailsRes = await axios.get(
          `https://api.themoviedb.org/3/${mediaType}/${movie.id}?api_key=${API_KEY}&append_to_response=videos,credits`
        );
        setFullDetails(detailsRes.data);

        const similarRes = await axios.get(
          `https://api.themoviedb.org/3/${mediaType}/${movie.id}/similar?api_key=${API_KEY}`
        );
        setSimilarContent(similarRes.data.results.slice(0, 12));
      } catch (err) {
        console.error("Failed to fetch more info data:", err);
      }
    };

    if (movie) {
      fetchDetails();
    }
  }, [movie, mediaType]);

  const trailer = fullDetails?.videos?.results?.find(v => v.type === "Trailer") || fullDetails?.videos?.results?.[0];

  if (!fullDetails) {
    return null; // Don't render if data isn't available yet
  }

  // Helper function to format runtime in hours and minutes
  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours > 0 ? `${hours}h ` : ""}${mins}m`;
  };

  return ReactDOM.createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] overflow-y-scroll bg-black bg-opacity-90 scrollbar-hide"
      >
        <div className="relative w-full max-w-4xl mx-auto my-8 bg-neutral-900 rounded-lg">
          {/* Header/Video Section */}
          <div className="relative w-full h-80">
            {trailer ? (
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${trailer.key}`}
                playing
                muted={isPlayerMuted}
                controls={true}
                width="100%"
                height="100%"
                style={{ borderRadius: "0.5rem 0.5rem 0 0" }}
              />
            ) : (
              <img
                src={`https://image.tmdb.org/t/p/w1280${fullDetails.backdrop_path}`}
                alt={fullDetails.title || fullDetails.name}
                className="w-full h-full object-cover rounded-t-lg"
              />
            )}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-neutral-900 rounded-full text-white hover:bg-neutral-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Details Section */}
          <div className="p-8 space-y-6">
            <h1 className="text-white text-4xl font-bold font-['Poppins']">
              {fullDetails.title || fullDetails.name}
            </h1>
            <div className="flex items-center space-x-4 text-gray-400 text-sm">
              <span className="text-green-400 font-semibold">{`${((fullDetails.vote_average ?? 0) * 10).toFixed(0)}% Match`}</span>
              <span>{fullDetails.release_date?.substring(0, 4) || fullDetails.first_air_date?.substring(0, 4)}</span>
              <span>
                {mediaType === "movie" ? formatRuntime(fullDetails.runtime ?? 0) : `${fullDetails.number_of_seasons} Seasons`}
              </span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              {fullDetails.overview}
            </p>

            {/* Cast & Genres */}
            <div className="flex space-x-8 text-gray-400">
              <div className="flex flex-col space-y-1">
                <span className="text-gray-500">Cast:</span>
                <span className="text-sm">
                  {fullDetails.credits?.cast?.slice(0, 3).map((cast) => cast.name).join(", ")}
                </span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-gray-500">Genres:</span>
                <span className="text-sm">
                  {fullDetails.genres?.map((genre) => genre.name).join(", ")}
                </span>
              </div>
            </div>
          </div>

          {/* Similar Content Section */}
          {similarContent.length > 0 && (
            <div className="p-8 border-t border-neutral-800">
              <h2 className="text-white text-2xl font-bold mb-4">More Like This</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {similarContent.map((item) => (
                  <div key={item.id} className="cursor-pointer">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${item.backdrop_path || item.poster_path}`}
                      alt={item.title || item.name}
                      className="w-full h-auto rounded-lg"
                    />
                    <div className="mt-2 text-sm text-gray-300">
                      <p className="font-semibold line-clamp-1">{item.title || item.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body // Using document.body is a standard practice for full-screen portals
  );
};

export default MoreInfoModal;