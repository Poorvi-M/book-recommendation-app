import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import BookDetailsPage from "./pages/BookDetailsPage";
import WishlistPage from "./pages/WishlistPage";
import AdminPage from "./pages/AdminPage";
import Navbar from "./components/Navbar";

function PrivateRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function App() {
  const [theme, setTheme] = useState(() =>
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.documentElement.className = theme === "dark" ? "dark" : "";
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <AuthProvider>
      <Router>
        <div className={theme === "dark" ? "dark" : ""}>
          <Navbar theme={theme} setTheme={setTheme} />
          <div className="container mx-auto p-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/book/:id" element={<BookDetailsPage />} />
              <Route path="/wishlist" element={
                <PrivateRoute>
                  <WishlistPage />
                </PrivateRoute>
              } />
              <Route path="/admin" element={
                <PrivateRoute>
                  <AdminPage />
                </PrivateRoute>
              } />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
