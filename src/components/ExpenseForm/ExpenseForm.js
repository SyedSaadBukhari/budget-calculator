import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Box,
  Snackbar,
} from "@mui/material";

const ExpenseForm = ({
  open,
  handleClose,
  onExpenseAdded,
  onExpenseUpdated,
  editingExpense,
}) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [budgetLimit, setBudgetLimit] = useState(0);

  useEffect(() => {
    if (editingExpense) {
      setTitle(editingExpense.title);
      setAmount(editingExpense.amount.toString());
      setDate(new Date(editingExpense.date).toISOString().split("T")[0]);
    } else {
      setTitle("");
      setAmount("");
      setDate("");
    }
    fetchBudgetLimit();
  }, [editingExpense]);

  const fetchBudgetLimit = async () => {
    try {
      const response = await fetch("/api/users/getUser", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      if (data.user && data.user.budgetLimit) {
        setBudgetLimit(data.user.budgetLimit);
        console.log("Budget Limit:", data.user.budgetLimit);
      } else {
        console.error("Budget limit not found in user data");
      }
    } catch (error) {
      console.error("Error fetching budget limit:", error);
    }
  };

  const handleAddOrUpdateExpense = async () => {
    const expenseData = {
      title,
      amount: parseFloat(amount),
      date: new Date(date).toISOString(),
    };

    try {
      const currentExpenses = await fetch("/api/users/expenses", {
        method: "GET",
        credentials: "include",
      }).then((res) => res.json());

      const totalExpenses = currentExpenses.expenses.reduce(
        (sum, expense) => sum + expense.amount,
        0
      );
      const newTotalExpenses =
        totalExpenses +
        parseFloat(amount) -
        (editingExpense ? editingExpense.amount : 0);

      if (newTotalExpenses > budgetLimit) {
        setError(
          `Adding this expense would exceed your budget limit of ${budgetLimit}`
        );
        return;
      }

      const url = editingExpense
        ? `/api/users/expenses/${editingExpense._id}`
        : "/api/users/expenses";
      const method = editingExpense ? "PUT" : "POST";

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expenseData),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create/update expense");
      }

      const newExpense = await response.json();
      editingExpense
        ? onExpenseUpdated(newExpense.expense)
        : onExpenseAdded(newExpense.expense);
      handleClose();
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {editingExpense ? "Edit Expense" : "Add Expense"}
        </DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              autoFocus
              margin="dense"
              label="Title"
              fullWidth
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Box display="flex" gap={2}>
              <TextField
                margin="dense"
                label="Amount (PKR)"
                type="number"
                variant="outlined"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                sx={{ flex: 1 }}
                required
              />
              <TextField
                margin="dense"
                label="Date"
                type="date"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                sx={{ flex: 1 }}
                required
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleAddOrUpdateExpense}
            color="secondary"
            variant="contained"
          >
            {editingExpense ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError("")}
        message={error}
      />
    </>
  );
};

export default ExpenseForm;
