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

const reset = () => {
  return (
    <>
      <TopBar />
      <Container>
        <FormContainer>
          <Typography variant="h5" gutterBottom>
            Reset Password{" "}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Enter your email for a reset link
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

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={{ marginTop: "1rem", backgroundColor: "#7539FF" }}
                >
                  Send Reset Password Link{" "}
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

export default reset;
