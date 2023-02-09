import { Box, Button, LinearProgress, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import EndTestDialog from "../EndTest/EndTestDialog";
import CheckboxComponent from "../QuizTestComponents/CheckboxComponent";
import CodingComponent from "../QuizTestComponents/CodingComponent";
import RadioComponent from "../QuizTestComponents/RadioComponent";
import "./SingleQuestion.style.scss";
import { clear } from "console";
import { useNavigate } from "react-router-dom";

const SingleQuestion = (props: any) => {
  const { openDialog, handleClose, setOpenDialog, quizQuestions } = props;

  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [selectedAnswers, setSelectedAnswers] = useState<any>([]);
  const [progressStatus, setProgressStatus] = useState<number>(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number>(0);
  const [totalNumberOfQuestions, setTotolNumberOfQuestions] = useState<number>(
    quizQuestions.length
  );
  const [timer, setTimer] = useState("00:00:00");

  const Ref = useRef<any>();
  const navigate = useNavigate();

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

  const getTimeRemaining = (e: any) => {
    const total =
      Date.parse(e.toISOString()) - Date.parse(new Date().toISOString());
    console.log("value of total is", total);
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (e: any) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        (hours > 9 ? hours : "0" + hours) +
          ":" +
          (minutes > 9 ? minutes : "0" + minutes) +
          ":" +
          (seconds > 9 ? seconds : "0" + seconds)
      );
    } else {
      console.log("inside else clear interval");
      clearInterval(Ref.current);
      // post the answers here -> selectedAnswers
      // if the time is completed then autosubmit and navigate to submitted page
      console.log("selected answers");
      navigate("/test_submitted", {
        state: {
          totalNumberOfQuestions: totalNumberOfQuestions,
          answered: selectedAnswers.length,
          notAnswered: totalNumberOfQuestions - selectedAnswers.length,
        },
      });
    }
  };

  const clearTimer = (e: any) => {
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();

    deadline.setSeconds(deadline.getSeconds() + 10);
    // deadline.setMinutes(deadline.getMinutes() + 1);
    // deadline.setHours(deadline.getHours() + 1);
    return deadline;
  };

  useEffect(() => {
    console.log("useEffect in single questions is called");
    clearTimer(getDeadTime());
  }, []);

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
        <Typography>Time Remaining</Typography>
        <Box>
          <Typography variant="h5">{timer}</Typography>
        </Box>
      </Box>
      <Box>
        {quizQuestions &&
          quizQuestions.map((question: any, index: any) => {
            if (index + 1 === currentQuestion) {
              switch (question.questionType) {
                case "SINGLE CHOICE":
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
                case "MULTIPLE CHOICE":
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
        Ref={Ref}
      />
    </>
  );
};
export default SingleQuestion;
