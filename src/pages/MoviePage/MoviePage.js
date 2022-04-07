import React, { useEffect, useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import Notiflix from "notiflix";
import { searchMovies } from "../../services/fetchApi";
import { makeSlug } from "../../services/slug";
import './MoviePage.css';

const MoviesPage = () => {
    const [movieToFind, setMovieToFind] = useState("");
    const [foundMovies, setFoundMovies] = useState([]);
  
    const location = useLocation();
    const history = useHistory();
  
    useEffect(() => {
      const searchString = new URLSearchParams(location.search).get("query");
  
      if (searchString) {
        const getMovies = async () => {
          const { results } = await searchMovies(searchString);
  
          setFoundMovies(results);
          setMovieToFind("");
        };
  
        getMovies();
      }
    }, [location.search]);

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (movieToFind.trim()) {
          const { results } = await searchMovies(movieToFind);
    
          setFoundMovies(results);
          setMovieToFind("");
    
          if (results.length === 0) {
            Notiflix.Notify.warning(
              "No movies found! Please change your request and try again"
            );
          }
    
          history.push({
            ...location,
            search: `query=${movieToFind}`,
          });
        }
      };
      return (
        <section className="moviesPage">
          <div className="mainContainer">
            <form onSubmit={handleSubmit} className="searchForm">
              <input
                type="text"
                placeholder="Find movie"
                value={movieToFind}
                onChange={(e) => setMovieToFind(e.target.value)}
                className="searchForm_input"
              />
    
              <button type="submit" className="searchForm_button">
                Search
              </button>
            </form>
    
            {foundMovies.length > 0 && (
              <ul className="movieslist">
                {foundMovies.map(({ id, title, poster_path }) => (
                  <li className="movieslist_item" key={id}>
                    <Link
                      to={{
                        pathname: `/movies/${makeSlug(`${title} ${id}`)}`,
                        state: {
                          from: {
                            location,
                            label: "Back to Movies",
                          },
                        },
                      }}
                    >
                      <img
                        src={
                          poster_path
                            ? `https://image.tmdb.org/t/p/w300${poster_path}`
                            : "https://image.shutterstock.com/image-vector/no-image-available-photo-coming-600w-2059817444.jpg"
                        }
                        alt={title}
                      />
                      <p className="movieslist_movietitle">{title}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
    
          <div></div>
        </section>
      );
    };
    
    export default MoviesPage;