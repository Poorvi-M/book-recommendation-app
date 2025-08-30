const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: String,
  cover: String,
  genres: [String],
  // rating will be calculated from reviews
});

module.exports = mongoose.model("Book", bookSchema);
