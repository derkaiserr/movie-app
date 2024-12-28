import React from "react";

const MovieThumbnail = (
  isLargeRow: boolean,
  handleHover: any,
  title: string,
  trailerUrl: string,
  movie: any,
  setTrailerUrl: any
) => {
  return (
    <div
      className={`  w-full relative flex-1 row_poste ${
        isLargeRow && "row_posterLarg"
      }`}
      key={movie.id}
    >
      <img
        className={isLargeRow ? "min-w-72" : "min-w-80"}
        // onClick={() => {
        //     console.log(movie.id)
        //     if (trailerUrl) {
        //         handleClose();
        //     } else {
        //         handleClick(movie.id);
        //     }
        // }}
        onMouseEnter={() => {
          handleHover(movie.id);
        }}
        onMouseLeave={() => setTrailerUrl("")}
        src={`https://image.tmdb.org/t/p/w300/${
          isLargeRow ? movie.poster_path : movie.backdrop_path
        }`}
        alt={movie.title}
      />
      {title !== "NETFLIX ORIGINALS" && (
        <p className="movie-title">{movie?.title || movie?.name}</p>
      )}
      {trailerUrl && (
        <div className="trailer_container top-5 left-4 absolute">
          <iframe
            title="movie-trailer"
            width="500"
            height="315"
            src={trailerUrl}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default MovieThumbnail;
