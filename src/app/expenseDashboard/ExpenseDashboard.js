"use client";

import React, { useState } from "react";

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

const expenses = Array.from({ length: 235 }, (_, index) => ({
  id: index + 1,
  expense: "Prestigious Clientele Segment",
  expenditure: 50,
  price: "25,000",
  date: "22 Jan 2022",
  user: ["guy-hawkins", "wade-warren", "jenny-wilson", "robert-fox"][index % 4],
}));

const users = Array.from({ length: 235 }, (_, index) => ({
  id: index + 1,
  firstName: ["guy-hawkins", "wade-warren", "jenny-wilson", "robert-fox"][
    index % 4
  ],
  lastName: ["guy-hawkins", "wade-warren", "jenny-wilson", "robert-fox"][
    index % 4
  ],
  email: ["guy-hawkins", "wade-warren", "jenny-wilson", "robert-fox"][
    index % 4
  ],
  number: "25000000",
  role: ["admin", "user", "admin", "user"][index % 4],
}));

const ExpensesDashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selectedSection, setSelectedSection] = useState("Expenses");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

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
              <ListItemIcon>
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
          <ListItem disablePadding>
            <ListItemButton onClick={() => handleListItemClick("Users")}>
              <ListItemIcon>
                <People />
              </ListItemIcon>
              {!isCollapsed && <ListItemText primary="Users" />}
            </ListItemButton>
          </ListItem>
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
        {selectedSection === "Analytics" && <AnalyticsTable />}
        {selectedSection === "Expenses" && (
          <ExpensesTable
            expenses={expenses}
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}
            handlePageChange={handlePageChange}
          />
        )}
        {selectedSection === "Users" && (
          <UsersTable
            users={users}
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
