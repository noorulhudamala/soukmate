import React from "react";
import { IReview } from "../../interfaces";
import StarRating from "../Shared/StarRating";
import './ReviewCard.scss'
type ReviewCardProps = {
  review: IReview;
};
const ReviewCard = ({ review }: ReviewCardProps) => {
  const date = new Date(review?.review_date);
  return (
    <div className="row ReviewCard">
      <div className="col-3">
        <StarRating rating={review.review_rating} starSize={10} />
        <div>{review?.reviewer_name}</div>
      </div>
      <div className="col-9">
        <div className="titleContainer">
          <div>{review?.review_title}</div>
          <div>{date.toLocaleDateString()}</div>
        </div>
        <div className="reviewText">{review?.review_text}</div>
      </div>
    </div>
  );
};

export default ReviewCard;
