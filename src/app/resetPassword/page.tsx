"use client";

import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Box, Button, TextField, Typography, Link } from "@mui/material";
import TopBar from "../../components/TopBar/topBar";
import "./reset-password.scss";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("Required"),
});

const Reset = () => {
  return (
    <main className="reset-container">
      <TopBar />
      <div className="container">
        <div className="form-container">
          <Typography variant="h5" gutterBottom>
            Reset Password
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Enter your email for a reset link
          </Typography>
          <Formik
            initialValues={{ email: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log("Form Values:", values);
            }}
          >
            {({ errors, touched, handleChange, handleBlur }) => (
              <Form>
                <Field
                  as={TextField}
                  fullWidth
                  margin="normal"
                  label="Email"
                  name="email"
                  type="email"
                  variant="outlined"
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="text-field"
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  className="submit-button"
                >
                  Send Reset Password Link
                </Button>
                <Typography variant="body2" className="link">
                  Don’t have an account?{" "}
                  <Link href="/signup" underline="hover" className="link">
                    Sign Up
                  </Link>
                </Typography>
              </Form>
            )}
          </Formik>
        </div>
        <div className="image-container">
          <img
            src="/images/budget-tracker-Illustration.png"
            alt="Illustration"
            className="image"
          />
        </div>
      </div>
    </main>
  );
};

export default Reset;
