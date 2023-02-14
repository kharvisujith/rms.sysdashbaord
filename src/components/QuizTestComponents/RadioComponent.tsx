import { RadioGroup, FormControlLabel, Radio } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useCallback, useEffect, useState } from "react";
import { optionIds } from "../../utils/Utils";

const RadioComponent = (props: any) => {
  const { questionInfo, handleAnswerChange, selectedAnswers } = props;

  const [value, setValue] = useState([]);

  const getSelectedValue = useCallback(
    (questionData: any) => {
      const result = selectedAnswers.filter((cur: any) => {
        return (
          cur.subjectName === questionData.subjectName &&
          cur.setNumber === questionData.setNumber &&
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
  }, [questionInfo.questionData, getSelectedValue, questionInfo]);
  return (
    <>
      <Box>
        <Typography>{`${questionInfo.questionNumber}. ${questionInfo.questionData.question}`}</Typography>
        <RadioGroup
          value={value}
          onChange={(event) => {
            const selectedIndex =
              questionInfo.questionData.questionOptions.findIndex(
                (option: any) =>
                  option === (event.target as HTMLInputElement).value
              );
            let questionAnswerIds = [optionIds[selectedIndex]];
            handleAnswerChange(
              event,
              questionInfo.questionData,
              questionAnswerIds
            );
            getSelectedValue(questionInfo.questionData);
          }}
        >
          {questionInfo.questionData.questionOptions.map(
            (option: any, index: any) => {
              return (
                <FormControlLabel
                  value={option}
                  control={<Radio />}
                  label={option}
                  key={index}
                />
              );
            }
          )}
        </RadioGroup>
      </Box>
    </>
  );
};

export default RadioComponent;
