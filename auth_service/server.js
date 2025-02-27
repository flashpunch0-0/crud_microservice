const express = require("express");
const sequelize = require("./db");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(express.json());
cors = require("cors");
app.use(cors());
app.use("/auth", authRoutes);

// Start server after DB sync

console.log("Database connected & synced");
app.listen(3001, () => console.log("Auth Service running on port 3001"));
