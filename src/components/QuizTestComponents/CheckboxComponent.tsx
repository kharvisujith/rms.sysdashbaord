import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";

const CheckboxComponent = (props: any) => {
  const { question, handleCheckboxAnswerChange, selectedAnswers } = props;

  const [value, setValue] = useState<any[]>([]);

  const getSelectedValue = useCallback(
    (questionId: any) => {
      console.log("value of quesiton id is", questionId);
      const result = selectedAnswers.filter((cur: any) => {
        return cur.questionId === questionId;
      });
      if (result[0]) {
        //setValue(result[0].choosenAnswer);
        console.log("result in check box is", result);
        console.log(result[0].choosenAnswer);
        // setValue(value.push(option));
        setValue(result[0].choosenAnswer);
      }

      console.log("vlaue of result is", result);
      // console.log("value of vlue.choosenAnswer is", value.choosenAnswer);
    },
    [selectedAnswers]
  );

  useEffect(() => {
    getSelectedValue(question.questionData.questionId);
  }, [question.questionData.questionId, getSelectedValue]);

  console.log("value of usestae value is", value);
  return (
    <>
      <Box>
        <Typography>{`${question.questionNumber}. ${question.questionData.question}`}</Typography>
        <FormGroup>
          {question.questionData.questionOptions.map(
            (option: any, index: any) => {
              console.log("value of option in map is", option);
              return (
                <FormControlLabel
                  control={
                    <Checkbox
                      // checked={value.includes(option) ? true : false}
                      checked={value.indexOf(option) !== -1}
                      onChange={(event) => {
                        getSelectedValue(question.questionData.questionId);
                        handleCheckboxAnswerChange(
                          event,
                          question.questionData.questionId
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
