const Job = require("../models/Job");

// Create Job
exports.createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Jobs
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.findAll();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Job
exports.updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Job.update(req.body, { where: { id } });
    if (updated) {
      return res.json({ message: "Job updated successfully" });
    }
    throw new Error("Job not found");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Job
exports.deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Job.destroy({ where: { id } });
    if (deleted) {
      return res.json({ message: "Job deleted" });
    }
    throw new Error("Job not found");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
