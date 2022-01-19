import { Box } from "@mui/material";
import StudentViewGradeDetail from "./StudentViewGradeDetail";
import TeacherViewGradeDetail from "./TeacherViewGradeDetail";

export default function GradeBoard({ items }) {
  const role = items.requesterRole;

  const studentId = JSON.parse(localStorage.getItem("mssv"));

  return (
    <Box>
      {(role === "teacher" || role === "admin") && (
        <TeacherViewGradeDetail ListAssignment={items.assignments} />
      )}
      {role === "student" && <StudentViewGradeDetail studentID={studentId} />}
    </Box>
  );
}
