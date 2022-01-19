import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useFormik } from "formik";
import React, { useState } from "react";
import { addClass } from "services/class.service";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AddClassForm({ open, handleClose, onSuccess }) {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarContent, setSnackbarContent] = useState({
    type: "error",
    content: "",
  });

  const formik = useFormik({
    initialValues: {
      className: "",
      subject: "",
      description: "",
    },
    onSubmit: async (values) => {
      await addClass(values)
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            handleClose();
            setShowSnackbar(true);
            setSnackbarContent({
              type: "success",
              content: "Added class successfully",
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
  });
  return (
    <div>
      <Dialog open={open} onClose={handleClose(formik)}>
        <DialogTitle>Create New Class</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent dividers>
            <TextField
              autoFocus
              required
              margin="dense"
              id="className"
              name="className"
              label="Class Name"
              type="text"
              value={formik.values.className}
              onChange={formik.handleChange}
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              id="subject"
              name="subject"
              label="Subject"
              type="text"
              value={formik.values.subject}
              onChange={formik.handleChange}
              fullWidth
              variant="standard"
            />
            <TextField
              required
              margin="dense"
              id="description"
              name="description"
              label="Description"
              type="text"
              value={formik.values.description}
              onChange={formik.handleChange}
              fullWidth
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose(formik)}>Cancel</Button>
            <Button
              type="submit"
              disabled={!formik.isValid || formik.isSubmitting}
            >
              Save
            </Button>
          </DialogActions>
        </form>
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
