import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import GoogleLoginButton from "./GoogleLogin";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import * as actions from "store/actions/index";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllClasses } from "services/class.service";
import { Alert } from "@mui/material";

function LoginForm(props) {
  //const { loginStatus } = props;
  const loginStatus = useSelector((state) => state.loginStatus);
  const [hasError, setHasError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const checkLoginStatus = () => {
    dispatch(actions.checkIsLoggedIn());
  };

  useEffect(() => {
    checkLoginStatus();
  }, [loginStatus]);

  const theme = createTheme();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      setHasError(false);
      const tryLogin = dispatch(actions.login(values));
      tryLogin.then((loginStatus) => {
        // console.log("log", loginStatus);
        switch (loginStatus) {
          case 1:
            // checkLoginStatus();
            let navigateLink = localStorage.getItem("prev-link");
            if (!navigateLink) {
              navigateLink = "/dashboard";
            }
            const fetchClass = fetchAllClasses()
              .then((result) => {
                dispatch({ type: "FETCH", payload: result.data });
                return result.data;
              })
              .catch((error) => {
                console.log("err: ", error);
              });
            // console.log("fet", fetchClass);
            navigate(navigateLink);
            // window.location.reload();
            break;
          case -1:
            setHasError(true);
            setErrorText("Your account has been banned!");
            break;
          case 2:
            setHasError(true);
            setErrorText(
              "Your account has not been activated! Please check you email to activate it."
            );
            break;
          default:
            setHasError(true);
            setErrorText("incorrect username or password!");
        }
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
              Sign in
            </Typography>
            <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                value={formik.values.subject}
                onChange={formik.handleChange}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formik.values.subject}
                onChange={formik.handleChange}
              />
              <Grid container spacing={2}>
                <Grid xs={6} item>
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                  />
                </Grid>
                <Grid xs={6} item paddingTop={5}>
                  <div style={{ paddingTop: "9px" }}>
                    <NavLink
                      to="/forgot-password"
                      style={{
                        textDecoration: "none",
                        color: "black",
                        paddingTop: "9px",
                      }}
                    >
                      Forgot your password ?
                    </NavLink>
                  </div>
                </Grid>
              </Grid>

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
                Sign In
              </Button>

              <Grid container justifyContent="center">
                <GoogleLoginButton />
              </Grid>
              <Grid sx={{ mt: 2, mb: 2 }} container justifyContent="center">
                <NavLink to="/register">Don't have an account? Sign Up</NavLink>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default LoginForm;
