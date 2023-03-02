import {
  Box,
  Button,
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
import { useState } from "react";
import {
  getSubmittedQuizDetailedInfo,
  getSubmittedQuizInfo,
} from "../../api/apiAgent";
import {
  Order,
  submittedQuizAnswersResponse,
  submittedQuizDetailedInfoResponse,
} from "../../Interface/QuizDetails";
import { submittedQuizTableColumns } from "../../screens/SubmittedQuiz/SubmittedQuizTableColumn";
import { getComparator } from "../../utils/TableSortFunctions";
import ReviewAnswersModal from "./ReviewAnswersModal";

const PastEvaluationsTable = (props: any) => {
  const { pastEvaluationsData } = props;

  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<any>("correctAnswers");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [detailedSubmittedQuizInfoList, setDetailedSubmittedQuizInfoList] =
    useState<submittedQuizAnswersResponse[]>([]);
  const [individualQuizDetailedInfo, setIndividualQuizDetailedInfo] = useState<
    submittedQuizDetailedInfoResponse[]
  >([]);

  const [openReviewModal, setOpenReviewModal] = useState<boolean>(false);

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

  const StartTestViewButtonHandler = (e: any) => {
    // setLoader(true);
    setOpenReviewModal(true);

    getSubmittedQuizInfo(e)
      .then((response: any) => {
        setDetailedSubmittedQuizInfoList(response.data);
        console.log("modal data review is", response.data);
        //  setLoader(false);
      })
      .catch((error: any) => {
        //   setLoader(false);
        console.log("error in detailed Subject Answer answersapi");
      });

    getSubmittedQuizDetailedInfo(e)
      .then((res: any) => {
        setIndividualQuizDetailedInfo(res.data);
        // setLoader(false);
      })
      .catch((error: any) => {
        //   setLoader(false);
        console.log("error in detailed Subject Answer answersapi");
      });
  };

  return (
    <>
      <Box>
        <Paper>
          <Typography variant="h5" className="table-title">
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
                          {/* {orderBy === column.id ? (
                          <Box component="span" sx={visuallyHidden}>
                            {order === "desc"
                              ? "sorted descending"
                              : "sorted ascending"}
                          </Box>
                        ) : null} */}
                        </TableSortLabel>
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {pastEvaluationsData.length > 0 &&
                  pastEvaluationsData
                    .slice()
                    .sort(getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: any, index: number) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={index}
                        >
                          {submittedQuizTableColumns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.id === "quizId" ? (
                                  <Button
                                    variant="contained"
                                    onClick={() =>
                                      StartTestViewButtonHandler(value)
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
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={pastEvaluationsData?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          {/* {loader ? (
              <Box className="table-loader">
                <CircularProgress />
              </Box>
            ) : null} */}

          {/* {totalSubmittedQuizInfoList.length < 1 && !loader && (
              <Box className="table-loader">
                <Typography>No Data Available</Typography>
              </Box>
            )} */}
          {/* {loader || totalSubmittedQuizInfoList.length > 0 ? ( */}
          {/* <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={totalSubmittedQuizInfoList.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              /> */}
          {/* ) : null} */}
        </Paper>

        <ReviewAnswersModal
          openReviewModal={openReviewModal}
          setOpenReviewModal={setOpenReviewModal}
          quizSubjectInfo={detailedSubmittedQuizInfoList}
          totalQuizDetailedInfo={individualQuizDetailedInfo}
        />
      </Box>
    </>
  );
};
export default PastEvaluationsTable;
