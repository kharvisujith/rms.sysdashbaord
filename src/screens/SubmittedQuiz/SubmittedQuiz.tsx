import {
  makeStyles,
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
import {
  getTotalSubmittedQuizInfo,
  getSubmittedQuizInfo,
  getSubmittedQuizDetailedInfo,
} from "../../api/apiAgent";
import AllSubmittedQuestionsAnswers from "../../components/DispalyQuizCandidateSubmittedQuestionsAnswers/AllSubmittedQuestionsAnswers";
import NavBarInterviewer from "../../components/NavBar/NavBarInterviewer";
import {
  submittedQuizResponse,
  submittedQuizAnswersResponse,
  submittedQuizDetailedInfoResponse,
  Order,
} from "../../Interface/QuizDetails";

import "./SubmittedQuiz.style.scss";
import { visuallyHidden } from "@mui/utils";
import { getComparator } from "../../utils/TableSortFunctions";
import SearchIcon from "@mui/icons-material/Search";
import TopNavBar from "../../components/TopNavBar/TopNavBar";
import { submittedQuizTableColumns } from "./SubmittedQuizTableColumn";

export const customStylesModal = {
  overlay: { zIndex: 1000 },
};

const SubmitQuizes = (props: any) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [totalSubmittedQuizInfoList, setTotalSubmittedQuizInfoList] = useState<
    submittedQuizResponse[]
  >([]);
  const [detailedSubmittedQuizInfoList, setDetailedSubmittedQuizInfoList] =
    useState<submittedQuizAnswersResponse[]>([]);
  const [individualQuizDetailedInfo, setIndividualQuizDetailedInfo] = useState<
    submittedQuizDetailedInfoResponse[]
  >([]);
  const [order, setOrder] = useState<Order>("asc");
  //const [orderBy, setOrderBy] = useState<keyof Data>("setNumber");
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
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  //const [text, setText] = useState('');
  const totalSubmittedQuizurlInfo = async () => {
    setLoader(true);
    getTotalSubmittedQuizInfo()
      .then((response: any) => {
        setTotalSubmittedQuizInfoList(response.data);
        setLoader(false);
      })
      .catch((error: any) => {
        setLoader(false);
        console.log("error in total quiz info api");
      });
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
  const handleClose = () => {
    setOpenDialog(false);
  };
  const endTestButtonHandler = () => {
    setOpenTestModal(false);
  };

  const StartTestViewButtonHandler = (e: any) => {
    setLoader(true);
    getSubmittedQuizInfo(e)
      .then((response: any) => {
        setDetailedSubmittedQuizInfoList(response.data);
        setLoader(false);
      })
      .catch((error: any) => {
        setLoader(false);
        console.log("error in detailed Subject Answer answersapi");
      });

    getSubmittedQuizDetailedInfo(e)
      .then((res: any) => {
        setIndividualQuizDetailedInfo(res.data);
        setLoader(false);
      })
      .catch((error: any) => {
        setLoader(false);
        console.log("error in detailed Subject Answer answersapi");
      });

    setOpenTestModal(true);
  };

  useEffect(() => {
    totalSubmittedQuizurlInfo();
  }, [props]);

  return (
    <>
      <TopNavBar role={props.role} setRole={props.setRole} />
      <Box className="subjectlist-box">
        <Box className="search-box">
          <OutlinedInput
            className="search-input"
            //   sx={{

            //    borderRadius: "0.3rem",
            //    height: 30,
            //    minWidth: 10,
            //    border: "0.1px solid #000",
            //  }}
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
                {totalSubmittedQuizInfoList.length>0 &&
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
                    console.log("test data", totalSubmittedQuizInfoList);
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
                                  variant="contained"
                                  onClick={() =>
                                    StartTestViewButtonHandler(value)
                                  }
                                >
                                  Review
                                </Button>
                              ) : column.format && typeof value === "number" ? (
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
      <div className="quiz-start-btn-wrap">
        <ReactModal
          isOpen={OpenTestModal}
          contentLabel="Minimal Modal Example"
          ariaHideApp={false}
          style={customStylesModal}
        >
          <>
            {loader ? (
              <Box className="modal-loader">
                <CircularProgress />
              </Box>
            ) : (
              <AllSubmittedQuestionsAnswers
                // openDialog={openDialog}
                // handleClose={handleClose}
                // setOpenDialog={setOpenDialog}
                quizSubjectInfo={detailedSubmittedQuizInfoList}
                totalQuizDetailedInfo={individualQuizDetailedInfo}
              />
            )}

            <Box style={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="contained"
                color="error"
                onClick={endTestButtonHandler}
              >
                Close
              </Button>
            </Box>
          </>
        </ReactModal>
      </div>
    </>
  );
};

export default SubmitQuizes;
