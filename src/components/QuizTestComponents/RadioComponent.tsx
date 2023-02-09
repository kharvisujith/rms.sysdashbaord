import { RadioGroup, FormControlLabel, Radio } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useCallback, useEffect, useState } from "react";
import { optionIds } from "../../utils/Utils";

const RadioComponent = (props: any) => {
  const { question, handleAnswerChange, selectedAnswers } = props;
  console.log("value of selected answer in radio comp is", selectedAnswers);

  // question={{
  //   questionNumber: index + 1,
  //   questionData: question,
  //   console.log("value of props in radio is", props);

  const [value, setValue] = useState({});
  console.log("value in radio comp is", value);

  const getSelectedValue = useCallback(
    (questionId: any) => {
      console.log("value of quesiton id is", questionId);
      const result = selectedAnswers.filter((cur: any) => {
        return cur.questionId === questionId;
      });
      if (result[0]) {
        setValue(result[0].questionAnswers);
      }

      console.log("vlaue of result is", result);
    },
    [selectedAnswers]
  );
  // const getSelectedValue = (questionId: any) => {
  //   console.log("value of quesiton id is", questionId);
  //   const result = selectedAnswers.filter((cur: any) => {
  //     return cur.questionId === questionId;
  //   });
  //   if (result[0]) {
  //     setValue(result[0].questionAnswers);
  //     console.log("reuslt is", result[0].questionAnswers);
  //   }
  // };

  useEffect(() => {
    getSelectedValue(question.questionData.questionId);
  }, [question.questionData.questionId, getSelectedValue]);
  return (
    <>
      <Box>
        <Typography>{`${question.questionNumber}. ${question.questionData.question}`}</Typography>
        <RadioGroup
          value={value}
          onChange={(event) => {
            const selectedIndex =
              question.questionData.questionOptions.findIndex(
                (option: any) =>
                  option === (event.target as HTMLInputElement).value
              );
            let questionAnswerIds = [optionIds[selectedIndex]];
            handleAnswerChange(
              event,
              question.questionData.questionId,
              question.questionData.questionType,
              questionAnswerIds
            );

            getSelectedValue(question.questionData.questionId);
          }}
        >
          {question.questionData.questionOptions.map(
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
