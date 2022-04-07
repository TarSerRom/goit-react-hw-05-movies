import React, { useEffect, useState } from "react";
import { getMovieCast } from "../../services/fetchApi";
import './MovieCast.css'

const MovieCast = ({ movieId }) => {
    const [cast, setCast] = useState(null);

    const anchor = document.querySelector("#cast");

    useEffect(() => {
        const getCast = async () => {
          const { cast } = await getMovieCast(movieId);
    
          setCast(cast);
    
          if (anchor) {
            window.scrollTo({
              top: anchor.offsetTop,
              behavior: "smooth",
            });
          }
        };
    
        getCast();
      }, [movieId, anchor]);

      return (
        <div>
          <ul className="cast_list" id="cast">
            {cast &&
              cast.map(({ id, profile_path, original_name, character }) => (
                <li key={id} className="cast_item">
                  <img
                    src={
                      profile_path
                        ? `https://image.tmdb.org/t/p/w300${profile_path}`
                        : "https://image.shutterstock.com/image-vector/no-image-available-photo-coming-600w-2059817444.jpg"
                    }
                    alt={original_name}
                  />
                  <div className="cast_descriprion">
                    <p className="cast_person">{original_name}</p>
                    <p className="cast_character">Character: {character}</p>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      );
    };
    
    export default MovieCast;
