import { Box, Button, LinearProgress, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import EndTestDialog from "../EndTest/EndTestDialog";
import CheckboxComponent from "../QuizTestComponents/CheckboxComponent";
import CodingComponent from "../QuizTestComponents/CodingComponent";
import RadioComponent from "../QuizTestComponents/RadioComponent";
import "./SingleQuestion.style.scss";
import { clear } from "console";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CaluclateTotalNumberOfAnswers,
  findInnerArrayElement,
  optionIds,
} from "../../utils/Utils";
import { submitQuiz } from "../../api/apiAgent";
import Swal from "sweetalert2";
import { QuestionAnswer } from "@material-ui/icons";

const SingleQuestion = (props: any) => {
  const { openDialog, handleClose, setOpenDialog, quizQuestions, quizId } =
    props;

  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [selectedAnswers, setSelectedAnswers] = useState<any>([]);
  const [progressStatus, setProgressStatus] = useState<number>(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number>(0);
  const [timer, setTimer] = useState("00:00:00");
  const [openEndDialog, setOpenEndDialog] = useState<boolean>(false);
  const [timeCompletd, setTimeCompleted] = useState<boolean>(false);

  const Ref = useRef<any>();
  const navigate = useNavigate();

  const moveToNextQuestion = () => {
    setCurrentQuestion((prev) => prev + 1);
  };
  const moveToPreviousQuestion = () => {
    setCurrentQuestion((prev) => prev - 1);
  };

  const handleRadioAnswerChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    questionData: any,
    questionAnswerIds: any
  ) => {
    const selectedAns = (event.target as HTMLInputElement).value;

    const existingId = selectedAnswers.filter((cur: any) => {
      return (
        cur.subjectName === questionData.subjectName &&
        cur.setNumber === questionData.setNumber &&
        cur.quizAnswers.find((elem: any) => {
          return elem.questionId === questionData.questionId;
        })
      );
    });
    const existingSetAndSubject = selectedAnswers.filter((cur: any) => {
      return (
        cur.subjectName === questionData.subjectName &&
        cur.setNumber === questionData.setNumber
      );
    });
    const indexOFExistingSetAndSubject = selectedAnswers.findIndex(
      (obj: any) =>
        obj.subjectName === questionData.subjectName &&
        obj.setNumber === questionData.setNumber
    );
    if (indexOFExistingSetAndSubject !== -1) {
      var quizAnswerIndex = selectedAnswers[
        indexOFExistingSetAndSubject
      ].quizAnswers.findIndex(
        (item: any) => item.questionId === questionData.questionId
      );
    }

    if (existingId[0]) {
      const newArr = [...selectedAnswers];
      newArr[indexOFExistingSetAndSubject].quizAnswers[
        quizAnswerIndex
      ].questionAnswerIds = questionAnswerIds;
      newArr[indexOFExistingSetAndSubject].quizAnswers[
        quizAnswerIndex
      ].questionAnswers = [selectedAns];
      setSelectedAnswers(newArr);
    } else if (existingSetAndSubject[0]) {
      const newArr = [...selectedAnswers];
      newArr[indexOFExistingSetAndSubject].quizAnswers.push({
        questionId: questionData.questionId,
        questionType: questionData.questionType,
        questionAnswers: [selectedAns],
        questionAnswerIds: questionAnswerIds,
      });
      setSelectedAnswers(newArr);
      handleProgressStatus();
    } else {
      setSelectedAnswers((prev: any) => [
        ...prev,
        {
          subjectName: questionData.subjectName,
          setNumber: questionData.setNumber,
          quizAnswers: [
            {
              questionId: questionData.questionId,
              questionType: questionData.questionType,
              questionAnswers: [selectedAns],
              questionAnswerIds: questionAnswerIds,
            },
          ],
        },
      ]);
      handleProgressStatus();
    }
  };

  const handleProgressStatus = () => {
    const statusPercentage =
      ((answeredQuestions + 1) * 100) / quizQuestions.data.length;
    setAnsweredQuestions((prev) => prev + 1);
    setProgressStatus(statusPercentage);
  };

  const handleCheckboxAnswerChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    questionData: any,
    selectedIndex: any
  ) => {
    const indexOFExistingSetAndSubject = selectedAnswers.findIndex(
      (obj: any) =>
        obj.subjectName === questionData.subjectName &&
        obj.setNumber === questionData.setNumber
    );
    let quizAnswerIndex;
    if (indexOFExistingSetAndSubject !== -1) {
      quizAnswerIndex = selectedAnswers[
        indexOFExistingSetAndSubject
      ].quizAnswers.findIndex(
        (item: any) => item.questionId === questionData.questionId
      );
    }

    // const existingIdIndex = selectedAnswers.findIndex(
    //   (cur: any) =>
    //     cur.subjectName === questionData.subjectName &&
    //     cur.setNumber === questionData.setNumber &&
    //     cur.quizAnswers.find((elem: any) => {
    //       return elem.questionId === questionData.questionId;
    //     })
    // );

    if (indexOFExistingSetAndSubject !== -1) {
      if (quizAnswerIndex !== -1 && !event.target.checked) {
        const newArr = [...selectedAnswers];

        var ansIndex = newArr[indexOFExistingSetAndSubject].quizAnswers[
          quizAnswerIndex
        ].questionAnswers.indexOf(event.target.name);

        if (ansIndex !== -1) {
          newArr[indexOFExistingSetAndSubject].quizAnswers[
            quizAnswerIndex
          ].questionAnswers.splice(ansIndex, 1);

          newArr[indexOFExistingSetAndSubject].quizAnswers[
            quizAnswerIndex
          ].questionAnswerIds.splice(ansIndex, 1);
        }

        setSelectedAnswers(newArr);
      } else if (quizAnswerIndex !== -1) {
        const newArr = [...selectedAnswers];
        const answerData = newArr[indexOFExistingSetAndSubject].quizAnswers[
          quizAnswerIndex
        ].questionAnswers.push(event.target.name);
        newArr[indexOFExistingSetAndSubject].quizAnswers[
          quizAnswerIndex
        ].questionAnswerIds.push(optionIds[selectedIndex]);

        setSelectedAnswers(newArr);
      } else if (quizAnswerIndex === -1) {
        const newArr = [...selectedAnswers];
        newArr[indexOFExistingSetAndSubject].quizAnswers.push({
          questionId: questionData.questionId,
          questionType: questionData.questionType,
          questionAnswers: [event.target.name],
          questionAnswerIds: [optionIds[selectedIndex]],
        });
        setSelectedAnswers(newArr);
        handleProgressStatus();
      }
    } else {
      setSelectedAnswers((prev: any) => [
        ...prev,
        {
          subjectName: questionData.subjectName,
          setNumber: questionData.setNumber,
          quizAnswers: [
            {
              questionId: questionData.questionId,
              questionType: questionData.questionType,
              questionAnswers: [event.target.name],
              questionAnswerIds: [optionIds[selectedIndex]],
            },
          ],
        },
      ]);
      handleProgressStatus();
    }
  };

  const getTimeRemaining = (e: any) => {
    const total =
      Date.parse(e.toISOString()) - Date.parse(new Date().toISOString());
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

  if (timeCompletd) {
    const submitQuizData = {
      quizId: parseInt(quizId),
      data: selectedAnswers,
    };
    submitQuiz(submitQuizData)
      .then((response: any) => {
        Swal.fire({
          title: "Success",
          text: "Test Submitted Succesfully",
          icon: "success",
          confirmButtonText: "Okay",
        });
      })
      .then((res: any) => {
        const answeredQuestions =
          CaluclateTotalNumberOfAnswers(selectedAnswers);
        navigate("/test_submitted", {
          state: {
            totalNumberOfQuestions: quizQuestions.data.length,
            answered: answeredQuestions,
            notAnswered: quizQuestions.data.length - answeredQuestions,
          },
        });
      })
      .catch((error: any) => {
        Swal.fire({
          title: "error",
          text: "Failed to Submitt Test, Please Retry",
          icon: "error",
          confirmButtonText: "Okay",
        });
      });
  }

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
      clearInterval(Ref.current);
      setTimeCompleted(true);
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
    deadline.setMinutes(deadline.getMinutes() + 10);
    return deadline;
  };

  useEffect(() => {
    clearTimer(getDeadTime());
  }, []);

  return (
    <>
      <Box className="progress-box">
        <Box className="progress-data">
          <Typography variant="body1">{`Answered ${answeredQuestions} out of ${quizQuestions.data?.length}`}</Typography>
          <Typography variant="body1">{`Time Remaining - ${timer}`}</Typography>
        </Box>
        <LinearProgress
          value={progressStatus}
          variant={"determinate"}
          color={"primary"}
        />
      </Box>

      <Box>
        {quizQuestions.data &&
          quizQuestions.data.map((question: any, index: any) => {
            if (index + 1 === currentQuestion) {
              switch (question.questionType) {
                case "SINGLECHOICE":
                  return (
                    <RadioComponent
                      key={index}
                      questionInfo={{
                        questionNumber: index + 1,
                        questionData: question,
                      }}
                      handleAnswerChange={handleRadioAnswerChange}
                      selectedAnswers={selectedAnswers}
                    />
                  );
                case "MULTIPLECHOICE":
                  return (
                    <CheckboxComponent
                      key={index}
                      questionInfo={{
                        questionNumber: index + 1,
                        questionData: question,
                      }}
                      handleCheckboxAnswerChange={handleCheckboxAnswerChange}
                      selectedAnswers={selectedAnswers}
                    />
                  );
                case "PROGRAM":
                  return <CodingComponent key={index} question={question} />;
                default:
                  return null;
              }
            }
          })}
      </Box>
      <Box className="test-buttons-box">
        {currentQuestion <= quizQuestions.data.length && currentQuestion > 1 && (
          <Button
            variant="outlined"
            onClick={moveToPreviousQuestion}
            className="test-button"
          >
            Previous
          </Button>
        )}
        {currentQuestion < quizQuestions.data.length && (
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
          onClick={() => {
            setOpenEndDialog(true);
            setOpenDialog(true);
          }}
          className="end-test-btn"
        >
          Submit Test
        </Button>
      </Box>
      {openEndDialog && (
        <EndTestDialog
          openDialog={openDialog}
          handleClose={handleClose}
          setOpenDialog={setOpenDialog}
          selectedAnswers={selectedAnswers}
          totalNumberOfQuestions={quizQuestions.data.length}
          Ref={Ref}
          quizId={quizQuestions.quizId}
          setOpenEndDialog={setOpenDialog}
        />
      )}
    </>
  );
};

export default SingleQuestion;
