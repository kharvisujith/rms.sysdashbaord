import { RadioGroup, FormControlLabel, Radio } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useCallback, useEffect, useState } from "react";
import { optionIds } from "../../utils/Utils";

const RadioComponent = (props: any) => {
  const { questionInfo, handleAnswerChange, selectedAnswers } = props;
  console.log("value of selected answer in radio comp is", selectedAnswers);

  // questionInfo={{
  //   questionNumber: index + 1,
  //   questionData: questionInfo,
  //   console.log("value of props in radio is", props);

  const [value, setValue] = useState([]);
  console.log("value in radio comp is", value);

  const getSelectedValue = useCallback(
    (questionData: any) => {
      console.log("get selected value is called");
      console.log("value of quesiton id in getselected value is", questionData);
      // const result = selectedAnswers.filter((cur: any) => {
      //   return cur.quizAnswersquestionData === questionData;
      // });
      console.log("selected ans in getselectefd value is", selectedAnswers);
      const result = selectedAnswers.filter((cur: any) => {
        return (
          cur.subjectName === questionData.subjectName &&
          cur.setNumber === questionData.setNumber &&
          cur.quizAnswers.find((elem: any) => {
            console.log("element inside filet quizans is", elem);
            return elem.questionId === questionData.questionId;
          })
        );
      });

      console.log("value of result is", result);

      if (result[0]) {
        console.log(result[0].quizAnswers[0].questionAnswers);
        setValue(result[0].quizAnswers[0].questionAnswers);
      }

      // console.log("vlaue of result is", result);
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
    console.log(
      "value of quesiton info in useffect is",
      questionInfo.questionData
    );
    getSelectedValue(questionInfo.questionData);
  }, [questionInfo.questionData, getSelectedValue, questionInfo]);
  return (
    <>
      <Box>
        <Typography>{`${questionInfo.questionNumber}. ${questionInfo.questionData.question}`}</Typography>
        <RadioGroup
          value={value}
          onChange={(event) => {
            console.log("onchange in radio called");
            const selectedIndex =
              questionInfo.questionData.questionOptions.findIndex(
                (option: any) =>
                  option === (event.target as HTMLInputElement).value
              );

            let questionAnswerIds = [optionIds[selectedIndex]];
            console.log(
              "selectedIndex in onchange radio is and questio answerIds is",
              selectedIndex,
              questionAnswerIds
            );
            handleAnswerChange(
              event,
              questionInfo.questionData,
              //  questionInfo.questionData.questionId,
              //  questionInfo.questionData.questionType,
              questionAnswerIds
            );

            // getSelectedValue(questionInfo.questionData.questionId);
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
