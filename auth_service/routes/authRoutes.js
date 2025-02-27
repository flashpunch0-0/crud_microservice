const express = require("express");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const User = require("../models/User");

const router = express.Router();

router.use(
  session({
    secret: "supersecretkey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// 📌 Register a new user
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashedPassword });

    req.session.userId = user.id;
    res.status(201).json({ message: "User registered", userId: user.id });
  } catch (error) {
    res.status(500).json({ error: "User already exists or error occurred" });
  }
});

// 📌 Login user
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ where: { username } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    req.session.userId = user.id;
    res.json({ message: "Login successful", userId: user.id });
  } catch (error) {
    res.status(500).json({ error: "Login failed" });
  }
});

// 📌 Logout user
router.post("/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "Logged out" });
  });
});

// 📌 Check session
router.get("/me", (req, res) => {
  if (req.session.userId) {
    res.json({ message: "Authenticated", userId: req.session.userId });
  } else {
    res.status(401).json({ error: "Not authenticated" });
  }
});

module.exports = router;
