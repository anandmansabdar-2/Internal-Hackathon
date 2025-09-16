const express = require("express");
const router = express.Router();
const Issue = require("../models/issue.model");
const { requireAdminAuth } = require("../middlewares/auth");

// Get all issues
router.get("/issues", requireAdminAuth, async (req, res) => {
  const issues = await Issue.find().populate("reportedBy", "fullName email");
  res.json(issues);
});

// Update issue status
router.put("/issues/:id/status", requireAdminAuth, async (req, res) => {
  const { status } = req.body;
  const updatedIssue = await Issue.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );
  res.json(updatedIssue);
});

module.exports = router;
