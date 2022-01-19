import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Avatar, Button, ListItem, ListItemIcon } from "@mui/material";
import { MainListItems } from "components/Dashboard/ListItems";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useContext } from "react";
import * as actions from "store/actions/index.js";
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import { NavLink } from "react-router-dom";
import Notification from "./Notification";
import { SocketContext } from "context/socket";
import { stringAvatar } from "services/stringAvatar";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

function MyAppBar(props) {
  const loginStatus = useSelector((state) => state.loginStatus);
  const classList = useSelector((state) => state.classList);
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  const socket = useContext(SocketContext);

  const checkLoginStatus = () => {
    dispatch(actions.checkIsLoggedIn());
  };

  const logOut = () => {
    dispatch(actions.logout());
    socket.emit("logout");
    window.location.reload();
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1, userSelect: "none" }}
          >
            {props.title}
          </Typography>
          {loginStatus === true ? (
            <div>
              <Notification />
              <IconButton sx={{ mr: 2 }}>
                <NavLink
                  to="/profile"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <Avatar {...stringAvatar(currentUser.username)} />
                </NavLink>
              </IconButton>
              <IconButton
                color="inherit"
                component={NavLink}
                to="/dashboard"
                onClick={() => logOut()}
              >
                <LogoutIcon />
              </IconButton>
            </div>
          ) : (
            <IconButton color="inherit" component={NavLink} to="/login">
              <LoginIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar disableGutters>
          <ListItem button onClick={toggleDrawer}>
            <ListItemIcon>
              <ChevronLeftIcon />
            </ListItemIcon>
          </ListItem>
        </Toolbar>
        <Divider />
        <MainListItems
          open={open}
          classList={classList}
          isAdmin={currentUser.isAdmin}
        />
        <Divider />
        {/* <List>{secondaryListItems}</List> */}
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container>{props.children}</Container>
      </Box>
    </Box>
  );
}

export default MyAppBar;
