import React, { useState, useRef, Fragment } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import DialogContentText from "@mui/material/DialogContentText";
import Divider from "@mui/material/Divider";
import UserEmailList from "./UserEmailList";
import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import LinkInvitation from "./LinkInvitation";
import { invitePeople } from "services/class.service";

function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const InvitationDialog = ({ role, cjc }) => {
  const [openInvitationDialog, setOpenInvitationDialog] = useState(false);
  const [message, setMessage] = useState("");
  const [openSuccessSBar, setOpenSuccessSBar] = useState(false);
  const [openErrorSBar, setOpenErrorSBar] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [listEmail, setListEmail] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  let emailInput = useRef("");

  const addEmailHandler = (event) => {
    const newEmail = event.target.value;

    const updatedEmailList = [...listEmail].concat(newEmail);
    if (
      validateEmail(newEmail) &&
      listEmail.findIndex((email) => email === newEmail) < 0
    ) {
      setListEmail(updatedEmailList);
      emailInput.current.value = "";
    } else {
      setHasError(true);
    }
  };

  const closeDialogHandler = () => {
    setOpenInvitationDialog(false);
  };

  const openDialogHandler = () => {
    setOpenInvitationDialog(true);
  };

  const closeSuccessBarHandler = () => {
    setOpenSuccessSBar(false);
  };

  const closeErrorBarHandler = () => {
    setOpenErrorSBar(false);
  };

  const inviteHandler = async () => {
    await invitePeople(listEmail, id, role).then((res) => {
        switch (res.status) {
          case 401:
            localStorage.removeItem("access_token");
            navigate("/login");
            break;
          case 201:
            emailInput.current.value = "";
            setOpenInvitationDialog(false);
            setOpenSuccessSBar(true);
            setListEmail([]);
            break;
          default:
            setOpenErrorSBar(true);
        }
      })
      .catch((error) => {
        let err_msg = "Something went wrong!";
        if(error.response.data.message && error.response.data.message.length!==0){
          err_msg = error.response.data.message;
        }
        setMessage(err_msg);
        setOpenErrorSBar(true);
      });

    //call api
  };

  return (
    <Fragment>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        color="inherit"
        onClick={openDialogHandler}
      >
        <PersonAddIcon />
      </IconButton>
      <Dialog
        maxWidth="xs"
        fullWidth
        open={openInvitationDialog}
        onClose={closeDialogHandler}
      >
        <DialogTitle>Invite {role}</DialogTitle>
        <DialogContent dividers>
          {role === "teacher" && (
            <DialogContentText fontSize="12px">
              Enter emails to invite teachers
            </DialogContentText>
          )}
          {role === "student" && (
            <Fragment>
              <DialogContentText fontSize="12px">
                Enter emails to invite students or copy this link
              </DialogContentText>
              <LinkInvitation cjc={cjc} />
            </Fragment>
          )}

          <TextField
            autoFocus
            margin="dense"
            inputRef={emailInput}
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            error={hasError ? true : false}
            helperText={hasError ? "Invalid email or duplicate email!" : ""}
            onChange={hasError ? () => setHasError(false) : () => {}}
            onKeyPress={(event) => {
              if (event.keyCode === "13" || event.key === "Enter")
                addEmailHandler(event);
            }}
          />
          <Divider />
          <UserEmailList emailList={listEmail} setEmailList={setListEmail} />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialogHandler}>Close</Button>
          <Button onClick={inviteHandler}>Invite</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSuccessSBar}
        autoHideDuration={4000}
        onClose={closeSuccessBarHandler}
      >
        <Alert
          onClose={closeSuccessBarHandler}
          severity="success"
          sx={{ width: "100%" }}
        >
          Invitation has just been sent!
        </Alert>
      </Snackbar>

      <Snackbar
        open={openErrorSBar}
        autoHideDuration={4000}
        onClose={closeErrorBarHandler}
      >
        <Alert
          onClose={closeErrorBarHandler}
          severity="error"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Fragment>
  );
};

export default InvitationDialog;
