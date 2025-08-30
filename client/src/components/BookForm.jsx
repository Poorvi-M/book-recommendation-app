import React, { useState } from "react";

export default function BookForm({ initial = {}, onSubmit, submitLabel = "Save" }) {
  const [title, setTitle] = useState(initial.title || "");
  const [author, setAuthor] = useState(initial.author || "");
  const [description, setDescription] = useState(initial.description || "");
  const [cover, setCover] = useState(initial.cover || "");
  const [genres, setGenres] = useState((initial.genres || []).join(", "));

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ title, author, description, cover, genres: genres.split(",").map(g => g.trim()) });
  }

  return (
    <form className="card max-w-md mx-auto" onSubmit={handleSubmit}>
      <label className="block mb-1">Title</label>
      <input className="input" value={title} onChange={e => setTitle(e.target.value)} required />
      <label className="block mb-1">Author</label>
      <input className="input" value={author} onChange={e => setAuthor(e.target.value)} required />
      <label className="block mb-1">Description</label>
      <textarea className="input" value={description} onChange={e => setDescription(e.target.value)} />
      <label className="block mb-1">Cover Image URL</label>
      <input className="input" value={cover} onChange={e => setCover(e.target.value)} />
      <label className="block mb-1">Genres (comma separated)</label>
      <input className="input" value={genres} onChange={e => setGenres(e.target.value)} />
      <button className="btn-primary mt-3">{submitLabel}</button>
    </form>
  );
}
