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
  Select,
  MenuItem,
  Alert,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
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

const UsersTable = ({ currentPage, rowsPerPage, handlePageChange }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
    color: "",
  });
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [sortBy, setSortBy] = useState("firstName");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

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
        setAlert({
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
          setAlert({
            open: true,
            message: "User deleted successfully",
            severity: "success",
            color: "error",
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
          color: "",
        });
      }
    }
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    Object.values(user).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (a[sortBy] < b[sortBy]) return sortOrder === "asc" ? -1 : 1;
    if (a[sortBy] > b[sortBy]) return sortOrder === "asc" ? 1 : -1;
    return 0;
  });

  const paginatedUsers = sortedUsers.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <main style={{ padding: " 0 20px" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", padding: "20px 0 " }}>
        Users{" "}
      </Typography>
      <Divider />

      <Box p="20px 0">
        <TableContainer component={Paper}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            padding="0.5rem "
            backgroundColor="#f7f7f7"
          >
            <Typography variant="h5">Users </Typography>

            <Box display="flex" gap={1}>
              <Select size="small" value={sortBy} onChange={handleSortChange}>
                <MenuItem value="firstName">Sort by First Name</MenuItem>
                <MenuItem value="lastName">Sort by Last Name</MenuItem>
                <MenuItem value="email">Sort by Email</MenuItem>
                <MenuItem value="role">Sort by Role</MenuItem>
              </Select>
              <Select
                size="small"
                value={sortOrder}
                onChange={handleSortOrderChange}
              >
                <MenuItem value="asc">Ascending</MenuItem>
                <MenuItem value="desc">Descending</MenuItem>
              </Select>
              <TextField
                size="small"
                placeholder="Search users"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </Box>
          </Box>
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
      </Box>

      <Box display="flex" justifyContent="space-between" mt={2}>
        <Typography>
          Showing {paginatedUsers.length} / {filteredUsers.length}
        </Typography>
        <Pagination
          count={Math.ceil(filteredUsers.length / rowsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="secondary"
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
                        <MenuItem value="user">User</MenuItem>
                        <MenuItem value="admin">Admin</MenuItem>
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

export default UsersTable;
