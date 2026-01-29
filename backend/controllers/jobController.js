const Job = require("../models/Job");

// CREATE JOB
const createJob = async (req, res) => {
  try {
    const { companyName, jobTitle, status, salary, notes } = req.body;

    if (!companyName || !jobTitle) {
      return res
        .status(400)
        .json({ message: "Company name and job title required" });
    }

    const job = await Job.create({
      companyName,
      jobTitle,
      status,
      salary,
      notes,
      user: req.user._id,
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET ALL JOBS (logged-in user)
const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE JOB
const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // ownership check
    if (job.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE JOB
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    // ownership check
    if (job.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await job.deleteOne();
    res.json({ message: "Job removed" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ SINGLE EXPORT
module.exports = { createJob, getJobs, updateJob, deleteJob };
