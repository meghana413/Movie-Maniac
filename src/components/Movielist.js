import React, { useEffect, useState } from "react";
import _ from "lodash";

import "./Movielist.css";
import Moviecards from "./Moviecards";
import Moviefilteritems from "./Moviefilteritems";

function Movielist({ type, title, emoji }) {
  const [movies, setmovies] = useState([]);
  const [filtermovies, setfiltermovies] = useState([]);
  const [minrating, setminrating] = useState(0);
  const [issearching, setissearching] = useState(false);
  const [search, setsearch] = useState("");
  const [genre, setgenre] = useState("");
  const [genres, setgenres] = useState([]);

  const [sort, setsort] = useState({
    by: "default",
    order: "asc",
  });

  useEffect(() => {
    let ignore = false;
    const load = async () => {
      if (!ignore) {
        await fetchmovies();
      }
    };
    load();
    return () => {
      ignore = true;
    };
  }, [type]);

  useEffect(() => {
    fetchgenres();
  }, []);

  console.log("type:", type);

  useEffect(() => {
    if (sort.by !== "default") {
      const sortedmovies = _.orderBy(
        [...filtermovies],
        [sort.by],
        [sort.order],
      );
      setfiltermovies(sortedmovies);
    }
  }, [sort]);

  const fetchmovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${type}?api_key=a7bde883436507f8a938301fcd16eba0`,
    );

    const data = await response.json();
    if (data && data.results) {
      setmovies(data.results);
      setfiltermovies(data.results);
    }
  };

  const fetchgenres = async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=a7bde883436507f8a938301fcd16eba0",
      );

      const data = await response.json();
      setgenres(data.genres || []);
    } catch (error) {
      console.log(error);
      setgenres([]);
    }
  };

  const handlefilter = (rate) => {
    if (rate === minrating) {
      setminrating(0);
      setfiltermovies(movies);
    } else {
      setminrating(rate);
      const filtered = movies.filter((movie) => movie.vote_average >= rate);
      setfiltermovies(filtered);
    }
  };

  const handlesort = (e) => {
    const { name, value } = e.target;
    setsort((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const searchmovies = async () => {
    if (!search.trim()) {
      setissearching(false);
      fetchmovies();
      return;
    }
    setissearching(true);

    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=a7bde883436507f8a938301fcd16eba0&query=${search}`,
    );
    const data = await response.json();
    setfiltermovies(data.results || []);
  };

  const filterbygenre = async (genreid) => {
    setissearching(true);

    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=a7bde883436507f8a938301fcd16eba0&with_genres=${genreid}`,
    );
    const data = await response.json();
    setfiltermovies(data.results || []);
  };

  const fetchrecommendations = async (movieid) => {
    setissearching(true);

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieid}/recommendations?api_key=a7bde883436507f8a938301fcd16eba0`,
    );
    const data = await response.json();
    setfiltermovies(data.results || []);
  };

  return (
    <section className="movie_list" id={type}>
      <header className="Movie_list_header">
        <h2 className="movie_list_heading">
          {title}
          <img src={emoji} alt="emoji" className="navemoji" />
        </h2>

        <div className="movie_list_filters">
          <input
            type="text"
            placeholder="Search Movies..."
            value={search}
            onChange={(e) => setsearch(e.target.value)}
            className="movie_search"
          />

          <button onClick={searchmovies} className="search_btn">
            Search
          </button>

          {/* based on the genre choosed tmdb api gives them */}
          <select
            value={genre}
            onChange={(e) => filterbygenre(e.target.value)}
            className="movie_sorting"
          >
            <option value="">Select Genre</option>

            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>

          <Moviefilteritems
            minrating={minrating}
            onFilterClick={handlefilter}
            ratings={[8, 7, 6]}
          />

          <select
            name="by"
            value={sort.by}
            onChange={handlesort}
            className="movie_sorting"
          >
            <option value="default">Sort By</option>
            <option value="release_date">Date</option>
            <option value="vote_average">Rating</option>
          </select>

          <select
            name="order"
            value={sort.order}
            onChange={handlesort}
            className="movie_sorting"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </header>

      <div className="movie_cards">
        {filtermovies.map((movie) => (
          <Moviecards
            key={movie.id}
            movie={movie}
            onRecommend={() => fetchrecommendations(movie.id)}
          />
        ))}
      </div>
    </section>
  );
}

export default Movielist;
