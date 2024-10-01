import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Box,
  Pagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Grid,
  Snackbar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const UsersTable = ({ currentPage, rowsPerPage, handlePageChange }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/api/users/userList");
      setUsers(response.data.users);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setOpenEditDialog(true);
  };

  const handleDialogClose = () => {
    setOpenEditDialog(false);
    setSelectedUser(null);
  };

  const handleFormSubmit = async (values) => {
    try {
      const response = await axios.put(
        `/api/users/adminUserUpdate/${selectedUser.id}`,
        {
          ...values,
          isAdmin: values.role === "admin",
        }
      );

      if (response.data.user) {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === selectedUser.id
              ? {
                  ...user,
                  ...response.data.user,
                  role: response.data.user.isAdmin ? "admin" : "user",
                }
              : user
          )
        );
        handleDialogClose();
        setSnackbar({
          open: true,
          message: "User updated successfully",
          severity: "success",
        });
      } else {
        throw new Error(response.data.error || "Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      setSnackbar({
        open: true,
        message: error.message || "Error updating user",
        severity: "error",
      });
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await axios.delete(`/api/users/deleteUser/${userId}`);
        if (response.data.success) {
          setUsers((prevUsers) =>
            prevUsers.filter((user) => user.id !== userId)
          );
          setSnackbar({
            open: true,
            message: "User deleted successfully",
            severity: "success",
          });
        } else {
          throw new Error(response.data.error || "Failed to delete user");
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        setSnackbar({
          open: true,
          message: error.message || "Error deleting user",
          severity: "error",
        });
      }
    }
  };

  const paginatedUsers = users.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Number</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUsers.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.firstName}</TableCell>
                <TableCell>{row.lastName}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.number}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleEditClick(row)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDeleteUser(row.id)}
                  >
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
          Showing {paginatedUsers.length} / {users.length}
        </Typography>
        <Pagination
          count={Math.ceil(users.length / rowsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>

      {selectedUser && (
        <Dialog open={openEditDialog} onClose={handleDialogClose}>
          <DialogTitle>Edit User Information</DialogTitle>
          <DialogContent>
            <Formik
              initialValues={{
                firstName: selectedUser.firstName || "",
                lastName: selectedUser.lastName || "",
                phoneNumber: selectedUser.number || "",
                role: selectedUser.role || "user",
              }}
              validationSchema={Yup.object({
                firstName: Yup.string().required("First name is required"),
                lastName: Yup.string().required("Last name is required"),
                phoneNumber: Yup.string().required("Phone number is required"),
                role: Yup.string().oneOf(["user", "admin"], "Invalid role"),
              })}
              onSubmit={handleFormSubmit}
            >
              {({ values, handleChange, errors, touched }) => (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Field
                        as={TextField}
                        name="firstName"
                        label="First Name"
                        fullWidth
                        value={values.firstName}
                        onChange={handleChange}
                        error={touched.firstName && errors.firstName}
                        helperText={touched.firstName && errors.firstName}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        as={TextField}
                        name="lastName"
                        label="Last Name"
                        fullWidth
                        value={values.lastName}
                        onChange={handleChange}
                        error={touched.lastName && errors.lastName}
                        helperText={touched.lastName && errors.lastName}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Email"
                        fullWidth
                        value={selectedUser.email}
                        InputProps={{
                          readOnly: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        as={TextField}
                        name="phoneNumber"
                        label="Phone Number"
                        fullWidth
                        value={values.phoneNumber}
                        onChange={handleChange}
                        error={touched.phoneNumber && errors.phoneNumber}
                        helperText={touched.phoneNumber && errors.phoneNumber}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        as={TextField}
                        select
                        name="role"
                        label="Role"
                        fullWidth
                        value={values.role}
                        onChange={handleChange}
                        error={touched.role && errors.role}
                        helperText={touched.role && errors.role}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </Field>
                    </Grid>
                  </Grid>
                  <DialogActions>
                    <Button onClick={handleDialogClose} color="secondary">
                      Cancel
                    </Button>
                    <Button type="submit" color="primary">
                      Update
                    </Button>
                  </DialogActions>
                </Form>
              )}
            </Formik>
          </DialogContent>
        </Dialog>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
        severity={snackbar.severity}
      />
    </>
  );
};

export default UsersTable;
