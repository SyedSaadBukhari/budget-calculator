import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NotificationsNone from "@mui/icons-material/NotificationsNone";
import {
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Typography,
  Divider,
} from "@mui/material";
import Logout from "../Logout/Logout";
import axios from "axios";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import DashboardCustomizeOutlinedIcon from "@mui/icons-material/DashboardCustomizeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import "./menu-bar.scss";

const MenuDropdown = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [user, setUser] = useState(null);
  const open = Boolean(anchorEl);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/api/users/getUser", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    handleMenuClose();
    router.push("/profile");
  };

  const handleDashboardClick = () => {
    handleMenuClose();
    router.push("/expenseDashboard");
  };

  const handleLogout = () => {
    setIsLoggingOut(true);
    handleMenuClose();
  };

  return (
    <section className="drop-down">
      <NotificationsNone />
      <IconButton onClick={handleMenuOpen}>
        <Avatar
          alt={user?.firstName || "User Avatar"}
          src={user?.profilePicture || ""}
          className="top-bar-avatar"
        >
          {!user?.profilePicture && (user?.firstName?.[0] || "U")}
        </Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Typography variant="subtitle1">
              {user?.firstName} {user?.lastName}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {user?.email}
            </Typography>
          </div>
        </MenuItem>
        <Divider />
        <MenuItem
          style={{
            display: "flex",
            gap: 10,
          }}
          onClick={handleProfileClick}
        >
          {" "}
          <AccountCircleOutlinedIcon />
          Profile
        </MenuItem>
        <MenuItem
          style={{
            display: "flex",
            gap: 10,
          }}
          onClick={handleDashboardClick}
        >
          <DashboardCustomizeOutlinedIcon />
          Dashboard
        </MenuItem>
        <MenuItem
          style={{
            display: "flex",
            gap: 10,
          }}
          onClick={handleLogout}
        >
          {" "}
          <LogoutOutlinedIcon />
          Logout
        </MenuItem>
      </Menu>
      {isLoggingOut && <Logout />}
    </section>
  );
};

export default MenuDropdown;
