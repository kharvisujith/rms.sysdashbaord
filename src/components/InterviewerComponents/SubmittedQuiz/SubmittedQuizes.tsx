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
  Button,
  TableSortLabel,
  CircularProgress,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { apiAgent } from "../../../api/apiAgent";
import AllSubmittedQuestionsAnswers from "../DispalyQuizCandidateSubmittedQuestionsAnswers/AllSubmittedQuestionsAnswers";
import "./SubmittedQuiz.style.scss";
import { visuallyHidden } from "@mui/utils";
import { getComparator } from "../../../utils/TableSortFunctions";
import SearchIcon from "@mui/icons-material/Search";
import TopNavBar from "../../TopNavBar/TopNavBar";
import { submittedQuizTableColumns } from "./SubmittedQuizTableColumn";
import CloseIcon from "@mui/icons-material/Close";
import "../../Common/Common.style.scss";
import {
  Order,
  pastEvaluationsTableDataResponse,
  submittedQuizIndividualSummaryResponse,
  submittedQuizResponse,
} from "../../../Interface/Interviewer/InterviewerInterface";
import { customStylesModal } from "../../../utils/Utils";

//this has to in utils
// export const customStylesModal = {
//   overlay: { zIndex: 1000 },
// };

const SubmitedQuizes = (props: any) => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [totalSubmittedQuizInfoList, setTotalSubmittedQuizInfoList] = useState<
    submittedQuizResponse[]
  >([]);
  const [detailedSubmittedQuizInfoList, setDetailedSubmittedQuizInfoList] =
    useState<pastEvaluationsTableDataResponse[]>([]);
  const [individualQuizDetailedInfo, setIndividualQuizDetailedInfo] = useState<
    submittedQuizIndividualSummaryResponse[]
  >([]);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<any>("correctAnswers");
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
  const [OpenTestModal, setOpenTestModal] = useState<boolean>(false);

  const totalSubmittedQuizurlInfo = async () => {
    try {
      setLoader(true);

      const response = await apiAgent.interviewer.getTotalSubmittedQuizInfo();
      setTotalSubmittedQuizInfoList(response.data);
    } catch (error: any) {
      console.log("Error in fetch submited quiz table");
    } finally {
      setLoader(false);
    }
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const endTestButtonHandler = () => {
    setOpenTestModal(false);
  };

  const StartTestViewButtonHandler = async (data: any) => {
    try {
      setLoader(true);
      const response1 =
        await apiAgent.interviewer.getPastEvaluationsIndivualAnswers(data);

      if (response1.status === 200) {
        setDetailedSubmittedQuizInfoList(response1.data);
      }
      const response2 =
        await apiAgent.interviewer.getPastEvaluationsIndividualSummary(data);
      if (response2.status === 200) {
        setIndividualQuizDetailedInfo(response2.data);
      }
    } catch (error: any) {
      console.log("Error in submitted view data");
    } finally {
      setLoader(false);
    }

    setOpenTestModal(true);
  };

  useEffect(() => {
    totalSubmittedQuizurlInfo();
  }, [props]);

  return (
    <>
      <Box className="subjectlist-box">
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
        <Paper>
          <Typography variant="h5" className="table-title">
            Submitted Quiz Results
          </Typography>

          <TableContainer className="table-container">
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {submittedQuizTableColumns.map((column: any) => (
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
                        {orderBy === column.id ? (
                          <Box component="span" sx={visuallyHidden}>
                            {order === "desc"
                              ? "sorted descending"
                              : "sorted ascending"}
                          </Box>
                        ) : null}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {totalSubmittedQuizInfoList.length > 0 &&
                  totalSubmittedQuizInfoList
                    .slice()
                    .sort(getComparator(order, orderBy))
                    .filter(
                      (row) =>
                        !name.length ||
                        row.candidateId
                          .toLowerCase()
                          .includes(name.toLowerCase()) ||
                        row.createdBy
                          .toLowerCase()
                          .includes(name.toLowerCase()) ||
                        row.interviewLevel
                          .toString()
                          .toLowerCase()
                          .includes(name.toString().toLowerCase()) ||
                        row.totalQuestions
                          .toString()
                          .toLowerCase()
                          .includes(name.toString().toLowerCase()) ||
                        row.answeredQuestions
                          .toString()
                          .toLowerCase()
                          .includes(name.toString().toLowerCase()) ||
                        row.notAnsweredQuestions
                          .toString()
                          .toLowerCase()
                          .includes(name.toString().toLowerCase()) ||
                        row.inCorrectAnswers
                          .toString()
                          .toLowerCase()
                          .includes(name.toString().toLowerCase()) ||
                        row.correctAnswers
                          .toString()
                          .toLowerCase()
                          .includes(name.toString().toLowerCase())
                    )
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: any) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.code}
                        >
                          {submittedQuizTableColumns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.id === "quizId" ? (
                                  <Button
                                    className="table-button"
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
          {loader ? (
            <Box className="table-loader">
              <CircularProgress />
            </Box>
          ) : null}

          {totalSubmittedQuizInfoList.length < 1 && !loader && (
            <Box className="table-loader">
              <Typography>No Data Available</Typography>
            </Box>
          )}
          {loader || totalSubmittedQuizInfoList.length > 0 ? (
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={totalSubmittedQuizInfoList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          ) : null}
        </Paper>
      </Box>
      <Box>
        <ReactModal
          isOpen={OpenTestModal}
          contentLabel="Minimal Modal Example"
          ariaHideApp={false}
          style={customStylesModal}
        >
          <Box className="modal-container">
            {loader ? (
              <Box className="modal-loader">
                <CircularProgress />
              </Box>
            ) : (
              <AllSubmittedQuestionsAnswers
                quizSubjectInfo={detailedSubmittedQuizInfoList}
                totalQuizDetailedInfo={individualQuizDetailedInfo}
              />
            )}

            <Box className="footer-container">
              {!loader && (
                <Box className="footer-content">
                  <Button
                    variant="contained"
                    color="error"
                    onClick={endTestButtonHandler}
                    endIcon={<CloseIcon />}
                  >
                    Close
                  </Button>
                </Box>
              )}
            </Box>
          </Box>
        </ReactModal>
      </Box>
    </>
  );
};

export default SubmitedQuizes;
