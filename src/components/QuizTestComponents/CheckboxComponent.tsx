import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";

const CheckboxComponent = (props: any) => {
  const { questionInfo, handleCheckboxAnswerChange, selectedAnswers } = props;

  const [value, setValue] = useState<any[]>([]);

  const getSelectedValue = useCallback(
    (questionData: any) => {
      const result = selectedAnswers.filter((cur: any) => {
        return (
          cur.subjectName === questionData.subjectName &&
          cur.version === questionData.version &&
          cur.quizAnswers.find((elem: any) => {
            return elem.questionId === questionData.questionId;
          })
        );
      });

      if (result[0]) {
        const ansIndex = result[0].quizAnswers.findIndex(
          (obj: any) => obj.questionId === questionData.questionId
        );
        setValue(result[0].quizAnswers[ansIndex].questionAnswers);
      }
    },
    [selectedAnswers]
  );

  useEffect(() => {
    getSelectedValue(questionInfo.questionData);
  }, [questionInfo.questionData, getSelectedValue]);

  return (
    <>
      <Box>
        <Typography>{`${questionInfo.questionNumber}. ${questionInfo.questionData.question}`}</Typography>
        <FormGroup>
          {questionInfo.questionData.questionOptions.map(
            (option: any, index: any) => {
              return (
                <FormControlLabel
                  control={
                    <Checkbox
                      // checked={value.includes(option) ? true : false}
                      checked={value.indexOf(option) !== -1}
                      onChange={(event) => {
                        const selectedIndex =
                          questionInfo.questionData.questionOptions.findIndex(
                            (option: any) =>
                              option === (event.target as HTMLInputElement).name
                          );
                        getSelectedValue(questionInfo.questionData);
                        handleCheckboxAnswerChange(
                          event,
                          questionInfo.questionData,
                          // questionInfo.questionData.questionId,
                          // questionInfo.questionData.questionType,
                          selectedIndex
                        );
                      }}
                      name={option}
                    />
                  }
                  label={option}
                  key={index}
                />
              );
            }
          )}
        </FormGroup>
      </Box>
    </>
  );
};
export default CheckboxComponent;
