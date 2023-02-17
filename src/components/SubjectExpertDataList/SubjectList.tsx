import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  getSubjectwiseQuiz,
  getSubjectwiseQuizAnswers,
} from "../../api/apiAgent";
import AllQuestionsAnswers from "../DispalyQuizQuestionsAnswers/AllQuestionsAnswers";
import ReactModal from "react-modal";
import "./SubjectList.style.scss";
import {
  subjectwiseQuizAnswersResponse,
  subjectWiseQuizListResponse,
} from "../../Interface/QuizDetails";

interface Column {
  id:
    | "subjectName"
    | "totalQuestionsCount"
    | "setNumber"
    | "createdBy"
    | "updatedBy"
    | "createdDate"
    | "updatedDate"
    | "view";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "subjectName", label: "Subject Name", minWidth: 70 },
  { id: "totalQuestionsCount", label: "Total Questions", minWidth: 70 },
  {
    id: "setNumber",
    label: "set Number",
    minWidth: 70,
    //align: 'right',
    // format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: "createdBy",
    label: "Created By",
    minWidth: 100,
    //align: 'right',
    // format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: "updatedBy",
    label: "Updated By",
    minWidth: 100,
    //align: 'center',
    // format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: "createdDate",
    label: "Created Date",
    minWidth: 100,
    // align: 'right',
    //format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: "updatedDate",
    label: "Updated Date",
    minWidth: 100,
    //align: 'right',
    //format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: "view",
    label: "View",
    minWidth: 100,
    //align: 'right',
    //format: (value: number) => value.toLocaleString('en-US'),
  },
];

const SubjectList = (props: any) => {
  const {
    subject,
    setSubject,
    subjectList,
    isQuizSetExists,
    subjectwiseQuizDetails,
  } = props;
  // const [subjectList, setSubjectList] = useState<subjectWiseQuizListResponse[]>(
  //   []
  // );
  const [OpenTestModal, setOpenTestModal] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [subjectAnswersList, setSubjectAnswerList] = useState<
    subjectwiseQuizAnswersResponse[]
  >([]);
  //const [isQuizSetExists, setIsQuizSetExists] = useState<boolean>(true);
  const handleClose = () => {
    setOpenDialog(false);
  };

  //const [subject, setSubject] = useState("ALL");

  const handleSubjectChange = (event: SelectChangeEvent) => {
    console.log("select value is", event.target.value);
    setSubject(event.target.value);
  };

  const StartTestViewButtonHandler = (row: any) => {
    getSubjectwiseQuizAnswers(row.setNumber, row.subjectName)
      .then((response) => {
        setSubjectAnswerList(response.data);
        setOpenTestModal(true);
      })
      .catch((error: any) => console.log("error in subjwise answersapi"));
    // setOpenTestModal(true);
  };
  const endTestButtonHandler = () => {
    setOpenTestModal(false);
  };

  const handleCloseFromModal = () => {
    setOpenTestModal(false);
  };
  // const subjectwiseQuizDetails = async (subject: string) => {
  //   console.log("subjectwise quize details is calledd", subject);

  //   //   getSubjectwiseQuiz(subject === "ALL" ? "" : subject)
  //   //     .then((response) => {
  //   //       if (response.status === 204) {
  //   //         setIsQuizSetExists(false);
  //   //       } else {
  //   //         setSubjectList(response.data);
  //   //         setIsQuizSetExists(true);
  //   //       }
  //   //     })
  //   //     .catch((error: any) => console.log("error in subjwiseapi"));
  // };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalQuizInfo, setTotalQuizInfo] = useState<any>([]);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const viewButton = (row: any) => {
    return (
      <Button
        onClick={() => StartTestViewButtonHandler(row)}
        variant="contained"
      >
        View
      </Button>
    );
  };

  useEffect(() => {
    subjectwiseQuizDetails(subject);
  }, [subject]);

  return (
    <>
      <Box className="subjectlist-box">
        <Box className="table-heading">
          <FormControl sx={{ minWidth: 100, marginBottom: 1 }}>
            <InputLabel sx={{ backgroundColor: "white" }}>Subject</InputLabel>
            <Select
              value={subject}
              onChange={handleSubjectChange}
              autoWidth
              label="Subject"
            >
              <MenuItem selected value="ALL">
                All
              </MenuItem>
              <MenuItem value={"REACT"}>REACT</MenuItem>
              <MenuItem value={"JAVASCRIPT"}>JAVASCRIPT</MenuItem>
              <MenuItem value={"C#"}>C#</MenuItem>
            </Select>
          </FormControl>

          <Typography className="heading">Available Question Sets</Typography>
        </Box>

        <Paper>
          <TableContainer>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {isQuizSetExists &&
                  subjectList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row: any, index: number) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={index}
                        >
                          {columns.map((column, index) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={index} align={column.align}>
                                {column.id === "view"
                                  ? viewButton(row)
                                  : value
                                  ? value
                                  : column.id.includes("Date")
                                  ? "dummy-date"
                                  : "Test-user"}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
              </TableBody>
            </Table>
          </TableContainer>
          {isQuizSetExists && (
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={subjectList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </Paper>
        {!isQuizSetExists && (
          <Typography
            align="center"
            variant="h5"
            sx={{
              marginLeft: "auto",
              marginRight: "auto",
              width: "100%",
              textAlign: "center",
            }}
          >
            No Data Available
          </Typography>
        )}
      </Box>
      <div className="quiz-start-btn-wrap">
        <ReactModal
          isOpen={OpenTestModal}
          contentLabel="Minimal Modal Example"
          ariaHideApp={false}
        >
          <>
            <AllQuestionsAnswers
              openDialog={openDialog}
              handleClose={handleClose}
              setOpenDialog={setOpenDialog}
              quizSubjectInfo={subjectAnswersList}
            />
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

export default SubjectList;
