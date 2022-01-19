import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Navigate, NavLink } from "react-router-dom";
import * as actions from "store/actions/index";
import { useDispatch, useSelector } from "react-redux";
import { requestResetPassword } from "services/user.service";
import { Alert } from "@mui/material";

function ForgotPassword() {
  const [mailSent, setMailSent] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorText, setErrorText] = useState("");
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
      email: "",
    },
    onSubmit: async (values) => {
      setHasError(false);
      await requestResetPassword(values)
        .then((requestStatus) => {
          if (requestStatus) {
            setMailSent(true);
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
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Forgot Password
            </Typography>
            {!mailSent ? (
              <Box
                component="form"
                onSubmit={formik.handleSubmit}
                sx={{ mt: 2 }}
              >
                <div>
                  Lost your password? Please enter your email address. You will
                  receive a link to create a new password via email.
                </div>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Enter your email"
                  name="email"
                  type="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  autoFocus
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
                  Reset password
                </Button>

                <Grid sx={{ mt: 2, mb: 2 }} container justifyContent="center">
                  <NavLink to="/login">Remember your password ?</NavLink>
                </Grid>
              </Box>
            ) : (
              <Box sx={{ mt: 2 }}>
                <Alert severity="success">
                  Password reset email has been sent.
                </Alert>
                <p>
                  Please check your mail also spam folder and follow the
                  instructions to reset your password.
                </p>
              </Box>
            )}
          </Box>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}
export default ForgotPassword;
