import React from "react";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import "./account-form.scss";

const AccountForm = () => {
  return (
    <Formik
      initialValues={{
        firstName: "Brooklyn",
        lastName: "Simmons",
        jobTitle: "Simmons",
        streetAddress: "78 South 34 North",
        city: "North Orange",
        state: "New York",
        zipCode: "98766655",
        completeAddress: "",
        phoneNumber: "123-456-8945",
        email: "4517 Washington Ave. Manchester, Kentucky 39495",
        dateOfBirth: "9/05/99",
        education: "Masters",
        gender: "Female",
        budget: "1000-500000",
      }}
      onSubmit={async (values) => {
        try {
          const response = await axios.put("/api/users/update", values, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          console.log("User updated successfully:", response.data);
        } catch (error) {
          console.error(
            "Error updating user:",
            error.response ? error.response.data : error.message
          );
        }
      }}
    >
      {() => (
        <Form className="account-form">
          <Box className="form-container">
            <Typography variant="h6" className="form-heading">
              My Account
            </Typography>

            <Box className="form-section">
              <Typography variant="subtitle1">Name & Job</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Field
                    name="firstName"
                    as={TextField}
                    label="First Name"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    name="lastName"
                    as={TextField}
                    label="Last Name"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    name="jobTitle"
                    as={TextField}
                    label="Job Title"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Box>

            <Box className="form-section">
              <Typography variant="subtitle1">Address</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Field
                    name="streetAddress"
                    as={TextField}
                    label="Street Address"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Field name="city" as={TextField} label="City" fullWidth />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Field name="state" as={TextField} label="State" fullWidth />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Field
                    name="zipCode"
                    as={TextField}
                    label="Zip Code"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    name="completeAddress"
                    as={TextField}
                    label="Complete Address"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Box>

            <Box className="form-section">
              <Typography variant="subtitle1">Contact Info</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Field
                    name="phoneNumber"
                    as={TextField}
                    label="Phone Number"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field name="email" as={TextField} label="Email" fullWidth />
                </Grid>
              </Grid>
            </Box>

            <Box className="form-section">
              <Typography variant="subtitle1">Bio</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={4}>
                  <Field
                    name="dateOfBirth"
                    as={TextField}
                    label="Date of Birth"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Field
                    name="education"
                    as={TextField}
                    label="Education"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Field
                    name="gender"
                    as={TextField}
                    label="Gender"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Box>

            <Box className="form-section">
              <Typography variant="subtitle1">Financial Information</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Field
                    name="budget"
                    as={TextField}
                    label="Budget (PKR)"
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Box>

            <Box className="form-buttons">
              <Button variant="contained" color="primary" type="submit">
                Update
              </Button>
              <Button variant="outlined" color="secondary">
                Cancel
              </Button>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default AccountForm;
