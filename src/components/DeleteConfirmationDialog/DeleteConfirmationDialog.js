import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Box,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./delete-confirmation-dialog.scss";

const DeleteConfirmationDialog = ({ open, onClose, onConfirm, item, type }) => {
  const handleConfirm = () => {
    onConfirm(item.id || item._id);
    onClose();
  };

  const renderContent = () => {
    if (type === "user") {
      return (
        <Box className="info-grid">
          <Box>
            <Typography className="label">First Name</Typography>
            <Typography>{item?.firstName || ""}</Typography>
          </Box>
          <Box>
            <Typography className="label">Last Name</Typography>
            <Typography>{item?.lastName || ""}</Typography>
          </Box>
          <Box>
            <Typography className="label">Email</Typography>
            <Typography>{item?.email || ""}</Typography>
          </Box>
          <Box>
            <Typography className="label">Phone Number</Typography>
            <Typography>{item?.number || ""}</Typography>
          </Box>
          <Box>
            <Typography className="label">Role</Typography>
            <Typography>{item?.role || ""}</Typography>
          </Box>
        </Box>
      );
    } else if (type === "expense") {
      return (
        <Box className="info-grid">
          <Box>
            <Typography className="label">Expense Title</Typography>
            <Typography>{item?.title || ""}</Typography>
          </Box>
          <Box>
            <Typography className="label">Amount</Typography>
            <Typography>{item?.amount || ""}</Typography>
          </Box>
          <Box>
            <Typography className="label">Date</Typography>
            <Typography>{new Date(item?.date).toLocaleDateString()}</Typography>
          </Box>
        </Box>
      );
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">
            Delete {type === "user" ? "User" : "Expense"}
          </Typography>
          <CloseIcon onClick={onClose} style={{ cursor: "pointer" }} />
        </Box>
      </DialogTitle>
      <DialogContent>{renderContent()}</DialogContent>
      <DialogActions className="actions">
        <Button onClick={onClose} color="primary" variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
