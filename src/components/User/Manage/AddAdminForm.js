import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Snackbar,
  Box,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useFormik } from "formik";
import React, { useState } from "react";
import { addAdmin } from "services/user.service";
import * as Yup from "yup";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AddAdminForm({ open, handleClose, onSuccess }) {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarContent, setSnackbarContent] = useState({
    type: "error",
    content: "",
  });

  const validationSchema = Yup.object().shape({
    fullname: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Fullname is required"),
    username: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Username is required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
  const formik = useFormik({
    initialValues: {},
    onSubmit: async (values) => {
      await addAdmin(values)
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            handleClose();
            setShowSnackbar(true);
            setSnackbarContent({
              type: "success",
              content: "Added admin successfully",
            });
            onSuccess();
          } else {
            setShowSnackbar(true);
            setSnackbarContent({
              type: "error",
              content: "Please try again later",
            });
          }
        })
        .catch((error) => {
          console.log("err: ", error);
        });
      handleClose(formik)();
    },
    validationSchema: validationSchema,
  });

  return (
    <div>
      <Dialog open={open} onClose={handleClose(formik)}>
        <DialogTitle>Add Admin</DialogTitle>
        <Box component="form" noValidate onSubmit={formik.handleSubmit}>
          <DialogContent dividers>
            <TextField
              autoComplete="given-name"
              margin="dense"
              name="fullname"
              required
              fullWidth
              id="fullname"
              value={formik.values.fullname}
              onChange={formik.handleChange}
              label="Full Name"
              autoFocus
            />
            {formik.errors.fullname && formik.touched.fullname && (
              <Alert severity="error">{formik.errors.fullname}</Alert>
            )}
            <TextField
              required
              margin="dense"
              fullWidth
              id="username"
              label="Username"
              name="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              autoComplete="user-name"
            />
            {formik.errors.username && formik.touched.username && (
              <Alert severity="error">{formik.errors.username}</Alert>
            )}
            <TextField
              required
              margin="dense"
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              autoComplete="email"
            />
            {formik.errors.email && formik.touched.email && (
              <Alert severity="error">{formik.errors.email}</Alert>
            )}
            <TextField
              required
              margin="dense"
              fullWidth
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              id="password"
              autoComplete="new-password"
            />
            {formik.errors.password && formik.touched.password && (
              <Alert severity="error">{formik.errors.password}</Alert>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose(formik)}>Cancel</Button>
            <Button
              type="submit"
              variant="contained"
              disabled={formik.isSubmitting}
            >
              Add
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
      >
        <Alert
          onClose={() => setShowSnackbar(false)}
          severity={snackbarContent.type}
          sx={{ width: "100%" }}
        >
          {snackbarContent.content}
        </Alert>
      </Snackbar>
    </div>
  );
}
