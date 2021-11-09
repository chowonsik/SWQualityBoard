import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import Indicator from "../../common/Indicator";

const columns = [
  { id: "date", label: "", minWidth: 120, align: "center" },
  { id: "team", label: "", minWidth: 100, align: "center" },
  { id: "totalPerson", label: "전체 개발인원", minWidth: 130, align: "center" },
  {
    id: "codeReviewPerson",
    label: "코드리뷰 참여인원",
    minWidth: 150,
    align: "center",
  },
  {
    id: "codeReview",
    label: "코드리뷰율",
    minWidth: 110,
    align: "center",
    format: (value) => `${value}%`,
  },
  {
    id: "codingConvention",
    label: "",
    minWidth: 150,
    align: "center",
    format: (value) => `${value}%`,
  },
  {
    id: "systemRegistration",
    label: "",
    minWidth: 130,
    align: "center",
    format: (value) => `${value}%`,
  },
  {
    id: "developingTime",
    label: "",
    minWidth: 130,
    align: "center",
    format: (value) => `${value}h`,
  },
  {
    id: "onTimeDelivery",
    label: "",
    minWidth: 120,
    align: "center",
    format: (value) => `${value}%`,
  },

  { id: "note", label: "", minWidth: 100, align: "center" },
];

const rows = [
  {
    date: "2021-10-25",
    team: "개발 1팀",
    totalPerson: 100,
    codeReviewPerson: 42,
    codeReview: 42,
    codingConvention: 10,
    systemRegistration: 34,
    developingTime: 43,
    onTimeDelivery: 5,
    note: "",
  },
  {
    date: "2021-10-25",
    team: "개발 1팀",
    totalPerson: 100,
    codeReviewPerson: 42,
    codeReview: 42,
    codingConvention: 10,
    systemRegistration: 34,
    developingTime: 43,
    onTimeDelivery: 5,
    note: "",
  },
  {
    date: "2021-10-25",
    team: "개발 1팀",
    totalPerson: 100,
    codeReviewPerson: 42,
    codeReview: 42,
    codingConvention: 10,
    systemRegistration: 34,
    developingTime: 43,
    onTimeDelivery: 5,
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
          <TableHead style={{ zIndex: 1 }}>
            <TableRow>
              <TableCell align="center" colSpan={1}>
                일자
              </TableCell>
              <TableCell align="center" colSpan={1}>
                개발팀
              </TableCell>
              <TableCell align="center" colSpan={3}>
                <Indicator indicatorTitle={"코드리뷰율"} />
              </TableCell>
              <TableCell align="center" colSpan={1}>
                <Indicator indicatorTitle={"코딩컨벤션"} />
              </TableCell>
              <TableCell align="center" colSpan={1}>
                <Indicator indicatorTitle={"시스템접수율"} />
              </TableCell>
              <TableCell align="center" colSpan={1}>
                <Indicator indicatorTitle={"개발리드타임"} />
              </TableCell>
              <TableCell align="center" colSpan={1}>
                <Indicator indicatorTitle={"정시납기율"} />
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
                  style={{ zIndex: 0, minWidth: column.minWidth }}
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
