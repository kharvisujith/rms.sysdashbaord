import CheckboxAnswersComponent from "../../QuizTestAnswersComponents/CheckboxAnswerComponent";
import RadioAnswerComponent from "../../QuizTestAnswersComponents/RadioAnswerComponent";
import CodingAnswerComponent from "../../QuizTestAnswersComponents/CodingAnswerComponent";
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { LinearProgress } from "@mui/material";
import "./AllQuestionsAnswers.style.scss";
const AllQuestionsAnswers = (props: any) => {
  const { viewQuestions } = props;

  return (
    <>
      <Box className="progress-container">
        <Typography style={{ padding: 20, textAlign: "center" }}>
          <strong>{"SubjectName:"}&ensp;</strong>
          {`${viewQuestions[0]?.subjectName.toString()}`}&emsp;
          <strong>{"Version:"}&ensp;</strong>
          {`${viewQuestions[0]?.version}`}&emsp;
          <strong>{"TotalQuestions:"}&ensp;</strong>
          {`${viewQuestions.length}`}
        </Typography>
        <LinearProgress variant={"determinate"} color={"primary"} />
      </Box>
      <Box className="questions-container">
        {viewQuestions &&
          viewQuestions?.map((question: any, index: any) => {
            switch (question.questionType) {
              case "SINGLECHOICE":
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
                return (
                  <CodingAnswerComponent key={index} question={question} />
                );
              default:
                return null;
            }
          })}
      </Box>
    </>
  );
};

export default AllQuestionsAnswers;
