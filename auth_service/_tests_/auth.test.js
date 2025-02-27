const request = require("supertest");
const express = require("express");
const session = require("express-session");
const bcrypt = require("bcryptjs");
const authRoutes = require("../routes/authRoutes"); // Import your routes
const User = require("../models/User"); // Import User model

// Mocking Sequelize model
jest.mock("../models/User");

const app = express();
app.use(express.json());
app.use(
  session({
    secret: "testsecret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use("/auth", authRoutes);

describe("Auth Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("✅ Register a new user", async () => {
    User.create.mockResolvedValue({ id: 1, username: "testuser" });

    const response = await request(app).post("/auth/register").send({
      username: "testuser",
      password: "password123",
    });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      message: "User registered",
      userId: 1,
    });
  });

  test("❌ Register fails if user already exists", async () => {
    User.create.mockRejectedValue(new Error("User already exists"));

    const response = await request(app).post("/auth/register").send({
      username: "existinguser",
      password: "password123",
    });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: "User already exists or error occurred",
    });
  });

  test("✅ Login with valid credentials", async () => {
    const hashedPassword = await bcrypt.hash("password123", 10);
    User.findOne.mockResolvedValue({
      id: 1,
      username: "testuser",
      password: hashedPassword,
    });

    const response = await request(app).post("/auth/login").send({
      username: "testuser",
      password: "password123",
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Login successful",
      userId: 1,
    });
  });

  test("❌ Login fails with wrong credentials", async () => {
    User.findOne.mockResolvedValue(null);

    const response = await request(app).post("/auth/login").send({
      username: "wronguser",
      password: "wrongpassword",
    });

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ error: "Invalid credentials" });
  });

  test("✅ Logout user", async () => {
    const response = await request(app).post("/auth/logout");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Logged out" });
  });

  test("❌ Check session when not authenticated", async () => {
    const response = await request(app).get("/auth/me");

    expect(response.status).toBe(401);
    expect(response.body).toEqual({ error: "Not authenticated" });
  });
});
