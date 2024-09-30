import React from "react";

import { Card, CardContent, Typography } from "@mui/material";

import "./about.scss";

const About = ({ user }) => {
  console.log("User:", user);
  console.log("About User:", user?.aboutUser);
  return (
    <Card className="aboutCard">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          About Me
        </Typography>
        <Typography className="aboutText" variant="body2">
          {user?.aboutUser || "No information provided."}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default About;
