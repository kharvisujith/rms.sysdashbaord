import {
  Box,
  Paper,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  TableBody,
  CircularProgress,
  TablePagination,
  InputAdornment,
  OutlinedInput,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getSubjectwiseQuiz } from "../../../api/apiAgent";
import {
  Order,
  subjectWiseQuizListResponse,
} from "../../../Interface/QuizDetails";
import { getComparator } from "../../../utils/TableSortFunctions";
import { QuestionSetscolumns } from "../QuestionSetsTableColumn";
import SearchIcon from "@mui/icons-material/Search";

const QuestionSetsTable = (props: any) => {
  const { subjectWiseQuestionSets, isQuizSetExists, searchText } = props;
  // const [subjectWiseQuestionSets, setSubjectList] = useState<subjectWiseQuizListResponse[]>(
  //   []
  // );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  //   const [subjectList, setSubjectList] = useState<subjectWiseQuizListResponse[]>(
  //     []
  //   );
  // const [isQuizSetExists, setIsQuizSetExists] = useState<boolean>(true);
  const [order, setOrder] = useState<Order>("asc");
  //const [orderBy, setOrderBy] = useState<keyof Data>("setNumber");
  const [orderBy, setOrderBy] = useState<any>("version");

  const [loader, setLoader] = useState<boolean>(false);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

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

  // const subjectwiseQuizDetails = async (subject: string) => {
  //   console.log("subject wise quiz iss calllledddd");
  //   setLoader(true);
  //   getSubjectwiseQuiz(subject === "ALL" ? "" : subject)
  //     .then((response: any) => {
  //       console.log("get then succes part where loader set is false");
  //       setLoader(false);
  //       if (response.status === 204) {
  //         setIsQuizSetExists(false);
  //       } else {
  //         setSubjectList(response.data);
  //         setIsQuizSetExists(true);
  //       }
  //     })
  //     .catch((error: any) => {
  //       console.log("error in subjwiseapi");
  //       setLoader(false);
  //     });
  // };

  const viewButton = (row: any) => {
    return (
      <Button
        //  onClick={() => StartTestViewButtonHandler(row)}
        variant="contained"
      >
        View
      </Button>
    );
  };

  // useEffect(() => {
  //   subjectwiseQuizDetails(subject);
  // }, [subject]);

  return (
    <>
      <Box>
        {/* <Box className="search-box">
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
        </Box> */}
        {/* <Box>
          <FormControl
            sx={{
              minWidth: 100,
            }}
          >
            <InputLabel>Subject</InputLabel>
            <Select
              value={subject}
              //  onChange={handleSubjectChange}
              autoWidth
              label="Subject"
            >
              <MenuItem selected value="ALL">
                All
              </MenuItem>
              <MenuItem value={"REACT"}>REACT</MenuItem>
              <MenuItem value={"JAVASCRIPT"}>JAVASCRIPT</MenuItem>
              <MenuItem value={"CSHARP"}>C#</MenuItem>
            </Select>
          </FormControl>
        </Box> */}

        <Paper className="paper">
          <Typography variant="h5" className="table-title">
            Available Question Sets
          </Typography>
          <TableContainer className="table-container">
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {QuestionSetscolumns.map((column) => (
                    <TableCell
                      key={column.id}
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
              {!loader ? (
                <TableBody>
                  {isQuizSetExists &&
                    subjectWiseQuestionSets
                      .slice()
                      .sort(getComparator(order, orderBy))
                      .filter(
                        (row: any) =>
                          !searchText.length ||
                          row.subjectName
                            .toLowerCase()
                            .includes(searchText.toLowerCase()) ||
                          row.version
                            .toString()
                            .toLowerCase()
                            .includes(searchText.toString().toLowerCase()) ||
                          row.totalQuestionsCount
                            .toString()
                            .toLowerCase()
                            .includes(searchText.toString().toLowerCase()) ||
                          row.createdBy
                            ?.toLowerCase()
                            .includes(searchText.toLowerCase()) ||
                          row.updatedBy
                            ?.toLowerCase()
                            .includes(searchText.toLowerCase()) ||
                          row.createdDate
                            ?.toLowerCase()
                            .includes(searchText.toLowerCase())
                      )
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row: any, index: number) => {
                        // console.log("test data", subjectWiseQuestionSets);
                        return (
                          <TableRow
                            hover
                            role="checkbox"
                            tabIndex={-1}
                            key={index}
                          >
                            {QuestionSetscolumns.map(
                              (column: any, index: number) => {
                                const value = row[column.id];
                                return (
                                  <TableCell key={index} align={column.align}>
                                    {column.id === "view"
                                      ? viewButton(row)
                                      : column.id.includes("Date")
                                      ? value?.substring(0, 10)
                                      : value
                                      ? value
                                      : column.id.includes("Date")
                                      ? "dummy-date"
                                      : "Test-user"}
                                  </TableCell>
                                );
                              }
                            )}
                          </TableRow>
                        );
                      })}
                </TableBody>
              ) : null}
            </Table>
          </TableContainer>
          {loader ? (
            <Box className="table-loader">
              <CircularProgress />
            </Box>
          ) : null}
          {!isQuizSetExists && (
            <Box className="table-loader">
              <Typography>No Data Available</Typography>
            </Box>
          )}
          {isQuizSetExists && (
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={subjectWiseQuestionSets.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </Paper>
      </Box>
    </>
  );
};
export default QuestionSetsTable;
