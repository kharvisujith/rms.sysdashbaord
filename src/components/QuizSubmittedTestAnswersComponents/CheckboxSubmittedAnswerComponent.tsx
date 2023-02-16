import {
    Box,
    Checkbox,
    FormControlLabel,
    FormGroup,
    Typography,
  } from "@mui/material";
  import { useCallback, useEffect, useState } from "react";
  
  const CheckboxSubmittedAnswerComponent = (props: any) => {
    const { question, handleCheckboxAnswerChange, selectedAnswers } = props;
    return (
      <>
        <Box>
          <Typography>{`${question.questionNumber}. ${question.questionData.question}`}</Typography>
          <FormGroup>
            {question.questionData.questionOptions.map(
              (option: any, index: any) => {
                return (
                  <FormControlLabel
                    control={
                      <Checkbox
                        disabled
                        checked={question.questionData.submittedAnswers.includes(
                          option
                        )}
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
  export default CheckboxSubmittedAnswerComponent;
  