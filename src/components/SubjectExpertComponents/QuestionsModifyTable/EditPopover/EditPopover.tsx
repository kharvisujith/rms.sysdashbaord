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
import { useState } from "react";
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
    console.log("save refernce is called");
    if (
      editQuestionDetails.questionType === "SINGLECHOICE" &&
      editQuestionDetails.questionAnswers.length > 1
    ) {
      console.log("in error part");
      setValidationError(true);
    } else {
      console.log("outside validation error");
      const questionAnswerIds = optionIds.filter((ele: any, index: number) =>
        editQuestionDetails.questionAnswers.includes(
          editQuestionDetails.questionOptions[index]
        )
      );
      console.log("quesiton anserr ids is", questionAnswerIds);

      const updateQuesitonBody = {
        questionId: editQuestionDetails.questionId,
        question: editQuestionDetails.question,
        questionType: editQuestionDetails.questionType,
        questionOptions: editQuestionDetails.questionOptions.toString(),
        questionAnswers: editQuestionDetails.questionAnswers.toString(),
        questionAnswerIds: questionAnswerIds?.toString(),
      };
      console.log("update quesiton body is", updateQuesitonBody);

      if (editedQuestions?.version) {
        console.log("not first time");
        const existingIndex = editedQuestions.updateQuizDetails.findIndex(
          (ele: questionForUpdate) =>
            ele.questionId === editQuestionDetails.questionId
        );

        console.log("exising index is", existingIndex);

        if (existingIndex === -1) {
          const newArr = [...editedQuestions.updateQuizDetails];
          newArr.push(updateQuesitonBody);
          console.log("new Array is", newArr);
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
        console.log("its first time babe");
        setEditedQuestions({
          version: editQuestionDetails.version,
          subjectName: editQuestionDetails.subjectName,
          tag: editQuestionDetails.tag,
          updateQuizDetails: [updateQuesitonBody],

          // updateQuizDetails: [
          //   {
          //     questionId: editQuestionDetails.questionId,
          //     question: editQuestionDetails.question,
          //     questionType: editQuestionDetails.questionType,
          //     questionOptions: editQuestionDetails.questionOptions.toString(),
          //     questionAnswers: editQuestionDetails.questionAnswers.toString(),
          //     questionAnswerIds: questionAnswerIds?.toString(),
          //   },
          // ],
        });
        console.log("keekkekeekekekekekek");
      }
    }
    setAnchorElEdit(null);
  };

  console.log("value of question detail in popover is", editQuestionDetails);
  console.log("edited quesitons details is", editedQuestions);

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
            value={editQuestionDetails?.question}
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
