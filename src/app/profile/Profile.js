import React, { useState } from "react";

import { Box, Typography, Tabs, Tab, Grid } from "@mui/material";
import BasicInfo from "../../components/User/BasicInfo/BasicInfo";
import About from "../../components/User/About/About";
import Details from "../../components/User/Details/Details";
import AccountForm from "../../components/User/AccountForm/AccountForm";
import TopBar from "../../components/TopBar/topBar";
import KeyboardBackspace from "@mui/icons-material/KeyboardBackspace";
import Link from "next/link";

const Profile = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      <TopBar />
      <Box p={3} bgcolor="#f4f4f9" minHeight="100vh">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4">
            {" "}
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
              <BasicInfo />
            </Grid>
            <Grid item xs={12} md={8}>
              <About />
              <Details />
            </Grid>
          </Grid>
        )}

        {selectedTab === 1 && (
          <Box mt={2}>
            <Grid container spacing={3} mt={2}>
              <Grid item xs={12} md={4}>
                <BasicInfo />
              </Grid>
              <Grid item xs={12} md={8}>
                <AccountForm />
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </>
  );
};

export default Profile;
