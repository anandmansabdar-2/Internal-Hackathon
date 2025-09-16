import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import {
  Typography,
  Box,
  Grid,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Select,
  MenuItem,
  TextField,
  FormControl,
} from "@mui/material";

export default function Dashboard() {
  const [issues, setIssues] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    // Mock issues
    setIssues([
      { id: 1, title: "Street light not working", status: "Pending" },
      { id: 2, title: "Pothole on Main Street", status: "In Progress" },
      { id: 3, title: "Water leakage near park", status: "Resolved" },
      { id: 4, title: "Illegal dumping of waste", status: "Pending" },
      { id: 5, title: "Broken traffic signal", status: "In Progress" },
    ]);

    // Update current time every second
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const statusColor = (status) => {
    switch (status) {
      case "Pending":
        return "#ffb300";
      case "In Progress":
        return "#1976d2";
      case "Resolved":
        return "#4caf50";
      default:
        return "#ccc";
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setIssues((prev) =>
      prev.map((issue) => (issue.id === id ? { ...issue, status: newStatus } : issue))
    );
  };

  const pendingCount = issues.filter((i) => i.status === "Pending").length;
  const inProgressCount = issues.filter((i) => i.status === "In Progress").length;
  const resolvedCount = issues.filter((i) => i.status === "Resolved").length;

  // Filter issues based on search term and status filter
  const filteredIssues = issues.filter((issue) => {
    const matchesTitle = issue.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || issue.status === statusFilter;
    return matchesTitle && matchesStatus;
  });

  return (
    <Layout>
      {/* Top bar with welcome, date/time, and contact */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
          px: 3,
          py: 1.5,
          bgcolor: "#e0e0e0",
          boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
          borderRadius: 1,
          flexWrap: "wrap",
        }}
      >
        <Typography variant="body1" sx={{ fontWeight: 600 }}>
          Welcome, Admin
        </Typography>
        <Typography variant="body2" sx={{ color: "#555" }}>
          {currentTime.toLocaleDateString()} {currentTime.toLocaleTimeString()}
        </Typography>
        <Typography variant="body2" sx={{ color: "#555" }}>
          Contact: support@gov.in
        </Typography>
      </Box>

      {/* Gradient background with heading, search/filter and summary cards */}
      <Box
        sx={{
          p: 3,
          mb: 8,
          borderRadius: 3,
          bgcolor: "#0D47A1",
          color: "white",
          position: "relative",
          minHeight: 150,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          {/* Left: Heading */}
          <Typography variant="h5" sx={{ fontWeight: 700, color: "white", mb: 3 }}>
            Civic Issues Dashboard
          </Typography>

          {/* Right: Search and Filter */}
          <Box sx={{ display: "flex", gap: 2, mb: 3, flexWrap: "wrap", alignItems: "center" }}>
            <TextField
              label="Search Issue"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ bgcolor: "white", borderRadius: 1, minWidth: 200 }}
            />
            <FormControl size="small" sx={{ minWidth: 150, bgcolor: "white", borderRadius: 1 }}>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                displayEmpty
                sx={{ px: 1 }}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Resolved">Resolved</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>

        {/* Summary cards floating */}
        <Grid
          container
          spacing={3}
          sx={{
            position: "absolute",
            bottom: -30,
            left: 0,
            right: 0,
            px: 3,
          }}
        >
          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                bgcolor: "#ffb300",
                color: "white",
                borderRadius: 3,
                boxShadow: 6,
                p: 2,
                textAlign: "center",
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 700, opacity: 0.9 }}>
                Pending Issues
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 700 }}>
                {pendingCount}
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                bgcolor: "#1976d2",
                color: "white",
                borderRadius: 3,
                boxShadow: 6,
                p: 2,
                textAlign: "center",
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 700, opacity: 0.9 }}>
                In Progress
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 700 }}>
                {inProgressCount}
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                bgcolor: "#4caf50",
                color: "white",
                borderRadius: 3,
                boxShadow: 6,
                p: 2,
                textAlign: "center",
              }}
            >
              <Typography variant="subtitle2" sx={{ fontWeight: 700, opacity: 0.9 }}>
                Resolved
              </Typography>
              <Typography variant="h3" sx={{ fontWeight: 700 }}>
                {resolvedCount}
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Issue Table */}
      <TableContainer component={Paper} sx={{ maxHeight: "60vh" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700 }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Issue Title</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Change Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredIssues.map((issue) => (
              <TableRow key={issue.id}>
                <TableCell sx={{ fontWeight: 700 }}>{issue.id}</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>{issue.title}</TableCell>
                <TableCell>
                  <Chip
                    label={issue.status}
                    sx={{ bgcolor: statusColor(issue.status), color: "white", fontWeight: 700 }}
                  />
                </TableCell>
                <TableCell>
                  <Select
                    value={issue.status}
                    size="small"
                    onChange={(e) => handleStatusChange(issue.id, e.target.value)}
                  >
                    <MenuItem value="Pending">Pending</MenuItem>
                    <MenuItem value="In Progress">In Progress</MenuItem>
                    <MenuItem value="Resolved">Resolved</MenuItem>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
}
