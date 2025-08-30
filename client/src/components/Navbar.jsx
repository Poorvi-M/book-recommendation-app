import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ theme, setTheme }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between mb-8 p-4 bg-white dark:bg-slate-900 rounded-xl shadow-cozy">
      <Link to="/" className="text-2xl font-serif font-bold text-cozy-indigo dark:text-cozy-violet">
        📚 BookRec
      </Link>
      <div className="flex items-center gap-4">
        <button
          aria-label="Toggle theme"
          className="btn-secondary"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? "🌞" : "🌙"}
        </button>
        <Link to="/" className="btn-secondary">Home</Link>
        {user && <Link to="/wishlist" className="btn-secondary">Wishlist</Link>}
        {user?.isAdmin && <Link to="/admin" className="btn-secondary">Admin</Link>}
        {user ? (
          <>
            <span className="text-slate-500 dark:text-slate-300">{user.username}</span>
            <button className="btn-primary" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn-primary">Login</Link>
            <Link to="/register" className="btn-secondary">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
