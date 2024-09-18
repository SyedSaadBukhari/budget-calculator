"use client";

import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField, Button, Typography, Link } from "@mui/material";
import TopBar from "../../components/TopBar/topBar";
import "./sign-up.scss"; // Import the CSS file

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
});

const SignUp = () => {
  return (
    <main className="signup-container">
      <TopBar />

      <div className="container">
        <div className="form-container">
          <Typography variant="h3" gutterBottom>
            Sign Up
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Welcome to our community{" "}
          </Typography>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              password: "",
              confirmPassword: "",
              budgetLimit: "",
              remember: false,
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log("Form Values:", values);
            }}
          >
            {({ errors, touched, handleChange, handleBlur }) => (
              <Form>
                <article className="name">
                  <Field
                    as={TextField}
                    fullWidth
                    margin="normal"
                    label="First Name"
                    name="firstName"
                    type="text"
                    variant="outlined"
                    error={touched.firstName && Boolean(errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="text-field"
                  />
                  <Field
                    as={TextField}
                    fullWidth
                    margin="normal"
                    label="Last Name"
                    name="lastName"
                    type="text"
                    variant="outlined"
                    error={touched.lastName && Boolean(errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="text-field"
                  />
                </article>
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
                <Field
                  as={TextField}
                  fullWidth
                  margin="normal"
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  variant="outlined"
                  error={
                    touched.confirmPassword && Boolean(errors.confirmPassword)
                  }
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="text-field"
                />
                <Field
                  as={TextField}
                  fullWidth
                  margin="normal"
                  label="Budget Limit"
                  name="budgetLimit"
                  type="text"
                  variant="outlined"
                  error={touched.budgetLimit && Boolean(errors.budgetLimit)}
                  helperText={touched.budgetLimit && errors.budgetLimit}
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
                  SIGN UP
                </Button>
                <Typography variant="body2" className="link">
                  Already have an account?{" "}
                  <Link href="/login" underline="hover" className="link">
                    Log in
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

export default SignUp;
