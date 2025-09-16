const reportModel = require("../models/report.model");

// Citizen creates a new report
const createReport = async (req, res) => {
  try {
    const { category, description, location, imageUrl, landmark } = req.body;

    const issue = new reportModel({
      category,
      description,
      location,
      landmark,
      imageUrl,
      status: "Reported",
      reportedBy: req.userId, // set by auth middleware
    });

    await issue.save();

    res.status(201).json({
      message: "Report submitted successfully",
      issue,
    });
  } catch (error) {
    console.error("Create Report Error:", error);
    res.status(500).json({ message: "Failed to submit report" });
  }
};

// Citizen fetches all their reports
const getMyReports = async (req, res) => {
  try {
    const reports = await reportModel.find({ reportedBy: req.userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({ reports });
  } catch (error) {
    console.error("Get My Reports Error:", error);
    res.status(500).json({ message: "Failed to fetch reports" });
  }
};

module.exports = { createReport, getMyReports };