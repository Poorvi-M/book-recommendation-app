const Book = require("../models/Book");
const Review = require("../models/Review");

exports.getBooks = async (req, res) => {
  const books = await Book.find();
  res.json({ books });
};

exports.getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) return res.status(404).json({ error: "Book not found" });
  res.json({ book });
};

exports.createBook = async (req, res) => {
  const { title, author, description, cover, genres } = req.body;
  const book = await Book.create({ title, author, description, cover, genres });
  res.status(201).json({ book });
};

exports.updateBook = async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json({ book });
};

exports.deleteBook = async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.status(204).end();
};
