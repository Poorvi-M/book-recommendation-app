import React from "react";
import { Link } from "react-router-dom";

export default function BookCard({ book }) {
  return (
    <div className="card w-full max-w-xs m-auto">
      <Link to={`/book/${book._id}`}>
        <img
          src={book.cover || "https://placehold.co/200x280?text=No+Cover"}
          alt={book.title}
          className="mb-4 rounded-xl w-full h-56 object-cover"
        />
        <div className="mb-2">
          <h2 className="font-bold text-lg">{book.title}</h2>
          <p className="text-slate-500">{book.author}</p>
        </div>
        <div className="flex flex-wrap gap-1 mt-2">
          {book.genres?.map(g => (
            <span key={g} className="bg-cozy-rose text-xs px-2 py-0.5 rounded">{g}</span>
          ))}
        </div>
      </Link>
    </div>
  );
}
