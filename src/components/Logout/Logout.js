"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";
import axios from "axios";
import { Typography } from "@mui/material";

const Logout = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      setLoading(false);
    }
  };

  React.useEffect(() => {
    handleLogout();
  }, []);

  return (
    <Typography variant="h4">
      {loading ? "Logging out..." : "You have been logged out."}
    </Typography>
  );
};

export default Logout;
