import React from "react";
import "./Moviecard.css";
import star from "../assets/happy.png";

function Moviecards({ movie, onRecommend }) {
  return (
    <a
      href={`https://www.themoviedb.org/movie/${movie.id}`}
      target="_blank"
      rel="noreferrer"
      className="movie_card"
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt="movie poster"
        className="movie_post"
      />

      <div className="movie_details">
        <h3 className="movie_details_heading">{movie.original_title}</h3>

        <div className="movie_date_rate">
          <p>{movie.release_date}</p>

          <div className="rating_details">
            <p>{movie.vote_average.toFixed(1)}</p>
            <img src={star} alt="rating-icon" className="card_emoji" />
          </div>
        </div>

        <p className="movie_description">
          {movie.overview.slice(0, 200) + "..."}
        </p>

        <button
          className="recommend_btn"
          onClick={(e) => {
            e.preventDefault();
            onRecommend(movie.id);
          }}
        >
          🎬 Similar Movies
        </button>
      </div>
    </a>
  );
}

export default Moviecards;
