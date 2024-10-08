"use client";

import React from "react";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField, Button, Typography, Link, Divider } from "@mui/material";
import Title from "../../components/Title/Title";
import axios from "axios";
import { useRouter } from "next/navigation";

import "./sign-up.scss";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email format").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
});

const SignUp = () => {
  const router = useRouter();

  return (
    <main className="signup-container">
      <Title />

      <section className="container">
        <section className="form-container">
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
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const response = await axios.post("/api/users/signup", values);
                console.log("User created successfully:", response.data);
                router.push("/login");
              } catch (error) {
                console.error("Error creating user:", error.response?.data);
              } finally {
                setSubmitting(false);
              }
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
        </section>
        <Divider orientation="vertical" variant="middle" flexItem />
        <article className="image-container">
          <img src="/images/signup.png" alt="Illustration" className="image" />
        </article>
      </section>
    </main>
  );
};

export default SignUp;
