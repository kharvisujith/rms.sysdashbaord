import {
  Box,
  Typography,
  Grid,
  Card,
  Button,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  SvgIcon,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  TablePagination,
  TableSortLabel,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  CircularProgress,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import { AxiosResponse } from "axios";
import { any } from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ImportsNotUsedAsValues } from "typescript";
import { setEnvironmentData } from "worker_threads";
import { createQuiz, getSubjectwiseQuiz } from "../../api/apiAgent";
import { makeStyles } from "@material-ui/core/styles";
import {
  createQuizRequest,
  createQuizResponse,
  Order,
  subjectWiseQuizListResponse,
} from "../../Interface/QuizDetails";
import "./CreateQuiz.style.scss";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import NavBarInterviewer from "../../components/NavBar/NavBarInterviewer";
import SearchIcon from "@mui/icons-material/Search";
import TopNavBar from "../../components/TopNavBar/TopNavBar";
import creatQuizTableColumns from "./createQuizTableColumns";
import { visuallyHidden } from "@mui/utils";
import { getComparator } from "../../utils/TableSortFunctions";

const CreateQuiz = (props: any) => {
  const [subjectList, setSubjectList] = useState<subjectWiseQuizListResponse[]>(
    []
  );

  const [values, setValues] = useState<createQuizRequest[]>([]);
  const [newquiz, setNewQuiz] = useState<createQuizResponse | {}>({});
  const [quizLink, setQuizLink] = useState<string>();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [name, setName] = useState<string>("");
  const [subject, setSubject] = useState<string>("ALL");

  const [order, setOrder] = useState<Order>("asc");
  //const [orderBy, setOrderBy] = useState<keyof Data>("setNumber");
  const [orderBy, setOrderBy] = useState<any>("setNumber");
  const [loader, setLoader] = useState<any>({
    tableLoader: "",
    buttonLoader: "",
  });

  const handleSubjectChange = (event: SelectChangeEvent) => {
    console.log("handle subject changee is calledddd");
    setSubject(event.target.value);
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

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    quiz: subjectWiseQuizListResponse
  ) => {
    console.log("value of quiz is", quiz);
    const existindex = values.findIndex((ele: createQuizRequest) => {
      return (
        ele.subjectName === quiz.subjectName && ele.setNumber === quiz.setNumber
      );
    });
    if (existindex !== -1 && !e.target.checked) {
      setValues((prev: createQuizRequest[]) => [
        ...prev.slice(0, existindex),
        ...prev.slice(existindex + 1),
      ]);
    } else {
      setValues([
        ...values,
        {
          setNumber: quiz.setNumber,
          subjectName: quiz.subjectName,
          totalQuestionsCount: quiz.totalQuestionsCount,
        },
      ]);
    }
  };

  const handleSubmit = () => {
    setLoader({ ...loader, buttonLoader: true });
    createQuiz(values)
      .then((res: AxiosResponse) => {
        setNewQuiz(res.data);
        setLoader({ ...loader, buttonLoader: false });
        Swal.fire({
          title: "Success",
          text: "Quiz created Succesfully",
          icon: "success",
          confirmButtonText: "Okay",
        });
        setQuizLink(
          `http://localhost:3000/rms-aug/test/${res.data?.quizId}/${res.data?.quizLink}`
        );
        return res.data;
      })
      .catch((error: any) => {
        setLoader({ ...loader, buttonLoader: false });
        Swal.fire({
          title: "error",
          text: "Failed to create quiz! please retry",
          icon: "error",
          confirmButtonText: "Okay",
        });
      });
  };

  const subjectwiseQuizDetails = async (subject: string) => {
    setLoader({ ...loader, tableLoader: true });
    getSubjectwiseQuiz(subject === "ALL" ? "" : subject)
      .then((response: AxiosResponse) => {
        setSubjectList(response.data);
        setLoader({ ...loader, tableLoader: false });
      })
      .catch((error: any) => {
        setLoader({ ...loader, tableLoader: false });
        console.log("error in subjwiseapi");
      });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      function () {
        // setCopied(true);
      },
      function (err) {
        console.error("Could not copy text: ", err);
      }
    );
  };

  useEffect(() => {
    subjectwiseQuizDetails(subject);
  }, [subject]);

  return (
    <>
      <TopNavBar role={props.role} setRole={props.setRole} />

      <Box className="subjectlist-box">
        <Box className="table-options-box ">
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
          <Box>
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
        <Paper className="paper">
          <Typography variant="h5" className="table-title">
            Available Question Sets
          </Typography>

          <TableContainer className="table-container-create-quiz">
            <Table aria-label="simple table" stickyHeader>
              <TableHead>
                <TableRow>
                  {creatQuizTableColumns.map((column: any) => (
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
              {!loader.tableLoader ? (
                <TableBody>
                  {subjectList &&
                    subjectList
                      .slice()
                      .sort(getComparator(order, orderBy))
                      .filter(
                        (row) =>
                          !name.length ||
                          row.subjectName
                            .toLowerCase()
                            .includes(name.toLowerCase()) ||
                          row.setNumber
                            .toString()
                            .toLowerCase()
                            .includes(name.toString().toLowerCase()) ||
                          row.totalQuestionsCount
                            .toString()
                            .toLowerCase()
                            .includes(name.toString().toLowerCase())
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
                            {creatQuizTableColumns.map(
                              (column: any, index: any) => {
                                const value = row[column.id];
                                return (
                                  <TableCell className="table-cell"
                                    key={index}
                                    align={column.align}
                                    size="small"
                                  >
                                    {column.id === "select" ? (
                                      <Checkbox
                                        name="checkbox-1"
                                        onChange={(e: any) =>
                                          handleCheckboxChange(e, row)
                                        }
                                      />
                                    ) : (
                                      value
                                    )}
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

          {loader.tableLoader ? (
            <Box className="table-loader">
              <CircularProgress />
            </Box>
          ) : null}

          {subjectList.length < 1 && !loader.tableLoader && (
            <Box className="table-loader">
              <Typography>No Data Available</Typography>
            </Box>
          )}
          {loader.tableLoader || subjectList.length > 0 ? (
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={subjectList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          ) : null}
        </Paper>
      </Box>
      <Box className="create-btn-box">
        {loader.buttonLoader ? (
          <Box className="button-loader">
            <CircularProgress />
          </Box>
        ) : (
          <Button
            className="button-create"
            variant="contained"
            type="submit"
            onClick={handleSubmit}
          >
            Create Quiz Link
          </Button>
        )}
      </Box>

      {quizLink && (
        <Box className="box-link">
          <Typography>{`Test Link :`}</Typography>
          <Box className="test-link">
            <Typography>{quizLink}</Typography>
            <Button
              className="copy"
              variant="outlined"
              onClick={() => copyToClipboard(quizLink)}
            >
              <SvgIcon
                className="icon"
                // sx={{ marginLeft: -1 }}
                component={ContentCopyIcon}
                inheritViewBox
              />
              Copy
            </Button>
          </Box>
        </Box>
      )}
    </>
  );
};

export default CreateQuiz;
