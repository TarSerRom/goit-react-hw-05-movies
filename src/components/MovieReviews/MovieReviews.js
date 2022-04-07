import React, { useEffect, useState } from "react";
import { getReviews } from "../../services/fetchApi";
import './MovieReviews.css';

const MovieReviews = ({ movieId }) => {
  const [reviews, setReviews] = useState(null);

  const anchor = document.querySelector("#reviews");

  useEffect(() => {
    const getCast = async () => {
      const { results } = await getReviews(movieId);

      setReviews(results);

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
    <div id="reviews">
      {reviews && (
        <ul>
          {reviews ? (
            reviews.map(({ id, author, content }) => (
              <li key={id} className="review_item">
                <h3>Author: {author}</h3>
                <p className="review_text">{content}</p>
              </li>
            ))
          ) : (
            <li>We don't have any reviews for this movie</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;