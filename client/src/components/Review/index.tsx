import React from "react";
import { IReview } from "../../interfaces";
import ReviewCard from "../ReviewCard";
import StarRating from "../Shared/StarRating";
import WriteReview from "../WriteReview";
import "./Review.scss";
type ReviewProps = {
  rating: number;
  reviews: IReview[];
};

const Review = ({ rating, reviews }: ReviewProps) => {
  const [openReview, setOpenReview] = React.useState(false);
  const onWriteReviewClickHandler = () => {
    setOpenReview(true);
  };
  const handleClose = () => {
    setOpenReview(false);
  };
  return (
    <div className="Review">
      <div className="top_container">
        <div className="rating_container">
          <StarRating rating={rating} starSize={25} />
        </div>
        <div>
          <button onClick={onWriteReviewClickHandler}>Write Review</button>
        </div>
      </div>
      {reviews?.map((review: IReview) => (
        <ReviewCard review={review} />
      ))}
      {openReview ? (
        <WriteReview open={openReview} handleClose={handleClose} />
      ) : null}
    </div>
  );
};

export default Review;
