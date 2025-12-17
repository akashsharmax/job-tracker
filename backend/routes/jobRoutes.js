const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  createJob,
} = require("../controllers/jobController");

const router = express.Router();

router.post("/", protect, createJob);

module.exports = router;
