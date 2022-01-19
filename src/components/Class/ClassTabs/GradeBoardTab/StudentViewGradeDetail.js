import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { getStudentGradesDetail } from "services/grade.service";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import { Typography, Grid } from "@mui/material";
import SearchGradeDetail from "./SearchGradeDetail";
import RateReviewIcon from "@mui/icons-material/RateReview";
import GradeReviewDetail from "../GradeReviewTab/GradeReview/GradeReviewDetail";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const getTotal = (assignments) => {
  let total = 0;
  let totalPoint = 0;
  let totalFactor = 0;
  assignments.forEach((assignment) => {
    totalPoint += assignment.grade.grade * assignment.point;
    totalFactor += assignment.point;
  });
  total = totalPoint / totalFactor;
  return Math.round(total * 100) / 100;
};

const percentColors = [
  { pct: 0.0, color: { r: 0xff, g: 0x00, b: 0 } },
  { pct: 0.5, color: { r: 0xff, g: 0xff, b: 0 } },
  { pct: 1.0, color: { r: 0x00, g: 0xff, b: 0 } },
];

const calculateColorFromPercentage = (percentage) => {
  for (var i = 1; i < percentColors.length - 1; i++) {
    if (percentage < percentColors[i].pct) {
      break;
    }
  }
  var lower = percentColors[i - 1];
  var upper = percentColors[i];
  var range = upper.pct - lower.pct;
  var rangePct = (percentage - lower.pct) / range;
  var pctLower = 1 - rangePct;
  var pctUpper = rangePct;
  var color = {
    r: Math.floor(lower.color.r * pctLower + upper.color.r * pctUpper),
    g: Math.floor(lower.color.g * pctLower + upper.color.g * pctUpper),
    b: Math.floor(lower.color.b * pctLower + upper.color.b * pctUpper),
  };
  return "rgb(" + [color.r, color.g, color.b].join(",") + ")";
};

const StudentViewGradeDetail = ({ studentID }) => {
  const params = useParams();
  const [gradesDetail, setGradesDetail] = useState([]);
  const [studentInfo, setStudentInfo] = useState({
    fullName: "",
    studentId: "",
  });
  const [sID, setStudentID] = useState(studentID);
  const [error, setError] = useState({ hasError: false, message: "" });
  const [openDialogGR, setOpenDialogGR] = useState(false);
  const [dialogGRInfo, setDialogGRInfo] = useState({
    grade: 0,
    assignmentId: 0,
    title: "",
  });

  const getGradesDetail = async () => {
    const classId = params.id;
    try {
      const res = await getStudentGradesDetail(sID, classId);
      const { fullName, studentId, assignments } = res.data;
      setGradesDetail(assignments);
      setError({ hasError: false, message: "" });
      setStudentInfo({ fullName, studentId });
    } catch (error) {
      let err_msg = "Something went wrong!";
      if (
        error.response.data.message &&
        error.response.data.message.length !== 0
      ) {
        err_msg = error.response.data.message;
      }

      setError({ hasError: true, message: err_msg });
      console.log(error);
    }
  };

  const handleClickOpen = (grade, assignmentId, title) => {
    setOpenDialogGR(true);
    setDialogGRInfo({ grade, assignmentId, title });
  };

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current && !studentID) {
      isFirstRender.current = false;
    } else {
      getGradesDetail();
    }
  }, [sID]);

  const total = getTotal(gradesDetail);
  // console.log(total);
  const color = calculateColorFromPercentage(total / 10);

  return (
    <>
      {!studentID && <SearchGradeDetail handleSearch={setStudentID} />}
      {sID && !error.hasError && (
        <>
          <Grid container justifyContent="space-evenly" my={2}>
            <Typography
              variant="h5"
              gutterBottom
              component="div"
              sx={{ my: "auto" }}
            >{`${studentInfo?.studentId} - ${studentInfo?.fullName}`}</Typography>
            <div style={{ width: 150, height: 150 }}>
              <CircularProgressbar
                sx={{ margin: "auto" }}
                value={(total / 10.0) * 100}
                text={`${total}/10`}
                styles={buildStyles({
                  textColor: color,
                  backgroundColor: color,
                  pathColor: color,
                })}
              />
            </div>
          </Grid>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>Title</b>
                  </TableCell>
                  <TableCell align="right">
                    <b>Point</b>
                  </TableCell>
                  {studentID && (
                    <TableCell align="right">
                      <b>Review Request</b>
                    </TableCell>
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {gradesDetail.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.title}
                    </TableCell>
                    <TableCell align="right">{`${row.grade.grade}/10`}</TableCell>
                    {studentID && (
                      <TableCell align="right">
                        <IconButton
                          color="primary"
                          aria-label="request review grade"
                          onClick={handleClickOpen.bind(
                            null,
                            row.grade.grade,
                            row.id,
                            row.title
                          )}
                        >
                          <RateReviewIcon />
                        </IconButton>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Typography
              variant="body2"
              component="div"
              align="right"
              mx={2}
              gutterBottom
              sx={{ fontStyle: "italic", fontWeight: "bolder" }}
            >
              {`Total: ${total}/10`}
            </Typography>
          </TableContainer>
        </>
      )}
      {error.hasError && (
        <Typography
          variant="subtitle2"
          gutterBottom
          component="div"
          color="error.main"
          align="center"
        >
          {error.message}
        </Typography>
      )}
      {studentID && (
        <GradeReviewDetail
          isTeacher={false}
          open={openDialogGR}
          setOpen={setOpenDialogGR}
          studentId={studentID}
          studentName={studentInfo.fullName}
          actualGrade={dialogGRInfo.grade}
          assignmentId={dialogGRInfo.assignmentId}
          title={dialogGRInfo.title}
        />
      )}
    </>
  );
};

export default StudentViewGradeDetail;
