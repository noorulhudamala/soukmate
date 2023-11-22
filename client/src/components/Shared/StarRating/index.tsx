import React from "react";
import "./StarRating.scss";

interface StarRatingProps {
  rating: number;
  outOf?: number;
  starSize?: number;
  reviewCount?: number;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  outOf = 5,
  starSize = 24,
  reviewCount = 0,
}) => {
  // Calculate the width of the filled stars container based on rating and outOf value
  const filledWidth = (rating / outOf) * 100;

  return (
    <div className="star-rating">
      <div className="stars-outer" style={{ fontSize: `${starSize}px` }}>
        {[...Array(outOf)].map((_, index) => (
          <span key={index}>☆</span> // Empty star
        ))}
        <div className="stars-inner" style={{ width: `${filledWidth}%` }}>
          {[...Array(outOf)].map((_, index) => (
            <span key={index}>★</span> // Filled star
          ))}
        </div>
      </div>
      {!!rating ? <h5>{rating}</h5> : null}
    </div>
  );
};

export default StarRating;
