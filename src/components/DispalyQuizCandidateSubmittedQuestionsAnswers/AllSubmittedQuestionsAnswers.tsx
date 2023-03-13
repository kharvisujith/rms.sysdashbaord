import CheckboxSubmittedAnswerComponent from "../QuizSubmittedTestAnswersComponents/CheckboxSubmittedAnswerComponent";
import RadioSubmittedAnswerComponent from "../QuizSubmittedTestAnswersComponents/RadioSubmittedAnswerComponent";
import CodingSubmittedAnswerComponent from "../QuizSubmittedTestAnswersComponents/CodingSubmittedAnswerComponent";
import { useState, useEffect } from "react";
import EndTestDialog from "../EndTest/EndTestDialog";
import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  TableFooter,
  LinearProgress,
  Typography,
  CircularProgress,
} from "@mui/material";
import "./AllSubmittedQuestionsAnswers.style.scss";
import { submittedQuizDetailedInfoResponse } from "../../Interface/QuizDetails";
import { Divider } from "@material-ui/core";
const AllSubmittedQuestionsAnswers = (props: any) => {
  const { quizSubjectInfo, totalQuizDetailedInfo, loader } = props;
  const [selectedAnswers, setSelectedAnswers] = useState<any>([]);
  const [progressStatus, setProgressStatus] = useState<number>(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number>(0);
  const [OpenTestModal, setOpenTestModal] = useState(true);

  console.log("value of loader in modal is", loader);

  // return totalQuizDetailedInfo.length > 0 ? (
  if (loader) {
    return (
      <Box className="page-loader">
        <CircularProgress />
      </Box>
    );
  }

  if (!loader && totalQuizDetailedInfo.length < 1) {
    return (
      <Box className="modal-container message-box">
        <Typography>Candidate Has Not Answered Any of the Questions</Typography>
      </Box>
    );
  }
  return (
    <>
      <Box className="modal-container">
        <Box className="progress-box">
          <TableContainer className="popup-left-table">
            <Table>
              <TableHead
                style={{ backgroundColor: "burlywood", color: "white" }}
              >
                <TableRow>
                  <TableCell>Subject Name</TableCell>
                  <TableCell>Version Number</TableCell>
                  <TableCell>Total Questions</TableCell>
                  <TableCell>Answered</TableCell>
                  <TableCell>NotAnswered</TableCell>
                  <TableCell>Correct</TableCell>
                  <TableCell>Incorrect</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {totalQuizDetailedInfo.length > 0 &&
                  totalQuizDetailedInfo?.map(
                    (row: submittedQuizDetailedInfoResponse, index: number) => (
                      <TableRow key={index}>
                        <TableCell align="center">{row.subjectName}</TableCell>
                        <TableCell align="center">{row.version}</TableCell>
                        <TableCell align="center">
                          {row.totalQuestions}
                        </TableCell>
                        <TableCell align="center">
                          {row.answeredQuestions}
                        </TableCell>
                        <TableCell align="center">
                          {row.notAnsweredQuestions}
                        </TableCell>
                        <TableCell align="center">
                          {row.correctAnswers}
                        </TableCell>
                        <TableCell align="center">
                          {row.inCorrectAnswers}
                        </TableCell>
                      </TableRow>
                    )
                  )}
              </TableBody>
              <TableFooter
                style={{ backgroundColor: "aliceblue", color: "white" }}
              >
                <TableRow>
                  <TableCell colSpan={2} align="right">
                    <b>Grand Total</b>
                  </TableCell>
                  <TableCell align="center">
                    <strong>{`${
                      totalQuizDetailedInfo.length > 0 &&
                      totalQuizDetailedInfo
                        ?.map(
                          (datum: submittedQuizDetailedInfoResponse) =>
                            datum?.totalQuestions
                        )
                        .reduce((a: number, b: number) => a + b)
                    }`}</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>{`${
                      totalQuizDetailedInfo.length > 0 &&
                      totalQuizDetailedInfo
                        ?.map(
                          (datum: submittedQuizDetailedInfoResponse) =>
                            datum?.answeredQuestions
                        )
                        .reduce((a: number, b: number) => a + b)
                    }`}</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>{`${
                      totalQuizDetailedInfo.length > 0 &&
                      totalQuizDetailedInfo
                        ?.map(
                          (datum: submittedQuizDetailedInfoResponse) =>
                            datum?.notAnsweredQuestions
                        )
                        .reduce((a: number, b: number) => a + b)
                    }`}</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong style={{ backgroundColor: "lightgreen" }}>{`${
                      totalQuizDetailedInfo.length > 0 &&
                      totalQuizDetailedInfo
                        ?.map(
                          (datum: submittedQuizDetailedInfoResponse) =>
                            datum?.correctAnswers
                        )
                        .reduce((a: number, b: number) => a + b)
                    }`}</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong style={{ backgroundColor: "red" }}>{`${
                      totalQuizDetailedInfo.length > 0 &&
                      totalQuizDetailedInfo
                        ?.map(
                          (datum: submittedQuizDetailedInfoResponse) =>
                            datum?.inCorrectAnswers
                        )
                        .reduce((a: number, b: number) => a + b)
                    }`}</strong>
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Box>
        <Box className="divider">
          <Divider />
        </Box>
        <Box className="answer-box">
          {quizSubjectInfo.length > 0 &&
            quizSubjectInfo?.map((question: any, index: any) => {
              switch (question.questionType) {
                case "SINGLECHOICE":
                  return (
                    <RadioSubmittedAnswerComponent
                      key={index}
                      question={{
                        questionNumber: index + 1,
                        questionData: question,
                      }}
                    />
                  );
                case "MULTIPLECHOICE":
                  return (
                    <CheckboxSubmittedAnswerComponent
                      key={index}
                      question={{
                        questionNumber: index + 1,
                        questionData: question,
                      }}
                    />
                  );
                case "PROGRAMM":
                  return (
                    <CodingSubmittedAnswerComponent
                      key={index}
                      question={question}
                    />
                  );
                default:
                  return null;
              }
            })}
        </Box>
      </Box>
    </>
  );
};

export default AllSubmittedQuestionsAnswers;
