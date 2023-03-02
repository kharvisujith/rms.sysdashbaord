import {
  Box,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  Button,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import {
  getSubjectwiseQuiz,
  getSubjectwiseQuizAnswers,
} from "../../api/apiAgent";
import {
  createQuizRequest,
  subjectwiseQuizAnswersResponse,
  subjectWiseQuizListResponse,
} from "../../Interface/QuizDetails";
import { Typography } from "@material-ui/core";
import "./SearchQuestionSets.style.scss";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { cursorTo } from "readline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { optionIds } from "../../utils/Utils";

const SearchQuestionSets = () => {
  const [searchText, setSearchText] = useState<string>();
  const [subjectwiseDetails, setSubjectwiseDeatails] = useState<
    subjectWiseQuizListResponse[]
  >([]);

  const [newCreateQuizBody, setNewCreateQuizBody] = useState<
    createQuizRequest[]
  >([]);

  const [subjectSetQuestions, setSubjecSetQuestions] = useState<
    subjectwiseQuizAnswersResponse[]
  >([]);

  const handleSearchInputChange = (event: any) => {
    console.log("event is", event.target.value);
    setSearchText(event.target.value);
  };

  const handleSearchQuestionSet = () => {
    console.log("value is", searchText);
    if (searchText) {
      getSubjectwiseQuiz(searchText)
        .then((response) => {
          console.log("response of searc is", response.data);
          setSubjectwiseDeatails(response.data);
        })
        .catch((error: any) => {
          console.log("error in subjwiseapi");
          // setLoader(false);
        });
    }
  };

  const getIndexFromNewCreateQuizBody = (
    subjectDetails: subjectWiseQuizListResponse
  ) => {
    const findIndex = newCreateQuizBody.findIndex(
      (obj: any) =>
        obj.subjectName === subjectDetails.subjectName &&
        obj.version === subjectDetails.version
    );
    if (findIndex !== -1) {
      return true;
    } else {
      return false;
    }
  };

  //   const checkAddDisabled = (subjectDetails: subjectWiseQuizListResponse) => {
  //     const findIndex = newCreateQuizBody.findIndex(
  //       (obj: any) =>
  //         obj.subjectName === subjectDetails.subjectName &&
  //         obj.setNumber === subjectDetails.setNumber
  //     );
  //     if (findIndex !== -1) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   };

  //   const checkDeleteDisabled = (subjectDetails: subjectWiseQuizListResponse) => {
  //     const findIndex = newCreateQuizBody.findIndex(
  //       (obj: any) =>
  //         obj.subjectName === subjectDetails.subjectName &&
  //         obj.setNumber === subjectDetails.setNumber
  //     );
  //     if (findIndex !== -1) {
  //     }
  //   };

  const handleAddQuestionSet = (
    subjectDetails: subjectWiseQuizListResponse
  ) => {
    setNewCreateQuizBody((prev) => [
      ...prev,
      {
        version: subjectDetails.version,
        subjectName: subjectDetails.subjectName,
        totalQuestionsCount: subjectDetails.totalQuestionsCount,
      },
    ]);
  };
  const handleDeletQuestionSet = (
    subjectDetails: subjectWiseQuizListResponse
  ) => {
    const existingIndex = newCreateQuizBody.findIndex(
      (obj: any) =>
        obj.subjectName === subjectDetails.subjectName &&
        obj.version === subjectDetails.version
    );
    const newArr = [...newCreateQuizBody];
    newArr.splice(existingIndex, 1);
    setNewCreateQuizBody(newArr);
  };

  const fetchQuestionsForSetAndSubject = (
    subjectDetails: subjectWiseQuizListResponse
  ) => {
    getSubjectwiseQuizAnswers(
      subjectDetails.version,
      subjectDetails.subjectName
    )
      .then((response: any) => {
        console.log("response in accordion is", response.data);
        setSubjecSetQuestions(response.data);
        // setSubjectAnswerList(response.data);
        // setLoader(false);
      })
      .catch((error: any) => {
        // setLoader(false);
        console.log("error in subjwise answersapi");
      });
  };
  console.log("value of new creae quiz body is", newCreateQuizBody);
  return (
    <>
      <Box>
        <Box>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
            <InputLabel htmlFor="search">Search Question Set For</InputLabel>
            <Input
              id="search"
              type="text"
              onChange={handleSearchInputChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    //  aria-label="toggle password visibility"
                    onClick={handleSearchQuestionSet}
                    //  onMouseDown={handleMouseDownPassword}
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Box>
        <Box className="search-result-container">
          {subjectwiseDetails.map(
            (subjectDetails: subjectWiseQuizListResponse, index: number) => (
              <Box key={index} className="search-results">
                <Accordion
                  onChange={(e, expanded) => {
                    if (expanded) {
                      fetchQuestionsForSetAndSubject(subjectDetails);
                    }
                  }}
                  className="accordion"
                >
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Box className="accordion-summary">
                      <Typography>
                        {" "}
                        {`${subjectDetails.subjectName} contains ${
                          subjectDetails.totalQuestionsCount
                        } Questions, Created by ${"Test User"}, Tag - ${
                          subjectDetails.subjectName
                        } `}
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box>
                      {subjectSetQuestions?.map(
                        (
                          obj: subjectwiseQuizAnswersResponse,
                          index: number
                        ) => (
                          <Box key={index} className="questions-container">
                            <Typography>{`${index + 1}.  ${
                              obj.question
                            }`}</Typography>
                            <Box className="options-container">
                              <Typography>Options : </Typography>
                              <Box className="options-box">
                                {obj.questionOptions.map(
                                  (cur: any, index: number) => (
                                    <Typography
                                      className="option"
                                      key={index}
                                    >{` ${optionIds[index]}.${cur} `}</Typography>
                                  )
                                )}
                              </Box>
                            </Box>

                            <Box className="options-container">
                              <Typography>Answer</Typography>
                              <Box className="options-box">
                                {obj.questionAnswers.map(
                                  (cur: any, index: number) => (
                                    <Typography className="option">{` ${optionIds[index]}.${cur} `}</Typography>
                                  )
                                )}
                              </Box>
                            </Box>
                          </Box>
                        )
                      )}
                    </Box>
                  </AccordionDetails>
                </Accordion>
                <Box>
                  {getIndexFromNewCreateQuizBody(subjectDetails) ? (
                    <IconButton
                      onClick={() => handleDeletQuestionSet(subjectDetails)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  ) : (
                    <IconButton
                      onClick={() => handleAddQuestionSet(subjectDetails)}
                    >
                      <AddIcon />
                    </IconButton>
                  )}
                </Box>
                {/* <IconButton
                    onClick={() => handleAddQuestionSet(subjectDetails)}
                    //  disabled={checkAddDisabled(subjectDetails)}
                    disabled={addDisabled}
                  >
                    <AddIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDeletQuestionSet(subjectDetails)}
                    // disabled={checkDeleteDisabled(subjectDetails)}
                    disabled={deleteDisabled}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box> */}

                {/* <Box>
                  <Typography variant="body2">
                    {`${subjectDetails.subjectName} contains ${
                      subjectDetails.totalQuestionsCount
                    } Questions, Created by ${"Test User"}, Tag - ${
                      subjectDetails.subjectName
                    }`}
                  </Typography>
                </Box>

                <Box
                  //  sx={{ display: "flex", alignItems: "center" }}
                  className="button-container"
                >
                  <CheckCircleIcon className="tick-icon" />
                  <Button
                    variant="contained"
                    className="add-button"
                    onClick={() => handleAddQuestionSet(subjectDetails)}
                  >
                    Add
                  </Button>
                  <Button
                    variant="contained"
                    className="add-button"
                    onClick={() => handleDeletQuestionSet(subjectDetails)}
                  >
                    Delete
                  </Button>
                </Box> */}
              </Box>
            )
          )}
        </Box>
        {newCreateQuizBody.length > 0 && (
          <Box>
            <Typography>Selected Sets</Typography>
            {newCreateQuizBody.map((obj: createQuizRequest, index: number) => (
              <Typography>{`${index + 1}. ${obj.subjectName} - ${
                obj.totalQuestionsCount
              } Questions`}</Typography>
            ))}
          </Box>
        )}

        <Box>
          <Button variant="contained">Preview</Button>
        </Box>
      </Box>
    </>
  );
};
export default SearchQuestionSets;
