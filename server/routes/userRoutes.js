const express = require("express");
const { getProfile, addToWishlist, removeFromWishlist } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/profile", protect, getProfile);
router.post("/wishlist/:bookId", protect, addToWishlist);
router.delete("/wishlist/:bookId", protect, removeFromWishlist);

module.exports = router;
