import {
  Paper,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  TableSortLabel,
  CircularProgress,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import { apiAgent } from "../../../api/apiAgent";
import { Order } from "../../../Interface/Interviewer/InterviewerInterface";
import { getComparator } from "../../../utils/TableSortFunctions";
import "./InterviewerQuizTable.style.scss";
import { createdQuizColumns } from "./InterviewQuizTableColumns";
import SearchIcon from "@mui/icons-material/Search";

const InterviewQuiz = () => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [totalQuizInfo, setTotalQuizInfo] = useState<any>([]);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<string>("version");
  const [loader, setLoader] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

  const createSortHandler =
    (property: string) => (event: React.MouseEvent<unknown>) => {
      handleRequestSort(event, property);
    };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: string
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const totalQuizurlInfo = async () => {
    try {
      setLoader(true);

      const res = await apiAgent.interviewer.getTotalQuizLinksInfo();
      setTotalQuizInfo(res.data);
    } catch (error: any) {
    } finally {
      setLoader(false);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const copyCodeToClipboard = (data: any) => {
    navigator.clipboard.writeText(data);
  };

  useEffect(() => {
    totalQuizurlInfo();
  }, []);

  return (
    <>
      <Box className="quiztable-box">
        <Box className="search-box">
          <OutlinedInput
            className="search-input"
            id="outlined-adornment-weight"
            value={name}
            onChange={(e: any) => setName(e.target.value)}
            placeholder="Search"
            endAdornment={
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            }
            aria-describedby="outlined-weight-helper-text"
          />
        </Box>
        <Paper className="paper">
          <Typography variant="h5" className="table-title">
            Quiz Details
          </Typography>
          <TableContainer className="table-container">
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {createdQuizColumns.map((column: any, index: number) => (
                    <TableCell
                      key={index}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                      sortDirection={orderBy === column.id ? order : false}
                    >
                      <TableSortLabel
                        active={orderBy === column.id}
                        direction={orderBy === column.id ? order : "asc"}
                        onClick={createSortHandler(column.id)}
                      >
                        {column.label}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {totalQuizInfo.length > 0 &&
                  totalQuizInfo
                    .slice()
                    .sort(getComparator(order, orderBy))

                    .filter(
                      (row: any) =>
                        !name.length ||
                        row.quizId
                          .toString()
                          .toLowerCase()
                          .includes(name.toString().toLowerCase()) ||
                        row.candidateId
                          ?.toLowerCase()
                          .includes(name.toLowerCase()) ||
                        row.quizSubmittedAt
                          ?.toLowerCase()
                          .includes(name.toLowerCase()) ||
                        row.loginAttempts
                          .toString()
                          .toLowerCase()
                          .includes(name.toString().toLowerCase()) ||
                        row.lastLoggedIn
                          ?.toLowerCase()
                          .includes(name.toLowerCase()) ||
                        row.quizCodeExpirationAt
                          .toLowerCase()
                          .includes(name.toLowerCase())
                    )
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: any, index: number) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={index}
                        >
                          {createdQuizColumns.map((column: any, index: any) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={index} align={column.align}>
                                {column.format && typeof value === "number"
                                  ? column.id == "url"
                                    ? column.format(value)
                                    : value
                                  : column.id == "url"
                                  ? value.slice(value.length - 12)
                                  : value}
                                {column.id === "url" &&
                                (row["quizCodeExpirationAt"] == null ||
                                  row["quizSubmittedAt"] == null) ? (
                                  <button
                                    onClick={() => copyCodeToClipboard(value)}
                                  >
                                    Copy
                                  </button>
                                ) : (
                                  ""
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
          {loader ? (
            <Box className="table-loader">
              <CircularProgress />
            </Box>
          ) : null}

          {totalQuizInfo.length < 1 && !loader && (
            <Box className="table-loader">
              <Typography>No Data Available</Typography>
            </Box>
          )}
          {loader || totalQuizInfo.length > 0 ? (
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={totalQuizInfo.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          ) : null}
        </Paper>
      </Box>
    </>
  );
};

export default InterviewQuiz;
