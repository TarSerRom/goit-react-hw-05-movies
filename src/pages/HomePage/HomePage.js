import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { fetchTrendingMovies } from "../../services/fetchApi";
import { makeSlug } from "../../services/slug";
import './HomePage.css';

const Home = () => {
    const [movies, setMovies] = useState([]);
  
    const location = useLocation();
  
    useEffect(() => {
      const getMovies = async () => {
        const { results } = await fetchTrendingMovies();
  
        setMovies(results);
      };
  
      getMovies();
    }, []);

    return (
        <section className="homePage">
          <div className="mainContainer">
            <h2 className="title">Trending Today</h2>
    
            <ul className="movielist">
              {movies.map(({ id, title, poster_path }) => (
                <li className="movielist_item" key={id}>
                  <Link
                    to={{
                      pathname: `/movies/${makeSlug(`${title} ${id}`)}`,
                      state: {
                        from: {
                          location,
                          label: "Back to Home",
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
                    <p className="movielist_movietitle">{title}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      );
    };
    
    export default Home;
    