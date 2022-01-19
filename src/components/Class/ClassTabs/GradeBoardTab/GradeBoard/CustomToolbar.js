import {
  GridToolbarContainer,
  GridToolbarExport,
  gridClasses,
} from "@mui/x-data-grid";
import UploadIcon from "@mui/icons-material/Upload";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { Link } from "react-router-dom";

function CustomToolbar(props) {
  const { handleClickOpen } = props;

  return (
    <GridToolbarContainer className={gridClasses.toolbarContainer}>
      <GridToolbarExport
        sx={{ mr: 1, ml: 2 }}
        csvOptions={{ allColumns: true, utf8WithBom: true }}
      />
      <Button
        startIcon={<UploadIcon fontSize="small" />}
        sx={{ mr: 1, ml: 2 }}
        onClick={handleClickOpen}
      >
        Import
      </Button>
      <Grid container justifyContent="flex-end">
        <Link
          to="/StudentTemplate.xlsx"
          target="_blank"
          download
          style={{ textDecoration: "none" }}
        >
          <Button startIcon={<DownloadIcon fontSize="small" />} sx={{ mr: 1 }}>
            Download Student Template
          </Button>
        </Link>
        <Link
          to="/GradingTemplate.xlsx"
          target="_blank"
          download
          style={{ textDecoration: "none" }}
        >
          <Button startIcon={<DownloadIcon fontSize="small" />} sx={{ mr: 1 }}>
            Download Grade Template
          </Button>
        </Link>
      </Grid>
    </GridToolbarContainer>
  );
}
export { CustomToolbar };
export default CustomToolbar;
