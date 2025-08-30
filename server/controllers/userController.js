const User = require("../models/User");

exports.getProfile = async (req, res) => {
  res.json({ user: req.user });
};

exports.addToWishlist = async (req, res) => {
  const user = req.user;
  if (!user.wishlist.includes(req.params.bookId)) {
    user.wishlist.push(req.params.bookId);
    await user.save();
  }
  res.json({ wishlist: user.wishlist });
};

exports.removeFromWishlist = async (req, res) => {
  const user = req.user;
  user.wishlist = user.wishlist.filter((id) => id.toString() !== req.params.bookId);
  await user.save();
  res.json({ wishlist: user.wishlist });
};
