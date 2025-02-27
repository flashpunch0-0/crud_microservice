const request = require("supertest");
const express = require("express");
const session = require("express-session");
const Job = require("../models/Job");
jest.mock("../models/Job");
const jobRoutes = require("../routes/jobRoutes");
const app = express();
app.use(express.json());
app.use(
  session({
    secret: "jobsecret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use("/api/jobs", jobRoutes);

describe("Job Routes", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("✅ Create a new job", async () => {
    Job.create.mockResolvedValue({ id: 1, title: "Test Job" });

    const response = await request(app).post("/api/jobs").send({
      title: "Test Job",
      company: "This is a test company",
      location: "Test location",
      status: "Test status",
    });
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ id: 1, title: "Test Job" });
  });
});
