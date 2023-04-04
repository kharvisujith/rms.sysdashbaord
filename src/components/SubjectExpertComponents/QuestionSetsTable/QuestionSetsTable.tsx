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
import {
  getQuestionAnswersForQuestionSet,
  getSubjectwiseQuiz,
} from "../../../api/apiAgent";
import {
  Order,
  subjectWiseQuizListResponse,
} from "../../../Interface/Interviewer/InterviewerInterface";
import {
  QuesitonSetsTableColumns,
  questionSets,
} from "../../../Interface/SubjectExpert/SubjectExpert";
import { getComparator } from "../../../utils/TableSortFunctions";
import { QuestionSetscolumns } from "./QuestionSetsTableColumn";
import ViewQuestionsModal from "./ViewQuestionModal";
import { useAppDispatch, useAppSelector } from "../../../Store/ConfigureStrore";

const QuestionSetsTable = (props: any) => {
  const { subjectWiseQuestionSets, isQuizSetExists } = props;

  const dispatch = useAppDispatch();
  const { searchText } = useAppSelector((state: any) => state.subjectExpert);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState<Order>("asc");

  const [orderBy, setOrderBy] = useState<any>("version");
  const [openViewQuestionsModal, setOpenViewQuestionsModal] =
    useState<Boolean>(false);
  const [viewQuestions, setViewQuestions] = useState<questionSets[]>([]);

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

  const openViewQuestions = (row: any) => {
    setOpenViewQuestionsModal(true);
    getQuestionAnswersForQuestionSet(row.version, row.subjectName)
      .then((response: any) => {
        setViewQuestions(response.data);
        // setLoader(false);
      })
      .catch((error: any) => {
        // setLoader(false);
        console.log("error in subjwise answersapi");
      });
  };

  const viewButton = (row: any) => {
    return (
      <Button
        onClick={() => openViewQuestions(row)}
        variant="contained"
        className="table-button"
      >
        View
      </Button>
    );
  };

  useEffect(() => {
    dispatch({
      type: "subjectExpert/setSearchTextToEmpty",
      payload: { from: "newUpload" },
    });
  }, []);

  return (
    <>
      <Box>
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
                        (row: questionSets) =>
                          !searchText.newUpload.length ||
                          row.subjectName
                            .toLowerCase()
                            .includes(searchText.newUpload.toLowerCase()) ||
                          row.version
                            .toString()
                            .toLowerCase()
                            .includes(
                              searchText.newUpload.toString().toLowerCase()
                            ) ||
                          row.totalQuestionsCount
                            .toString()
                            .toLowerCase()
                            .includes(
                              searchText.newUpload.toString().toLowerCase()
                            ) ||
                          row.createdBy
                            ?.toLowerCase()
                            .includes(searchText.newUpload.toLowerCase()) ||
                          row.updatedBy
                            ?.toLowerCase()
                            .includes(searchText.newUpload.toLowerCase()) ||
                          row.createdDate
                            ?.toLowerCase()
                            .includes(searchText.newUpload.toLowerCase())
                      )
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row: any, index: number) => {
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
      <ViewQuestionsModal
        openViewQuestionsModal={openViewQuestionsModal}
        setOpenViewQuestionsModal={setOpenViewQuestionsModal}
        viewQuestions={viewQuestions}
        setViewQuestions={setViewQuestions}
      />
    </>
  );
};
export default QuestionSetsTable;
