import { Typography } from "@material-ui/core";
import { QuestionAnswer } from "@material-ui/icons";
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
import { useCallback, useEffect, useMemo, useState } from "react";
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
    orignalData,
    editedQuestionNumbers,
    setEditedQuestionNumbers,
  } = props;

  const [validationError, setValidationError] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [currentQuestionId, setCurrentQuestionId] = useState<any>();
  const [saveRefDisabled, setSaveRefDisabled] = useState<boolean>(true);

  const HandlValidationsChange = (type: string) => {
    switch (type) {
      case "questionType-add":
        if (validationError.length < 1) {
          setValidationError([
            {
              questionId: tempQuestionData[currentQuestionIndex].questionId,
              questionType: true,
              questionAnswers: false,
            },
          ]);
        } else {
          const existingIndex = validationError.findIndex(
            (cur: any) =>
              cur.questionId ===
              tempQuestionData[currentQuestionIndex].questionId
          );
          if (existingIndex === -1) {
            setValidationError((prev: any) => [
              ...prev,
              {
                questionId: tempQuestionData[currentQuestionIndex].questionId,
                questionType: true,
                questionAnswers:
                  prev[currentQuestionIndex]?.questionAnswers || false,
              },
            ]);
          } else {
            const newValArr = [...validationError];
            newValArr[existingIndex].questionType = true;
          }
        }

        break;

      case "questionType-remove":
        if (validationError.length > 0) {
          const existingIndex = validationError.findIndex(
            (cur: any) => cur.questionId === currentQuestionId
          );
          const newValArr = [...validationError];
          if (existingIndex !== -1) {
            newValArr[existingIndex].questionType = false;
            setValidationError(newValArr);
          }
        }
        break;

      case "questionAnswers-add":
        if (validationError.length < 1) {
          setValidationError([
            {
              questionId: tempQuestionData[currentQuestionIndex].questionId,
              questionType: false,
              questionAnswers: true,
            },
          ]);
        } else {
          const existingIndex = validationError.findIndex(
            (cur: any) =>
              cur.questionId ===
              tempQuestionData[currentQuestionIndex]?.questionId
          );
          if (existingIndex === -1) {
            setValidationError((prev: any) => [
              ...prev,
              {
                questionId: tempQuestionData[currentQuestionIndex]?.questionId,
                questionType: prev[currentQuestionIndex]?.questionType || false,
                questionAnswers: true,
              },
            ]);
          } else {
            const newValArr = [...validationError];
            newValArr[existingIndex].questionAnswers = true;
          }
        }

        break;

      case "questionAnswers-remove":
        if (validationError.length > 0) {
          const existingIndex = validationError.findIndex(
            (cur: any) => cur.questionId === currentQuestionId
            //tempQuestionData[currentQuestionIndex].questionId
          );

          const newValArr = [...validationError];
          if (existingIndex !== -1) {
            newValArr[existingIndex].questionAnswers = false;
            setValidationError(newValArr);
          }
        }
        break;
      default:
        return;
    }
  };

  const handleEditFieldChange = (event: any) => {
    const newArr = [...tempQuestionData];
    let isValidationError = false;
    switch (event.target.name) {
      case "questionType":
        if (
          event.target.value === "SINGLECHOICE" &&
          tempQuestionData[currentQuestionIndex].questionAnswers.length > 1
        ) {
          HandlValidationsChange("questionType-add");

          isValidationError = true;
        } else {
          HandlValidationsChange("questionType-remove");
        }

        newArr[currentQuestionIndex].questionType = event.target.value;

        setTempQuestionData(newArr);

        break;

      case "question":
        newArr[currentQuestionIndex].question = event.target.value;
        setTempQuestionData(newArr);
        break;

      case "questionOptions":
        newArr[currentQuestionIndex].questionOptions =
          event.target.value.split(",");
        setTempQuestionData(newArr);
        break;

      case "questionAnswers":
        const data = event.target.value.split(",");
        if (
          data.length > 1 &&
          tempQuestionData[currentQuestionIndex].questionType === "SINGLECHOICE"
        ) {
          HandlValidationsChange("questionType-add");

          isValidationError = true;
        } else {
          HandlValidationsChange("questionType-remove");
        }

        const allPresent = data.every((elem: any) =>
          tempQuestionData[currentQuestionIndex].questionOptions.includes(elem)
        );
        if (allPresent) {
          HandlValidationsChange("questionAnswers-remove");
        } else {
          HandlValidationsChange("questionAnswers-add");

          isValidationError = true;
        }

        newArr[currentQuestionIndex].questionAnswers =
          event.target.value.split(",");
        setTempQuestionData(newArr);

        break;

      default:
        return;
    }

    checkSaveReferenceDisabled(newArr, isValidationError);
  };

  const handleSaveReference = () => {
    console.log("save called");
    const questionAnswerIds = optionIds.filter((ele: any, index: number) =>
      tempQuestionData[currentQuestionIndex].questionAnswers.includes(
        tempQuestionData[currentQuestionIndex].questionOptions[index]
      )
    );

    const updateQuesitonBody = {
      questionId: tempQuestionData[currentQuestionIndex].questionId,
      question: tempQuestionData[currentQuestionIndex].question,
      questionType: tempQuestionData[currentQuestionIndex].questionType,
      questionOptions:
        tempQuestionData[currentQuestionIndex].questionOptions.toString(),
      questionAnswers:
        tempQuestionData[currentQuestionIndex].questionAnswers.toString(),
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

    // if (!editedQuestionNumbers.includes(currentQuestionIndex + 1)) {
    //   setEditedQuestionNumbers((prev: number[]) => [
    //     ...prev,
    //     currentQuestionIndex + 1,
    //   ]);
    // }
    if (editedQuestionNumbers.length > 0) {
      const newArr = [...editedQuestionNumbers];
      const existingIndex = editedQuestionNumbers.findIndex(
        (cur: any) => cur.questionNumber === currentQuestionIndex + 1
      );
      if (existingIndex === -1) {
        setEditedQuestionNumbers([
          ...newArr,
          {
            questionNumber: currentQuestionIndex + 1,
            questionType: tempQuestionData[currentQuestionIndex].questionType,
          },
        ]);
      } else {
        newArr[existingIndex] = {
          questionNumber: currentQuestionIndex + 1,
          questionType: tempQuestionData[currentQuestionIndex].questionType,
        };
      }
    } else {
      setEditedQuestionNumbers([
        {
          questionNumber: currentQuestionIndex + 1,
          questionType: tempQuestionData[currentQuestionIndex].questionType,
        },
      ]);
    }

    setSaveRefDisabled(true);
    setAnchorElEdit(null);
  };
  console.log("editedquestion number is", editedQuestionNumbers);
  console.log("editedquestion is", editedQuestions);

  const checkSaveReferenceDisabled = (
    updateQuestionData: any,
    isValidationError: boolean
  ) => {
    console.log("check ref is called");
    console.log("update dquesiton data is", updateQuestionData);
    console.log("isvalidateon is", isValidationError);
    if (isValidationError) {
      setSaveRefDisabled(true);
    } else {
      if (editedQuestions) {
        const existingIndex = editedQuestions.updateQuizDetails.findIndex(
          (cur: any) => cur.questionId === updateQuestionData.questionId
        );
        console.log("index in edite quesiton is", existingIndex);
        if (existingIndex === -1) {
          if (
            JSON.stringify(updateQuestionData[currentQuestionIndex]) ===
            JSON.stringify(modifyQuestionsData[currentQuestionIndex])
          ) {
            setSaveRefDisabled(true);
          } else {
            setSaveRefDisabled(false);
          }
        } else {
          console.log("inside idnex !== - 1 in disable check");
          if (
            JSON.stringify(updateQuestionData[currentQuestionIndex]) ===
            JSON.stringify(editedQuestions.updateQuizDetails[existingIndex])
          ) {
            setSaveRefDisabled(true);
          } else {
            setSaveRefDisabled(false);
          }
        }
      } else {
        console.log("inside else part");
        console.log("curret index is", currentQuestionIndex);
        if (
          JSON.stringify(updateQuestionData[currentQuestionIndex]) ===
          JSON.stringify(modifyQuestionsData[currentQuestionIndex])
        ) {
          console.log("inside if true");
          setSaveRefDisabled(true);
        } else {
          console.log("Inside if false");
          setSaveRefDisabled(false);
        }
      }
    }

    // if (
    //   JSON.stringify(updateQuestionData[currentQuestionIndex]) ===
    //     JSON.stringify(modifyQuestionsData[currentQuestionIndex]) ||
    //   isValidationError
    // ) {
    //   setSaveRefDisabled(true);
    // } else {
    //   setSaveRefDisabled(false);
    // }
  };

  console.log("edited quetstion details is");

  const checkQustionTypeValidation = () => {
    if (validationError.length > 0) {
      const index = validationError?.findIndex(
        (cur: any) => cur.questionId === currentQuestionId
      );
      if (index !== -1) {
        return validationError[index].questionType ? true : false;
      }
    }
    return false;
  };
  const checkQuestionAnswersValidation = () => {
    if (validationError.length > 0) {
      const index = validationError?.findIndex(
        (cur: any) => cur.questionId === currentQuestionId
      );
      if (index !== -1) {
        return validationError[index].questionAnswers ? true : false;
      }
    }
    return false;
  };

  useEffect(() => {
    const currentQuestionIndex = modifyQuestionsData?.findIndex(
      (obj: questionsForSetWithAnswers) =>
        obj.questionId === editQuestionDetails?.questionId
    );
    setCurrentQuestionIndex(currentQuestionIndex);
    setCurrentQuestionId(tempQuestionData[currentQuestionIndex]?.questionId);
    if (tempQuestionData.length > 0) {
      // if (editedQuestions) {
      //   const existingIndex = editedQuestions.updateQuizDetails.findIndex(
      //     (cur: any) => cur.questionId === editQuestionDetails.questionId
      //   );
      //   if(existingIndex === -1){
      //   }
      // }
      // if (
      //   tempQuestionData[currentQuestionIndex] ===
      //   editedQuestions?.updateQuizDetails[currentQuestionIndex]
      // ) {
      // }
      // checkSaveReferenceDisabled(
      //   tempQuestionData,
      //   checkQustionTypeValidation() || checkQuestionAnswersValidation(),
      //   currentQuestionIndex
      // );
    }
  }, [anchorElEdit, modifyQuestionsData, editQuestionDetails]);

  return (
    <>
      <Popover
        open={Boolean(anchorElEdit)}
        anchorEl={anchorElEdit}
        onClose={() => {
          // setSaveRefDisabled(true);
          handleCloseEdit();
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        {tempQuestionData.length > 0 && (
          <Box className="edit-popover-container">
            <FormControl variant="standard">
              <InputLabel>Question Type</InputLabel>
              <Select
                // value={tempQuestionData[0]}
                value={
                  tempQuestionData[currentQuestionIndex]?.questionType
                    ? tempQuestionData[currentQuestionIndex]?.questionType
                    : editQuestionDetails?.questionType
                }
                onChange={handleEditFieldChange}
                label="QuestionType"
                name="questionType"
              >
                <MenuItem value={"MULTIPLECHOICE"}>Multiple Choice</MenuItem>
                <MenuItem value={"SINGLECHOICE"}>Single Choice</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Question"
              type="text"
              variant="standard"
              name="question"
              value={
                tempQuestionData[currentQuestionIndex]?.question
                // ? tempQuestionData[questionIndexInTempData].question
                // : editQuestionDetails?.question
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
                tempQuestionData[currentQuestionIndex]?.questionOptions
                // ? tempQuestionData[questionIndexInTempData]?.questionOptions
                // : editQuestionDetails?.questionOptions
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
                tempQuestionData[currentQuestionIndex]?.questionAnswers
                // ? tempQuestionData[questionIndexInTempData]?.questionAnswers
                // : editQuestionDetails?.questionAnswers
              }
              multiline={true}
              onChange={handleEditFieldChange}
            />
            {checkQustionTypeValidation() && (
              <Typography color="error" variant="body2">
                {`Single Choice Questions Can Have Only One Answer`}
              </Typography>
            )}
            {checkQuestionAnswersValidation() && (
              <Typography color="error" variant="body2">
                {`Answers Should always be one among the options`}
              </Typography>
            )}

            <Button
              name="LinkExpiryTime"
              variant="outlined"
              onClick={handleSaveReference}
              disabled={saveRefDisabled}
            >
              Save Reference
            </Button>
          </Box>
        )}
      </Popover>
    </>
  );
};
export default EditPopover;
