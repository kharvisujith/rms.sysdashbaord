import { RadioGroup, FormControlLabel, Radio } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { padding } from "@mui/system";
import { useCallback, useEffect, useState } from "react";

const RadioSubmittedAnswerComponent = (props: any) => {
  const { question, handleAnswerChange, selectedAnswers } = props;

  return (
    <>
      <Box>
        <Typography>{`${question.questionNumber}. ${question.questionData.question}`}</Typography>
        <RadioGroup
          defaultValue={`${question.questionData.submittedAnswers[0]}`}
        >
          {question.questionData.questionOptions.map(
            (option: any, index: any) => {
              return (
                <FormControlLabel
                  disabled
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
      <Box>
      <Typography
            justifyContent="space-between"
            alignItems="center"
            style={{ padding: 15 }}
          >
            <strong>{"Submitted Answers:"}&ensp;</strong>
            {`${question.questionData.submittedAnswersIds.toString()}`}
            &ensp;&ensp;&ensp;
            {`${question.questionData.submittedAnswers.toString()}`}
            <br />
            <strong>{"Correct Answers:"}&ensp;</strong>
            {`${question.questionData.masterQuestionAnswersIds.toString()}`}
            &ensp;&ensp;&ensp;
            {`${question.questionData.masterQuestionAnswers.toString()}`}
      </Typography>
      </Box>
    </>
  );
};

export default RadioSubmittedAnswerComponent;
