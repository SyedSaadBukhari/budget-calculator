// pages/profile.js
import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Card,
  Avatar,
  TextField,
  Button,
  Grid,
} from "@mui/material";

export default function AccountTab() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* My Account Content */}
      <Card sx={{ p: 3 }}>
        <Typography variant="h6">My Account</Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              defaultValue="Brooklyn"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Name"
              defaultValue="Simmons"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Job Title"
              defaultValue="Simmons"
              variant="outlined"
            />
          </Grid>
          {/* Additional fields for Address, Contact Info, Bio, etc. */}
          <Grid item xs={12}>
            <Button variant="contained" color="primary">
              Update
            </Button>
            <Button variant="outlined" color="secondary" sx={{ ml: 2 }}>
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}
