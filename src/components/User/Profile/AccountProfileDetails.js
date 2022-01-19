import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import http from "axios-config";

export const AccountProfileDetails = ({ item, onUpdate, viewedByAdmin }) => {
  const [editing, setEditing] = useState(false);

  const formik = useFormik({
    initialValues: {
      id: item?.id || null,
      fullname: item?.fullname || "",
      studentId: item?.studentId || "",
      email: item?.email || "",
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      await http
        .put("/users/info", values)
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            alert("Updated profile successfully!");
            onUpdate();
          } else {
            alert("Please try again later");
            formik.resetForm();
          }
        })
        .catch((error) => {
          alert(error.response.data || "Please try again later");
          formik.resetForm();
          console.log("err: ", JSON.stringify(error));
        });
      setEditing(false);
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                required
                margin="dense"
                id="fullname"
                name="fullname"
                label="Full name"
                type="text"
                disabled={!editing || viewedByAdmin}
                value={formik.values.fullname}
                onChange={formik.handleChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                margin="dense"
                id="studentId"
                name="studentId"
                label="Student Id"
                type="tel"
                disabled={(!!item?.studentId && !viewedByAdmin) || !editing}
                value={formik.values.studentId}
                onChange={formik.handleChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                required
                margin="dense"
                id="email"
                name="email"
                label="Email Address"
                type="email"
                disabled
                value={formik.values.email}
                onChange={formik.handleChange}
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          {!editing ? (
            <Button
              color="primary"
              variant="contained"
              onClick={(e) => {
                e.preventDefault();
                setEditing(true);
              }}
            >
              Edit
            </Button>
          ) : (
            <div>
              <Button
                color="primary"
                variant="outlined"
                sx={{ marginRight: 1 }}
                onClick={(e) => {
                  e.preventDefault();
                  setEditing(false);
                  formik.resetForm();
                }}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                type="submit"
                variant="contained"
                disabled={!formik.isValid || formik.isSubmitting}
              >
                Save
              </Button>
            </div>
          )}
        </Box>
      </Card>
    </form>
  );
};

AccountProfileDetails.defaultProps = {
  viewedByAdmin: false,
};
