const express = require("express");
const cors = require("cors");
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"], // allow both common Vite ports
  credentials: true, // required if your frontend sends cookies/authorization
}));

const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// ✅ CORS setup
app.use(cors({
  origin: "http://localhost:5174", // frontend
  credentials: true
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
  .catch(console.error);

module.exports = app;
