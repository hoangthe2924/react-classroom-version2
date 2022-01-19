import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Navigate, NavLink, useParams } from "react-router-dom";
import * as actions from "store/actions/index";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "services/user.service";
import { Alert } from "@mui/material";
// import KeyIcon from '@mui/icons-material/Key';
import VpnKeyIcon from '@mui/icons-material/VpnKey';

function ResetPassword() {
  const [success, setSuccess] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const params = useParams();
  const token = params.token || "";
  const userId = params.userId || null;

  const loginStatus = useSelector((state) => state.loginStatus);
  const dispatch = useDispatch();
  const checkLoginStatus = () => {
    dispatch(actions.checkIsLoggedIn());
  };

  useEffect(() => {
    checkLoginStatus();
  }, [loginStatus]);

  const theme = createTheme();

  const formik = useFormik({
    initialValues: {
      password: "",
      re_password: "",
    },

    onSubmit: async (values) => {
      setHasError(false);
      if (values.password.length < 6) {
        setHasError(true);
        setErrorText("Password must be at least 6 characters");
        return;
      }
      if (values.password !== values.re_password) {
        setHasError(true);
        setErrorText("Passwords do not match!");
        return;
      }
      await resetPassword(userId, token, values)
        .then((requestStatus) => {
          if (requestStatus) {
            setSuccess(true);
          }
        })
        .catch((err) => {
          setHasError(true);
          console.log("err", err);
          setErrorText(err.response.data);
        });
    },
  });

  if (loginStatus === true) {
    let navigateLink = localStorage.getItem("prev-link");
    if (!navigateLink) {
      navigateLink = "/dashboard";
    }
    //localStorage.removeItem('prev-link'); //if we remove this line, it works
    //console.log(navigateLink); //question

    return <Navigate to={navigateLink} />;
  }

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />

          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <VpnKeyIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Reset Password
            </Typography>
            {!success ? (
              <Box
                component="form"
                onSubmit={formik.handleSubmit}
                sx={{ mt: 2 }}
              >
                <div>Enter a new password below.</div>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  label="New password"
                  name="password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="re_password"
                  label="Re-enter new password"
                  name="re_password"
                  type="password"
                  value={formik.values.re_password}
                  onChange={formik.handleChange}
                />
                {hasError && (
                  <Alert severity="error">
                    {errorText || "Something wrong. Please try again later!"}
                  </Alert>
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Change password
                </Button>

                <Grid sx={{ mt: 2, mb: 2 }} container justifyContent="center">
                  <NavLink to="/login">Remember your password ?</NavLink>
                </Grid>
              </Box>
            ) : (
              <Box sx={{ mt: 2 }}>
                <Alert severity="success">
                  Your password has been reset successfully.
                </Alert>
                <Grid sx={{ mt: 2, mb: 2 }} container justifyContent="center">
                  <NavLink to="/login">Remember your password ?</NavLink>
                </Grid>
              </Box>
            )}
          </Box>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}
export default ResetPassword;
