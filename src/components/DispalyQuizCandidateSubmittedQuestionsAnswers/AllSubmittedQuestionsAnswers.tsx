import CheckboxSubmittedAnswerComponent from "../QuizSubmittedTestAnswersComponents/CheckboxSubmittedAnswerComponent";
import RadioSubmittedAnswerComponent from "../QuizSubmittedTestAnswersComponents/RadioSubmittedAnswerComponent";
import CodingSubmittedAnswerComponent from "../QuizSubmittedTestAnswersComponents/CodingSubmittedAnswerComponent";
import { useState, useEffect } from "react";
import EndTestDialog from "../EndTest/EndTestDialog";
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
  LinearProgress
} from "@mui/material";
import "./AllSubmittedQuestionsAnswers.style.scss";
import { createQuizRequest } from '../../Interface/QuizDetails';
const AllSubmittedQuestionsAnswers = (props: any) => {
  const { openDialog, handleClose, setOpenDialog, quizSubjectInfo,individualQuizDetailedInfo} = props;
  const [selectedAnswers, setSelectedAnswers] = useState<any>([]);
  const [progressStatus, setProgressStatus] = useState<number>(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number>(0);
  const [OpenTestModal, setOpenTestModal] = useState(true);
  const endTestButtonHandler = () => {
    setOpenTestModal(false);
  };
  console.log("Check Quiz Sets"+individualQuizDetailedInfo);
  return (
    <>
      <Box className="progress-box">
      {/* <TableContainer className="popup-table">
        <Table >
          <TableHead>
            <TableRow>
              <TableCell >Subject Name</TableCell>
              <TableCell >Set Number</TableCell>
              <TableCell >Total Questions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {individualQuizDetailedInfo?.quizSets &&
              individualQuizDetailedInfo?.quizSets?.map((row:createQuizRequest ) => (
                <TableRow>
                  <TableCell align="center">{row.setNumber}</TableCell>
                  <TableCell align="center">{row.subjectName}</TableCell>
                  <TableCell align="center">{row.totalQuestionsCount}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer> */}
      <Typography style={{ padding: 20, textAlign: "right" }}>
          <strong>{"SubjectName:"}&ensp;</strong>
          {`${quizSubjectInfo[0]?.subjectName.toString()}`}&emsp;
          <strong>{"SetNumber:"}&ensp;</strong>
          {`${quizSubjectInfo[0]?.setNumber}`}&emsp;
          <strong>{"TotalQuestions:"}&ensp;</strong>
          {`${quizSubjectInfo.length}`}
        </Typography>
      {/* <div className="popup-table">
      <table>
        <thead>
          <tr>
            <th><b>Subject Name</b></th>
            <th><b>Set Number</b></th>
            <th><b>Total Questions</b></th>
          </tr>
        </thead>
        <tbody>
        {quizSubjectInfo.quizSets &&
              quizSubjectInfo.quizSets?.map((row: any) => (
                //console.log("Check set Results"+quizSubjectInfo.quizSets)
          <tr>
            <td>{row.subjectName} </td>
            <td>{row.setNumber }</td>
            <td>{row.totalQuestionsCount} </td>
          </tr>
          ))}
        </tbody>
      </table>
      </div> */}
        <LinearProgress
          value={progressStatus}
          variant={"determinate"}
          color={"primary"}
        />
      </Box>
      <div className="answer-box">
        {quizSubjectInfo &&
          quizSubjectInfo?.map((question: any, index: any) => {
            console.log("Answers question type is", question);
            switch (question.questionType) {
              case "SINGLECHOICE":
                console.log("single choice match...");
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
                  <CodingSubmittedAnswerComponent key={index} question={question} />
                );
              default:
                return null;
            }
          })}
      </div>
    </>
  );
};

export default AllSubmittedQuestionsAnswers;
