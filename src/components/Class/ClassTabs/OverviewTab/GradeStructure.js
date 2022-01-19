import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

function ccyFormat(num) {
  return `${num?.toFixed(2)}`;
}

function subtotal(items) {
  return items?.assignments
    ?.map(({ point }) => point)
    .reduce((sum, i) => sum + i, 0);
}

export default function GradeStructure({ onChangeTab, item }) {
  const invoiceSubtotal = subtotal(item);
  item?.assignments?.sort((a, b) => (a.order > b.order ? 1 : -1));
  return (
    <TableContainer component={Paper}>
      <Typography variant={"h5"} marginLeft="10px" style={{ float: "left" }}>
        Grade Structure
      </Typography>
      {item?.requesterRole === "teacher" && (
        <IconButton
          color="primary"
          sx={{ float: "right" }}
          onClick={() => onChangeTab(2)}
        >
          <EditIcon />
        </IconButton>
      )}
      <Table aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="left" colSpan={1}>
              Title
            </TableCell>
            <TableCell align="right">Point</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {item?.assignments?.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.title}</TableCell>
              <TableCell align="right">{row.point}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell colSpan={1}>Total</TableCell>
            <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
