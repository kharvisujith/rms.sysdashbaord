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
  makeStyles,
} from "@mui/material";
import { AxiosResponse } from "axios";
import { any } from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ImportsNotUsedAsValues } from "typescript";
import { setEnvironmentData } from "worker_threads";
import { createQuiz, getSubjectwiseQuiz } from "../../api/apiAgent";
import SideBar from "../../components/SideBar/SideBar";
import {
  createQuizRequest,
  createQuizResponse,
  subjectWiseQuizListResponse,
} from "../../Interface/QuizDetails";
import "./CreateQuiz.style.scss";
import "./CreateQuiz.style.scss";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Interviewer from "../Interviewer/Interviewer";

const CreateQuiz = () => {
  const [subjectList, setSubjectList] = useState<subjectWiseQuizListResponse[]>(
    []
  );
  // const [checked, setChecked] = useState<boolean>(false);
  const [values, setValues] = useState<createQuizRequest[]>([]);
  const [newquiz, setNewQuiz] = useState<createQuizResponse | {}>({});
  const [quizLink, setQuizLink] = useState<string>();

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

  return (
    <>
      {/* <Interviewer /> */}
      <SideBar />
      <Box
        sx={{
          marginTop: -1,
          marginLeft: 10,
        }}
      >
        <Typography variant="h5" align="center">
          Available Question Sets
        </Typography>
      </Box>
      <TableContainer component={Paper} sx={{ marginTop: 4 }}>
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
              <TableCell align="center">Check Box</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subjectList &&
              subjectList.map((row: any) => (
                <TableRow
                  key={row.id}
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

      <Button
        variant="contained"
        type="submit"
        sx={{
          marginTop: 5,
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
              <SvgIcon
                sx={{ marginLeft: -1 }}
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
