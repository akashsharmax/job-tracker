const express = require("express");
const {
  registerUser,
  loginUser
} = require("../controllers/authcontroller");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// 🔒 protected route
router.get("/me", protect, (req, res) => {
  res.json(req.user);
});

module.exports = router;
