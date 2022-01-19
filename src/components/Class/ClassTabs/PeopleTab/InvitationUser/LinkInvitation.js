import { Box, Grid, TextField, IconButton, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Fragment, useState, forwardRef } from "react";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const LinkInvitation = ({ cjc }) => {
  const LINK_INVITE =
    window.location.protocol +
    "//" +
    window.location.host +
    window.location.pathname +
    `?cjc=${cjc}`;

  const [openCopyBar, setOpenCopyBar] = useState(false);

  const closeCopyBarHandler = () => {
    setOpenCopyBar(false);
  };

  const copyToClipBoardHandler = () => {
    navigator.clipboard.writeText(LINK_INVITE);
    setOpenCopyBar(true);
  };

  return (
    <Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          width: "100%",
          mb: 0,
        }}
      >
        <Grid item xs={11}>
          <TextField
            autoFocus
            size="small"
            margin="dense"
            id="invite_link"
            label="Invite link"
            color="primary"
            fullWidth
            variant="standard"
            value={LINK_INVITE}
          />
        </Grid>
        <Grid item xs={1} mb={1}>
          <IconButton
            size="small"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            onClick={copyToClipBoardHandler}
          >
            <ContentCopyIcon />
          </IconButton>
        </Grid>
      </Box>

      <Snackbar
        open={openCopyBar}
        autoHideDuration={2000}
        onClose={closeCopyBarHandler}
      >
        <Alert
          onClose={closeCopyBarHandler}
          severity="success"
          sx={{ width: "100%" }}
        >
          Copied to clipboard!
        </Alert>
      </Snackbar>
    </Fragment>
  );
};

export default LinkInvitation;
