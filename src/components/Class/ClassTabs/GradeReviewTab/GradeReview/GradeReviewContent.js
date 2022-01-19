import {
  Paper,
  Typography,
  Box,
  Grid,
  Divider,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import CommentGradeReview from "./CommentGradeReview";
import CommentBox from "./CommentBox";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import DoDisturbOnIcon from "@mui/icons-material/DoDisturbOn";
import { changeStatusGradeReview } from "services/grade.service";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useContext } from "react";
import { SocketContext } from 'context/socket';
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "left",
  color: theme.palette.text.secondary,
}));

export default function GradeReviewContent({
  gradeReviewInfo,
  studentId,
  studentName,
  actualGrade,
  onUpdate,
  assignmentId,
  openLoading,
  isTeacher,
}) {
  const socket = useContext(SocketContext);
  const { id, expectedGrade, reviewMessage, gdCommentList, status } =
    gradeReviewInfo.gradeReviewRequests[0];

  const myColor = {
      pending: "warning",
      approved: "success",
      denied: "error",
  };

  const handleApprove = async () => {
    await changeStatusGradeReview(id, "approved", assignmentId, {gradeId: actualGrade.id, expectedGrade});
    socket.emit('grade review final', studentId);
    onUpdate();
  };

  const handleDeny = async () => {
    await changeStatusGradeReview(id, "denied", assignmentId, {gradeId: actualGrade.id, expectedGrade});
    socket.emit('grade review final', studentId);
    onUpdate();
  };

  return (
    <Box
      component="div"
      my={2}
      sx={{
        width: "60%",
        maxWidth: "700px",
        mx: "auto",
      }}
    >
      <Paper sx={{ borderRadius: "10px", p: 2, m: 2 }}>
        <Grid p={1} container justifyContent="space-between">
          <Typography
            variant="h5"
            gutterBottom
            component="div"
            align="left"
          >
            {`${studentId} - ${studentName}`}
          </Typography>
          <FiberManualRecordIcon color={myColor[status]} />
        </Grid>

        {isTeacher && (
          <Grid container justifyContent="flex-end" px={1}>
            <IconButton
              color="success"
              aria-label="approve"
              onClick={handleApprove}
              disabled={!(status==='pending')}
            >
              <DoneOutlineIcon />
            </IconButton>
            <IconButton color="error" aria-label="deny" onClick={handleDeny} disabled={!(status==='pending')} >
              <DoDisturbOnIcon />
            </IconButton>
          </Grid>
        )}
        <Grid container p={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Item sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography>Expected Grade:</Typography>
              <Typography color="error.main">{expectedGrade}</Typography>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography>Actual Grade:</Typography>
              {isTeacher && <Typography color="error.main">{actualGrade.grade}</Typography>}
              {!isTeacher && <Typography color="error.main">{actualGrade}</Typography>}
            </Item>
          </Grid>
        </Grid>
        <Typography
          variant="body2"
          mx={2}
          gutterBottom
          component="div"
          align="left"
        >
          <i>From student: </i>
          {`${reviewMessage}`}
        </Typography>
      </Paper>
      <Paper m={2} sx={{ borderRadius: "10px", p: "15px", m: 2 }}>
        <CommentBox
          onUpdate={onUpdate}
          gradeReviewId={id}
          assignmentId={assignmentId}
          openLoading={openLoading}
          studentId={studentId}
        />
        <Divider sx={{ mt: 2 }} />
        <CommentGradeReview comments={gdCommentList} />
      </Paper>
    </Box>
  );
}
