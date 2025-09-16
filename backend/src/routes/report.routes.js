const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middlewares/auth");
const {createReport, getMyReports} = require('../controllers/report.controller');

// POST /api/reports → create a new report
router.post("/", requireAuth, createReport);

// GET /api/reports/my → fetch all reports by logged-in user
router.get("/my", requireAuth, getMyReports);

module.exports = router;
