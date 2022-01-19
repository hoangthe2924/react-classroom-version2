import { LockOpenTwoTone, LockTwoTone } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Card, IconButton, Tooltip, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ConfirmBanUserDialog from "components/User/Manage/ConfirmBanUserDialog";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchField from "react-search-field";
import { banUser, getAllUsers } from "services/user.service";

function ManageUsers() {
  const [searchText, setSearchText] = useState("");
  const [users, setUsers] = useState([]);
  const [rows, setRows] = useState(users);
  const [dialogBanUserOpen, setDialogBanUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
    localStorage.removeItem("prev-link");
  }, []);

  const openDialogBanUser = (row) => {
    const foundUser = rows.find((user) => user.id === row.id);
    setSelectedUser(foundUser);
    setDialogBanUserOpen(true);
  };

  const handleClose = () => {
    setDialogBanUserOpen(false);
  };

  const onConfirm = async () => {
    await banUser({ id: selectedUser.id }).then(
      (result) => {
        if (result.status === 401 || result.status === 400) {
          alert("Some error occured! Please try again later");
          return;
        }
        handleClose();
        const banText = result.data.status ? "Unban" : "Ban";
        alert(banText + " user successfully!");
      },
      (error) => {
        console.log(error);
      }
    );
    fetchUsers();
  };

  async function fetchUsers() {
    await getAllUsers().then(
      (result) => {
        if (result.status === 401 || result.status === 400) {
          navigate("/login");
          return;
        }
        setUsers(result.data);
        setRows(result.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  const requestSearch = (searchedVal) => {
    const filteredRows = users.filter((row) => {
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
      field: "studentId",
      headerName: "Student ID",
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
        const isBanned = !params.row.status;
        return (
          <div>
            <Tooltip title="View detail">
              <IconButton
                onClick={() => navigate(`/manage/users/${params.value}`)}
              >
                <VisibilityIcon color="primary" />
              </IconButton>
            </Tooltip>
            <Tooltip title={isBanned ? "Unban" : "Ban"}>
              <IconButton
                onClick={() => {
                  openDialogBanUser(params.row);
                }}
              >
                {isBanned ? (
                  <LockOpenTwoTone color="success" />
                ) : (
                  <LockTwoTone color="error" />
                )}
              </IconButton>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <h1>Users</h1>
      <SearchField
        placeholder="Search by name, email"
        onChange={(searchVal) => requestSearch(searchVal)}
        searchText={searchText}
      />
      <Card sx={{ mt: 3 }}>
        <DataGrid autoHeight columns={columns} rows={rows} />
      </Card>
      <ConfirmBanUserDialog
        open={dialogBanUserOpen}
        user={selectedUser}
        onConfirm={onConfirm}
        handleClose={handleClose}
      />
    </div>
  );
}

export default ManageUsers;
