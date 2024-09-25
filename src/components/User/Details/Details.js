import React from "react";

import { Card, CardContent, Typography, Grid } from "@mui/material";

import "./details.scss";

const Details = () => {
  return (
    <Card className="detailsCard">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Personal Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="subtitle2" className="personalDetailsTitle">
              Full Name
            </Typography>
            <Typography variant="body1">Michel Johnson</Typography>

            <Typography variant="subtitle2" className="detailItem">
              Gender
            </Typography>
            <Typography variant="body1">Male</Typography>

            <Typography variant="subtitle2" className="detailItem">
              Email
            </Typography>
            <Typography variant="body1">tim.jennings@example.com</Typography>

            <Typography variant="subtitle2" className="detailItem">
              Education
            </Typography>
            <Typography variant="body1">Master</Typography>

            <Typography variant="subtitle2" className="detailItem">
              Address
            </Typography>
            <Typography variant="body1">
              4140 parker Rd. Allentown, New Mexico 31134
            </Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="subtitle2">Father Name</Typography>
            <Typography variant="body1">Michel Johnson</Typography>

            <Typography variant="subtitle2" className="detailItem">
              Phone
            </Typography>
            <Typography variant="body1">(684) 555-0102</Typography>

            <Typography variant="subtitle2" className="detailItem">
              Zip Code
            </Typography>
            <Typography variant="body1">123455</Typography>

            <Typography variant="subtitle2" className="detailItem">
              Date of Birth
            </Typography>
            <Typography variant="body1">26 Oct 2019</Typography>

            <Typography variant="subtitle2" className="detailItem">
              Budget Limit
            </Typography>
            <Typography variant="body1">30000 PKR</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Details;
