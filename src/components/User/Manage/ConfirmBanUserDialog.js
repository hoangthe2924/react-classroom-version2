import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function ConfirmBanUserDialog({
  user,
  open,
  handleClose,
  onConfirm,
}) {
  const isBanned = !user?.status;
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm {isBanned ? "unban" : "ban"} user</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to {isBanned ? "unban" : "ban"} user{" "}
            <b> {user?.username}</b> ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onConfirm} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
