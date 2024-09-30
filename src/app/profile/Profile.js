import React, { useEffect, useState } from "react";

import { Box, Typography, Tabs, Tab, Grid } from "@mui/material";
import BasicInfo from "../../components/User/BasicInfo/BasicInfo";
import About from "../../components/User/About/About";
import Details from "../../components/User/Details/Details";
import AccountForm from "../../components/User/AccountForm/AccountForm";
import TopBar from "../../components/TopBar/topBar";
import KeyboardBackspace from "@mui/icons-material/KeyboardBackspace";
import Link from "next/link";
import axios from "axios";

const Profile = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/users/getUser", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUser(response.data.user);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <>
      <TopBar />
      <Box p={3} bgcolor="#f4f4f9" minHeight="100vh">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4">
            <Link href="/expenseDashboard" underline="hover" className="link">
              <KeyboardBackspace />
            </Link>
            Profile
          </Typography>

          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            aria-label="profile tabs"
          >
            <Tab label="Profile" />
            <Tab label="My Account" />
          </Tabs>
        </Box>

        {selectedTab === 0 && (
          <Grid container spacing={3} mt={2}>
            <Grid item xs={12} md={4}>
              <BasicInfo user={user} />
            </Grid>
            <Grid item xs={12} md={8}>
              <About user={user} />
              <Details user={user} />
            </Grid>
          </Grid>
        )}

        {selectedTab === 1 && (
          <Box mt={2}>
            <Grid container spacing={3} mt={2}>
              <Grid item xs={12} md={4}>
                <BasicInfo user={user} />
              </Grid>
              <Grid item xs={12} md={8}>
                <AccountForm user={user} />
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Profile;
