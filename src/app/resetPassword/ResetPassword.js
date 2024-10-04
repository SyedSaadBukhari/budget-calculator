"use client";

import React, { useState } from "react";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Button,
  TextField,
  Typography,
  Link,
  Alert,
  Divider,
} from "@mui/material";
import axios from "axios";
import Title from "../../components/Title/Title";

import "./reset-password.scss";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("Required"),
});

const Reset = () => {
  const [resetError, setResetError] = useState(null);
  const [resetSuccess, setResetSuccess] = useState(false);

  return (
    <main className="reset-container">
      <Title />
      <section className="container">
        <section className="form-container">
          <Typography variant="h5" gutterBottom>
            Reset Password
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Enter your email for a reset link
          </Typography>
          {resetError && (
            <Alert severity="error" style={{ marginBottom: "16px" }}>
              {resetError}
            </Alert>
          )}
          {resetSuccess && (
            <Alert severity="success" style={{ marginBottom: "16px" }}>
              Reset link sent! Check your email.
            </Alert>
          )}
          <Formik
            initialValues={{ email: "" }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              try {
                const response = await axios.post(
                  "/api/users/requestresetpassword",
                  values
                );

                if (response.data.success) {
                  setResetSuccess(true);
                  setResetError(null);
                }
              } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                  setResetError(error.response.data.error);
                } else {
                  setResetError("Something went wrong. Please try again.");
                }
              }
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
        </section>
        <Divider orientation="vertical" variant="middle" flexItem />
        <article className="image-container">
          <img
            src="/images/budget-tracker-Illustration.png"
            alt="Illustration"
            className="image"
          />
        </article>
      </section>
    </main>
  );
};

export default Reset;
