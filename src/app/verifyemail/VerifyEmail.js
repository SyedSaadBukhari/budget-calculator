"use client";

import React, { useEffect, useState } from "react";

import axios from "axios";
import { Button, Typography, CircularProgress, Box } from "@mui/material";
import { useRouter } from "next/navigation";

const VerifyPage = () => {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const verifyUserEmail = async () => {
    setLoading(true);
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      setLoading(false);
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (err) {
      setError(true);
      setLoading(false);
      if (axios.isAxiosError(err) && err.response) {
        console.log(err.response.data);
      } else {
        console.error(err);
      }
    }
  };

  useEffect(() => {
    const urlToken = new URLSearchParams(window.location.search).get("token");
    if (urlToken) {
      setToken(urlToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      verifyUserEmail();
    }
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      textAlign="center"
    >
      {loading ? (
        <CircularProgress />
      ) : verified ? (
        <Typography variant="h4" color="primary">
          Your email has been verified successfully! Redirecting to login...
        </Typography>
      ) : error ? (
        <Typography variant="h5" color="error">
          There was an error verifying your email.
        </Typography>
      ) : (
        <div>
          <Typography variant="h6">
            Click the button below to verify your email.
          </Typography>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            onClick={verifyUserEmail}
          >
            Verify Email
          </Button>
        </div>
      )}
    </Box>
  );
};

export default VerifyPage;
