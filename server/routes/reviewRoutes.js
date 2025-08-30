const express = require("express");
const { addReview, getReviews } = require("../controllers/reviewController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router({ mergeParams: true });

router.route("/").get(getReviews).post(protect, addReview);

module.exports = router;
