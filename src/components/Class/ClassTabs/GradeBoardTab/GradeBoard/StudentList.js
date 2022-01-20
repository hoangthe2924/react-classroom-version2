import * as React from "react";
import { useRef, useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import { Grid, Box } from "@mui/material";
import ImportStudentDialog from "components/Class/ClassTabs/GradeBoardTab/ImportDialog/ImportStudentDialog";
import { useParams } from "react-router-dom";
import SaveIcon from "@mui/icons-material/Save";
import { getStudentList, updateStudentList } from "services/class.service";
import { getStudentGrades, updateStudentGrades } from "services/grade.service";
import Typography from "@mui/material/Typography";
import AnchorElTooltips from "./AnchorElTooltips";
import CircularProgress from "@mui/material/CircularProgress";
import CustomToolbar from "./CustomToolbar";
import CustomColumnMenuComponent from "./CustomColumnMenuComponent";
import Loading from "components/Loading";
import { useSelector } from "react-redux";

export default function StudentList({ ListAssignment }) {
  const params = useParams();
  const navigate = useNavigate();
  const [assignments, setAssignments] = React.useState(ListAssignment);
  const [color] = React.useState("primary");
  const currentUser = useSelector((state) => state.currentUser);

  const [openLoading, setOpenLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [isOpenImportStudent, setIsOpenImportStudent] = useState(false);
  const [isSavingData, setIsSavingData] = useState(false);

  useEffect(() => {
    function addGrades(grades, rows) {
      var data = rows.slice();
      for (const row of data) {
        for (const grade of grades) {
          if (row.id === grade.studentIdFk) {
            row[grade.assignmentId] = grade.grade;
            row.finalize = grade.finalize;
          }
        }
      }
      return data;
    }
    async function getAssignmentGrades(assignmentId, classId) {
      setOpenLoading(true);
      const res = await getStudentGrades(assignmentId, classId);
      let grades = res.data ? res.data : [];
      setRows((prevState) => addGrades(grades, prevState));
      setOpenLoading(false);
    }
    async function fetchStudentList() {
      setOpenLoading(true);
      const res = await getStudentList(params.id);
      var data = res.data ? res.data : [];
      setRows(data);
      for (const assignment of assignments) {
        getAssignmentGrades(assignment.id.toString(), params.id);
      }
      setOpenLoading(false);
    }
    if (params) {
      fetchStudentList();
    } else {
      navigate("/", { replace: true });
    }
  }, [params, navigate, assignments]);

  const handleClickOpen = () => {
    setIsOpenImportStudent(true);
  };

  const handleSave = async () => {
    setIsSavingData(true);
    const body = {
      studentList: [...apiRef.current?.getRowModels().values()],
    } || { studentList: null };
    await updateStudentList(params.id, body);
    var count = 0;
    async function updateGradeAsync(assignmentId, body, classId) {
      await updateStudentGrades(assignmentId, body, classId);
      count += 1;
      // console.log(assignments.length);
      if (count === assignments.length) {
        setIsSavingData(false);
      }
    }
    if (assignments.length === 0)
    {
      setIsSavingData(false);
    }
    else{
      assignments.forEach((assignment) => {
        updateGradeAsync(assignment.id.toString(), body, params.id);
      });
    }
  };

  const handleClose = (value) => {
    setIsOpenImportStudent(false);
    if (value) {
      value.forEach((vl) => {
        setRows((prevrows) => [...prevrows, vl]);
      });
    }
    // console.log("close", value);
  };

  function getTotal(params) {
    let total = 0;
    let totalPoint = 0;
    let totalFactor = 0;
    assignments.forEach((assignment) => {
      totalPoint +=
        params.row[assignment.id.toString()] * assignment.point || 0;
      totalFactor += assignment.point || 0;
    });
    total = (totalPoint / totalFactor).toPrecision(2);
    return total;
  }

  const columns = [
    {
      field: "studentId",
      headerName: "Student ID",
      flex: 1.0,
    },
    {
      field: "fullName",
      headerName: "Full Name",
      flex: 1.0,
      minWidth: 150,
      renderCell: (params) => {
        if (params.value.extra) {
          return (
            <AnchorElTooltips
              title={params.value.extra.fullname}
              content={params.value.val}
              color="blue"
            />
          );
        }
        if (params.value.val) {
          return <Typography>{params.value.val}</Typography>;
        }
        return <Typography>{params.value}</Typography>;
      },
      valueFormatter: ({ value }) => `${value.val}`,
    },
  ];

  assignments.forEach((assignment) => {
    columns.push({
      field: assignment.id.toString(),
      headerClassName: assignment.finalize ? "finalize" : "unfinalize",
      headerName: assignment.title,
      editable: true,
      type: "number",
      flex: 1.0,
    });
  });

  columns.push({
    field: "total",
    headerName: "Total",
    flex: 1.0,
    valueGetter: getTotal,
  });

  function useApiRef() {
    const apiRef = useRef(null);
    const _columns = useMemo(
      () =>
        columns.concat({
          field: "__HIDDEN__",
          width: 0,
          disableExport: true,
          // hide: true,
          renderCell: (params) => {
            apiRef.current = params.api;
            return null;
          },
        }),
      [columns]
    );
    return { apiRef, columns: _columns };
  }

  const { apiRef, columns: columns2 } = useApiRef();

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <div
        style={{
          width: "100%",
          marginTop: 16,
        }}
      >
        <Box
          sx={{
            ".finalize": {
              backgroundColor: "rgba(255, 7, 0, 0.55)",
            },
            ".unfinalize": {
              backgroundColor: "rgba(157, 255, 118, 0.49)",
            },
          }}
        >
          <DataGrid
            autoHeight
            columns={columns2}
            rows={rows}
            components={
              !currentUser.isAdmin && {
                ColumnMenu: CustomColumnMenuComponent,
                Toolbar: CustomToolbar,
              }
            }
            componentsProps={
              !currentUser.isAdmin && {
                columnMenu: {
                  color,
                  rows,
                  setRows,
                  assignments,
                  setAssignments,
                },
                toolbar: { handleClickOpen, handleSave },
              }
            }
          />
        </Box>
      </div>
      <Grid container justifyContent="flex-end">
        {isSavingData ? (
          <CircularProgress />
        ) : (
          <>
            {!currentUser.isAdmin && (
              <Button
                startIcon={<SaveIcon fontSize="small" />}
                sx={{ mr: 1 }}
                onClick={handleSave}
              >
                Save
              </Button>
            )}
          </>
        )}
      </Grid>
      <ImportStudentDialog open={isOpenImportStudent} onClose={handleClose} />
      <Loading open={openLoading} />
    </div>
  );
}
