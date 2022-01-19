import { Typography, Divider, Box, IconButton } from "@mui/material";
import ButtonUnstyled, {
  buttonUnstyledClasses,
} from "@mui/base/ButtonUnstyled";
import { styled } from "@mui/system";
import { Fragment } from "react";
import GradeReviewDetail from "./GradeReviewDetail";
import { useState, useEffect } from "react";
import { getGradeReviewSummary } from "services/grade.service";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const grey = {
  200: "inherit",
  300: "#e0e0e0",
  400: "#bdbdbd",
};

const CustomButtonRoot = styled("button")`
  font-family: IBM Plex Sans, sans-serif;
  font-weight: bold;
  font-size: 0.875rem;
  background-color: ${grey[200]};
  padding: 6px 10px;
  color: black;
  transition: all 150ms ease;
  cursor: pointer;
  border: none;

  &:hover {
    background-color: ${grey[300]};
  }

  &.${buttonUnstyledClasses.active} {
    background-color: ${grey[400]};
  }
`;

function CustomButton(props) {
  return <ButtonUnstyled {...props} component={CustomButtonRoot} />;
}

export default function ListGradeReviewRequest({
  list,
  onUpdate,
  isAscending,
  handleAscending,
  handleDescending,
}) {
  const color = {
    pending: "warning.main",
    approved: "success.main",
    denied: "error.main",
  };

  const [openDialogGR, setOpenDialogGR] = useState(false);
  const [dialogGRInfo, setDialogGRInfo] = useState(null);

  const handleOpen = async (studentId, assignmentId) => {
    try {
      const res = await getGradeReviewSummary(studentId, assignmentId);
      setDialogGRInfo(res.data[0]);
      setOpenDialogGR(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!openDialogGR) {
      onUpdate();
    }
  }, [openDialogGR]);

  return (
    <Fragment>
      <Box
        sx={{
          width: "70%",
          maxWidth: "700px",
          minWidth: "400px",
          mx: "auto",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "end" }}>
          {isAscending && (
            <IconButton onClick={handleDescending}>
              <ArrowUpwardIcon />
            </IconButton>
          )}
          {!isAscending && (
            <IconButton onClick={handleAscending}>
              <ArrowDownwardIcon />
            </IconButton>
          )}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ fontWeight: "bolder" }}>Title</Typography>
          <Typography sx={{ fontWeight: "bolder" }}>Status</Typography>
        </Box>
        <Divider color="error.main" sx={{ my: 1 }} />
        {list.map((gr) => (
          <Box key={gr.id} fullWidth>
            <CustomButton
              size="small"
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
              onClick={handleOpen.bind(
                null,
                gr.user.studentId,
                gr.assignment.id
              )}
            >
              <Typography>{`${gr.user.studentId} - ${gr.user.fullName} - ${gr.assignment.title}`}</Typography>
              <Typography color={color[gr.status]}>
                <i>{gr.status}</i>
              </Typography>
            </CustomButton>
          </Box>
        ))}
      </Box>
      {openDialogGR && (
        <GradeReviewDetail
          isTeacher={true}
          open={openDialogGR}
          setOpen={setOpenDialogGR}
          studentId={dialogGRInfo.studentId}
          studentName={dialogGRInfo.fullName}
          actualGrade={dialogGRInfo.assignments[0].grade}
          assignmentId={dialogGRInfo.assignments[0].id}
          title={dialogGRInfo.assignments[0].title}
        />
      )}
    </Fragment>
  );
}
