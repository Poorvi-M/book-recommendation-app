import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import ReviewList from "../components/ReviewList";

export default function BookDetailsPage() {
  const { id } = useParams();
  const { user, token } = useAuth();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [msg, setMsg] = useState("");
  const [added, setAdded] = useState(false);

  useEffect(() => {
    axios.get(`/api/books/${id}`).then(res => setBook(res.data.book));
    axios.get(`/api/books/${id}/reviews`).then(res => setReviews(res.data.reviews));
  }, [id]);

  const addReview = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `/api/books/${id}/reviews`,
        { rating, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMsg("Review added!");
      setRating(5);
      setComment("");
      const { data } = await axios.get(`/api/books/${id}/reviews`);
      setReviews(data.reviews);
    } catch {
      setMsg("Error adding review.");
    }
  };

  const addToWishlist = async () => {
    await axios.post(`/api/users/wishlist/${id}`, {}, { headers: { Authorization: `Bearer ${token}` } });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  if (!book) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto card">
      <div className="flex gap-8 flex-col sm:flex-row">
        <img
          src={book.cover || "https://placehold.co/200x280?text=No+Cover"}
          alt={book.title}
          className="rounded-xl w-44 h-64 object-cover mb-4"
        />
        <div>
          <h1 className="font-bold text-2xl">{book.title}</h1>
          <div className="text-slate-500">{book.author}</div>
          <div className="mb-2">{book.description}</div>
          <div className="flex flex-wrap gap-1 mb-2">
            {book.genres?.map(g => <span key={g} className="bg-cozy-rose text-xs px-2 py-0.5 rounded">{g}</span>)}
          </div>
          {user && (
            <button className="btn-primary mb-3" onClick={addToWishlist}>
              {added ? "Added!" : "Add to Wishlist"}
            </button>
          )}
        </div>
      </div>
      <div className="mt-8">
        <ReviewList reviews={reviews} />
        {user && (
          <form className="mt-4" onSubmit={addReview}>
            <div className="flex items-center gap-2 mb-2">
              <label>Rating:</label>
              <select className="input" value={rating} onChange={e => setRating(Number(e.target.value))}>
                {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} ⭐</option>)}
              </select>
            </div>
            <textarea className="input" placeholder="Your review..." value={comment} onChange={e => setComment(e.target.value)} />
            <button className="btn-primary mt-2">Submit Review</button>
            {msg && <div className="text-green-600 mt-1">{msg}</div>}
          </form>
        )}
      </div>
    </div>
  );
}
