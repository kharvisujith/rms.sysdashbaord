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
  } = props;

  const [validationError, setValidationError] = useState<boolean>(false);

  const handleEditFieldChange = (event: any) => {
    console.log(event.target.value, event.target.name);

    switch (event.target.name) {
      case "questionType":
        event.target.value === "SINGLECHOICE" &&
        editQuestionDetails.questionAnswers.length > 1
          ? setValidationError(true)
          : setValidationError(false);

        setEditQuestionDetails((prev: questionsForSetWithAnswers) => ({
          ...prev,
          [event.target.name]: event.target.value,
        }));
        break;

      case "question":
        setEditQuestionDetails((prev: questionsForSetWithAnswers) => ({
          ...prev,
          [event.target.name]: event.target.value,
        }));
        break;

      case "questionOptions":
        setEditQuestionDetails((prev: questionsForSetWithAnswers) => ({
          ...prev,
          [event.target.name]: event.target.value.split(","),
        }));
        break;

      case "questionAnswers":
        event.target.value.split(",").length > 1 &&
        editQuestionDetails.questionType === "SINGLECHOICE"
          ? setValidationError(true)
          : setValidationError(false);

        setEditQuestionDetails((prev: questionsForSetWithAnswers) => ({
          ...prev,
          [event.target.name]: event.target.value.split(","),
        }));
        break;

      default:
        return;
    }

    // if (
    //   event.target.name === "questionAnswers" ||
    //   event.target.name === "questionOptions"
    // ) {
    //   setEditQuestionDetails((prev: questionsForSetWithAnswers) => ({
    //     ...prev,
    //     [event.target.name]: event.target.value.split(","),
    //   }));
    // } else {
    //   setEditQuestionDetails((prev: questionsForSetWithAnswers) => ({
    //     ...prev,
    //     [event.target.name]: event.target.value,
    //   }));
    // }
  };

  const handleSaveReference = () => {
    if (
      editQuestionDetails.questionType === "SINGLECHOICE" &&
      editQuestionDetails.questionAnswers.length > 1
    ) {
      setValidationError(true);
    } else {
      const questionAnswerIds = optionIds.filter((ele: any, index: number) =>
        editQuestionDetails.questionAnswers.includes(
          editQuestionDetails.questionOptions[index]
        )
      );

      const updateQuesitonBody = {
        questionId: editQuestionDetails.questionId,
        question: editQuestionDetails.question,
        questionType: editQuestionDetails.questionType,
        questionOptions: editQuestionDetails.questionOptions.toString(),
        questionAnswers: editQuestionDetails.questionAnswers.toString(),
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

  const [alreadyEditedIndex, setAlreadyEditedIndex] = useState<number>(-1);

  useEffect(() => {
    const checkAlreadyEdited = () => {
      console.log("check already edited called");
      if (editedQuestions) {
        const existingIndex = editedQuestions?.updateQuizDetails.findIndex(
          (question: questionForUpdate) =>
            question.questionId === editQuestionDetails.questionId
        );
        console.log("existing index in checkAlready edited is", existingIndex);
        setAlreadyEditedIndex(existingIndex);
      }
      // else{
      //   setAlreadyEditedIndex(-1)
      // }
    };
    checkAlreadyEdited();
  }, [anchorElEdit]);

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
              value={editQuestionDetails?.questionType}
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
              //  editQuestionDetails?.question
              alreadyEditedIndex === -1
                ? editQuestionDetails?.question
                : editedQuestions?.updateQuizDetails[alreadyEditedIndex]
                    .question
              // checkAlreadyEdited() === -1
              //   ? editQuestionDetails?.question
              //   : editedQuestions.updateQuizDetails[checkAlreadyEdited()]
              //       .question
            }
            multiline={true}
            onChange={handleEditFieldChange}
          />

          <TextField
            label="Options"
            type="text"
            variant="standard"
            name="questionOptions"
            value={editQuestionDetails?.questionOptions.toString()}
            multiline={true}
            onChange={handleEditFieldChange}
          />

          <TextField
            label="Answer"
            type="text"
            variant="standard"
            name="questionAnswers"
            value={editQuestionDetails?.questionAnswers.toString()}
            multiline={true}
            onChange={handleEditFieldChange}
          />
          {validationError && (
            <Typography color="error" variant="body2">
              {`Single Choice Questions Can Have Only One Answer`}
            </Typography>
          )}

          <Button
            name="LinkExpiryTime"
            variant="outlined"
            onClick={handleSaveReference}
          >
            Save As Reference
          </Button>
        </Box>
      </Popover>
    </>
  );
};
export default EditPopover;
