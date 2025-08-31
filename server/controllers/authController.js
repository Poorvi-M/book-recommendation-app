exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log("🟡 Login attempt:", email, password);

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("❌ No user found with email:", email);
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await user.matchPassword(password);
    console.log("🔑 Password match result:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    console.log("✅ Login successful for:", user.username);

    res.json({
      user: { _id: user._id, username: user.username, email: user.email },
      token: generateToken(user)
    });
  } catch (err) {
    console.error("🔥 Login error:", err.message);
    res.status(400).json({ error: err.message });
  }
};

