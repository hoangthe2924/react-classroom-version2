import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useFormik } from "formik";

export default function SearchGradeDetail({ handleSearch }) {
  const formik = useFormik({
    initialValues: {
      studentID: "",
    },
    onSubmit: (values) => {
        handleSearch(values.studentID);
    },
  });

  return (
      <Paper
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{
          p: "2px 4px",
          mb: 3,
          mx: "auto",
          display: "flex",
          alignItems: "center",
          width: "60%",
          maxWidth: "1000px",
          minWidth: "400px",
        }}
      >
        <InputBase
          id="studentID"
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Student ID"
          value={formik.values.studentID}
          onChange={formik.handleChange}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
  );
}
