import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
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
  TableSortLabel,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import {
  downnLoadExcel,
  getSubjectwiseQuiz,
  getSubjectwiseQuizAnswers,
  upLoadExcel,
} from "../../api/apiAgent";
import AllQuestionsAnswers from "../DispalyQuizQuestionsAnswers/AllQuestionsAnswers";
import ReactModal from "react-modal";
import "./SubjectList.style.scss";
import {
  Order,
  subjectwiseQuizAnswersResponse,
  subjectWiseQuizListResponse,
} from "../../Interface/QuizDetails";
import Swal from "sweetalert2";
import { columns } from "./QuestionSetsTableColumn";
import { visuallyHidden } from "@mui/utils";
import { getComparator } from "../../utils/TableSortFunctions";

// interface Data {
//   subjectName: string;
//   setNumber: number;
//   totalQuestionsCount: number;
// }

const SubjectList = (props: any) => {
  // file upload part
  const [loader, setLoader] = useState<boolean>(false);
  const [file, setFile] = useState<File>();
  const [uploadData, setUploadData] = useState<any>({
    set: "",
    subject: "",
  });
  const [formError, setFormError] = useState<any>({
    set: false,
    subject: false,
    file: false,
  });
  const [openFileUpload, setOpenFileUpload] = useState(false);

  const [subject, setSubject] = useState<string>("ALL");

  const handleUploadFileOpen = () => {
    setOpenFileUpload(true);
  };

  const handleSubjectChange = (event: SelectChangeEvent) => {
    console.log("handle subject changee is calledddd");
    setSubject(event.target.value);
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormError({ ...formError, [e?.target.name]: false });
      setFile(e.target.files[0]);
    }
  };
  const handleTextChange = (e: any) => {
    setFormError({ ...formError, [e?.target.name]: false });
    const name = e.target.name;
    const value = e.target.value;
    if (subject === "ALL") {
      setUploadData((prev: any) => ({ ...prev, [name]: value }));
    } else {
      setUploadData({ [name]: value, subject: subject });
    }
  };

  const downloadFile = () => {
    downnLoadExcel()
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "template-quiz.xlsx");
        document.body.appendChild(link);
        link.click();
      })
      .then((res) => {
        Swal.fire({
          title: "Success",
          text: "Template downloaded succesfully",
          icon: "success",
          confirmButtonText: "Okay",
        });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: "Failed",
          text: "Failed to Download the template",
          icon: "error",
          confirmButtonText: "Okay",
        });
      });
  };

  const handleUploadClick = () => {
    if (file && uploadData.set && uploadData.subject) {
      setLoader(true);
      const formData = new FormData();
      formData.append("formFile", file);

      upLoadExcel(uploadData.set, uploadData.subject, formData)
        .then((res) => res.data)
        .then((res) => {
          setLoader(false);
          setOpenFileUpload(false);
          subjectwiseQuizDetails(subject);
          setUploadData({ set: "", subject: "" });
          Swal.fire({
            title: "Success",
            text: "Question Set Uploaded Succesfully",
            icon: "success",
            confirmButtonText: "Okay",
          });
        })
        .catch((error: any) => {
          setLoader(false);
          Swal.fire({
            title: "Failed",
            text: "Failed to Upload Question Set",
            icon: "error",
            confirmButtonText: "Okay",
          });
        });
    } else if (!uploadData.set) {
      setFormError({ ...formError, set: true });
    } else if (!uploadData.subject) {
      setFormError({ ...formError, subject: true });
    } else if (!file) {
      setFormError({ ...formError, file: true });
    }
  };

  const subjectwiseQuizDetails = async (subject: string) => {
    console.log("subject wise quiz iss calllledddd");
    setLoader(true);
    getSubjectwiseQuiz(subject === "ALL" ? "" : subject)
      .then((response) => {
        console.log("get then succes part where loader set is false");
        setLoader(false);
        if (response.status === 204) {
          setIsQuizSetExists(false);
        } else {
          setSubjectList(response.data);
          setIsQuizSetExists(true);
        }
      })
      .catch((error: any) => {
        console.log("error in subjwiseapi");
        setLoader(false);
      });
  };

  // for table
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [subjectList, setSubjectList] = useState<subjectWiseQuizListResponse[]>(
    []
  );
  const [isQuizSetExists, setIsQuizSetExists] = useState<boolean>(true);
  const [order, setOrder] = useState<Order>("asc");
  //const [orderBy, setOrderBy] = useState<keyof Data>("setNumber");
  const [orderBy, setOrderBy] = useState<any>("setNumber");

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

  /// for viewClick modal
  const [OpenTestModal, setOpenTestModal] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [subjectAnswersList, setSubjectAnswerList] = useState<
    subjectwiseQuizAnswersResponse[]
  >([]);
  const StartTestViewButtonHandler = (row: any) => {
    setOpenTestModal(true);
    setLoader(true);
    getSubjectwiseQuizAnswers(row.setNumber, row.subjectName)
      .then((response) => {
        setSubjectAnswerList(response.data);
        setLoader(false);
      })
      .catch((error: any) => {
        setLoader(false);
        console.log("error in subjwise answersapi");
      });
  };
  const endTestButtonHandler = () => {
    setOpenTestModal(false);
    setLoader(false);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const customStyles = {
    overlay: { zIndex: 1000 },
  };

  //const [totalQuizInfo, setTotalQuizInfo] = useState<any>([]);

  useEffect(() => {
    subjectwiseQuizDetails(subject);
  }, [subject]);

  return (
    <>
      <Box className="subjectlist-box">
        <Box className="table-header">
          <FormControl
            sx={{
              minWidth: 100,
            }}
          >
            <InputLabel>Subject</InputLabel>
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
              <MenuItem value={"CSHARP"}>C#</MenuItem>
            </Select>
          </FormControl>
          <Box className="question-upload-buttons">
            <Button
              variant="contained"
              className="button"
              onClick={downloadFile}
            >
              Download Template
            </Button>
            <Button
              variant="contained"
              className="button"
              onClick={handleUploadFileOpen}
            >
              Upload Question Set
            </Button>
          </Box>
        </Box>

        <Paper className="paper">
          <Typography variant="h5" className="table-title">
            Available Question Sets
          </Typography>
          <TableContainer className="table-container">
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
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
              {!loader ? (
                <TableBody>
                  {isQuizSetExists &&
                    subjectList
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
                            {columns.map((column: any, index: number) => {
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
                            })}
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
              count={subjectList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </Paper>
      </Box>

      <div className="quiz-start-btn-wrap">
        <ReactModal
          isOpen={OpenTestModal}
          contentLabel="Minimal Modal Example"
          ariaHideApp={false}
          style={customStyles}
        >
          <>
            {loader ? (
              <Box className="modal-loader">
                <CircularProgress />
              </Box>
            ) : (
              <AllQuestionsAnswers
                openDialog={openDialog}
                handleClose={handleClose}
                setOpenDialog={setOpenDialog}
                quizSubjectInfo={subjectAnswersList}
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

      <Dialog open={openFileUpload} onClose={handleClose}>
        <DialogTitle>Upload Questions Set</DialogTitle>
        <DialogContent className="Dialog-Container">
          <TextField
            name="set"
            label="Set Number"
            variant="standard"
            type="number"
            className="items"
            onChange={handleTextChange}
          />
          {formError.set && (
            <Typography className="error">Please Enter Set Number</Typography>
          )}

          <FormControl
            variant="standard"
            className="items"

            //  sx={{ m: 1, minWidth: 120 }}
          >
            <InputLabel id="demo-simple-select-standard-label">
              Subject
            </InputLabel>
            <Select
              //labelId="demo-simple-select-standard-label"
              //  id="demo-simple-select-standard"
              name="subject"
              label="Subject Name"
              // type="text"
              //   value={age}
              //  onChange={handleChange}
              value={subject === "ALL" ? uploadData.subject : subject}
              onChange={handleTextChange}
              disabled={subject === "ALL" ? false : true}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"REACT"}>REACT</MenuItem>
              <MenuItem value={"JAVASCRIPT"}>JAVASCRIPT</MenuItem>
              <MenuItem value={"CSHARP"}>C#</MenuItem>
            </Select>
          </FormControl>
          {formError.subject && (
            <Typography className="error">Please Enter Subject Name</Typography>
          )}
          <TextField
            name="file"
            variant="standard"
            type="file"
            id="file"
            className="file"
            onChange={handleFileChange}
          />
          {formError.file && (
            <Typography className="error">Please Choose excel file</Typography>
          )}
          <Box className="buttons-box">
            {loader ? (
              <Box className="button-loader">
                <CircularProgress />
              </Box>
            ) : (
              <>
                <Button
                  className="button"
                  variant="contained"
                  onClick={handleUploadClick}
                >
                  Submit
                </Button>

                <Button
                  className="button"
                  variant="contained"
                  onClick={() => setOpenFileUpload(false)}
                >
                  Cancel
                </Button>
              </>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SubjectList;
