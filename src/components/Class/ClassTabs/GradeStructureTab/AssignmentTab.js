import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Box,
  Avatar,
  Typography,
  Button, Snackbar, Badge
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import { useState, useEffect, forwardRef } from "react";
import {
  uploadAssignmentFile,
  getListAssignment,
} from "services/class.service";
import Loading from "components/Loading";

const color = {
  submitted: "success.main",
  notSubmitted: "grey.500"
}

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function AssignmentTab({ items }) {
  const [file, setFile] = useState(null);
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemChosen, setItemChosen] = useState(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarContent, setSnackbarContent] = useState({
    type: "error",
    content: "",
  });

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const getListAssignments = async () => {
    setOpen(true);
    try {
      const res = await getListAssignment(items.id);
      if (res.data) {
        setList(res.data);
      }
    } catch (error) {
      setSnackbarContent({
        type: "error",
        content: "Something went wrong!",
      });
      setShowSnackbar(true);
    }
    setOpen(false);
  };

  useEffect(() => {
    getListAssignments(items.id);
  }, []);

  const uploadHandler = async (assignmentId) => {
    setOpen(true);
    try {
      const res = await uploadAssignmentFile(assignmentId, file);
      setItemChosen(null);
      if(res){
        setSnackbarContent({
          type: "success",
          content: "Upload file successfully!",
        });
        setShowSnackbar(true);
        getListAssignments();
      }
    } catch (error) {
      setSnackbarContent({
        type: "error",
        content: "Something went wrong!",
      });
      setShowSnackbar(true);
    }
    setOpen(false);
  };

  return (
    <Box container sx={{ mx: "auto", width: "70%", maxWidth: "800px" }}>
      {list.map((item) => (
        <Accordion
          key={item.title+item.id}
          sx={{
            mb: 0.5,
            boxShadow:
              "0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%)",
            borderRadius: "0.5rem",
            "&:not(:hover)": { boxShadow: "none" },
          }}
          // expanded={expanded === "panel" + index}
          // onChange={handleChange("panel" + index)}
        >
          <AccordionSummary>
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Grid container alignItems="center">
                <Avatar sx={{ backgroundColor: item.isDone? color.submitted : color.notSubmitted }}>
                  <AssignmentOutlinedIcon />
                </Avatar>
                <Typography
                  sx={{
                    ml: 2,
                    color: "#3c404a",
                    fontSize: "0.875rem",
                    letterSpacing: ".01785714em",
                  }}
                >
                  {item.title}
                </Typography>
              </Grid>
              <Badge badgeContent={item.point} color="primary" sx={{my:"auto", mx: 2}}></Badge>
            </Box>
          </AccordionSummary>
          <AccordionDetails sx={{ borderTop: "1px solid #ccc", padding: 0 }}>
            <Box
              container
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-evenly",
                p: 2,
              }}
            >
              <Box>
                <input
                  style={{ display: "none" }}
                  id={`file-${item.id}`}
                  onChange={(event)=>{
                    setItemChosen(item.id);
                    handleFileUpload(event);
                  }}
                  type="file"
                  accept=".zip,.rar,.7zip"
                />
                <label htmlFor={`file-${item.id}`}>
                  <Button variant="contained" color="primary" component="span">
                    Chọn file
                  </Button>
                </label>
              </Box>
              <Button variant="contained" color="primary" component="span" disabled={+itemChosen !== +item.id} onClick={uploadHandler.bind(null, item.id)}>
                Gửi file
              </Button>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
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
      <Loading open={open} />
    </Box>
  );
}
