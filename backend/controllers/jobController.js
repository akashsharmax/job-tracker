const Job = require("../models/job");


const createJob = async (req, res) => {
  try {
    const { companyName, jobTitle, status, salary, notes } = req.body;

    if (!companyName || !jobTitle) {
      return res.status(400).json({ message: "Company name and job title required" });
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

module.exports = { createJob };
