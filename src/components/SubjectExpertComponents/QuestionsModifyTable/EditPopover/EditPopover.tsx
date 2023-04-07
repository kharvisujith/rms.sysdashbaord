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
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  questionForUpdate,
  questionsForSetWithAnswers,
} from "../../../../Interface/SubjectExpert/SubjectExpert";
import { optionIds } from "../../../../utils/Utils";
import "./EditPopver.styles.scss";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../Store/ConfigureStrore";
import { closeEditPopover } from "../../../../Redux/subjectexpertSlice";

const EditPopover = (props: any) => {
  const { validationError, setValidationError } = props;
  const dispatch = useAppDispatch();
  const {
    modifyModalQuestions,
    editQuestionStates: {
      tempQuestionData,
      editQuestionDetails,
      editedQuestions,
      editedQuestionNumbers,
    },
  } = useAppSelector((state: any) => state.subjectExpert);

  const {
    editQuestionStates: { anchorElEdit },
  } = useAppSelector((state: any) => state.subjectExpert);

  //  const [validationError, setValidationError] = useState<any[]>([]);
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
            // this line I added extra
            setValidationError(newValArr);
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

        // newArr[currentQuestionIndex].questionType = event.target.value;

        // const newQuestion = {
        //   ...newArr[currentQuestionIndex],
        //   questionType: event.target.value,
        // };
        newArr[currentQuestionIndex] = {
          ...newArr[currentQuestionIndex],
          questionType: event.target.value,
        };

        // setTempQuestionData(newArr);
        dispatch({
          type: "subjectExpert/setTempQuestionData",
          payload: { data: newArr },
        });

        break;

      case "question":
        // newArr[currentQuestionIndex].question = event.target.value;

        newArr[currentQuestionIndex] = {
          ...newArr[currentQuestionIndex],
          question: event.target.value,
        };

        dispatch({
          type: "subjectExpert/setTempQuestionData",
          payload: { data: newArr },
        });
        //  setTempQuestionData(newArr);

        break;

      case "questionOptions":
        // newArr[currentQuestionIndex].questionOptions =
        //   event.target.value.split(",");

        newArr[currentQuestionIndex] = {
          ...newArr[currentQuestionIndex],
          questionOptions: event.target.value.split(","),
        };
        dispatch({
          type: "subjectExpert/setTempQuestionData",
          payload: { data: newArr },
        });
        //  setTempQuestionData(newArr);
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

        // newArr[currentQuestionIndex].questionAnswers =
        //   event.target.value.split(",");
        newArr[currentQuestionIndex] = {
          ...newArr[currentQuestionIndex],
          questionAnswers: event.target.value.split(","),
        };
        dispatch({
          type: "subjectExpert/setTempQuestionData",
          payload: { data: newArr },
        });
        //  setTempQuestionData(newArr);

        break;

      default:
        return;
    }

    checkSaveReferenceDisabled(newArr, isValidationError);
  };

  const handleSaveReference = () => {
    const questionAnswerIds = optionIds.filter((ele: any, index: number) =>
      tempQuestionData[currentQuestionIndex].questionAnswers.includes(
        tempQuestionData[currentQuestionIndex].questionOptions[index]
      )
    );

    const updateQuestionBody = {
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
        newArr.push(updateQuestionBody);
        // setEditedQuestions((prev: UpdateQuestionsSet) => ({
        //   ...prev,
        //   updateQuizDetails: newArr,
        // }));
        dispatch({
          type: "subjectExpert/setEditedQuestions",
          payload: {
            data: {
              ...editedQuestions,
              updateQuizDetails: newArr,
            },
          },
        });
      } else {
        const newArr = [...editedQuestions.updateQuizDetails];
        newArr[existingIndex] = updateQuestionBody;

        // setEditedQuestions((prev: UpdateQuestionsSet) => ({
        //   ...prev,
        //   updateQuizDetails: newArr,
        // }));
        dispatch({
          type: "subjectExpert/setEditedQuestions",
          payload: {
            data: {
              ...editedQuestions,
              updateQuizDetails: newArr,
            },
          },
        });
      }
    } else {
      dispatch({
        type: "subjectExpert/setEditedQuestions",
        payload: {
          data: {
            version: editQuestionDetails.version,
            subjectName: editQuestionDetails.subjectName,
            tag: editQuestionDetails.tag,
            updateQuizDetails: [updateQuestionBody],
          },
        },
      });
      // setEditedQuestions({
      //   version: editQuestionDetails.version,
      //   subjectName: editQuestionDetails.subjectName,
      //   tag: editQuestionDetails.tag,
      //   updateQuizDetails: [updateQuesitonBody],
      // });
    }

    // this was already commented
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
        const data = [
          ...newArr,
          {
            questionNumber: currentQuestionIndex + 1,
            questionType: tempQuestionData[currentQuestionIndex].questionType,
          },
        ];

        dispatch({
          type: "subjectExpert/setEditedQuestionNumbers",
          payload: {
            data: data,
          },
        });

        // setEditedQuestionNumbers([
        //   ...newArr,
        //   {
        //     questionNumber: currentQuestionIndex + 1,
        //     questionType: tempQuestionData[currentQuestionIndex].questionType,
        //   },
        // ]);
      } else {
        newArr[existingIndex] = {
          questionNumber: currentQuestionIndex + 1,
          questionType: tempQuestionData[currentQuestionIndex].questionType,
        };
      }
    } else {
      // setEditedQuestionNumbers([
      // {
      //   questionNumber: currentQuestionIndex + 1,
      //   questionType: tempQuestionData[currentQuestionIndex].questionType,
      // },
      // ]);
      dispatch({
        type: "subjectExpert/setEditedQuestionNumbers",
        payload: {
          data: [
            {
              questionNumber: currentQuestionIndex + 1,
              questionType: tempQuestionData[currentQuestionIndex].questionType,
            },
          ],
        },
      });
    }

    setSaveRefDisabled(true);
    // setAnchorElEdit(null);
    dispatch(closeEditPopover());
  };

  const compareFieldsAtIndex = (obj1: any, obj2: any) => {
    const commonFields = Object.keys(obj1).filter((field) =>
      obj2.hasOwnProperty(field)
    );

    const areEqual = commonFields.every(
      (field) => obj1[field].toString() === obj2[field].toString()
    );

    return areEqual;
  };

  // this can be here
  const checkSaveReferenceDisabled = (
    updateQuestionData: any,
    isValidationError: boolean
  ) => {
    if (isValidationError) {
      setSaveRefDisabled(true);
    } else {
      if (editedQuestions) {
        const existingIndex = editedQuestions.updateQuizDetails.findIndex(
          (cur: any) =>
            cur.questionId ===
            updateQuestionData[currentQuestionIndex].questionId
        );
        if (existingIndex === -1) {
          if (
            JSON.stringify(updateQuestionData[currentQuestionIndex]) ===
            JSON.stringify(modifyModalQuestions[currentQuestionIndex])
          ) {
            setSaveRefDisabled(true);
          } else {
            setSaveRefDisabled(false);
          }
        } else {
          const areEqual = compareFieldsAtIndex(
            updateQuestionData[currentQuestionIndex],
            editedQuestions.updateQuizDetails[existingIndex]
          );
          areEqual ? setSaveRefDisabled(true) : setSaveRefDisabled(false);
        }
      } else {
        if (
          JSON.stringify(updateQuestionData[currentQuestionIndex]) ===
          JSON.stringify(modifyModalQuestions[currentQuestionIndex])
        ) {
          setSaveRefDisabled(true);
        } else {
          setSaveRefDisabled(false);
        }
      }
    }
  };

  // this can be here
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

  // this can be here
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

  // this can be here
  const CheckSaveButtonDisabledOnEnter = (index: number) => {
    if (checkQuestionAnswersValidation() || checkQustionTypeValidation()) {
      setSaveRefDisabled(true);
    } else {
      if (editedQuestions) {
        const existingIndex = editedQuestions.updateQuizDetails.findIndex(
          (cur: any) => cur.questionId === tempQuestionData[index].questionId
        );

        if (existingIndex === -1) {
          if (
            JSON.stringify(tempQuestionData[index]) ===
            JSON.stringify(modifyModalQuestions[index])
          ) {
            setSaveRefDisabled(true);
          } else {
            setSaveRefDisabled(false);
          }
        } else {
          const areEqual = compareFieldsAtIndex(
            tempQuestionData[index],
            editedQuestions.updateQuizDetails[existingIndex]
          );
          areEqual ? setSaveRefDisabled(true) : setSaveRefDisabled(false);
        }
      } else {
        if (
          JSON.stringify(tempQuestionData[index]) ===
          JSON.stringify(modifyModalQuestions[index])
        ) {
          setSaveRefDisabled(true);
        } else {
          setSaveRefDisabled(false);
        }
      }
    }
  };

  useEffect(() => {
    if (modifyModalQuestions?.length > 0) {
      const currentQuestionIndex = modifyModalQuestions?.findIndex(
        (obj: questionsForSetWithAnswers) =>
          obj.questionId === editQuestionDetails?.questionId
      );
      setCurrentQuestionIndex(currentQuestionIndex);
      setCurrentQuestionId(tempQuestionData[currentQuestionIndex]?.questionId);
      if (tempQuestionData.length > 0) {
        CheckSaveButtonDisabledOnEnter(currentQuestionIndex);
      }
    }
  }, [anchorElEdit, modifyModalQuestions, editQuestionDetails]);

  return (
    <>
      <Popover
        open={Boolean(anchorElEdit)}
        anchorEl={anchorElEdit}
        onClose={() => {
          dispatch(closeEditPopover());
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
              value={tempQuestionData[currentQuestionIndex]?.question}
              multiline={true}
              onChange={handleEditFieldChange}
            />

            <TextField
              label="Options"
              type="text"
              variant="standard"
              name="questionOptions"
              value={tempQuestionData[currentQuestionIndex]?.questionOptions}
              multiline={true}
              onChange={handleEditFieldChange}
            />

            <TextField
              label="Answer"
              type="text"
              variant="standard"
              name="questionAnswers"
              value={tempQuestionData[currentQuestionIndex]?.questionAnswers}
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
