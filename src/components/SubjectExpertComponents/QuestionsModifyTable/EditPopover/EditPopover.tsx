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

  console.log("modified data in edit popover is", modifyQuestionsData);

  // const [validationError, setValidationError] = useState<any>({
  //   questionType: false,
  //   questionAnswers: false,
  // });
  const [validationError, setValidationError] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [currentQuestionId, setCurrentQuestionId] = useState<any>();
  const [saveRefDisabled, setSaveRefDisabled] = useState<boolean>(true);

  const HandlValidationsChange = (type: string) => {
    switch (type) {
      case "questionType-add":
        if (validationError.length < 1) {
          console.log("inside les than one first add");
          setValidationError([
            {
              questionId: tempQuestionData[currentQuestionIndex].questionId,
              questionType: true,
              questionAnswers: false,
            },
          ]);
        } else {
          console.log("inside else length > 1");
          const existingIndex = validationError.findIndex(
            (cur: any) =>
              cur.questionId ===
              tempQuestionData[currentQuestionIndex].questionId
          );
          if (existingIndex === -1) {
            console.log("id exist n this");
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
            console.log("id does not exist in this");
            const newValArr = [...validationError];
            newValArr[existingIndex].questionType = true;
          }
        }

        break;

      case "questionType-remove":
        if (validationError.length > 0) {
          const existingIndex = validationError.findIndex(
            (cur: any) => cur.questionId === currentQuestionId
            //tempQuestionData[currentQuestionIndex].questionId
          );
          console.log("exising inde  id in else issss", existingIndex);
          const newValArr = [...validationError];
          if (existingIndex !== -1) {
            console.log("existing foundddd");
            newValArr[existingIndex].questionType = false;
            setValidationError(newValArr);
            console.log("modified new val araa is", newValArr);
          }
        }
        break;

      case "questionAnswers-add":
        if (validationError.length < 1) {
          console.log("inside les than one first add");
          setValidationError([
            {
              questionId: tempQuestionData[currentQuestionIndex].questionId,
              questionType: false,
              questionAnswers: true,
            },
          ]);
        } else {
          console.log("inside else length > 1");
          const existingIndex = validationError.findIndex(
            (cur: any) =>
              cur.questionId ===
              tempQuestionData[currentQuestionIndex]?.questionId
          );
          if (existingIndex === -1) {
            console.log("id exist n this");
            setValidationError((prev: any) => [
              ...prev,
              {
                questionId: tempQuestionData[currentQuestionIndex]?.questionId,
                questionType: prev[currentQuestionIndex]?.questionType || false,
                questionAnswers: true,
              },
            ]);
          } else {
            console.log("id does not exist in this");
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
          console.log("exising inde  id in else issss", existingIndex);
          const newValArr = [...validationError];
          if (existingIndex !== -1) {
            console.log("existing foundddd");
            newValArr[existingIndex].questionAnswers = false;
            setValidationError(newValArr);
            console.log("modified new val araa is", newValArr);
          }
        }
        break;
      default:
        return;
    }
  };

  const handleEditFieldChange = (event: any) => {
    console.log(event.target.value, event.target.name);

    const newArr = [...tempQuestionData];
    //  const newValidationArr = [...validationError];
    let isValidationError = false;
    switch (event.target.name) {
      case "questionType":
        if (
          event.target.value === "SINGLECHOICE" &&
          tempQuestionData[currentQuestionIndex].questionAnswers.length > 1
        ) {
          console.log(" insideeee iffffff");
          HandlValidationsChange("questionType-add");
          // if (validationError.length < 1) {
          //   console.log("inside les than one first add");
          //   setValidationError([
          //     {
          //       questionId: tempQuestionData[currentQuestionIndex].questionId,
          //       questionType: true,
          //       questionAnswers: false,
          //     },
          //   ]);
          // } else {
          //   console.log("inside else length > 1");
          //   const existingIndex = validationError.findIndex(
          //     (cur: any) =>
          //       cur.questionId ===
          //       tempQuestionData[currentQuestionIndex].questionId
          //   );
          //   if (existingIndex === -1) {
          //     console.log("id exist n this");
          //     setValidationError((prev: any) => [
          //       ...prev,
          //       {
          //         questionId: tempQuestionData[currentQuestionIndex].questionId,
          //         questionType: true,
          //         questionAnswers:
          //           prev[currentQuestionIndex]?.questionAnswers || false,
          //       },
          //     ]);
          //   } else {
          //     console.log("id does not exist in this");
          //     const newValArr = [...validationError];
          //     newValArr[existingIndex].questionType = true;
          //   }
          // }

          isValidationError = true;
        } else {
          HandlValidationsChange("questionType-remove");

          // if (validationError.length > 0) {
          //   const existingIndex = validationError.findIndex(
          //     (cur: any) => cur.questionId === currentQuestionId
          //     //tempQuestionData[currentQuestionIndex].questionId
          //   );
          //   console.log("exising inde  id in else issss", existingIndex);
          //   const newValArr = [...validationError];
          //   if (existingIndex !== -1) {
          //     console.log("existing foundddd");
          //     newValArr[existingIndex].questionType = false;
          //     setValidationError(newValArr);
          //     console.log("modified new val araa is", newValArr);
          //   }
          // }
        }
        //  setValidationError(newValidationArr);

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
          // console.log(" insideeee iffffff");
          // if (validationError.length < 1) {
          //   console.log("inside les than one first add");
          //   setValidationError([
          //     {
          //       questionId: tempQuestionData[currentQuestionIndex].questionId,
          //       questionType: true,
          //       questionAnswers: false,
          //     },
          //   ]);
          // } else {
          //   console.log("inside else length > 1");
          //   const existingIndex = validationError.findIndex(
          //     (cur: any) =>
          //       cur.questionId ===
          //       tempQuestionData[currentQuestionIndex].questionId
          //   );
          //   if (existingIndex === -1) {
          //     console.log("id exist n this");
          //     setValidationError((prev: any) => [
          //       ...prev,
          //       {
          //         questionId: tempQuestionData[currentQuestionIndex].questionId,
          //         questionType: true,
          //         questionAnswers:
          //           prev[currentQuestionIndex]?.questionAnswers || false,
          //       },
          //     ]);
          //   } else {
          //     console.log("id does not exist in this");
          //     const newValArr = [...validationError];
          //     newValArr[existingIndex].questionType = true;
          //   }
          // }

          isValidationError = true;
        } else {
          HandlValidationsChange("questionType-remove");
          // console.log("Insideeeeeeee elseeeeee");
          // console.log(validationError.length);
          // if (validationError.length > 0) {
          //   const existingIndex = validationError.findIndex(
          //     (cur: any) => cur.questionId === currentQuestionId
          //     //tempQuestionData[currentQuestionIndex].questionId
          //   );
          //   console.log("exising inde  id in else issss", existingIndex);
          //   const newValArr = [...validationError];
          //   if (existingIndex !== -1) {
          //     console.log("existing foundddd");
          //     newValArr[existingIndex].questionType = false;
          //     setValidationError(newValArr);
          //     console.log("modified new val araa is", newValArr);
          //   }
          // }
        }

        const allPresent = data.every((elem: any) =>
          tempQuestionData[currentQuestionIndex].questionOptions.includes(elem)
        );
        if (allPresent) {
          //  HandlValidationsChange("questionType-remove");
          if (validationError.length > 0) {
            const existingIndex = validationError.findIndex(
              (cur: any) => cur.questionId === currentQuestionId
              //tempQuestionData[currentQuestionIndex].questionId
            );
            console.log("exising inde  id in else issss", existingIndex);
            const newValArr = [...validationError];
            if (existingIndex !== -1) {
              console.log("existing foundddd");
              newValArr[existingIndex].questionAnswers = false;
              setValidationError(newValArr);
              console.log("modified new val araa is", newValArr);
            }
          }
        } else {
          //  HandlValidationsChange("questionType-add");
          if (validationError.length < 1) {
            console.log("inside les than one first add");
            setValidationError([
              {
                questionId: tempQuestionData[currentQuestionIndex].questionId,
                questionType: false,
                questionAnswers: true,
              },
            ]);
          } else {
            console.log("inside else length > 1");
            const existingIndex = validationError.findIndex(
              (cur: any) =>
                cur.questionId ===
                tempQuestionData[currentQuestionIndex]?.questionId
            );
            if (existingIndex === -1) {
              console.log("id exist n this");
              setValidationError((prev: any) => [
                ...prev,
                {
                  questionId:
                    tempQuestionData[currentQuestionIndex]?.questionId,
                  questionType:
                    prev[currentQuestionIndex]?.questionType || false,
                  questionAnswers: true,
                },
              ]);
            } else {
              console.log("id does not exist in this");
              const newValArr = [...validationError];
              newValArr[existingIndex].questionAnswers = true;
            }
          }

          isValidationError = true;
        }
        //  setValidationError(newValidationArr);
        newArr[currentQuestionIndex].questionAnswers =
          event.target.value.split(",");
        setTempQuestionData(newArr);

        break;

      default:
        return;
    }
    console.log("value of newArr after switch is", newArr);
    //   checkSaveReferenceDisabled(newArr, isValidationError);
  };
  // console.log("tempData is", tempQuestionData);

  const handleSaveReference = () => {
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

    if (!editedQuestionNumbers.includes(currentQuestionIndex + 1)) {
      setEditedQuestionNumbers((prev: number[]) => [
        ...prev,
        currentQuestionIndex + 1,
      ]);
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

  const checkSaveReferenceDisabled = (
    updateQuestionData: any,
    isValidationError: boolean
  ) => {
    if (
      JSON.stringify(updateQuestionData[currentQuestionIndex]) ===
        JSON.stringify(modifyQuestionsData[currentQuestionIndex]) ||
      isValidationError
    ) {
      setSaveRefDisabled(true);
    } else {
      setSaveRefDisabled(false);
    }
  };

  console.log("validation errorarray is", validationError);

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
    console.log("check questionansers validation calleeddd");
    if (validationError.length > 0) {
      console.log("inside ifffffffff");
      const index = validationError?.findIndex(
        (cur: any) => cur.questionId === currentQuestionId
      );
      console.log("indexxxxxxxxxx is", index);
      if (index !== -1) {
        console.log(validationError[index].questionAnswers);
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
    // if (tempQuestionData.lenght > 0) {
    //   checkSaveReferenceDisabled(
    //     tempQuestionData[currentQuestionIndex],
    //     validationError[currentQuestionIndex]?.questionType ||
    //       validationError[currentQuestionIndex].questionAnswers
    //   );
    // }
  }, [anchorElEdit, modifyQuestionsData, editQuestionDetails]);

  return (
    <>
      <Popover
        open={Boolean(anchorElEdit)}
        anchorEl={anchorElEdit}
        onClose={() => {
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
              // disabled={saveRefDisabled}
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
