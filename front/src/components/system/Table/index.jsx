import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import { StickiesFill, PencilSquare } from "react-bootstrap-icons";
import { colors } from "../../../styles";

// 지표 하이라이트 기준
const criteria = {
  // 얘보다 크면 하이라이트
  critical: 1,
  high: 3,
  medium: 5,
  low: 7,

  // 얘보다 작으면 하이라이트
  testCoverage: 60,
  mtbf: 320,
  functionalCompatibility: 60,
};

const columns = [
  { id: "date", label: "", minWidth: 120, align: "center" },
  { id: "system", label: "", minWidth: 100, align: "center" },
  { id: "critical", label: "critical", minWidth: 50, align: "center" },
  { id: "high", label: "high", minWidth: 50, align: "center" },
  { id: "medium", label: "medium", minWidth: 50, align: "center" },
  { id: "low", label: "low", minWidth: 50, align: "center" },
  { id: "complexity", label: "복잡도", minWidth: 80, align: "center" },
  { id: "overlapping", label: "중복도", minWidth: 80, align: "center" },
  { id: "scale", label: "규모", minWidth: 70, align: "center" },
  { id: "mtbf", label: "", minWidth: 100, align: "center" },
  {
    id: "testCoverage",
    label: "",
    minWidth: 100,
    format: (value) => `${value}%`,
    align: "center",
  },
  {
    id: "functionalCompatibility",
    label: "",
    minWidth: 100,
    align: "center",
    format: (value) => `${value}%`,
  },
  { id: "memo", label: "", minWidth: 100, align: "center" },
];

function MyTable({ data, openMemo, setIndicator }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const loginUser = JSON.parse(localStorage.getItem("loginUser"));

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function changeIndicator(indicator) {
    setIndicator(indicator);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  // column 빨간색 처리
  function isEnoughValue(indicator, value) {
    if (["critical", "high", "medium", "low"].includes(indicator)) {
      if (criteria[indicator] < value) return false;
      else return true;
    } else {
      if (criteria[indicator] > value) return false;
      else return true;
    }
  }

  // row 빨간색 처리
  function isNotEnough(row) {
    if (row.critical > criteria.critical) return true;
    if (row.high > criteria.high) return true;
    if (row.medium > criteria.medium) return true;
    if (row.low > criteria.low) return true;
    if (row.testCoverage < criteria.testCoverage) return true;
    if (row.mtbf < criteria.mtbf) return true;
    if (row.functionalCompatibility < criteria.functionalCompatibility)
      return true;
    return false;
  }
  function initRows() {
    const newRows = data.map((item) => {
      const row = {
        date: item.createdAt,
        system: `시스템 ${item.system.name}`,
        critical: item.critical,
        high: item.high,
        medium: item.medium,
        low: item.low,
        complexity: item.complexity,
        overlapping: item.overlapping,
        scale: item.scale,
        mtbf: item.mtbf,
        testCoverage: item.testCoverage,
        functionalCompatibility: item.functionalCompatibility,
        memo: { ...item.memo, systemQualityId: item.id },
      };
      row.enough = isNotEnough(row) ? false : true;
      return row;
    });
    setRows(newRows);
  }

  useEffect(() => {
    initRows();
  }, [data]);

  return (
    <Paper sx={{ width: "100%" }} style={{ boxShadow: "none" }}>
      <TableContainer sx={{ height: "auto" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={1}>
                일자
              </TableCell>
              <TableCell align="center" colSpan={1}>
                시스템
              </TableCell>
              <TableCell align="center" colSpan={4}>
                중대결함수
              </TableCell>
              <TableCell align="center" colSpan={3}>
                구조품질지수
              </TableCell>
              <TableCell
                align="center"
                colSpan={1}
                onClick={() => {
                  changeIndicator("mtbf");
                }}
              >
                시스템신뢰도
              </TableCell>
              <TableCell
                align="center"
                colSpan={1}
                onClick={() => {
                  changeIndicator("testCoverage");
                }}
              >
                테스트커버리지
              </TableCell>
              <TableCell
                align="center"
                colSpan={1}
                onClick={() => {
                  changeIndicator("functionalCompatibility");
                }}
              >
                기능적합성
              </TableCell>
              <TableCell align="center" colSpan={1}>
                비고
              </TableCell>
            </TableRow>
            <TableRow style={{ zIndex: 0, position: "relative" }}>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    top: 57,
                    minWidth: column.minWidth,
                    cursor: column.label.length > 0 ? "pointer" : "default",
                  }}
                  onClick={() => {
                    if (column.label.length > 0) {
                      changeIndicator(column.id);
                    }
                  }}
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
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.code}
                    style={{
                      backgroundColor: row.enough
                        ? "white"
                        : "rgba(255,0,0,0.1)",
                    }}
                  >
                    {columns.map((column) => {
                      const value = row[column.id];
                      const isEnough = isEnoughValue(column.id, value);
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === "memo" ? (
                            <div
                              style={{
                                display:
                                  loginUser.authorities[0].role === "ROLE_ADMIN"
                                    ? "flex"
                                    : "none",
                                justifyContent: "center",
                                alignItems: "center",
                                cursor: "pointer",
                                color: `${colors.black}`,
                              }}
                              onClick={() => {
                                openMemo(value);
                              }}
                            >
                              {value.id ? (
                                <StickiesFill
                                  style={{ color: `${colors.navy}` }}
                                />
                              ) : (
                                <PencilSquare />
                              )}
                            </div>
                          ) : column.format && typeof value === "number" ? (
                            <div style={{ color: isEnough ? "black" : "red" }}>
                              {column.format(value)}
                            </div>
                          ) : (
                            <div style={{ color: isEnough ? "black" : "red" }}>
                              {value}
                            </div>
                          )}
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
