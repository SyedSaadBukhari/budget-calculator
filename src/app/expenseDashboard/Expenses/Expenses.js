import React, { useState } from "react";
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
  LinearProgress,
  Typography,
  Pagination,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ExpenseForm from "../../../components/ExpenseForm/ExpenseForm";

const ExpensesTable = ({
  expenses,
  currentPage,
  rowsPerPage,
  handlePageChange,
  onExpenseAdded,
  userId,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleAddExpense = (newExpense) => {
    onExpenseAdded(newExpense);
  };

  const paginatedExpenses = expenses.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <>
      <Box display="flex" justifyContent="flex-end" alignItems="center">
        <Button
          variant="contained"
          onClick={handleOpenDialog}
          style={{
            backgroundColor: "#6C63FF",
            marginBottom: "20px",
          }}
        >
          Add Expenses
        </Button>
      </Box>

      <ExpenseForm
        open={dialogOpen}
        handleClose={handleCloseDialog}
        onExpenseAdded={handleAddExpense}
        userId={userId}
      />

      <Box display="flex" justifyContent="flex-end" alignItems="center" mb={2}>
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
              <TableCell>Price (PKR)</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedExpenses.map((row) => (
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
        <Pagination
          count={Math.ceil(expenses.length / rowsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
        />
      </Box>
    </>
  );
};

export default ExpensesTable;
