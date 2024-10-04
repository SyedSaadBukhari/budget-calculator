import React, { useState } from "react";
import {
  Card,
  CardContent,
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Input,
  Divider,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LanguageIcon from "@mui/icons-material/Language";
import EditIcon from "@mui/icons-material/Edit";

import "./basic-info.scss";

const BasicInfo = ({ user, onUpdateProfilePicture }) => {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        onUpdateProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card>
      <CardContent>
        <section className="info-header">
          <div className="avatar-container">
            <Avatar
              alt={user?.firstName || "User"}
              src={
                imagePreview ||
                user?.profilePicture ||
                "https://via.placeholder.com/150"
              }
              className="avatar"
            />
            <div className="edit-overlay">
              <Input
                accept="image/*"
                id="icon-button-file"
                type="file"
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />
              <label htmlFor="icon-button-file" className="edit-label">
                <EditIcon /> Edit/Update
              </label>
            </div>
          </div>
          <Typography variant="h6" className="profile-title">
            {user ? `${user.firstName} ${user.lastName}` : "Loading..."}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            className="profile-subtitle"
          >
            {user?.jobTitle || "Project Manager"}
          </Typography>
        </section>

        <Divider />

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
