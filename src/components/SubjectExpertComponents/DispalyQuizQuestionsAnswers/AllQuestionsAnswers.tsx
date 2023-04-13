import CheckboxAnswersComponent from "../QuizTestAnswersComponents/CheckboxAnswerComponent";
import RadioAnswerComponent from "../QuizTestAnswersComponents/RadioAnswerComponent";
import CodingAnswerComponent from "../QuizTestAnswersComponents/CodingAnswerComponent";
import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { LinearProgress } from "@mui/material";
import "./AllQuestionsAnswers.style.scss";
import { questionsForSetWithAnswers } from "../../../Interface/SubjectExpert/SubjectExpert";
import { useAppSelector } from "../../../Store/ConfigureStrore";
import "../../Common/Common.style.scss";
const AllQuestionsAnswers = (props: any) => {
  // const { viewQuestions } = props;

  const {
    modifyModalQuestions,
    viewQuestionModalState: { isViewQuestionModalOpen, viewQuestions },
  } = useAppSelector((state: any) => state.subjectExpert);

  return (
    <>
      {/* <Box className="modal-content-container-subparts">
        {/* <Box className="modal-heading-container">
          <Typography style={{ textAlign: "center" }}>
            <strong>{"SubjectName:"}&ensp;</strong>
            {`${viewQuestions[0]?.subjectName.toString()}`}&emsp;
            <strong>{"Version:"}&ensp;</strong>
            {`${viewQuestions[0]?.version}`}&emsp;
            <strong>{"TotalQuestions:"}&ensp;</strong>
            {`${viewQuestions.length}`}
          </Typography>
          <LinearProgress variant={"determinate"} color={"primary"} value={0} />
        </Box>  */}
      <>
        {modifyModalQuestions?.length > 0 && (
          <Box className="header-container">
            <Box className="header-content">
              <Box className="headings">
                <Typography className="topic">Subject : </Typography>
                <Typography>{modifyModalQuestions[0]?.subjectName}</Typography>
              </Box>
              <Box className="headings">
                <Typography className="topic">Description : </Typography>
                <Typography>{modifyModalQuestions[0]?.tag}</Typography>
              </Box>
              <Box className="headings">
                <Typography className="topic">Version : </Typography>
                <Typography>{modifyModalQuestions[0]?.version}</Typography>
              </Box>
              <Box className="headings">
                <Typography className="topic">TotalQuestions :</Typography>
                <Typography>{modifyModalQuestions.length}</Typography>
              </Box>
            </Box>
            <LinearProgress
              variant={"determinate"}
              color={"primary"}
              value={0}
            />
          </Box>
        )}
        <Box className="content-container">
          {viewQuestions.length > 0 &&
            viewQuestions?.map(
              (question: questionsForSetWithAnswers, index: number) => {
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
              }
            )}
        </Box>
      </>
    </>
  );
};

export default AllQuestionsAnswers;
