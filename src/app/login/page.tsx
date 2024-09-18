"use client";

import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import TopBar from "../../components/TopBar/topBar";
import "./login.scss";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
});

const Login = () => {
  return (
    <main className="login-container">
      <TopBar />

      <div className="container">
        <div className="form-container">
          <Typography variant="h3" gutterBottom>
            Welcome Back!
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Sign in to continue to Budget Tracker
          </Typography>
          <Formik
            initialValues={{ email: "", password: "", remember: false }}
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
                <Field
                  as={TextField}
                  fullWidth
                  margin="normal"
                  label="Password"
                  name="password"
                  type="password"
                  variant="outlined"
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="text-field"
                />
                <FormControlLabel
                  control={
                    <Field as={Checkbox} name="remember" color="primary" />
                  }
                  label="Remember me"
                />
                <Box display="flex" justifyContent="space-between" width="100%">
                  <Link
                    href="/resetPassword"
                    underline="hover"
                    className="link"
                  >
                    Forgot Password?
                  </Link>
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  className="submit-button"
                >
                  LOG IN
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
          <img src="/images/signup.png" alt="Illustration" className="image" />
        </div>
      </div>
    </main>
  );
};

export default Login;
