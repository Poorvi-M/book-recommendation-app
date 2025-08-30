import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import BookCard from "../components/BookCard";

export default function WishlistPage() {
  const { token } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get("/api/users/profile", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setWishlist(res.data.user.wishlist));
  }, [token]);

  useEffect(() => {
    if (wishlist.length) {
      Promise.all(wishlist.map(id => axios.get(`/api/books/${id}`)))
        .then(results => setBooks(results.map(r => r.data.book)));
    } else {
      setBooks([]);
    }
  }, [wishlist]);

  return (
    <div>
      <h1 className="font-serif text-2xl mb-4">Your Wishlist</h1>
      {books.length ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {books.map(b => <BookCard key={b._id} book={b} />)}
        </div>
      ) : (
        <div className="text-slate-400">No books in wishlist yet.</div>
      )}
    </div>
  );
}
