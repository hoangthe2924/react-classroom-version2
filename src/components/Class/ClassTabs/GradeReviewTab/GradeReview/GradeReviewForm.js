import {
  Box,
  Paper,
  Typography,
  TextField,
  Divider,
  Button,
  Grid,
} from "@mui/material";
import { useFormik } from "formik";
import { createGradeReviewRequest } from "services/grade.service";
import { useState, useContext } from "react";
import { SocketContext } from 'context/socket';
import { useParams } from "react-router-dom";

export default function GradeReviewForm({ assignmentId, onUpdate, openLoading }) {
  const [err, setErr] = useState({ hasError: false, message: "" });
  const socket = useContext(SocketContext);
  const params = useParams();

  const formik = useFormik({
    initialValues: {
      expectedGrade: "",
      message: "",
    },
    onSubmit: async (values) => {
      try {
        if(values.expectedGrade?.length===0 || values.message?.length===0){
          setErr({ hasError: true, message: "Vui lòng điền đầy đủ thông tin" });
        }else{
          openLoading(true);
          const res = await createGradeReviewRequest(
            assignmentId,
            values.expectedGrade,
            values.message
          );
          if (res.data) {
            socket.emit('grade review request', params.id);
            onUpdate();
          }
          setErr({ hasError: false, message: "" });
          openLoading(false);
        }
      } catch (error) {
        let err_msg = "Something went wrong!";
        if (
          error.response.data.message &&
          error.response.data.message.length !== 0
        ) {
          err_msg = error.response.data.message;
        }

        setErr({ hasError: true, message: err_msg });
        openLoading(false);
      }
    },
  });

  return (
    <Box
      component="div"
      sx={{ my: 2, mx: "auto", width: "60%", maxWidth: "700px" }}
    >
      <form onSubmit={formik.handleSubmit}>
        <Paper>
          <Typography
            variant="h6"
            mx={2}
            gutterBottom
            component="div"
            align="left"
          >
            Phúc khảo điểm
          </Typography>
          <Divider />
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <TextField
                id="expectedGrade"
                label="Expected Grade"
                type="number"
                value={formik.values.expectedGrade}
                onChange={formik.handleChange}
                sx={{ m: 2 }}
              />
              <TextField
                id="message"
                label="Message to teacher(s)"
                multiline
                rows={4}
                variant="standard"
                alignItems="center"
                value={formik.values.message}
                onChange={formik.handleChange}
                sx={{ m: 2, width: "90%" }}
              />
            </Box>
            {err.hasError && (
              <Typography
                variant="subtitle2"
                gutterBottom
                component="div"
                color="error.main"
                align="center"
              >
                {err.message}
              </Typography>
            )}
          </Box>
        </Paper>
        <Grid container justifyContent="flex-end">
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            sx={{ my: 2 }}
          >
            Request
          </Button>
        </Grid>
      </form>
    </Box>
  );
}
