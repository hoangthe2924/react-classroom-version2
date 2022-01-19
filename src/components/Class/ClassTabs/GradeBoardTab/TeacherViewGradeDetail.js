import { Box, Typography } from "@mui/material";
import StudentList from "./GradeBoard/StudentList";

const TeacherViewGradeDetail = ({ListAssignment}) => {
  return (
    <>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          m: -1,
        }}
      >
        <Typography sx={{ m: 1 }} variant="h4">
          Students
        </Typography>
        <Box sx={{ m: 1 }}></Box>
      </Box>
      <Box sx={{ mt: 3 }}>
        <StudentList ListAssignment={ListAssignment} />
      </Box>
    </>
  );
};

export default TeacherViewGradeDetail;
