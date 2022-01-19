import { useState, forwardRef, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import GradeReviewContent from "./GradeReviewContent";
import { getGradeReviewDetail } from "services/grade.service";
import GradeReviewForm from "./GradeReviewForm";
import Loading from "components/Loading";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function GradeReviewDetail({
  open,
  setOpen,
  studentId,
  studentName,
  assignmentId,
  title,
  actualGrade,
  isTeacher,
}) {
  const handleClose = () => {
    setOpen(false);
  };

  const [detail, setDetail] = useState(null);
  const [openLoading, setOpenLoading] = useState(false);

  const fetchGradeReviewDetail = async () => {
    try {
      setOpenLoading(true);
      const res = await getGradeReviewDetail(studentId, assignmentId);
      setDetail(res.data);
      setOpenLoading(false);
    } catch (error) {
      setOpenLoading(false);
      if (error.response.status === 404) {
        setDetail(false);
      } else {
        setDetail(null);
      }
    }
  };

  const onUpdateGradeReview = () => {
    fetchGradeReviewDetail();
  };

  useEffect(() => {
    fetchGradeReviewDetail();

    return () => {
      setDetail(null);
    };
  }, [assignmentId, open]);

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        PaperProps={{
          style: {
            backgroundColor: '#f5f5f5',
          },
        }}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {`Grade Review Request - ${title}`}
            </Typography>
          </Toolbar>
        </AppBar>
        {detail === null && <GradeReviewForm assignmentId={assignmentId} onUpdate={onUpdateGradeReview} openLoading={setOpenLoading}/>}
        {detail === false && (
          <Typography
            variant="subtitle2"
            gutterBottom
            component="div"
            color="error.main"
            align="center"
          >
            Đã có lỗi xảy ra, thử lại sau
          </Typography>
        )}
        {detail && (
          <GradeReviewContent
            isTeacher={isTeacher}
            gradeReviewInfo={detail}
            studentId={studentId}
            studentName={studentName}
            actualGrade={actualGrade}
            onUpdate={fetchGradeReviewDetail}
            assignmentId={assignmentId}
            openLoading={setOpenLoading}
          />
        )}
        <Loading open={openLoading} />
      </Dialog>
    </div>
  );
}
