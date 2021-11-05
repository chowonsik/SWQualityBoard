import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";

const columns = [
  { id: "date", label: "", minWidth: 120, align: "center" },
  { id: "critical", label: "critical", minWidth: 50, align: "center" },
  { id: "high", label: "high", minWidth: 50, align: "center" },
  { id: "medium", label: "medium", minWidth: 50, align: "center" },
  { id: "low", label: "low", minWidth: 50, align: "center" },
  { id: "complexity", label: "복잡도", minWidth: 80, align: "center" },
  { id: "overlapping", label: "중복도", minWidth: 80, align: "center" },
  { id: "scale", label: "규모", minWidth: 70, align: "center" },
  { id: "systemReliability", label: "", minWidth: 140, align: "center" },
  {
    id: "testCoverage",
    label: "",
    minWidth: 140,
    format: (value) => `${value}%`,
    align: "center",
  },
  { id: "functionalSuitability", label: "", minWidth: 120, align: "center" },
  { id: "note", label: "", minWidth: 100, align: "center" },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  {
    date: "2021-10-25",
    critical: 5,
    high: 5,
    medium: 5,
    low: 5,
    complexity: 5,
    overlapping: 5,
    scale: 5,
    systemReliability: 600,
    testCoverage: 70,
    functionalSuitability: 60,
    note: "",
  },
  {
    date: "2021-10-25",
    critical: 5,
    high: 5,
    medium: 5,
    low: 5,
    complexity: 5,
    overlapping: 5,
    scale: 5,
    systemReliability: 600,
    testCoverage: 70,
    functionalSuitability: 60,
    note: "",
  },
  {
    date: "2021-10-25",
    critical: 5,
    high: 5,
    medium: 5,
    low: 5,
    complexity: 5,
    overlapping: 5,
    scale: 5,
    systemReliability: 600,
    testCoverage: 70,
    functionalSuitability: 60,
    note: "",
  },
  {
    date: "2021-10-25",
    critical: 5,
    high: 5,
    medium: 5,
    low: 5,
    complexity: 5,
    overlapping: 5,
    scale: 5,
    systemReliability: 600,
    testCoverage: 70,
    functionalSuitability: 60,
    note: "",
  },
  {
    date: "2021-10-25",
    critical: 5,
    high: 5,
    medium: 5,
    low: 5,
    complexity: 5,
    overlapping: 5,
    scale: 5,
    systemReliability: 600,
    testCoverage: 70,
    functionalSuitability: 60,
    note: "",
  },
  {
    date: "2021-10-25",
    critical: 5,
    high: 5,
    medium: 5,
    low: 5,
    complexity: 5,
    overlapping: 5,
    scale: 5,
    systemReliability: 600,
    testCoverage: 70,
    functionalSuitability: 60,
    note: "",
  },
  {
    date: "2021-10-25",
    critical: 5,
    high: 5,
    medium: 5,
    low: 5,
    complexity: 5,
    overlapping: 5,
    scale: 5,
    systemReliability: 600,
    testCoverage: 70,
    functionalSuitability: 60,
    note: "",
  },
  {
    date: "2021-10-25",
    critical: 5,
    high: 5,
    medium: 5,
    low: 5,
    complexity: 5,
    overlapping: 5,
    scale: 5,
    systemReliability: 600,
    testCoverage: 70,
    functionalSuitability: 60,
    note: "",
  },
  {
    date: "2021-10-25",
    critical: 5,
    high: 5,
    medium: 5,
    low: 5,
    complexity: 5,
    overlapping: 5,
    scale: 5,
    systemReliability: 600,
    testCoverage: 70,
    functionalSuitability: 60,
    note: "",
  },
  {
    date: "2021-10-25",
    critical: 5,
    high: 5,
    medium: 5,
    low: 5,
    complexity: 5,
    overlapping: 5,
    scale: 5,
    systemReliability: 600,
    testCoverage: 70,
    functionalSuitability: 60,
    note: "",
  },
  {
    date: "2021-10-25",
    critical: 5,
    high: 5,
    medium: 5,
    low: 5,
    complexity: 5,
    overlapping: 5,
    scale: 5,
    systemReliability: 600,
    testCoverage: 70,
    functionalSuitability: 60,
    note: "",
  },
];

function MyTable({ data }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%" }} style={{ boxShadow: "none" }}>
      <TableContainer sx={{ height: "auto" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={1}>
                일자
              </TableCell>
              <TableCell align="center" colSpan={4}>
                중대결함수
              </TableCell>
              <TableCell align="center" colSpan={3}>
                구조품질지수
              </TableCell>
              <TableCell align="center" colSpan={1}>
                시스템 신뢰도
              </TableCell>
              <TableCell align="center" colSpan={1}>
                테스트 커버리지
              </TableCell>
              <TableCell align="center" colSpan={1}>
                기능적합성
              </TableCell>
              <TableCell align="center" colSpan={1}>
                비고
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default MyTable;
