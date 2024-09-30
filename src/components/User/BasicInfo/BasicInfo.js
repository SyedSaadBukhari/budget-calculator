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

const BasicInfo = ({ user }) => {
  return (
    <Card>
      <CardContent>
        <section className="info-header">
          <Avatar
            alt={user?.firstName || "User"}
            src={user?.profilePicture || "https://via.placeholder.com/150"}
            className="avatar"
          />
          <Typography variant="h6" className="profile-title">
            {user ? `${user.firstName} ${user.lastName}` : "Loading..."}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            className="profile-subtitle"
          >
            {user?.jobTitle || "Job Title"}
          </Typography>
        </section>

        <List className="info-list">
          <ListItem>
            <ListItemIcon>
              <PhoneIcon />
            </ListItemIcon>
            <ListItemText primary={user?.phoneNumber || "Phone Number"} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <EmailIcon />
            </ListItemIcon>
            <ListItemText primary={user?.email || "Email"} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <LocationOnIcon />
            </ListItemIcon>
            <ListItemText primary={user?.completeAddress || "Address"} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <LanguageIcon />
            </ListItemIcon>
            <ListItemText primary={user?.website || "Website"} />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
};

export default BasicInfo;
