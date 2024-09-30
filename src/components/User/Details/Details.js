import React from "react";

import { Card, CardContent, Typography, Grid } from "@mui/material";

import "./details.scss";

const Details = ({ user }) => {
  if (!user) return null;
  console.log(user);

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
            <Typography variant="body1">{`${user.firstName} ${user.lastName}`}</Typography>

            <Typography variant="subtitle2" className="detailItem">
              Gender
            </Typography>
            <Typography variant="body1">{user.gender}</Typography>

            <Typography variant="subtitle2" className="detailItem">
              Email
            </Typography>
            <Typography variant="body1">{user.email}</Typography>

            <Typography variant="subtitle2" className="detailItem">
              Education
            </Typography>
            <Typography variant="body1">{user.education}</Typography>

            <Typography variant="subtitle2" className="detailItem">
              Address
            </Typography>
            <Typography variant="body1">{user.completeAddress}</Typography>
          </Grid>

          <Grid item xs={6}>
            <Typography variant="subtitle2">Father Name</Typography>
            <Typography variant="body1">{user.fatherName}</Typography>

            <Typography variant="subtitle2" className="detailItem">
              Phone
            </Typography>
            <Typography variant="body1">{user.phoneNumber}</Typography>

            <Typography variant="subtitle2" className="detailItem">
              Zip Code
            </Typography>
            <Typography variant="body1">{user.zipCode}</Typography>

            <Typography variant="subtitle2" className="detailItem">
              Date of Birth
            </Typography>
            <Typography variant="body1">{user.dateOfBirth}</Typography>

            <Typography variant="subtitle2" className="detailItem">
              Budget Limit
            </Typography>
            <Typography variant="body1">{user.budgetLimit}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Details;
