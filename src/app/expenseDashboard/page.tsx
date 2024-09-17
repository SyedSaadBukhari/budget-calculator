"use client";

import React, { useState } from "react";

import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Pagination,
  Select,
  MenuItem,
  TextField,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  LinearProgress,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MenuIcon from "@mui/icons-material/Menu";
import Logout from "@mui/icons-material/Logout";
import LocalAtm from "@mui/icons-material/LocalAtm";
import Analytics from "@mui/icons-material/Analytics";
import { styled } from "@mui/system";

const expenses = Array.from({ length: 8 }, (_, index) => ({
  id: index + 1,
  expense: "Prestigious Clientele Segment",
  expenditure: 50,
  price: "25,000",
  date: "22 Jan 2022",
  user: ["guy-hawkins", "wade-warren", "jenny-wilson", "robert-fox"][index % 4],
}));

const Container = styled(Box)({
  padding: "2rem",
  backgroundColor: "#f4f4f9",
  minHeight: "100vh",
});

const Header = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "1rem",
});

const ExpensesDashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

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
                <MenuIcon />
              </ListItemIcon>
              {!isCollapsed && <ListItemText primary="Budget Tracker" />}
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Analytics />
              </ListItemIcon>
              {!isCollapsed && <ListItemText primary="Analysis" />}
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LocalAtm />
              </ListItemIcon>
              {!isCollapsed && <ListItemText primary="Expenses" />}
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Logout />{" "}
              </ListItemIcon>
              {!isCollapsed && <ListItemText primary="Logout" />}
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Container>
          <Header>
            <Typography variant="h4">Expenses</Typography>
            <Button variant="contained" style={{ backgroundColor: "#6C63FF" }}>
              Add Expenses
            </Button>
          </Header>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h6">Expenses</Typography>
            <Box display="flex" gap={1}>
              <Select size="small" defaultValue="All">
                <MenuItem value="All">Sort By</MenuItem>
                <MenuItem value="Date">Date</MenuItem>
                <MenuItem value="User">User</MenuItem>
              </Select>
              <Select size="small" defaultValue="All">
                <MenuItem value="All">By Date</MenuItem>
              </Select>
              <TextField size="small" type="date" variant="outlined" />
              <TextField size="small" placeholder="Search" variant="outlined" />
            </Box>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Expense</TableCell>
                  <TableCell>Total Expenditure</TableCell>
                  <TableCell>Price(PKR)</TableCell>
                  <TableCell>Date</TableCell>
                  <TableCell>User</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {expenses.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.expense}</TableCell>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <LinearProgress
                          variant="determinate"
                          value={row.expenditure}
                          style={{
                            width: "100px",
                            height: "8px",
                            borderRadius: "4px",
                          }}
                          color="primary"
                        />
                        <Typography>{`${row.expenditure}%`}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{row.price}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.user}</TableCell>
                    <TableCell>
                      <IconButton color="primary">
                        <EditIcon />
                      </IconButton>
                      <IconButton color="secondary">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box display="flex" justifyContent="space-between" mt={2}>
            <Typography>Showing 8 / 235</Typography>
            <Pagination count={10} color="primary" />
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default ExpensesDashboard;
