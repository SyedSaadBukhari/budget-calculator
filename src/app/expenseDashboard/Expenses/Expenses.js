import React from "react";

import {
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
  Box,
  Pagination,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const ExpensesTable = ({
  expenses,
  currentPage,
  rowsPerPage,
  handlePageChange,
}) => {
  const paginatedExpenses = expenses.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <>
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
        <Typography>
          Showing {paginatedExpenses.length} / {expenses.length}
        </Typography>
        <Pagination
          count={Math.ceil(expenses.length / rowsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </>
  );
};

export default ExpensesTable;
