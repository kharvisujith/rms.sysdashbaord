import CheckboxSubmittedAnswerComponent from "../QuizSubmittedTestAnswersComponents/CheckboxSubmittedAnswerComponent";
import RadioSubmittedAnswerComponent from "../QuizSubmittedTestAnswersComponents/RadioSubmittedAnswerComponent";
import CodingSubmittedAnswerComponent from "../QuizSubmittedTestAnswersComponents/CodingSubmittedAnswerComponent";
import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  TableFooter,
  Typography,
  CircularProgress,
} from "@mui/material";
import "./AllSubmittedQuestionsAnswers.style.scss";
import { Divider } from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "../../../Store/ConfigureStrore";
import { submittedQuizIndividualSummaryResponse } from "../../../Interface/Interviewer/InterviewerInterface";
const AllSubmittedQuestionsAnswers = (props: any) => {
  // const { quizSubjectInfo, totalQuizDetailedInfo, loader } = props;

  const dispatch = useAppDispatch();
  const {
    loadingStatus: { modalLoader },
    pastEvaluationIndividualSummaryData,
    pastEvaluationIndividualAnswersData,
  } = useAppSelector((state: any) => state.interviewer);

  if (!modalLoader && pastEvaluationIndividualSummaryData?.length < 1) {
    return (
      <Box className="content-container no-content">
        <Typography>Candidate Has Not Answered Any of the Questions</Typography>
      </Box>
    );
  }
  return (
    <>
      <Box className="content-container">
        <Box>
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
                {pastEvaluationIndividualSummaryData?.length > 0 &&
                  pastEvaluationIndividualSummaryData?.map(
                    (
                      row: submittedQuizIndividualSummaryResponse,
                      index: number
                    ) => (
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
                      pastEvaluationIndividualSummaryData?.length > 0 &&
                      pastEvaluationIndividualSummaryData
                        ?.map(
                          (datu: submittedQuizIndividualSummaryResponse) =>
                            datu?.totalQuestions
                        )
                        .reduce((a: number, b: number) => a + b)
                    }`}</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>{`${
                      pastEvaluationIndividualSummaryData?.length > 0 &&
                      pastEvaluationIndividualSummaryData
                        ?.map(
                          (data: submittedQuizIndividualSummaryResponse) =>
                            data?.answeredQuestions
                        )
                        .reduce((a: number, b: number) => a + b)
                    }`}</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>{`${
                      pastEvaluationIndividualSummaryData?.length > 0 &&
                      pastEvaluationIndividualSummaryData
                        ?.map(
                          (datum: submittedQuizIndividualSummaryResponse) =>
                            datum?.notAnsweredQuestions
                        )
                        .reduce((a: number, b: number) => a + b)
                    }`}</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong style={{ backgroundColor: "lightgreen" }}>{`${
                      pastEvaluationIndividualSummaryData?.length > 0 &&
                      pastEvaluationIndividualSummaryData
                        ?.map(
                          (datum: submittedQuizIndividualSummaryResponse) =>
                            datum?.correctAnswers
                        )
                        .reduce((a: number, b: number) => a + b)
                    }`}</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong style={{ backgroundColor: "red" }}>{`${
                      pastEvaluationIndividualSummaryData?.length > 0 &&
                      pastEvaluationIndividualSummaryData
                        ?.map(
                          (datum: submittedQuizIndividualSummaryResponse) =>
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
          {pastEvaluationIndividualAnswersData?.length > 0 &&
            pastEvaluationIndividualAnswersData?.map(
              (question: any, index: any) => {
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
              }
            )}
        </Box>
      </Box>
    </>
  );
};

export default AllSubmittedQuestionsAnswers;
