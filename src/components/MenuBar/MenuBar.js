import React, { useState } from "react";

import { useRouter } from "next/navigation";
import NotificationsNone from "@mui/icons-material/NotificationsNone";
import { Avatar, Menu, MenuItem, IconButton } from "@mui/material";
import Logout from "../Logout/Logout";

import "./menu-bar.scss";

const MenuDropdown = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const open = Boolean(anchorEl);
  const router = useRouter();

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
        <Avatar alt="User Avatar" src="" className="top-bar-avatar" />
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
        <MenuItem onClick={handleProfileClick}>Profile</MenuItem>{" "}
        <MenuItem onClick={handleDashboardClick}>Dashboard</MenuItem>{" "}
        <MenuItem onClick={handleLogout}>Logout</MenuItem>{" "}
      </Menu>
      {isLoggingOut && <Logout />}
    </section>
  );
};

export default MenuDropdown;
