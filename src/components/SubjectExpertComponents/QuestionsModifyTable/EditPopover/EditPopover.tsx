import { Typography } from "@material-ui/core";
import {
  Popover,
  Box,
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  questionForUpdate,
  questionsForSetWithAnswers,
  UpdateQuestionsSet,
} from "../../../../Interface/SubjectExpert/SubjectExpert";
import { optionIds } from "../../../../utils/Utils";
import "./EditPopver.styles.scss";

const EditPopover = (props: any) => {
  const {
    anchorElEdit,
    setAnchorElEdit,
    handleCloseEdit,
    editQuestionDetails,
    setEditQuestionDetails,
    editedQuestions,
    setEditedQuestions,
    tempQuestionData,
    setTempQuestionData,
    questionIndexInTempData,
    setQuestionIndexInTempData,
    modifyQuestionsData,
    setModifyQuestionsData,
  } = props;

  const [validationError, setValidationError] = useState<any>({
    questionType: false,
    questionAnswers: false,
  });
  const [currentQuesitonNumber, setCurrentQuestionNumber] = useState<number>(0);

  const handleEditFieldChange = (event: any) => {
    console.log(event.target.value, event.target.name);
    const indexofQuestion = tempQuestionData.findIndex(
      (ele: questionsForSetWithAnswers) =>
        ele.questionId === editQuestionDetails.questionId
    );
    const newArr = [...tempQuestionData];
    switch (event.target.name) {
      case "questionType":
        event.target.value === "SINGLECHOICE" &&
        tempQuestionData[indexofQuestion].questionAnswers.length > 1
          ? setValidationError((prev: any) => ({
              ...prev,
              questionType: true,
            }))
          : setValidationError((prev: any) => ({
              ...prev,
              questionType: false,
            }));

        newArr[indexofQuestion].questionType = event.target.value;
        setTempQuestionData(newArr);

        break;

      case "question":
        newArr[indexofQuestion].question = event.target.value;
        setTempQuestionData(newArr);
        break;

      case "questionOptions":
        newArr[indexofQuestion].questionOptions = event.target.value.split(",");
        setTempQuestionData(newArr);
        break;

      case "questionAnswers":
        const data = event.target.value.split(",");
        data.length > 1 &&
        tempQuestionData[indexofQuestion].questionType === "SINGLECHOICE"
          ? setValidationError((prev: any) => ({
              ...prev,
              questionType: true,
            }))
          : setValidationError((prev: any) => ({
              ...prev,
              questionType: false,
            }));

        const allPresent = data.every((elem: any) =>
          tempQuestionData[indexofQuestion].questionOptions.includes(elem)
        );
        allPresent
          ? setValidationError((prev: any) => ({
              ...prev,
              questionAnswers: false,
            }))
          : setValidationError((prev: any) => ({
              ...prev,
              questionAnswers: true,
            }));

        // tempQuestionData[indexofQuestion].questionOptions.includes();
        newArr[indexofQuestion].questionAnswers = event.target.value.split(",");
        setTempQuestionData(newArr);

        break;

      default:
        return;
    }
  };
  console.log("tempData is", tempQuestionData);

  const handleSaveReference = () => {
    if (
      editQuestionDetails.questionType === "SINGLECHOICE" &&
      editQuestionDetails.questionAnswers.length > 1
    ) {
      setValidationError(true);
    } else {
      const indexofQuestion = tempQuestionData.findIndex(
        (ele: questionsForSetWithAnswers) =>
          ele.questionId === editQuestionDetails.questionId
      );

      const questionAnswerIds = optionIds.filter((ele: any, index: number) =>
        tempQuestionData[indexofQuestion].questionAnswers.includes(
          tempQuestionData[indexofQuestion].questionOptions[index]
        )
      );
      console.log("quesion ansers ids ", questionAnswerIds);

      // const updateQuesitonBody = {
      //   questionId: editQuestionDetails.questionId,
      //   question: editQuestionDetails.question,
      //   questionType: editQuestionDetails.questionType,
      //   questionOptions: editQuestionDetails.questionOptions.toString(),
      //   questionAnswers: editQuestionDetails.questionAnswers.toString(),
      //   questionAnswerIds: questionAnswerIds?.toString(),
      // };
      const updateQuesitonBody = {
        questionId: tempQuestionData[indexofQuestion].questionId,
        question: tempQuestionData[indexofQuestion].question,
        questionType: tempQuestionData[indexofQuestion].questionType,
        questionOptions:
          tempQuestionData[indexofQuestion].questionOptions.toString(),
        questionAnswers:
          tempQuestionData[indexofQuestion].questionAnswers.toString(),
        questionAnswerIds: questionAnswerIds?.toString(),
      };

      if (editedQuestions?.version) {
        const existingIndex = editedQuestions.updateQuizDetails.findIndex(
          (ele: questionForUpdate) =>
            ele.questionId === editQuestionDetails.questionId
        );

        if (existingIndex === -1) {
          const newArr = [...editedQuestions.updateQuizDetails];
          newArr.push(updateQuesitonBody);
          setEditedQuestions((prev: UpdateQuestionsSet) => ({
            ...prev,
            updateQuizDetails: newArr,
          }));
        } else {
          const newArr = [...editedQuestions.updateQuizDetails];
          newArr[existingIndex] = updateQuesitonBody;
          setEditedQuestions((prev: UpdateQuestionsSet) => ({
            ...prev,
            updateQuizDetails: newArr,
          }));
        }
      } else {
        setEditedQuestions({
          version: editQuestionDetails.version,
          subjectName: editQuestionDetails.subjectName,
          tag: editQuestionDetails.tag,
          updateQuizDetails: [updateQuesitonBody],
        });
      }
    }
    setAnchorElEdit(null);
  };
  console.log("edited array on save pref is", editedQuestions);

  // const checkAlreadyEdited = () => {
  //   const existingIndex = editedQuestions?.updateQuizDetails.findIndex(
  //     (question: questionForUpdate) =>
  //       question.questionId === editQuestionDetails.questionId
  //   );
  //   console.log("existing index in checkAlready edited is", existingIndex);

  //   return existingIndex === -1 ? -1 : existingIndex;
  // };

  console.log("value of question detail in popover is", editQuestionDetails);
  console.log("edited quesitons details is", editedQuestions);

  // const [questionIndexInTempData, setQuestionIndexInTempData] =
  //   useState<number>(-1);

  // useEffect(() => {
  //   // if(tempQuestionDetails?.length <1){
  //   //   tempQuestionDetails.push(editQuestionDetails)
  //   // }
  //   // else{

  //   // }
  //   const checkAlreadyEdited = () => {
  //     console.log("check already edited called");
  //     if (editedQuestions) {
  //       const existingIndex = editedQuestions?.updateQuizDetails.findIndex(
  //         (question: questionForUpdate) =>
  //           question.questionId === editQuestionDetails.questionId
  //       );
  //       console.log("existing index in checkAlready edited is", existingIndex);
  //       setAlreadyEditedIndex(existingIndex);
  //     }
  //     // else{
  //     //   setAlreadyEditedIndex(-1)
  //     // }
  //   };
  //   checkAlreadyEdited();
  // }, [anchorElEdit]);

  useEffect(() => {
    const questionNumberInModifyQuestons = modifyQuestionsData?.findIndex(
      (obj: questionsForSetWithAnswers) =>
        obj.questionId === editQuestionDetails?.questionId
    );
    if (questionNumberInModifyQuestons > -1) {
      setCurrentQuestionNumber(questionNumberInModifyQuestons + 1);
    }
    console.log("question number of popoer is", questionNumberInModifyQuestons);

    if (tempQuestionData[0]) {
      console.log("inside if part");
      const existingIndex = tempQuestionData?.findIndex(
        (ele: questionsForSetWithAnswers) =>
          ele.questionId === editQuestionDetails?.questionId
      );
      setQuestionIndexInTempData(existingIndex);
      if (existingIndex === -1) {
        setTempQuestionData((prev: questionsForSetWithAnswers[]) => [
          ...prev,
          editQuestionDetails,
        ]);
      }
    } else {
      console.log("inside else part");
      setTempQuestionData([editQuestionDetails]);
      // here we have get from modifyQuetionData
      setQuestionIndexInTempData(editQuestionDetails?.questionId);
    }
  }, [anchorElEdit]);

  console.log(
    "value of temp is ",
    tempQuestionData,
    tempQuestionData[0]?.questionType
  );
  console.log("edit quesiton details is", editQuestionDetails);

  return (
    <>
      <Popover
        open={Boolean(anchorElEdit)}
        anchorEl={anchorElEdit}
        onClose={handleCloseEdit}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box className="edit-popover-container">
          <FormControl variant="standard">
            <InputLabel>Question Type</InputLabel>
            <Select
              // value={tempQuestionData[0]}
              value={
                tempQuestionData[questionIndexInTempData]?.questionType
                  ? tempQuestionData[questionIndexInTempData].questionType
                  : editQuestionDetails?.questionType
              }
              onChange={handleEditFieldChange}
              label="QuestionType"
              name="questionType"
            >
              <MenuItem value={"SINGLECHOICE"}>Single Choice</MenuItem>
              <MenuItem value={"MULTIPLECHOICE"}>Multiple Choice</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Question"
            type="text"
            variant="standard"
            name="question"
            value={
              tempQuestionData[questionIndexInTempData]?.question
                ? tempQuestionData[questionIndexInTempData].question
                : editQuestionDetails?.question
            }
            multiline={true}
            onChange={handleEditFieldChange}
          />

          <TextField
            label="Options"
            type="text"
            variant="standard"
            name="questionOptions"
            // value={editQuestionDetails?.questionOptions.toString()}
            value={
              tempQuestionData[questionIndexInTempData]?.questionOptions
                ? tempQuestionData[questionIndexInTempData]?.questionOptions
                : editQuestionDetails?.questionOptions
            }
            multiline={true}
            onChange={handleEditFieldChange}
          />

          <TextField
            label="Answer"
            type="text"
            variant="standard"
            name="questionAnswers"
            // value={editQuestionDetails?.questionAnswers.toString()}
            value={
              tempQuestionData[questionIndexInTempData]?.questionAnswers
                ? tempQuestionData[questionIndexInTempData]?.questionAnswers
                : editQuestionDetails?.questionAnswers
            }
            multiline={true}
            onChange={handleEditFieldChange}
          />
          {validationError.questionType && (
            <Typography color="error" variant="body2">
              {`Single Choice Questions Can Have Only One Answer`}
            </Typography>
          )}
          {validationError.questionAnswers && (
            <Typography color="error" variant="body2">
              {`Answers Should always be one among the options`}
            </Typography>
          )}

          <Button
            name="LinkExpiryTime"
            variant="outlined"
            onClick={handleSaveReference}
          >
            Save Reference
          </Button>
        </Box>
      </Popover>
    </>
  );
};
export default EditPopover;
