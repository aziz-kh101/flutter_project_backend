const express = require("express");
const router = express.Router();

const User = require("../models/user");

const { isAuthenticated } = require("../middleware/authenticated");

router.put("/profile", isAuthenticated, async (req, res) => {
  const { firstName, lastName, email, address, phone } = req.body;
  if(!firstName || !lastName || !email || !address || !phone) {
    return res.status(400).send({ message: "All fields are required" });
  }
  try {
    await User.updateOne(
      { email: req.user.email },
      { firstName, lastName, email, address, phone }
    );
    res.status(200).json({ message: "User profile updated successfully" });
  } catch (error) {
    res.status(500).send({ message: "Profile update failed" });
  }
});

module.exports = router;
