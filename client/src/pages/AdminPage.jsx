import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import BookForm from "../components/BookForm";

export default function AdminPage() {
  const { token } = useAuth();
  const [books, setBooks] = useState([]);
  const [edit, setEdit] = useState(null);

  useEffect(() => {
    axios.get("/api/books").then(res => setBooks(res.data.books));
  }, []);

  const handleAdd = async (data) => {
    await axios.post("/api/books", data, { headers: { Authorization: `Bearer ${token}` } });
    const res = await axios.get("/api/books");
    setBooks(res.data.books);
    setEdit(null);
  };

  const handleEdit = (book) => setEdit(book);

  const handleUpdate = async (data) => {
    await axios.put(`/api/books/${edit._id}`, data, { headers: { Authorization: `Bearer ${token}` } });
    const res = await axios.get("/api/books");
    setBooks(res.data.books);
    setEdit(null);
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/books/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    setBooks(books.filter(b => b._id !== id));
  };

  return (
    <div>
      <h1 className="font-serif text-2xl mb-4">Admin Dashboard</h1>
      {edit ? (
        <BookForm initial={edit} onSubmit={handleUpdate} submitLabel="Update" />
      ) : (
        <BookForm onSubmit={handleAdd} submitLabel="Add Book" />
      )}
      <div className="mt-8">
        <h2 className="font-bold mb-2">Books</h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {books.map(b => (
            <div key={b._id} className="card">
              <div className="flex gap-4">
                <img src={b.cover || "https://placehold.co/80x120"} alt={b.title} className="w-20 h-28 object-cover rounded" />
                <div>
                  <div className="font-bold">{b.title}</div>
                  <div className="text-slate-500">{b.author}</div>
                  <div className="text-xs">{b.genres?.join(", ")}</div>
                </div>
              </div>
              <div className="flex gap-2 mt-2">
                <button className="btn-secondary" onClick={() => handleEdit(b)}>Edit</button>
                <button className="btn-primary bg-red-500 hover:bg-red-600" onClick={() => handleDelete(b._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
