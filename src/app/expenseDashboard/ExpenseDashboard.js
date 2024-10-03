"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  Divider,
} from "@mui/material";
import LocalAtm from "@mui/icons-material/LocalAtm";
import Analytics from "@mui/icons-material/Analytics";
import People from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import MenuBar from "../../components/MenuBar/MenuBar";
import ExpensesTable from "./Expenses/Expenses";
import UsersTable from "./UserManagment/UserManagment";
import AnalyticsGraph from "./Analytics/Analytics";
import Logout from "../../components/Logout/Logout";

const ExpensesDashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedSection, setSelectedSection] = useState("Expenses");
  const [expenses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/users/getUser", {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        if (response.ok) {
          setIsAdmin(data.user.isAdmin);
          setUserId(data.user._id);
          console.log("isAdmin:", data.user.isAdmin);
        } else {
          console.error(data.error);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleListItemClick = (section) => {
    setSelectedSection(section);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#F8F9FD" }}>
      <Drawer
        variant="permanent"
        open={!isCollapsed}
        sx={{
          width: isCollapsed ? 80 : 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: isCollapsed ? 80 : 240,
            transition: "width 0.3s",
            boxSizing: "border-box",
            backgroundColor: "white",
            boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
          },
        }}
      >
        <Box
          sx={{
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="/images/budgest-tracker-icon.png"
            alt="Budget Tracker"
            style={{ width: 40, height: 40 }}
          />
          {!isCollapsed && (
            <Typography variant="h6" sx={{ ml: 2, fontWeight: "bold" }}>
              Budget Tracker
            </Typography>
          )}
        </Box>
        <Divider />
        <List sx={{ mt: 2 }}>
          {[
            { text: "Analytics", icon: <Analytics />, section: "Analytics" },
            { text: "Expenses", icon: <LocalAtm />, section: "Expenses" },
            ...(isAdmin
              ? [{ text: "Users", icon: <People />, section: "Users" }]
              : []),
            { text: "Logout", icon: <LogoutIcon />, section: "Logout" },
          ].map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                onClick={() => handleListItemClick(item.section)}
                selected={selectedSection === item.section}
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: "#7950F2",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#7950F2",
                    },
                    "& .MuiListItemIcon-root": {
                      color: "white",
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color:
                      selectedSection === item.section ? "white" : "inherit",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {!isCollapsed && <ListItemText primary={item.text} />}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3, padding: 0 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "white",
          }}
        >
          <Button
            startIcon={<MenuIcon />}
            onClick={() => setIsCollapsed(!isCollapsed)}
            sx={{ color: "black" }}
          ></Button>
          <Box sx={{ display: "flex", alignItems: "center", p: "16px" }}></Box>
          <MenuBar />
        </Box>
        <Divider />

        {selectedSection === "Expenses" && (
          <>
            <ExpensesTable
              expenses={expenses}
              currentPage={currentPage}
              rowsPerPage={rowsPerPage}
              handlePageChange={handlePageChange}
              userId={userId}
            />
          </>
        )}

        {selectedSection === "Users" && isAdmin && (
          <UsersTable
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}
            handlePageChange={handlePageChange}
          />
        )}

        {selectedSection === "Analytics" && <AnalyticsGraph />}

        {selectedSection === "Logout" && <Logout />}
      </Box>
    </Box>
  );
};

export default ExpensesDashboard;
