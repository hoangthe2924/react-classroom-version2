import "./App.css";
import Dashboard from "./pages/Dashboard";
import * as React from "react";

import { Routes, Route } from "react-router-dom";
import ClassList from "pages/ClassList";
import Login from "pages/Login";
import Register from "pages/Register";
import Profile from "./pages/Profile";
import ClassDetail from "pages/ClassDetail";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MyAppBar from "components/MyAppBar";
import ProtectedRoute from "components/Routes/ProtectedRoute";
import { SocketContext, socket } from "context/socket";
import ManageAdmins from "pages/ManageAdmins";
import ManageUsers from "pages/ManageUsers";
import ManageClasses from "pages/ManageClasses";
import ManageUserDetail from "pages/ManageUserDetail";
import Confirmation from "pages/Confirmation"
import ForgotPassword from "components/User/ResetPassword/ForgotPassword";
import ResetPassword from "components/User/ResetPassword/ResetPassword";
const mdTheme = createTheme();

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Class-rum
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function App() {
  const [title, setTitle] = React.useState("");

  const changeTitle = (newTitle) => {
    setTitle(newTitle);
  };

  return (
    <div>
      <SocketContext.Provider value={socket}>
        <ThemeProvider theme={mdTheme}>
          <MyAppBar title={title}>
            <Routes>
              <Route
                path={"classes"}
                element={
                  <ProtectedRoute>
                    <ClassList />
                  </ProtectedRoute>
                }
              />
              <Route path={"login"} element={<Login />} />
              <Route path={"register"} element={<Register />} />
              <Route path={"forgot-password"} element={<ForgotPassword />} />
              <Route path={"password-reset/:userId/:token"} element={<ResetPassword />} />
              <Route
                path={"profile"}
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
              path="/confirm/:token"
              element={
                  <Confirmation />
              }
            />
              <Route
                path="/classes/:id"
                element={
                  <ProtectedRoute>
                    <ClassDetail changeTitle={changeTitle} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/manage/admins"
                element={
                  <ProtectedRoute adminRoute={true}>
                    <ManageAdmins />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/manage/users"
                element={
                  <ProtectedRoute adminRoute={true}>
                    <ManageUsers />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/manage/users/:id"
                element={
                  <ProtectedRoute adminRoute={true}>
                    <ManageUserDetail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/manage/classes"
                element={
                  <ProtectedRoute adminRoute={true}>
                    <ManageClasses />
                  </ProtectedRoute>
                }
              />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
            <Copyright sx={{ pt: 4 }} />
          </MyAppBar>
        </ThemeProvider>
      </SocketContext.Provider>
    </div>
  );
}

export default App;
