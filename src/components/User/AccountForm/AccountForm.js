import React from "react";

import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import { Formik, Form, Field } from "formik";
import axios from "axios";

import "./account-form.scss";

const AccountForm = ({ user }) => {
  return (
    <Formik
      initialValues={{
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        fatherName: user?.fatherName || "",
        jobTitle: user?.jobTitle || "",
        streetAddress: user?.streetAddress || "",
        city: user?.city || "",
        state: user?.state || "",
        zipCode: user?.zipCode || "",
        completeAddress: user?.completeAddress || "",
        phoneNumber: user?.phoneNumber || "",
        email: user?.email || "",
        website: user?.website || "",
        dateOfBirth: user?.dateOfBirth || "",
        education: user?.education || "",
        gender: user?.gender || "",
        budgetLimit: user?.budgetLimit || "",
        aboutUser: user?.aboutUser || "",
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
      {({ values, handleChange }) => (
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
                    onChange={handleChange}
                    value={values.firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    name="lastName"
                    as={TextField}
                    label="Last Name"
                    fullWidth
                    onChange={handleChange}
                    value={values.lastName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    name="fatherName"
                    as={TextField}
                    label="Father's Name"
                    fullWidth
                    onChange={handleChange}
                    value={values.fatherName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    name="jobTitle"
                    as={TextField}
                    label="Job Title"
                    fullWidth
                    onChange={handleChange}
                    value={values.jobTitle}
                  />
                </Grid>
              </Grid>
            </Box>

            <Box className="form-section">
              <Typography variant="subtitle1">About</Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Field
                    name="aboutUser"
                    as={TextField}
                    label="About"
                    fullWidth
                    onChange={handleChange}
                    value={values.aboutUser}
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
                    onChange={handleChange}
                    value={values.streetAddress}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Field
                    name="city"
                    as={TextField}
                    label="City"
                    fullWidth
                    onChange={handleChange}
                    value={values.city}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Field
                    name="state"
                    as={TextField}
                    label="State"
                    fullWidth
                    onChange={handleChange}
                    value={values.state}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Field
                    name="zipCode"
                    as={TextField}
                    label="Zip Code"
                    fullWidth
                    onChange={handleChange}
                    value={values.zipCode}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    name="completeAddress"
                    as={TextField}
                    label="Complete Address"
                    fullWidth
                    onChange={handleChange}
                    value={values.completeAddress}
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
                    onChange={handleChange}
                    value={values.phoneNumber}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    name="email"
                    as={TextField}
                    label="Email"
                    fullWidth
                    onChange={handleChange}
                    value={values.email}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    name="website"
                    as={TextField}
                    label="Website"
                    fullWidth
                    onChange={handleChange}
                    value={values.website}
                  />
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
                    onChange={handleChange}
                    value={values.dateOfBirth}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Field
                    name="education"
                    as={TextField}
                    label="Education"
                    fullWidth
                    onChange={handleChange}
                    value={values.education}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Field
                    name="gender"
                    as={TextField}
                    label="Gender"
                    fullWidth
                    onChange={handleChange}
                    value={values.gender}
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
                    onChange={handleChange}
                    value={values.budgetLimit}
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
