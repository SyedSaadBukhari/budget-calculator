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
import { styled } from "@mui/system";
import TopBar from "../../components/TopBar/topBar";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
});

const Container = styled(Box)({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  height: "100vh",
  alignItems: "center",
  justifyItems: "center",
});

const FormContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  maxWidth: "600px",
});

const ImageContainer = styled(Box)({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const Image = styled("img")({
  maxWidth: "100%",
  height: "auto",
});

const Login = () => {
  return (
    <>
      <TopBar />

      <Container>
        <FormContainer>
          <Typography variant="h5" gutterBottom>
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
                  style={{
                    backgroundColor: "#DDE4F0",
                    border: "1px solid #DDE4F0",
                  }}
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
                  style={{
                    backgroundColor: "#DDE4F0",
                    border: "1px solid #DDE4F0",
                  }}
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
                    style={{ color: "#7539FF" }}
                  >
                    Forgot Password?
                  </Link>
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={{ marginTop: "1rem", backgroundColor: "#7539FF" }}
                >
                  LOG IN
                </Button>
                <Typography
                  variant="body2"
                  align="center"
                  style={{ marginTop: "1rem" }}
                >
                  Don’t have an account?{" "}
                  <Link
                    href="/signup"
                    underline="hover"
                    style={{ color: "#7539FF" }}
                  >
                    Sign Up
                  </Link>
                </Typography>
              </Form>
            )}
          </Formik>
        </FormContainer>
        <ImageContainer>
          <Image
            src="/images/budget-tracker-Illustration.png"
            alt="Illustration"
          />
        </ImageContainer>
      </Container>
    </>
  );
};

export default Login;
