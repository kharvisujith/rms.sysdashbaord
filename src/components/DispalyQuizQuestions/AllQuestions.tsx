import { jsQuestions } from "../../questions/questions";
import CheckboxComponent from "../QuizTestComponents/CheckboxComponent";
import RadioComponent from "../QuizTestComponents/RadioComponent";
import CodingComponent from "../QuizTestComponents/CodingComponent";
import { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import EndTestDialog from "../EndTest/EndTestDialog";
import { LinearProgress } from "@mui/material";

const AllQuestions = (props: any) => {
  // const { openDialog, handleClose, setOpenDialog } = props;
  const { openDialog, handleClose, setOpenDialog, quizQuestions } = props;
  const [selectedAnswers, setSelectedAnswers] = useState<any>([]);
  const [progressStatus, setProgressStatus] = useState<number>(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number>(0);
  const [totalNumberOfQuestions, setTotolNumberOfQuestions] = useState<number>(
    quizQuestions.length
  );

  const handleProgressStatus = () => {
    console.log("handePrgressstatus called");
    const statusPercentage =
      ((answeredQuestions + 1) * 100) / totalNumberOfQuestions;
    setAnsweredQuestions((prev) => prev + 1);
    console.log("value of st is", statusPercentage);
    setProgressStatus(statusPercentage);
  };

  const handleRadioAnswerChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    questionId: any
  ) => {
    const selectedOption = (event.target as HTMLInputElement).value;
    const existingId = selectedAnswers.find((e: any) => e.id === questionId);
    if (existingId) {
      existingId.choosenAnswer = selectedOption;
    } else {
      setSelectedAnswers((prev: any) => [
        ...prev,
        { questionId: questionId, choosenAnswer: [selectedOption] },
      ]);
      handleProgressStatus();
    }
  };

  const handleCheckboxAnswerChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    questionId: any
  ) => {
    const existingId = selectedAnswers.find(
      (e: any) => e.questionId === questionId
    );
    if (existingId) {
      const valExist = existingId.choosenAnswer.find(
        (e: any) => e === event.target.name
      );

      if (valExist && !event.target.checked) {
        var index = existingId.choosenAnswer.indexOf(event.target.name);
        if (index !== -1) {
          existingId.choosenAnswer.splice(index, 1);
        }
      } else {
        existingId.choosenAnswer.push(event.target.name);
      }
    } else {
      setSelectedAnswers((prev: any) => [
        ...prev,
        { questionId: questionId, choosenAnswer: [event.target.name] },
      ]);
      handleProgressStatus();
    }
  };

  // const handleTestSubmit = () => {
  //   setOpenDialog(true);
  //   console.log("The submited answer set is", selectedAnswers);
  //   //setConfirmSubmit(true);
  // };

  console.log("value of selectedAnswers is", selectedAnswers);

  return (
    <>
      <Typography>{`Answered ${answeredQuestions} out of ${totalNumberOfQuestions}`}</Typography>
      <LinearProgress
        value={progressStatus}
        variant={"determinate"}
        color={"primary"}
      />
      {quizQuestions.map((question: any, index: any) => {
        switch (question.questionType) {
          case "SINGLECHOICE":
            return (
              <RadioComponent
                key={index}
                question={{ questionNumber: index + 1, questionData: question }}
                handleAnswerChange={handleRadioAnswerChange}
              />
            );
          case "MULTIPLECHOICE":
            return (
              <CheckboxComponent
                key={index}
                question={{ questionNumber: index + 1, questionData: question }}
                handleCheckboxAnswerChange={handleCheckboxAnswerChange}
              />
            );
          case "PROGRAMM":
            return <CodingComponent key={index} question={question} />;
          default:
            return null;
        }
      })}

      <Box>
        <Typography>{`Answered ${answeredQuestions} out of ${totalNumberOfQuestions}`}</Typography>
        <LinearProgress
          value={progressStatus}
          variant={"determinate"}
          color={"primary"}
        />
      </Box>
      <Box style={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          color="error"
          onClick={() => setOpenDialog(true)}
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

export default AllQuestions;
