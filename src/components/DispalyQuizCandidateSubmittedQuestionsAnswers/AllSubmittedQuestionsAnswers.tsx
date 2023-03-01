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
  LinearProgress
} from "@mui/material";
import "./AllSubmittedQuestionsAnswers.style.scss";
import { submittedQuizDetailedInfoResponse } from '../../Interface/QuizDetails';
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
  return ( totalQuizDetailedInfo.length>0?
    <>
      <Box className="progress-box">
      <TableContainer className="popup-left-table">
        <Table >
          <TableHead style={{backgroundColor:'burlywood', color: 'white',}}>
            <TableRow>
              <TableCell >Subject Name</TableCell>
              <TableCell >Set Number</TableCell>
              <TableCell >Total Questions</TableCell>
              <TableCell >Answered</TableCell>
              <TableCell >NotAnswered</TableCell>
              <TableCell >Correct</TableCell>
              <TableCell >Incorrect</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {totalQuizDetailedInfo &&
              totalQuizDetailedInfo?.map((row:submittedQuizDetailedInfoResponse,index:number) => (
                <TableRow key={index}>
                  <TableCell align="center">{row.subjectName}</TableCell>
                  <TableCell align="center">{row.setNumber}</TableCell>
                  <TableCell align="center">{row.totalQuestions}</TableCell>
                  <TableCell align="center">{row.answeredQuestions}</TableCell>
                  <TableCell align="center">{row.notAnsweredQuestions}</TableCell>
                  <TableCell align="center">{row.correctAnswers}</TableCell>
                  <TableCell align="center">{row.inCorrectAnswers}</TableCell>
                </TableRow>
              ))}
          </TableBody>
          <TableFooter style={{backgroundColor:'aliceblue', color: 'white',}}>
           <TableRow>
              <TableCell colSpan={2} align="right"><b>Grand Total</b></TableCell>
              <TableCell align="center"><strong>{`${totalQuizDetailedInfo?.map((datum:submittedQuizDetailedInfoResponse)=> datum?.totalQuestions).reduce((a:number, b:number) => a + b)}`}</strong></TableCell>
              <TableCell align="center"><strong>{`${totalQuizDetailedInfo?.map((datum:submittedQuizDetailedInfoResponse)=> datum?.answeredQuestions).reduce((a:number, b:number) => a + b)}`}</strong></TableCell>
              <TableCell align="center"><strong>{`${totalQuizDetailedInfo?.map((datum:submittedQuizDetailedInfoResponse)=> datum?.notAnsweredQuestions).reduce((a:number, b:number) => a + b)}`}</strong></TableCell>
              <TableCell align="center"><strong style={{backgroundColor:'lightgreen'}}>{`${totalQuizDetailedInfo?.map((datum:submittedQuizDetailedInfoResponse)=> datum?.correctAnswers).reduce((a:number, b:number) => a + b)}`}</strong></TableCell>
              <TableCell align="center"><strong style={{backgroundColor:'red'}}>{`${totalQuizDetailedInfo?.map((datum:submittedQuizDetailedInfoResponse)=> datum?.inCorrectAnswers).reduce((a:number, b:number) => a + b)}`}</strong></TableCell>
            </TableRow>
          </TableFooter>
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
     :<span><h5>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;No Submitted Quiz Results</h5></span>
  );
};

export default AllSubmittedQuestionsAnswers;
