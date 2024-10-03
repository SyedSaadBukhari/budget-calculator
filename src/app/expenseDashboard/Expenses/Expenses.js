import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Pagination,
  Snackbar,
  Alert,
  LinearProgress,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ExpenseForm from "../../../components/ExpenseForm/ExpenseForm";
import { styled } from "@mui/material/styles";

const CustomAlert = styled(Alert)(({ theme, severity, color }) => ({
  backgroundColor:
    color === "error"
      ? theme.palette.error.light
      : theme.palette[severity].light,
  color:
    color === "error"
      ? theme.palette.error.contrastText
      : theme.palette[severity].contrastText,
  "& .MuiAlert-icon": {
    color:
      color === "error"
        ? theme.palette.error.main
        : theme.palette[severity].main,
  },
}));

const ExpensesTable = ({ userId }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState("");
  const [editingExpense, setEditingExpense] = useState(null);
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const rowsPerPage = 8;
  const [totalBudget, setTotalBudget] = useState(0);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
    color: "",
  });

  const fetchBudgetLimit = async () => {
    try {
      const response = await fetch("/api/users/getUser", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();

      if (data.user && data.user.budgetLimit) {
        setTotalBudget(data.user.budgetLimit);
        console.log("Total Budget (Budget Limit):", data.user.budgetLimit);
      } else {
        console.error("Budget limit not found in user data");
      }
    } catch (error) {
      console.error("Error fetching budget limit:", error);
    }
  };

  useEffect(() => {
    fetchBudgetLimit();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await fetch("/api/users/expenses", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch expenses");
      }

      const data = await response.json();
      setExpenses(data.expenses);
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleOpenDialog = (expense = null) => {
    setEditingExpense(expense);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingExpense(null);
  };

  const handleAddExpense = (newExpense) => {
    setExpenses([newExpense, ...expenses]);
    setAlert({
      open: true,
      message: "Expense added successfully",
      severity: "success",
      color: "",
    });
  };

  const handleUpdateExpense = (updatedExpense) => {
    setExpenses(
      expenses.map((expense) =>
        expense._id === updatedExpense._id ? updatedExpense : expense
      )
    );
    setAlert({
      open: true,
      message: "Expense updated successfully",
      severity: "success",
      color: "",
    });
  };

  const handleDeleteExpense = async (expenseId) => {
    try {
      const response = await fetch(`/api/users/expenses/${expenseId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete expense");
      }

      setExpenses(expenses.filter((expense) => expense._id !== expenseId));
      setAlert({
        open: true,
        message: "Expense deleted successfully",
        severity: "success",
        color: "error",
      });
    } catch (error) {
      console.error(error);
      setError(error.message);
      setAlert({
        open: true,
        message: error.message || "Error deleting expense",
        severity: "error",
        color: "",
      });
    }
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleDateFilterChange = (event) => {
    setDateFilter(event.target.value);
    setCurrentPage(1);
  };

  const sortedAndFilteredExpenses = expenses
    .filter((expense) => {
      const matchesSearch = expense.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesDate = dateFilter
        ? new Date(expense.date).toISOString().split("T")[0] === dateFilter
        : true;
      return matchesSearch && matchesDate;
    })
    .sort((a, b) => {
      if (sortBy === "date") {
        return sortOrder === "asc"
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date);
      } else if (sortBy === "amount") {
        return sortOrder === "asc" ? a.amount - b.amount : b.amount - a.amount;
      }
      return 0;
    });

  const paginatedExpenses = sortedAndFilteredExpenses.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const calculatePercentage = (amount) => {
    if (totalBudget === 0 || !totalBudget) {
      return 0;
    }
    return (amount / totalBudget) * 100;
  };

  return (
    <main style={{ padding: " 0 20px" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        p="20px 0"
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          Expenses{" "}
        </Typography>
        <Button
          variant="contained"
          onClick={() => handleOpenDialog()}
          style={{
            backgroundColor: "#7950f2",
          }}
        >
          Add Expenses
        </Button>
      </Box>

      <Divider />

      <ExpenseForm
        open={dialogOpen}
        handleClose={handleCloseDialog}
        onExpenseAdded={handleAddExpense}
        onExpenseUpdated={handleUpdateExpense}
        editingExpense={editingExpense}
        userId={userId}
      />
      <Box p="20px 0">
        <TableContainer component={Paper}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            padding="0.5rem "
            backgroundColor="#f7f7f7"
          >
            <Typography variant="h5">Expenses</Typography>

            <Box display="flex" gap={1}>
              <Select size="small" value={sortBy} onChange={handleSortChange}>
                <MenuItem value="date" divider={true}>
                  Sort by Date
                </MenuItem>
                <MenuItem value="amount">Sort by Amount</MenuItem>
              </Select>
              <Select
                size="small"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
              >
                <MenuItem value="asc">Ascending</MenuItem>
                <MenuItem value="desc">Descending</MenuItem>
              </Select>
              <TextField
                size="small"
                type="date"
                variant="outlined"
                value={dateFilter}
                onChange={handleDateFilterChange}
              />
              <TextField
                size="small"
                placeholder="Search"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </Box>
          </Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Expense</TableCell>
                <TableCell>Total Expenditure</TableCell>
                <TableCell>Price(PKR)</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedExpenses.map((expense) => (
                <TableRow key={expense._id}>
                  <TableCell>{expense.title}</TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <Box width="100%" mr={1}>
                        <LinearProgress
                          variant="determinate"
                          value={calculatePercentage(expense.amount)}
                          sx={{
                            height: 5,
                            borderRadius: 5,
                            backgroundColor: "#e0e0e0",
                            "& .MuiLinearProgress-bar": {
                              borderRadius: 5,
                              backgroundColor: "#6C63FF",
                            },
                          }}
                        />
                      </Box>
                      <Box minWidth={35}>
                        <Typography variant="body2" color="textSecondary">
                          {`${Math.round(
                            calculatePercentage(expense.amount)
                          )}%`}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>{expense.amount}</TableCell>
                  <TableCell>
                    {new Date(expense.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenDialog(expense)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={() => handleDeleteExpense(expense._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Box display="flex" justifyContent="end" mt={2}>
        <Pagination
          count={Math.ceil(sortedAndFilteredExpenses.length / rowsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="secondary"
        />
      </Box>

      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={() => setAlert({ ...alert, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <CustomAlert
          onClose={() => setAlert({ ...alert, open: false })}
          severity={alert.severity}
          color={alert.color}
          sx={{ width: "100%" }}
        >
          {alert.message}
        </CustomAlert>
      </Snackbar>
    </main>
  );
};

export default ExpensesTable;
