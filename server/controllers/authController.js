const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// ✅ Register
exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    console.log("🟢 Registration attempt:", { username, email });

    const user = await User.create({ username, email, password });
    console.log("✅ User registered:", user.email);

    res.status(201).json({
      user: { _id: user._id, username: user.username, email: user.email },
      token: generateToken(user)
    });
  } catch (err) {
    console.error("❌ Registration error:", err.message);
    res.status(400).json({ error: err.message });
  }
};

// ✅ Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log("🔎 Login attempt:", { email, password });

    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ No user found with this email");
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await user.matchPassword(password);
    console.log("✅ Password match result:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    console.log("✅ Login successful for:", user.email);

    res.json({
      user: { _id: user._id, username: user.username, email: user.email },
      token: generateToken(user)
    });
  } catch (err) {
    console.error("🔥 Login error:", err.message);
    res.status(400).json({ error: err.message });
  }
};
