import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
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
import { QuestionSetscolumns } from "./QuestionSetsTableColumn";
import { visuallyHidden } from "@mui/utils";
import { getComparator } from "../../utils/TableSortFunctions";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

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
    version: "",
    subject: "",
    tags: "",
  });
  const [formError, setFormError] = useState<any>({
    version: false,
    subject: false,
    tags: false,
    file: false,
  });
  const [openFileUpload, setOpenFileUpload] = useState(false);
  const [name, setName] = useState<string>("");
  // const [rows, setRows] = useState();

  const [subject, setSubject] = useState<string>("ALL");
  // const handleSearch = (searchedVal: string) => {
  //       const filteredRows = subjectList.filter((row) => {
  //         return (
  //            row.createdBy?.toString().toLowerCase().includes(searchedVal.toString().toLowerCase()));
  //             // || row.setNumber.toString().toLowerCase().includes(searchedVal.toString().toLowerCase())
  //             // || row.totalQuestionsCount.toString().toLowerCase().includes(searchedVal.toString().toLowerCase()));
  //       });
  //          setRows(filteredRows);
  //       console.log(filteredRows, 'row value');
  //      };

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
    console.log(formError, "formerror");
    const name = e.target.name;
    const value = e.target.value;
    if (subject === "ALL") {
      setUploadData((prev: any) => ({ ...prev, [name]: value }));
    } else {
      setUploadData({ [name]: value, subject: subject });
      console.log(name, "data sub");
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
    if (uploadData.version && uploadData.subject && uploadData.tags && file) {
      console.log("inside if");
      setLoader(true);
      const formData = new FormData();
      formData.append("formFile", file);

      upLoadExcel(
        uploadData.version,
        uploadData.subject,
        uploadData.tags,
        formData
      )
        .then((res) => res.data)
        .then((res) => {
          setLoader(false);
          setOpenFileUpload(false);
          subjectwiseQuizDetails(subject);
          console.log(subject, "subj data");
          setUploadData({ version: "", subject: "", tags: "" });
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
    } else if (!uploadData.version) {
      console.log("else if");
      setFormError({ ...formError, version: true });
    } else if (!uploadData.subject) {
      setFormError({ ...formError, subject: true });
    } else if (!uploadData.tags) {
      setFormError({ ...formError, tags: true });
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
  const [orderBy, setOrderBy] = useState<any>("version");

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
    getSubjectwiseQuizAnswers(row.version, row.subjectName)
      .then((response: any) => {
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
          <Box>
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
          </Box>

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
          </Box>
        </Box>

        {/* <OutlinedInput className="search-input"
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
       /> */}

        <Paper className="paper">
          <Typography variant="h5" className="table-title">
            Available Question Sets
          </Typography>
          <TableContainer className="table-container">
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {QuestionSetscolumns.map((column: any) => (
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
                      .filter(
                        (row) =>
                          !name.length ||
                          row.subjectName
                            .toLowerCase()
                            .includes(name.toLowerCase()) ||
                          row.version
                            .toString()
                            .toLowerCase()
                            .includes(name.toString().toLowerCase()) ||
                          row.totalQuestionsCount
                            .toString()
                            .toLowerCase()
                            .includes(name.toString().toLowerCase()) ||
                          row.createdBy
                            ?.toLowerCase()
                            .includes(name.toLowerCase()) ||
                          row.updatedBy
                            ?.toLowerCase()
                            .includes(name.toLowerCase()) ||
                          row.createdDate
                            ?.toLowerCase()
                            .includes(name.toLowerCase())
                      )

                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row: any, index: number) => {
                        // console.log("test data", subjectList);
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
                endIcon={<CloseIcon />}
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
            name="version"
            label="Version Number"
            variant="standard"
            type="text"
            className="items"
            onChange={handleTextChange}
          />
          {formError.version && (
            <Typography className="error">
              Please Enter Version Number
            </Typography>
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
            name="tags"
            label="Tags"
            variant="standard"
            type="text"
            className="items"
            onChange={handleTextChange}
          />
          {formError.tags && (
            <Typography className="error">Please Enter Tags</Typography>
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
