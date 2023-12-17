const Review = require("../models/review");

exports.createReview = async (req, res) => {
  try {
    const {
      review_rating,
      review_text,
      review_date,
      review_title,
      reviewer_name,
      productId,
    } = req.body;

      console.log("====", productId)
    const newReview = await Review.create({
      review_rating,
      review_text,
      review_title,
      reviewer_name,
      review_date,
      ProductId:productId,
    });
      console.log("====", newReview)
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
