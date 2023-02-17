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
} from "@mui/material";
import { AxiosResponse } from "axios";
import { any } from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ImportsNotUsedAsValues } from "typescript";
import { setEnvironmentData } from "worker_threads";
import { createQuiz, getSubjectwiseQuiz } from "../../api/apiAgent";
import { makeStyles } from '@material-ui/core/styles';
import {
  createQuizRequest,
  createQuizResponse,
  subjectWiseQuizListResponse,
} from "../../Interface/QuizDetails";
import "./CreateQuiz.style.scss";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import NavBarInterviewer from "../../components/NavBar/NavBarInterviewer";
import TopNavBar from "../../components/TopNavBar/TopNavBar";

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 430,
  },
});


const CreateQuiz = () => {
  const classes = useStyles();
  const [subjectList, setSubjectList] = useState<subjectWiseQuizListResponse[]>(
    []
  );
  // const [checked, setChecked] = useState<boolean>(false);
  const [values, setValues] = useState<createQuizRequest[]>([]);
  const [newquiz, setNewQuiz] = useState<createQuizResponse | {}>({});
  const [quizLink, setQuizLink] = useState<string>();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);


  
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    quiz: subjectWiseQuizListResponse
  ) => {
    const existindex = values.findIndex((ele: createQuizRequest) => {
      return (
        ele.subjectName === quiz.subjectName && ele.setNumber === quiz.setNumber
      );
    });
    if (existindex !== -1 && !e.target.checked) {
      setValues((prev: any) => [
        ...prev.slice(0, existindex),
        ...prev.slice(existindex + 1),
      ]);
    } else {
      setValues([
        ...values,
        { setNumber: quiz.setNumber, subjectName: quiz.subjectName },
      ]);
    }
  };

  const handleSubmit = () => {
    createQuiz(values)
      .then((res: AxiosResponse) => {
        setNewQuiz(res.data);
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
        Swal.fire({
          title: "error",
          text: "Failed to create quiz! please retry",
          icon: "error",
          confirmButtonText: "Okay",
        });
      });
  };

  const subjectwiseQuizDetails = async () => {
    getSubjectwiseQuiz("")
      .then((response: AxiosResponse) => {
        setSubjectList(response.data);
      })
      .catch((error: any) => console.log("error in subjwiseapi"));
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
    subjectwiseQuizDetails();
  }, []);

  return (subjectList.length>0? 
    <>
      <NavBarInterviewer />
      
      <Box
      //   sx={{
      //     marginTop: -1,
      //     marginLeft: 10,
      //   }}
       >
        <Typography variant="h5" align="center">
          Available Question Sets
        </Typography>
      </Box>
      <Paper className={classes.root}>
      <TableContainer  sx={{ marginTop: 4 }} className={classes.container}>
        <Table 
          aria-label="simple table"

          // sx={{tableLayout: "auto",
          // width: "max-content",
          // height: "max-content"
          //   }}
        >
          <TableHead>
            <TableRow>
              <TableCell align="center">Set Number</TableCell>
              <TableCell align="center">Subject Name</TableCell>
              <TableCell align="center">Total Questions</TableCell>
              <TableCell align="center">Select</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subjectList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) &&
              subjectList.map((row: any) => (
                <TableRow hover role="checkbox" tabIndex={-1} 
                  key={row.code}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{row.setNumber}</TableCell>
                  <TableCell align="center">{row.subjectName}</TableCell>
                  <TableCell align="center">
                    {row.totalQuestionsCount}
                  </TableCell>
                  <TableCell align="center">
                    <Checkbox
                      name="checkbox-1"
                      onChange={(e: any) => handleCheckboxChange(e, row)}
                    />
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={subjectList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      </Paper>

      <Button 
        variant="contained"
        type="submit"
        sx={{
          marginTop: 1,
          marginLeft: 90,
          // display: "flex",
          // flexDirection: "column",
          alignItems: "center",
        }}
        onClick={handleSubmit}
      >
        Create
      </Button>

      {quizLink && (
        <Box sx={{ marginTop: 5 }}>
          {/* <Typography> */}
          {/* {`Test Link :`} */}
          {/* </Typography> */}
          <Box className="test-link">
            <Typography>
              {quizLink}
              {/* {`http://localhost:3000/rms-aug/test/${newquiz?.quizId}/${newquiz?.quizLink}`} */}
            </Typography>
            <Button
              variant="outlined"
              onClick={() => copyToClipboard(quizLink)}
            >
              <SvgIcon className="icon"
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
     :<>
     <NavBarInterviewer />
     <span><h5>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;No  results</h5></span>
     </>
  );
};

export default CreateQuiz;
