import CheckboxAnswersComponent from "../QuizTestAnswersComponents/CheckboxAnswerComponent";
import RadioAnswerComponent from "../QuizTestAnswersComponents/RadioAnswerComponent";
import CodingAnswerComponent from "../QuizTestAnswersComponents/CodingAnswerComponent";
import AnswersFooterComponent from "../QuizTestAnswersComponents/AnswersFooterComponent";
import { useState,useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import EndTestDialog from "../EndTest/EndTestDialog";
import { LinearProgress } from "@mui/material";
import "./AllQuestionsAnswers.style.scss"
const AllQuestionsAnswers = (props: any) => {
  const { openDialog, handleClose, setOpenDialog, quizSubjectInfo } = props;
  const [selectedAnswers, setSelectedAnswers] = useState<any>([]);
  const [progressStatus, setProgressStatus] = useState<number>(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number>(0);
  const [totalNumberOfQuestions, setTotolNumberOfQuestions] = useState<number>(
    quizSubjectInfo.length
  );
 console.log("Answers main page Info",quizSubjectInfo);
  return (
    <>
      <Box className="progress-box">
      <Typography style={{ padding: 20,textAlign:"center" }}>
        <strong>{'SubjectName:'}&emsp;</strong>
        <strong>{'SetNumber:'}&emsp;</strong>
        <strong>{'TotalQuestions:'}&ensp;</strong>{`${totalNumberOfQuestions}`}
        </Typography>
        <LinearProgress
          value={progressStatus}
          variant={"determinate"}
          color={"primary"}
        />
      </Box>
      {quizSubjectInfo &&
        quizSubjectInfo.map((question: any, index: any) => {
          console.log("Answers question type is", question);
          switch (question.questionType) {
            case "SINGLECHOICE":
              console.log("single choice match...");
              return (
                <RadioAnswerComponent
                  key={index}
                  question={{
                    questionNumber: index + 1,
                    questionData: question,
                  }}
                />
              );
            case "MULTIPLECHOICE":
              return (
                <CheckboxAnswersComponent
                  key={index}
                  question={{
                    questionNumber: index + 1,
                    questionData: question,
                  }}
                />
              );
            case "PROGRAMM":
              return <CodingAnswerComponent key={index} question={question} />;
            default:
              return null;
          }
        })}
      <Box style={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          color="error"
        >
          Close
        </Button>
      </Box>
      <EndTestDialog
        openDialog={openDialog}
        handleClose={handleClose}
        setOpenDialog={setOpenDialog}
        selectedAnswers={selectedAnswers}
        totalNumberOfQuestions={totalNumberOfQuestions}
      />
    </>
  );
};

export default AllQuestionsAnswers;
