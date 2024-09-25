import React from "react";

import { Card, CardContent, Typography } from "@mui/material";

import "./about.scss";

const About = () => {
  return (
    <Card className="aboutCard">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          About Me
        </Typography>
        <Typography className="aboutText" variant="body2">
          Passionate UI/UX designer with over 5 years of experience in creating
          user-friendly and visually appealing digital experiences. Skilled in
          wireframing, prototyping, and user research to deliver intuitive
          designs. Committed to enhancing user satisfaction through innovative
          and effective design solutions.
        </Typography>
      </CardContent>
    </Card>
  );
};

export default About;
