import React, { useEffect, useState } from "react";
import {
  Route,
  NavLink,
  useHistory,
  useLocation,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import { getMovieDetails } from "../../services/fetchApi";
import { getIdFromSlug } from "../../services/slug";
import MovieCast from "../../components/MovieCast/MovieCast";
import MovieReviews from "../../components/MovieReviews/MovieReviews";


const MovieDetailsPage = () => {
  const [movie, setMovie] = useState(null);

  const location = useLocation();
  const history = useHistory();
  const { slug } = useParams();
  const { url } = useRouteMatch();

  const movieId = getIdFromSlug(slug);

  useEffect(() => {
    const getMovie = async () => {
      const currentMovie = await getMovieDetails(movieId);

      setMovie(currentMovie);
    };

    getMovie();
  }, [movieId]);

  const handleGoBack = () => {
    history.push(location?.state?.from?.location ?? "/movies");
  };

  return (
    <>
      {movie && (
        <section className="movieDetails">
          <div className="mainContainer">
            <button
              type="button"
              onClick={handleGoBack}
              className="movieDetails_button"
            >
              {location?.state?.from?.label ?? "Find another movie"}
            </button>

            <div className="movieCard">
              <div className="posterContainer">
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
                      : "https://image.shutterstock.com/image-vector/no-image-available-photo-coming-600w-2059817444.jpg"
                  }
                  alt={movie.title}
                />
              </div>

              <div className="movie_description">
                <h2 className="moviecard_title">
                  {movie.title} ({movie.release_date.slice(0, 4)})
                </h2>
                <p className="moviecard_text">
                  User score: {movie.vote_average}
                </p>

                <h3>Overview</h3>
                <p className="moviecard_text">
                  {movie.overview ? movie.overview : "No overwies yet"}
                </p>

                <h3>Genres</h3>
                <p>{movie.genres.map((genre) => genre.name).join(", ")}</p>
              </div>
            </div>

            <div className="additionalInfo">
              <h3>Additional Information</h3>
              <ul className="additionalInfo_list">
                <li className="additionalInfo_item">
                  <NavLink
                    className="additionalInfo_link"
                    activeClassName="additionalInfo_activeLink"
                    to={{ pathname: `${url}/cast`, state: location.state }}
                  >
                    Cast
                  </NavLink>
                </li>
                <li className="additionalInfo_item">
                  <NavLink
                    className="additionalInfo_link"
                    activeClassName="additionalInfo_activeLink"
                    to={{ pathname: `${url}/reviews`, state: location.state }}
                  >
                    Reviews
                  </NavLink>
                </li>
              </ul>
            </div>

            <Route path={`${url}/cast`}>
              <MovieCast movieId={movieId} />
            </Route>

            <Route path={`${url}/reviews`}>
              <MovieReviews movieId={movieId} />
            </Route>
          </div>
        </section>
      )}
    </>
  );
};

export default MovieDetailsPage;
