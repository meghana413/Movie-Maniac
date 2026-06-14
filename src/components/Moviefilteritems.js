import React from "react";

function Moviefilteritems({ minrating, onFilterClick, ratings }) {
  return (
    <div>
      <ul className="movie_filter">
        {ratings.map((rate) => (
          <li
            className={
              minrating === rate
                ? "movie_filter_item active"
                : "movie_filter_item"
            }
            onClick={() => onFilterClick(rate)}
            key={rate}
          >
            {rate}+ Star
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Moviefilteritems;
