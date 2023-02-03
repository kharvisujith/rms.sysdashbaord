import { RadioGroup, FormControlLabel, Radio } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";

const RadioComponent = (props: any) => {
  const { question, handleAnswerChange } = props;

  // question={{
  //   questionNumber: index + 1,
  //   questionData: question,
  //   console.log("value of props in radio is", props);

  const [value, setValue] = useState({});
  return (
    <>
      <Box>
        <Typography>{`${question.questionNumber}. ${question.questionData.question}`}</Typography>
        <RadioGroup
          value={value}
          onChange={(event) => {
            setValue((event.target as HTMLInputElement).value);
            handleAnswerChange(event, question.questionData.questionId);
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
