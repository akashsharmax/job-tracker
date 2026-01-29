const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  createJob,
  getJobs,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");

const router = express.Router();

// CREATE + GET jobs
router.route("/")
  .post(protect, createJob)
  .get(protect, getJobs);

// UPDATE + DELETE job
router.route("/:id")
  .put(protect, updateJob)
  .delete(protect, deleteJob);

module.exports = router;
