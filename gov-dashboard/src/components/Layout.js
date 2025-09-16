import React from "react";
import { Box, List, ListItemButton, ListItemText, Divider, Typography, Avatar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Emblem from "../assets/indian-national-emblem-vector_789916-2905.jpg";

const navItems = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Analytics", path: "/analytics" },
  { name: "Reports", path: "/reports" },
];

export default function Layout({ children }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: 240,
          bgcolor: "#002147",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Top emblem */}
        <Box sx={{ p: 2, textAlign: "center", borderBottom: "1px solid #555" }}>
          <Avatar
            src={Emblem}
            alt="Gov Emblem"
            sx={{ width: 80, height: 80, margin: "0 auto 10px auto" }}
          />
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Government of Jharkhand
          </Typography>
        </Box>

        {/* Navigation */}
        <List>
          {navItems.map((item) => (
            <ListItemButton
              key={item.name}
              onClick={() => navigate(item.path)}
              sx={{
                color: "white",
                "&.Mui-selected": {
                  bgcolor: "#001635",
                  borderLeft: "4px solid #FFD700",
                },
                "&:hover": {
                  bgcolor: "#001635",
                },
              }}
            >
              <ListItemText primary={item.name} sx={{ pl: 1 }} />
            </ListItemButton>
          ))}
        </List>

        {/* Logout button */}
        <Box sx={{ p: 2, borderTop: "1px solid #555" }}>
          <Button
            variant="contained"
            color="warning"
            fullWidth
            onClick={logout}
          >
            Logout
          </Button>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, bgcolor: "#f4f6f8", p: 3 }}>
        {children}
      </Box>
    </Box>
  );
}
