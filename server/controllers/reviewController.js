const Review = require("../models/Review");

exports.addReview = async (req, res) => {
  const { rating, comment } = req.body;
  const review = await Review.create({
    book: req.params.bookId,
    user: req.user._id,
    rating,
    comment
  });
  res.status(201).json({ review });
};

exports.getReviews = async (req, res) => {
  const reviews = await Review.find({ book: req.params.bookId }).populate("user", "username");
  res.json({ reviews });
};
