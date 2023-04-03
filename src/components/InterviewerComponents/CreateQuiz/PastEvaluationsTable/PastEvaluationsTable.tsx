import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  Order,
  pastEvaluationsTableDataResponse,
  submittedQuizIndividualSummaryResponse,
} from "../../../../Interface/Interviewer/InterviewerInterface";
import {
  fetchPastEvaluations,
  fetchPastEvaluationsIndividualAnswers,
  fetchPastEvaluationsIndividualSummary,
  handleReviewAnswersModal,
} from "../../../../Redux/interviewerSlice";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../Store/ConfigureStrore";
import { getComparator } from "../../../../utils/TableSortFunctions";
import { submittedQuizTableColumns } from "../../SubmittedQuiz/SubmittedQuizTableColumn";

import ReviewAnswersModal from "../ReviewAnswers/ReviewAnswersModal";

const PastEvaluationsTable = () => {
  const dispatch = useAppDispatch();
  const { loadingStatus, pastEvaluationsTableData } = useAppSelector(
    (state: any) => state.interviewer
  );

  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<any>("correctAnswers");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
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

  const handleOpenReviewModal = async (testId: any) => {
    dispatch(handleReviewAnswersModal());

    try {
      await dispatch(fetchPastEvaluationsIndividualSummary(testId));
      await dispatch(fetchPastEvaluationsIndividualAnswers(testId));
    } catch (error: any) {
      console.log("error in review model", error);
    }
  };

  useEffect(() => {
    const getPastEvaluations = async () => {
      await dispatch(fetchPastEvaluations());
    };
    getPastEvaluations();
  }, []);

  return (
    <>
      <Box>
        <Paper>
          <Typography variant="h6" className="table-title">
            {`Past Results`}
          </Typography>

          <TableContainer className="table-container">
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {submittedQuizTableColumns.map(
                    (column: any, index: number) => (
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
                    )
                  )}
                </TableRow>
              </TableHead>
              {!loadingStatus.tableLoader ? (
                <TableBody>
                  {pastEvaluationsTableData?.length > 0 &&
                    pastEvaluationsTableData
                      .slice()
                      .sort(getComparator(order, orderBy))
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
                            {submittedQuizTableColumns.map((column: any) => {
                              const value = row[column.id];
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  {column.id === "quizId" ? (
                                    <Button
                                      variant="contained"
                                      className="table-button"
                                      onClick={() =>
                                        handleOpenReviewModal(value)
                                      }
                                    >
                                      Review
                                    </Button>
                                  ) : column.format &&
                                    typeof value === "number" ? (
                                    column.format(value)
                                  ) : (
                                    value
                                  )}
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        );
                      })}
                </TableBody>
              ) : null}
            </Table>
          </TableContainer>
          {loadingStatus.tableLoader ? (
            <Box className="table-loader">
              <CircularProgress />
            </Box>
          ) : null}
          {!loadingStatus.tableLoader && pastEvaluationsTableData?.length < 1 && (
            <Box className="table-loader">
              <Typography>No Data Available</Typography>
            </Box>
          )}
          {loadingStatus.tableLoader || pastEvaluationsTableData?.length > 0 ? (
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={pastEvaluationsTableData?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          ) : null}
        </Paper>

        <ReviewAnswersModal />
      </Box>
    </>
  );
};
export default PastEvaluationsTable;
