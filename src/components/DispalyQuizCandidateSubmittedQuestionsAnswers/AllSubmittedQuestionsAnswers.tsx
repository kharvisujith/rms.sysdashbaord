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
  const { openDialog, handleClose, setOpenDialog, quizSubjectInfo,totalQuizDetailedInfo} = props;
  const [selectedAnswers, setSelectedAnswers] = useState<any>([]);
  const [progressStatus, setProgressStatus] = useState<number>(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number>(0);
  const [OpenTestModal, setOpenTestModal] = useState(true);
  const endTestButtonHandler = () => {
    setOpenTestModal(false);
  };
  console.log("Check Quiz Sets 1-"+totalQuizDetailedInfo);
  console.log("Check Quiz Sets 2-"+totalQuizDetailedInfo.quizSets);
  console.log("Check Quiz Sets 3-"+totalQuizDetailedInfo.quizId);
  return (
    <>
      <Box className="progress-box">
      <TableContainer className="popup-left-table">
        <Table >
          <TableHead style={{backgroundColor:'burlywood', color: 'white',}}>
            <TableRow>
              <TableCell >Subject Name</TableCell>
              <TableCell >Set Number</TableCell>
              <TableCell >Total Questions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {totalQuizDetailedInfo?.quizSets &&
              totalQuizDetailedInfo?.quizSets?.map((row:createQuizRequest,index:number) => (
                <TableRow key={index}>
                  <TableCell align="center">{row.subjectName}</TableCell>
                  <TableCell align="center">{row.setNumber}</TableCell>
                  <TableCell align="center">{row.totalQuestionsCount}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
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
