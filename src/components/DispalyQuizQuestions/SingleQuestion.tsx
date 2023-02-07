import { Box, Button, LinearProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import EndTestDialog from "../EndTest/EndTestDialog";
import CheckboxComponent from "../QuizTestComponents/CheckboxComponent";
import CodingComponent from "../QuizTestComponents/CodingComponent";
import RadioComponent from "../QuizTestComponents/RadioComponent";
import { jsQuestions } from "../../questions/questions";
import "./SingleQuestion.style.scss";

const TotalNumberOfQuestion = 5;

const SingleQuestion = (props: any) => {
  const { openDialog, handleClose, setOpenDialog, quizQuestions } = props;
  console.log("value of quiz in singlereqion is", quizQuestions);
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [selectedAnswers, setSelectedAnswers] = useState<any>([]);
  const [progressStatus, setProgressStatus] = useState<number>(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number>(0);
  const [totalNumberOfQuestions, setTotolNumberOfQuestions] = useState<number>(
    quizQuestions.length
  );

  const moveToNextQuestion = () => {
    console.log("next question");
    setCurrentQuestion((prev) => prev + 1);
  };
  const moveToPreviousQuestion = () => {
    console.log("previous question");
    setCurrentQuestion((prev) => prev - 1);
  };

  const handleRadioAnswerChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    questionId: any
  ) => {
    const selectedOption = (event.target as HTMLInputElement).value;
    const existingId = selectedAnswers.find(
      (e: any) => e.questionId === questionId
    );
    if (existingId) {
      existingId.choosenAnswer = [selectedOption];
    } else {
      setSelectedAnswers((prev: any) => [
        ...prev,
        { questionId: questionId, choosenAnswer: [selectedOption] },
      ]);
      handleProgressStatus();
    }
  };

  const handleProgressStatus = () => {
    console.log("handePrgressstatus called");
    const statusPercentage =
      ((answeredQuestions + 1) * 100) / totalNumberOfQuestions;
    setAnsweredQuestions((prev) => prev + 1);
    console.log("value of st is", statusPercentage);
    setProgressStatus(statusPercentage);
  };

  // this is updating the instances, this will not work for us bcz -> it will rerender like usestate->
  //immediate update is not possible, so converted this code to using usestate

  // const handleCheckboxAnswerChange = (
  //   event: React.ChangeEvent<HTMLInputElement>,
  //   questionId: any
  // ) => {
  //   console.log(event.target.name, event.target.checked, questionId);
  //   const existingId = selectedAnswers.find(
  //     (e: any) => e.questionId === questionId
  //   );
  //   console.log("exisidis", existingId);
  //   if (existingId) {
  //     console.log("inded if existingID");
  //     const valExist = existingId.choosenAnswer.find(
  //       (e: any) => e === event.target.name
  //     );
  //     console.log("value of valExist is", valExist);

  //     if (valExist && !event.target.checked) {
  //       console.log("inded valExist and !event.target.checked");
  //       var index = existingId.choosenAnswer.indexOf(event.target.name);
  //       if (index !== -1) {
  //         existingId.choosenAnswer.splice(index, 1);
  //       }
  //     } else {
  //       console.log("in else part of valexist false");
  //       existingId.choosenAnswer.push(event.target.name);
  //     }
  //   } else {
  //     console.log("inside main else part");
  //     setSelectedAnswers((prev: any) => [
  //       ...prev,
  //       { questionId: questionId, choosenAnswer: [event.target.name] },
  //     ]);
  //     handleProgressStatus();
  //   }
  // };
  const handleCheckboxAnswerChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    questionId: any
  ) => {
    const existingIdIndex = selectedAnswers.findIndex(
      (e: any) => e.questionId === questionId
    );
    if (existingIdIndex !== -1) {
      const existingId = selectedAnswers[existingIdIndex];
      const valExistIndex = existingId.choosenAnswer.indexOf(event.target.name);
      if (valExistIndex !== -1 && !event.target.checked) {
        setSelectedAnswers((prev: any) => [
          ...prev.slice(0, existingIdIndex),
          {
            questionId: questionId,
            choosenAnswer: [
              ...existingId.choosenAnswer.slice(0, valExistIndex),
              ...existingId.choosenAnswer.slice(valExistIndex + 1),
            ],
          },
          ...prev.slice(existingIdIndex + 1),
        ]);
      } else if (valExistIndex === -1) {
        setSelectedAnswers((prev: any) => [
          ...prev.slice(0, existingIdIndex),
          {
            questionId: questionId,
            choosenAnswer: [...existingId.choosenAnswer, event.target.name],
          },
          ...prev.slice(existingIdIndex + 1),
        ]);
      }
    } else {
      setSelectedAnswers((prev: any) => [
        ...prev,
        { questionId: questionId, choosenAnswer: [event.target.name] },
      ]);
      handleProgressStatus();
    }
  };

  return (
    <>
      <Box className="progress-box">
        <Typography>{`Answered ${answeredQuestions} out of ${totalNumberOfQuestions}`}</Typography>
        <LinearProgress
          value={progressStatus}
          variant={"determinate"}
          color={"primary"}
        />
      </Box>
      <Box>
        {quizQuestions &&
          quizQuestions.map((question: any, index: any) => {
            if (index + 1 === currentQuestion) {
              switch (question.questionType) {
                case "Single Choice":
                  return (
                    <RadioComponent
                      key={index}
                      question={{
                        questionNumber: index + 1,
                        questionData: question,
                      }}
                      handleAnswerChange={handleRadioAnswerChange}
                      selectedAnswers={selectedAnswers}
                    />
                  );
                case "Multiple Choice":
                  return (
                    <CheckboxComponent
                      key={index}
                      question={{
                        questionNumber: index + 1,
                        questionData: question,
                      }}
                      handleCheckboxAnswerChange={handleCheckboxAnswerChange}
                      selectedAnswers={selectedAnswers}
                    />
                  );
                case "PROGRAMM":
                  return <CodingComponent key={index} question={question} />;
                default:
                  return null;
              }
            }
          })}
      </Box>
      <Box className="test-buttons-box">
        {currentQuestion <= totalNumberOfQuestions && currentQuestion > 1 && (
          <Button
            variant="outlined"
            onClick={moveToPreviousQuestion}
            className="test-button"
          >
            Previous
          </Button>
        )}
        {currentQuestion < totalNumberOfQuestions && (
          <Button
            variant="contained"
            onClick={moveToNextQuestion}
            className="test-button"
          >
            Next
          </Button>
        )}
      </Box>
      <Box className="end-test-box">
        <Button
          color="error"
          variant="contained"
          onClick={() => setOpenDialog(true)}
          className="end-test-btn"
        >
          Submit Test
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
export default SingleQuestion;
