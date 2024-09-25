"use client";

import React, { useEffect, useState } from "react";

import axios from "axios";
import {
  Button,
  Typography,
  CircularProgress,
  Box,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";

const NewPassword = () => {
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const resetPassword = async () => {
    setLoading(true);
    try {
      await axios.post("/api/users/newPassword", {
        token,
        newPassword,
        confirmPassword,
      });
      setSuccess(true);
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
      ) : success ? (
        <Typography variant="h4" color="primary">
          Your password has been reset successfully! Redirecting to login...
        </Typography>
      ) : error ? (
        <Typography variant="h5" color="error">
          There was an error resetting your password. Please try again.
        </Typography>
      ) : (
        <Box>
          <Typography variant="h6">Enter your new password</Typography>
          <TextField
            label="New Password"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            label="Confirm Password"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            onClick={resetPassword}
          >
            Reset Password
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default NewPassword;
