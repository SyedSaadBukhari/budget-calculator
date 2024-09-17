"use client";

import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tabs,
  Tab,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LanguageIcon from "@mui/icons-material/Language";
import AccountTab from "../../components/AccountTab/AccountTab";

const ProfilePage = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <>
      <Box p={3} bgcolor="#f4f4f9" minHeight="100vh">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4">Profile</Typography>

          {/* Tabs for Profile and My Account */}
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

        {/* Conditional Rendering Based on Selected Tab */}
        {selectedTab === 0 && (
          <Grid container spacing={3} mt={2}>
            {/* Profile Card */}
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <Avatar
                      alt="Cameron Williamson"
                      src="https://via.placeholder.com/150"
                      sx={{ width: 100, height: 100, mb: 2 }}
                    />
                    <Typography variant="h6">Cameron Williamson</Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                      Project Manager
                    </Typography>
                  </Box>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <PhoneIcon />
                      </ListItemIcon>
                      <ListItemText primary="(684) 555-0102" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <EmailIcon />
                      </ListItemIcon>
                      <ListItemText primary="tim.jennings@example.com" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <LocationOnIcon />
                      </ListItemIcon>
                      <ListItemText primary="New York" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <LanguageIcon />
                      </ListItemIcon>
                      <ListItemText primary="www.websitename.com" />
                    </ListItem>
                  </List>
                </CardContent>
              </Card>
            </Grid>

            {/* About and Personal Details */}
            <Grid item xs={12} md={8}>
              <Card sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    About Me
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Passionate UI/UX designer with over 5 years of experience in
                    creating user-friendly and visually appealing digital
                    experiences. Skilled in wireframing, prototyping, and user
                    research to deliver intuitive designs. Committed to
                    enhancing user satisfaction through innovative and effective
                    design solutions.
                  </Typography>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Personal Details
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Full Name
                      </Typography>
                      <Typography variant="body1">Michel Johnson</Typography>

                      <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        sx={{ mt: 2 }}
                      >
                        Gender
                      </Typography>
                      <Typography variant="body1">Male</Typography>

                      <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        sx={{ mt: 2 }}
                      >
                        Email
                      </Typography>
                      <Typography variant="body1">
                        tim.jennings@example.com
                      </Typography>

                      <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        sx={{ mt: 2 }}
                      >
                        Education
                      </Typography>
                      <Typography variant="body1">Master</Typography>

                      <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        sx={{ mt: 2 }}
                      >
                        Address
                      </Typography>
                      <Typography variant="body1">
                        4140 parker Rd. Allentown, New Mexico 31134
                      </Typography>
                    </Grid>

                    <Grid item xs={6}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Father Name
                      </Typography>
                      <Typography variant="body1">Michel Johnson</Typography>

                      <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        sx={{ mt: 2 }}
                      >
                        Phone
                      </Typography>
                      <Typography variant="body1">(684) 555-0102</Typography>

                      <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        sx={{ mt: 2 }}
                      >
                        Zip Code
                      </Typography>
                      <Typography variant="body1">123455</Typography>

                      <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        sx={{ mt: 2 }}
                      >
                        Date of Birth
                      </Typography>
                      <Typography variant="body1">26 Oct 2019</Typography>

                      <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        sx={{ mt: 2 }}
                      >
                        Budget Limit
                      </Typography>
                      <Typography variant="body1">30000 PKR</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {selectedTab === 1 && (
          <Box mt={2}>
            {/* Content for My Account Tab */}

            <Typography variant="h6">My Account</Typography>
            <Typography variant="body2" color="text.secondary">
              <AccountTab />
            </Typography>
          </Box>
        )}
      </Box>
    </>
  );
};

export default ProfilePage;
