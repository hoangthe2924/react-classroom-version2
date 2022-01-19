import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllClasses } from "services/class.service";
import { useSelector, useDispatch } from "react-redux";
import SearchField from "react-search-field";
import { DataGrid } from "@mui/x-data-grid";
import { Typography, IconButton, Card, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

function ManageClasses() {
  const [openLoading, setOpenLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const listClass = useSelector((state) => state.classList);
  const [rows, setRows] = useState(listClass);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    fetchClass();
    localStorage.removeItem("prev-link");
  }, []);

  async function fetchClass() {
    setOpenLoading(true);
    await fetchAllClasses().then(
      (result) => {
        if (result.status === 401 || result.status === 400) {
          navigate("/login");
          return;
        }
        dispatch({ type: "FETCH", payload: result.data });
        setRows(result.data);
      },
      (error) => {
        console.log(error);
        navigate("/login");
      }
    );
    setOpenLoading(false);
  }

  const requestSearch = (searchedVal) => {
    // console.log("text", searchText);
    const filteredRows = listClass.filter((row) => {
      return row.classname.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };

  const columns = [
    {
      field: "classname",
      headerName: "Classname",
      flex: 1.0,
    },
    {
      field: "subject",
      headerName: "Subject",
      flex: 1.0,
    },
    {
      field: "owner",
      headerName: "Created by",
      flex: 1.0,
      renderCell: (params) => {
        return <Typography>{params.value?.username || ""}</Typography>;
      },
    },
    {
      field: "createdAt",
      headerName: "Created on",
      renderCell: (params) => {
        return (
          <Typography>
            {new Date(params.value).toLocaleDateString("vi-VN")}
          </Typography>
        );
      },
    },
    {
      field: "id",
      headerName: "Action",
      renderCell: (params) => {
        return (
          <Tooltip title="View detail">
            <IconButton onClick={() => navigate(`/classes/${params.value}`)}>
              <VisibilityIcon color="primary" />
            </IconButton>
          </Tooltip>
        );
      },
    },
  ];

  return (
    <div>
      <h1>Classes</h1>
      <SearchField
        placeholder="Search by name"
        onChange={(searchVal) => requestSearch(searchVal)}
        searchText={searchText}
      />
      <Card sx={{ mt: 3 }}>
        <DataGrid autoHeight columns={columns} rows={rows} />
      </Card>
    </div>
  );
}

export default ManageClasses;
