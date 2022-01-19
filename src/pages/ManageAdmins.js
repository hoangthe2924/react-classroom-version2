import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchField from "react-search-field";
import { DataGrid } from "@mui/x-data-grid";
import { Typography, IconButton, Card, Button, Tooltip } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { getAllAdmins } from "services/user.service";
import AddAdminForm from "components/User/Manage/AddAdminForm";

function ManageAdmins() {
  const [searchText, setSearchText] = useState("");
  const [admins, setAdmins] = useState([]);
  const [rows, setRows] = useState(admins);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchAdmins();
    localStorage.removeItem("prev-link");
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (formik) => () => {
    formik.resetForm();
    setOpen(false);
  };

  const handleSuccess = () => {
    fetchAdmins();
  };

  async function fetchAdmins() {
    await getAllAdmins().then(
      (result) => {
        if (result.status === 401 || result.status === 400) {
          navigate("/login");
          return;
        }
        setAdmins(result.data);
        setRows(result.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  const requestSearch = (searchedVal) => {
    const filteredRows = admins.filter((row) => {
      return (
        row.fullname.toLowerCase().includes(searchedVal.toLowerCase()) ||
        row.email.toLowerCase().includes(searchedVal.toLowerCase())
      );
    });
    setRows(filteredRows);
  };

  const columns = [
    {
      field: "username",
      headerName: "Username",
      flex: 1.0,
    },
    {
      field: "fullname",
      headerName: "Fullname",
      flex: 1.0,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1.0,
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
            <IconButton
              onClick={() => navigate(`/manage/users/${params.value}`)}
            >
              <VisibilityIcon color="primary" />
            </IconButton>
          </Tooltip>
        );
      },
    },
  ];

  return (
    <div>
      <h1>Admins</h1>
      <SearchField
        placeholder="Search by name, email"
        onChange={(searchVal) => requestSearch(searchVal)}
        searchText={searchText}
      />
      <Button
        variant="contained"
        sx={{ float: "right" }}
        onClick={handleClickOpen}
      >
        Add Admin
      </Button>
      <AddAdminForm
        open={open}
        handleClose={handleClose}
        onSuccess={handleSuccess}
      />
      <Card sx={{ mt: 3 }}>
        <DataGrid autoHeight columns={columns} rows={rows} />
      </Card>
    </div>
  );
}

export default ManageAdmins;
