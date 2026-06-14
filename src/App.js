import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Movielist from "./components/Movielist";
import fire from "./assets/fire.png";
import blast from "./assets/blast.png";
import star from "./assets/smiley.png";
import "./App.css";

function App() {
  return (
    <Router basename="/Movie-Maniac">
      <div className="app">
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={
              <Movielist type="popular" title="Popular Movies" emoji={fire} />
            }
          />

          <Route
            path="/top_rated"
            element={
              <Movielist
                type="top_rated"
                title="Top Rated Movies"
                emoji={blast}
              />
            }
          />

          <Route
            path="/upcoming"
            element={
              <Movielist type="upcoming" title="Upcoming Movies" emoji={star} />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
