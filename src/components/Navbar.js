import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import fire from "../assets/fire.png";
import star from "../assets/smiley.png";
import blast from "../assets/blast.png";

function Navbar() {
  const [darkMode, setdarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    } else {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="navbar">
      <div className="main_heading">
        <h1>Movie Maniac</h1>
        <p>Search • Discover • Recommend • Watch</p>
      </div>

      <div className="navlinks">
        <button
          className={`theme-toggle ${darkMode ? "dark" : ""}`}
          onClick={() => setdarkMode(!darkMode)}
        >
          <span className="icon-left">☀️</span>
          <span className="icon-right">🌙</span>
          <div className="toggle-thumb"></div>
        </button>

        <Link to="/">
          Popular <img src={fire} alt="fire emoji" className="navemoji" />{" "}
        </Link>
        <Link to="/top_rated">
          Top Rated <img src={star} alt="star emoji" className="navemoji" />
        </Link>
        <Link to="/upcoming">
          Upcoming <img src={blast} alt="blast emoji" className="navemoji" />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
