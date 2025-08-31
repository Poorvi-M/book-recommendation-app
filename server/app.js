const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express(); // ✅ define app first

// ✅ CORS setup
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"], // allow both Vite ports
  credentials: true, // allow cookies/authorization headers
}));

// ✅ Middleware
app.use(express.json());

// ✅ Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/books", require("./routes/bookRoutes"));
app.use("/api/books/:bookId/reviews", require("./routes/reviewRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// ✅ MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(process.env.PORT || 5000, () =>
      console.log(`✅ Server running on port ${process.env.PORT || 5000}`)
    )
  )
  .catch((err) => console.error("❌ MongoDB connection error:", err));

module.exports = app;
