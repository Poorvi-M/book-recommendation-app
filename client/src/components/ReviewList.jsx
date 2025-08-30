import React from "react";

export default function ReviewList({ reviews }) {
  if (!reviews?.length) return <div className="text-slate-400">No reviews yet.</div>;
  return (
    <div>
      <h3 className="font-semibold mb-2">Reviews</h3>
      {reviews.map(r => (
        <div key={r._id} className="mb-3 p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
          <div className="font-bold">{r.user?.username || "User"}</div>
          <div className="flex items-center gap-1">
            <span className="font-mono">{r.rating} ⭐</span>
          </div>
          <div>{r.comment}</div>
        </div>
      ))}
    </div>
  );
}
