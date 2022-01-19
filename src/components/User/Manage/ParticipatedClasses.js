import { DataGrid } from "@mui/x-data-grid";
import { Typography, IconButton, Card } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";

function ParticipatedClasses({ items }) {
  const navigate = useNavigate();

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
      field: "createdAt",
      headerName: "Participated on",
      flex: 1.0,
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
      headerName: "View",
      renderCell: (params) => {
        return (
          <IconButton onClick={() => navigate(`/classes/${params.value}`)}>
            <VisibilityIcon />
          </IconButton>
        );
      },
    },
  ];

  return (
    <div>
      <h3>Participated classes</h3>
      <Card>
        <DataGrid autoHeight columns={columns} rows={items || []} />
      </Card>
    </div>
  );
}

export default ParticipatedClasses;
