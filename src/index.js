require("dotenv").config();
const express = require("express");
const jobRoutes = require("./routes/jobRoutes");

const app = express();
app.use(express.json());
cors = require("cors");
app.use(cors());
app.use("/api/jobs", jobRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
