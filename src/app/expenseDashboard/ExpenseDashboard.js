"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import LocalAtm from "@mui/icons-material/LocalAtm";
import Analytics from "@mui/icons-material/Analytics";
import People from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";
import ExpensesTable from "./Expenses/Expenses";
import UsersTable from "./UserManagment/UserManagment";
import AnalyticsTable from "./Analytics/Analytics";
import Logout from "../../components/Logout/Logout";
import MenuBar from "../../components/MenuBar/MenuBar";

const ExpensesDashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedSection, setSelectedSection] = useState("Expenses");
  const [expenses, setExpenses] = useState([]);
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
    <Box display="flex">
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
          },
        }}
      >
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => setIsCollapsed(!isCollapsed)}>
              <ListItemIcon style={{ marginRight: 10 }}>
                <img
                  src="/images/budgest-tracker-icon.png"
                  alt="Budget Tracker"
                />
              </ListItemIcon>
              {!isCollapsed && <ListItemText primary="Budget Tracker" />}
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleListItemClick("Analytics")}>
              <ListItemIcon>
                <Analytics />
              </ListItemIcon>
              {!isCollapsed && <ListItemText primary="Analytics" />}
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleListItemClick("Expenses")}>
              <ListItemIcon>
                <LocalAtm />
              </ListItemIcon>
              {!isCollapsed && <ListItemText primary="Expenses" />}
            </ListItemButton>
          </ListItem>

          {isAdmin && (
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleListItemClick("Users")}>
                <ListItemIcon>
                  <People />
                </ListItemIcon>
                {!isCollapsed && <ListItemText primary="Users" />}
              </ListItemButton>
            </ListItem>
          )}
          <Divider />
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleListItemClick("Logout")}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              {!isCollapsed && <ListItemText primary="Logout" />}
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      <Box flexGrow={1} p={2}>
        <MenuBar />
        <Typography variant="h4">{selectedSection}</Typography>
        {selectedSection === "Expenses" && (
          <ExpensesTable
            expenses={expenses}
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}
            handlePageChange={handlePageChange}
            userId={userId}
          />
        )}

        {selectedSection === "Users" && isAdmin && (
          <UsersTable
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}
            handlePageChange={handlePageChange}
          />
        )}
        {selectedSection === "Logout" && <Logout />}
      </Box>
    </Box>
  );
};

export default ExpensesDashboard;
