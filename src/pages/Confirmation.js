import { useEffect, useState } from "react";
import http from "axios-config";
import { NavLink, useParams } from "react-router-dom";
import { Alert, Grid } from "@mui/material";
import { Box } from "@mui/system";

function Confirmation(props) {
  const [success, setSuccess] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [resultText, setResultText] = useState("");
  const params = useParams();
  async function confirmRegistration() {
    http
      .get("users/confirm/" + params.token)
      .then((requestStatus) => {
        if (requestStatus) {
          setSuccess(true);
          setResultText(
            requestStatus.data.message || "Account activated successfully!"
          );
        }
      })
      .catch((err) => {
        setHasError(true);
        console.log("err", err);
        setResultText(err.response.data.message || "Link invalid");
      });
  }
  useEffect(() => {
    confirmRegistration();
  }, []);
  return (
    <Box sx={{ mt: 2 }}>
      {hasError && (
        <Alert severity="error">
          {resultText || "Something wrong. Please try again later!"}
        </Alert>
      )}
      {success && (
        <div>
          <Alert severity="success">{resultText}</Alert>
          <Grid sx={{ mt: 2, mb: 2 }} container justifyContent="center">
            <NavLink to="/login">Click here to login</NavLink>
          </Grid>
        </div>
      )}
    </Box>
  );
}

export default Confirmation;
