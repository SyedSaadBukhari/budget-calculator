import React from "react";

import {
  Card,
  CardContent,
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LanguageIcon from "@mui/icons-material/Language";

import "./basic-info.scss";

const BasicInfo = () => {
  return (
    <Card>
      <CardContent>
        <section className="info-header">
          <Avatar
            alt="Cameron Williamson"
            src="https://via.placeholder.com/150"
            className="avatar"
          />
          <Typography variant="h6" className="profile-title">
            Cameron Williamson
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            className="profile-subtitle"
          >
            Project Manager
          </Typography>
        </section>

        <List className="info-list">
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
  );
};

export default BasicInfo;
