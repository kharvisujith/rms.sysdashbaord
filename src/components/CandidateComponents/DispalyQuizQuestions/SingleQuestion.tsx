import { Box, Button, LinearProgress, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import EndTestDialog from "../EndTest/EndTestDialog";
import CheckboxComponent from "../QuizTestComponents/CheckboxComponent";
import CodingComponent from "../QuizTestComponents/CodingComponent";
import RadioComponent from "../QuizTestComponents/RadioComponent";
import "./SingleQuestion.style.scss";
import { useNavigate } from "react-router-dom";
import { CaluclateTotalNumberOfAnswers, optionIds } from "../../../utils/Utils";
import {
  quizAnswers,
  selectedAnswersBody,
  submitQuizRequestBody,
} from "../../../Interface/Candidate/CandidateInterface";

import Swal from "sweetalert2";

import { apiAgent } from "../../../api/apiAgent";

const SingleQuestion = (props: any) => {
  const { quizQuestions, quizId } = props;

  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [selectedAnswers, setSelectedAnswers] = useState<selectedAnswersBody[]>(
    []
  );
  const [progressStatus, setProgressStatus] = useState<number>(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number>(0);
  const [timer, setTimer] = useState<any>();
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

    const existingId = selectedAnswers.filter((cur: selectedAnswersBody) => {
      return (
        cur.subjectName === questionData.subjectName &&
        cur.version === questionData.version &&
        cur.quizAnswers.find((elem: any) => {
          return elem.questionId === questionData.questionId;
        })
      );
    });
    const existingSetAndSubject = selectedAnswers.filter(
      (cur: selectedAnswersBody) => {
        return (
          cur.subjectName === questionData.subjectName &&
          cur.version === questionData.version
        );
      }
    );
    const indexOFExistingSetAndSubject = selectedAnswers.findIndex(
      (obj: selectedAnswersBody) =>
        obj.subjectName === questionData.subjectName &&
        obj.version === questionData.version
    );
    var quizAnswerIndex: any;
    if (indexOFExistingSetAndSubject !== -1) {
      quizAnswerIndex = selectedAnswers[
        indexOFExistingSetAndSubject
      ].quizAnswers.findIndex(
        (item: quizAnswers) => item.questionId === questionData.questionId
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
      setSelectedAnswers((prev: selectedAnswersBody[]) => [
        ...prev,
        {
          subjectName: questionData.subjectName,
          version: questionData.version,
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
      ((answeredQuestions + 1) * 100) / quizQuestions.length;
    setAnsweredQuestions((prev) => prev + 1);
    setProgressStatus(statusPercentage);
  };

  const handleCheckboxAnswerChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    questionData: any,
    selectedIndex: any
  ) => {
    const indexOFExistingSetAndSubject = selectedAnswers.findIndex(
      (obj: selectedAnswersBody) =>
        obj.subjectName === questionData.subjectName &&
        obj.version === questionData.version
    );
    let quizAnswerIndex: any;
    if (indexOFExistingSetAndSubject !== -1) {
      quizAnswerIndex = selectedAnswers[
        indexOFExistingSetAndSubject
      ].quizAnswers.findIndex(
        (item: quizAnswers) => item.questionId === questionData.questionId
      );
    }

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
      setSelectedAnswers((prev: selectedAnswersBody[]) => [
        ...prev,
        {
          subjectName: questionData.subjectName,
          version: questionData.version,
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

  const getTimeRemaining = (time: any) => {
    const total =
      Date.parse(time.toISOString()) - Date.parse(new Date().toISOString());
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

  const autoSubmitQuiz = async (submitQuizData: submitQuizRequestBody) => {
    try {
      const res = await apiAgent.candidate.submitQuiz(submitQuizData);
      if (res.status === 200) {
        localStorage.clear();
        Swal.fire({
          title: "Success",
          text: "Test Submitted Succesfully",
          icon: "success",
          confirmButtonText: "Okay",
          customClass: "swal-alert",
        });
      }
      const answeredQuestions = CaluclateTotalNumberOfAnswers(selectedAnswers);
      localStorage.clear();
      navigate("/test_submitted", {
        state: {
          totalNumberOfQuestions: quizQuestions.length,
          answered: answeredQuestions,
          notAnswered: quizQuestions.length - answeredQuestions,
        },
      });
    } catch (error: any) {
      console.log("error in submit quiz by time");
    }
  };

  if (timeCompletd) {
    const totalAnswered = CaluclateTotalNumberOfAnswers(selectedAnswers);
    const submitQuizData: submitQuizRequestBody = {
      quizId: parseInt(quizId),
      totalQuestions: quizQuestions.length,
      answeredQuestions: totalAnswered,
      notAnsweredQuestions: quizQuestions.length - totalAnswered,
      data: selectedAnswers,
    };

    autoSubmitQuiz(submitQuizData);
  }

  const startTimer = (time: any) => {
    let { total, hours, minutes, seconds } = getTimeRemaining(time);
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

  const clearTimer = (time: any) => {
    const id = setInterval(() => {
      startTimer(time);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = (remainingTime?: any) => {
    if (remainingTime) {
      let deadline = new Date();
      const hour = remainingTime.substring(0, 2);
      const min = remainingTime.substring(3, 5);
      const sec = remainingTime.substring(6, 8);
      deadline.setHours(deadline.getHours() + parseInt(hour));
      deadline.setMinutes(deadline.getMinutes() + parseInt(min));
      deadline.setSeconds(deadline.getSeconds() + parseInt(sec));
      return deadline;
    } else {
      let deadline = new Date();
      deadline.setMinutes(deadline.getMinutes() + quizQuestions.length);
      return deadline;
    }
  };

  const alertUser = (e: any) => {
    e.preventDefault();
    e.returnValue = "";
  };

  useEffect(() => {
    window.addEventListener("beforeunload", alertUser);
    return () => {
      window.removeEventListener("beforeunload", alertUser);
    };
  }, []);

  useEffect(() => {
    if (
      localStorage.getItem("timer") === "undefined" ||
      !localStorage.getItem("timer")
    ) {
      clearTimer(getDeadTime());
    } else {
      clearTimer(getDeadTime(localStorage.getItem("timer")));
    }
  }, []);

  useEffect(() => {
    if (timer) {
      localStorage.setItem("timer", timer);
    }
  }, [timer]);

  return (
    <>
      <Box className="question-container">
        <Box className="progress-box">
          <Box className="progress-data">
            <Typography variant="body1">{`Answered ${answeredQuestions} out of ${quizQuestions.length}`}</Typography>
            {timer && (
              <Typography variant="body1">{`Time Remaining - ${timer}`}</Typography>
            )}
          </Box>
          <LinearProgress
            value={progressStatus}
            variant={"determinate"}
            color={"primary"}
          />
        </Box>

        <Box className="questions">
          {quizQuestions &&
            quizQuestions.map((question: any, index: any) => {
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
          {currentQuestion <= quizQuestions.length && currentQuestion > 1 && (
            <Button
              variant="outlined"
              onClick={moveToPreviousQuestion}
              className="test-button"
            >
              Previous
            </Button>
          )}
          {currentQuestion < quizQuestions.length && (
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
            variant="contained"
            onClick={() => {
              setOpenEndDialog(true);
            }}
            className="end-test-btn"
          >
            Submit Test
          </Button>
        </Box>
        {openEndDialog && (
          <EndTestDialog
            selectedAnswers={selectedAnswers}
            totalNumberOfQuestions={quizQuestions.length}
            Ref={Ref}
            quizId={quizId}
            openEndDialog={openEndDialog}
            setOpenEndDialog={setOpenEndDialog}
          />
        )}
      </Box>
    </>
  );
};

export default SingleQuestion;
