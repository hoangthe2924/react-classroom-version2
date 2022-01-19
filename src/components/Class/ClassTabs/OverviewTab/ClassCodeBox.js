import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Fragment, useState, forwardRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Divider } from "@mui/material";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(0.5),
  textAlign: "center",
  borderRadius: "10px",
}));

export default function ClassCodeBox({ cjc }) {
  const [openCopyBar, setOpenCopyBar] = useState(false);

  const handleCloseCopyBar = () => {
    setOpenCopyBar(false);
  };

  const handleOpenCopyBar = () => {
    navigator.clipboard.writeText(cjc);
    setOpenCopyBar(true);
  };

  return (
    <Fragment>
      <Item>
        <Grid container alignItems={"center"}>
          <Grid item>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bolder",
                textAlign: "center",
                px: 1,
              }}
            >
              Invite code
            </Typography>
          </Grid>
          <Grid item sx={{ ml: "auto" }}>
            <IconButton onClick={handleOpenCopyBar}>
              <ContentCopyIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Divider />
        <Box
          sx={{
            paddingTop: 1,
          }}
        >
          <Typography
            variant="body1"
            sx={{
              fontWeight: "bolder",
              fontSize: "1.5rem",
              textAlign: "center",
              color: "blue",
              p: 2,
            }}
          >
            {cjc}
          </Typography>
        </Box>
      </Item>
      <Snackbar
        open={openCopyBar}
        autoHideDuration={2000}
        onClose={handleCloseCopyBar}
      >
        <Alert
          onClose={handleCloseCopyBar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Copied to clipboard!
        </Alert>
      </Snackbar>
    </Fragment>
  );
}
