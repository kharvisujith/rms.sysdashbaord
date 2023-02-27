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
import { getTotalQuizLinksInfo } from "../../api/apiAgent";
import { createdQuizTableColumns, Order } from "../../Interface/QuizDetails";
import { getComparator } from "../../utils/TableSortFunctions";
import "./InterviewerQuizTable.style.scss";
import { createdQuizColumns } from "./InterviewQuizTableColumns";
import SearchIcon from "@mui/icons-material/Search";

// interface Column {
//   id:
//     | "quizId"
//     | "candidateId"
//     | "quizCodeExpirationAt"
//     | "quizSubmittedAt"
//     | "lastLoggedIn"
//     | "loginAttempts"
//     | "url";
//   label: string;
//   minWidth?: number;
//   align?: "right";
//   format?: (value: number) => string;
// }

// const columns: Column[] = [
//   { id: "quizId", label: "QuizId", minWidth: 70 },
//   { id: "candidateId", label: "CandidateId", minWidth: 150 },
//   {
//     id: "quizCodeExpirationAt",
//     label: "QuizCodeExpirationAt",
//     minWidth: 150,
//     //align: 'right',
//     // format: (value: number) => value.toLocaleString('en-US'),
//   },
//   {
//     id: "quizSubmittedAt",
//     label: "QuizSubmittedAt",
//     minWidth: 150,
//     //align: 'right',
//     // format: (value: number) => value.toLocaleString('en-US'),
//   },
//   {
//     id: "lastLoggedIn",
//     label: "LastLoggedIn",
//     minWidth: 150,
//     //align: 'center',
//     // format: (value: number) => value.toLocaleString('en-US'),
//   },
//   {
//     id: "loginAttempts",
//     label: "LoginAttempts",
//     minWidth: 10,
//     // align: 'right',
//     //format: (value: number) => value.toLocaleString('en-US'),
//   },
//   {
//     id: "url",
//     label: "Url",
//     minWidth: 100,
//     //align: 'right',
//     //format: (value: number) => value.toLocaleString('en-US'),
//   },
// ];

// interface Data {
//   quizId: number;
//   candidateId: string;
//   quizCodeExpirationAt: string;
//   quizSubmittedAt: string;
//   lastLoggedIn: string;
//   loginAttempts: number;
//   url: string;
// }

const InterviewQuiz = () => {
  //  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalQuizInfo, setTotalQuizInfo] = useState<any>([]);
  const [order, setOrder] = useState<Order>("asc");
  //const [orderBy, setOrderBy] = useState<keyof Data>("setNumber");
  const [orderBy, setOrderBy] = useState<any>("setNumber");
  const [loader, setLoader] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [rows, setRows] = useState([]);
  
  //const [text, setText] = useState('');

  // const handleSearch = (searchedVal: string) => {
  //     const filteredRows = totalQuizInfo.filter((row: any) => {
  //       return (
  //          row.quizCodeExpirationAt.toLowerCase().includes(searchedVal.toLowerCase()));
  //           // || row.setNumber.toString().toLowerCase().includes(searchedVal.toString().toLowerCase()) 
  //           // || row.totalQuestionsCount.toString().toLowerCase().includes(searchedVal.toString().toLowerCase()));
  //     });
  //       // setRows(filteredRows);
  //     console.log(filteredRows, 'row value');
  //   };

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
    setLoader(true);
    getTotalQuizLinksInfo()
      .then((response: any) => {
        setTotalQuizInfo(response.data);
        setLoader(false);
      })
      .catch((error: any) => {
        setLoader(false);
        console.log("error in total quiz info api");
      });
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
        <Box>
      <OutlinedInput className="search-input"
          sx={{
           
           borderRadius: "0.3rem",
           height: 30,
           minWidth: 10,
           border: "0.1px solid #000",
         }}
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
                        {/* {orderBy === column.id ? (
                          <Box component="span" sx={visuallyHidden}>
                            {order === "desc"
                              ? "sorted descending"
                              : "sorted ascending"}
                          </Box>
                        ) : null} */}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {totalQuizInfo
                  .slice()
                  .sort(getComparator(order, orderBy))
                   .filter((row:any) => !name.length || row.quizId.toString().toLowerCase().includes(name.toString().toLowerCase()) ||
                    row.loginAttempts.toString().toLowerCase().includes(name.toString().toLowerCase()) || 
                    row.quizCodeExpirationAt.toLowerCase().includes(name.toLowerCase()))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: any) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
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
