import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  TextField,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import MuiAlert from "@mui/material/Alert";
import { useFormik } from "formik";
import React, { useState } from "react";
import { checkClassAvailable } from "services/class.service";
import { useNavigate } from "react-router-dom";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function JoinClassForm({ open, handleClose, onSuccess }) {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarContent, setSnackbarContent] = useState({
    type: "error",
    content: "",
  });

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      CJC: "",
    },
    onSubmit: async (values) => {
      // console.log(values);
      await checkClassAvailable(values)
        .then((res) => {
          if (res.status === 200) {
            handleClose();
            onSuccess();
            navigate(`/classes/${res.data.classId}?cjc=${values.CJC}`);
          } else {
            setShowSnackbar(true);
            setSnackbarContent({
              type: "error",
              content: "Please try again later",
            });
          }
        })
        .catch((error) => {
          let err_msg = "Something went wrong!";
          if (
            error.response.data.message &&
            error.response.data.message.length !== 0
          ) {
            err_msg = error.response.data.message;
          }

          setShowSnackbar(true);
          setSnackbarContent({
            type: "error",
            content: err_msg,
          });
        });
      handleClose(formik)();
    },
  });

  return (
    <div>
      <Dialog open={open} onClose={handleClose(formik)}>
        <DialogTitle>Join a Class</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent dividers>
            <FormControl>
              <InputLabel htmlFor="component-outlined">Class Code</InputLabel>
              <OutlinedInput
                id="CJC"
                value={formik.values.CJC}
                onChange={formik.handleChange}
                label="Class Code"
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose(formik)}>Cancel</Button>
            <Button
              type="submit"
              disabled={!formik.isValid || formik.isSubmitting}
            >
              JOIN
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
