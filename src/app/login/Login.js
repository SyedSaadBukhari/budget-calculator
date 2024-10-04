"use client";

import React, { useState } from "react";

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
  Alert,
  Divider,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import Title from "../../components/Title/Title";

import "./login.scss";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
});

const Login = () => {
  const router = useRouter();
  const [loginError, setLoginError] = useState(null);

  return (
    <main className="login-container">
      <Title />

      <section className="container">
        <section className="form-container">
          <Typography variant="h3" gutterBottom>
            Welcome Back!
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Sign in to continue to Budget Tracker
          </Typography>
          {loginError && (
            <Alert severity="error" style={{ marginBottom: "16px" }}>
              {loginError}
            </Alert>
          )}
          <Formik
            initialValues={{ email: "", password: "", remember: false }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              try {
                const response = await axios.post("/api/users/login", values);

                if (response.data.success) {
                  router.push("/expenseDashboard");
                }
              } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                  setLoginError(error.response.data.error);
                } else {
                  setLoginError("Something went wrong. Please try again.");
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
        </section>
        <Divider orientation="vertical" variant="middle" flexItem />
        <article className="image-container">
          <img src="/images/signup.png" alt="Illustration" className="image" />
        </article>
      </section>
    </main>
  );
};

export default Login;
