import React, { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import axios from "axios";

export default function HomePage() {
  const [books, setBooks] = useState([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    axios.get("/api/books")
      .then(res => setBooks(res.data.books))
      .catch(() => setBooks([]));
  }, []);

  const filtered = books.filter(b =>
    b.title.toLowerCase().includes(q.toLowerCase()) ||
    b.author.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div>
      <h1 className="font-serif text-3xl mb-4">Discover books</h1>
      <input
        className="input mb-6"
        placeholder="Search by title or author..."
        value={q}
        onChange={e => setQ(e.target.value)}
      />
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map(b => <BookCard key={b._id} book={b} />)}
      </div>
    </div>
  );
}
