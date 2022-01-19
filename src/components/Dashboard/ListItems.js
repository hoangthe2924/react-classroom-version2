import * as React from "react";
import Box from "@mui/material/List";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import PersonIcon from "@mui/icons-material/Person";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import ApartmentIcon from "@mui/icons-material/Apartment";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import Divider from "@mui/material/Divider";
import { NavLink } from "react-router-dom";
import { grey } from '@mui/material/colors';

export const MainListItems = ({ open, classList, isAdmin }) => {
  const teachingClasses = classList.filter(
    (item) => item.user_class?.role === "teacher"
  );
  const studyingClasses = classList.filter(
    (item) => item.user_class?.role === "student"
  );
  const teachingClassItems = teachingClasses.map((item) => {
    return (
      <ListItem
        key={item.id}
        component={NavLink}
        to={`/classes/${item.id}`}
        button
      >
        <ListItemIcon style={{ minWidth: "40px" }}>
          <SchoolIcon sx={{ color: grey[900] }}/>
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{ fontSize: "14px" }}
          primary={item.classname}
        />
      </ListItem>
    );
  });

  const studyingClassItems = studyingClasses.map((item) => {
    return (
      <ListItem
        key={item.id}
        component={NavLink}
        to={`/classes/${item.id}`}
        button
      >
        <ListItemIcon style={{ minWidth: "40px" }}>
          <SchoolIcon sx={{ color: grey[900] }}/>
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{ fontSize: "14px" }}
          primary={item.classname}
        />
      </ListItem>
    );
  });

  const classItems = (
    <Box>
      <Divider />
      <List>
        <ListSubheader>Teaching</ListSubheader>
        {teachingClassItems}
      </List>
      <Divider />
      <List>
        <ListSubheader>Studying</ListSubheader>
        {studyingClassItems}
      </List>
    </Box>
  );

  return (
    <React.Fragment>
      <List>
        <ListItem component={NavLink} to="/dashboard" button>
          <ListItemIcon>
            <DashboardIcon sx={{ color: grey[900] }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        {!open && (
          <ListItem component={NavLink} to="/classes" button>
            <ListItemIcon>
              <SchoolIcon sx={{ color: grey[900] }}/>
            </ListItemIcon>
            <ListItemText primary="Classes" />
          </ListItem>
        )}
      </List>
      {open && classItems}
      {isAdmin && (
        <List>
          <Divider />
          <ListItem component={NavLink} to="/manage/admins" button>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Manage Admins" />
          </ListItem>
          <ListItem component={NavLink} to="/manage/users" button>
            <ListItemIcon>
              <SupervisorAccountIcon />
            </ListItemIcon>
            <ListItemText primary="Manage Users" />
          </ListItem>
          <ListItem component={NavLink} to="/manage/classes" button>
            <ListItemIcon>
              <ApartmentIcon />
            </ListItemIcon>
            <ListItemText primary="Manage Classes" />
          </ListItem>
        </List>
      )}
    </React.Fragment>
  );
};

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Account</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Account Info" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LoginIcon />
      </ListItemIcon>
      <ListItemText primary="Login" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LogoutIcon />
      </ListItemIcon>
      <ListItemText primary="Logout" />
    </ListItem>
  </div>
);
