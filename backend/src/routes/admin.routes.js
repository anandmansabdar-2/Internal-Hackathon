const express = require("express");
const router = express.Router();
const reportModel = require("../models/report.model");
const { requireAdminAuth } = require("../middlewares/auth");

// Get all issues
router.get("/report", requireAdminAuth, async (req, res) => {
  const issues = await reportModel
    .find()
    .populate("reportedBy", "fullName email");
  res.json(issues);
});

// Update issue status
router.put("/report/:id/status", requireAdminAuth, async (req, res) => {
  const { status } = req.body;
  const updatedIssue = await reportModel.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );
  res.json(updatedIssue);
});

module.exports = router;
