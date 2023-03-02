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
  Checkbox,
  SvgIcon,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import {
  createQuiz,
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
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

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

  const [quizLink, setQuizLink] = useState<string>();

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
    const findIndex = createQuizSetWiseInfo.findIndex(
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

  const getQuestionIdFromNewCreateQuizBody = (
    questionDeatils: subjectwiseQuizAnswersResponse
  ) => {
    console.log(
      "valaue of questionDeatails.questinid is ",
      questionDeatils.questionId
    );
    const findIndex = createQuizSetWiseInfo.findIndex(
      (obj: any) =>
        obj.subjectName === questionDeatils.subjectName &&
        obj.version === questionDeatils.version
    );
    if (findIndex !== -1) {
      const newArr = [...createQuizSetWiseInfo];
      const isIdPresent = newArr[findIndex].questionIds.includes(
        questionDeatils.questionId
      );
      if (isIdPresent) return true;
      else return false;
    } else {
      return false;
    }
  };

  const [createQuizSetWiseInfo, setCreateQuizSetWiseInfo] = useState<any>([]);
  const handleAddQuestionSet = async (
    subjectDetails: subjectWiseQuizListResponse
  ) => {
    try {
      const existingIndex = createQuizSetWiseInfo.findIndex(
        (obj: any) =>
          obj.subjectName === subjectDetails.subjectName &&
          obj.version === subjectDetails.version
      );
      // get all the question ids for particualr set and subjetname - api needed to get only question-ids for set and subject
      const response = await getSubjectwiseQuizAnswers(
        subjectDetails.version,
        subjectDetails.subjectName
      );

      if (response.data.length > 0) {
        var questionIdsArray = response.data.map((obj: any) => obj.questionId);

        console.log("ids is", questionIdsArray);

        if (existingIndex === -1) {
          setCreateQuizSetWiseInfo((prev: any) => [
            ...prev,
            {
              version: subjectDetails.version,
              subjectName: subjectDetails.subjectName,
              questionIds: questionIdsArray,
            },
          ]);
        }
      }
    } catch (error: any) {
      console.log("Error in get question ids", error);
    }
  };

  const handleDeletQuestionSet = (
    subjectDetails: subjectWiseQuizListResponse
  ) => {
    try {
      // const existingIndexforold = newCreateQuizBody.findIndex(
      //   (obj: any) =>
      //     obj.subjectName === subjectDetails.subjectName &&
      //     obj.version === subjectDetails.version
      // );
      // if (existingIndexforold !== -1) {
      //   const newArr = [...newCreateQuizBody];
      //   newArr.splice(existingIndexforold, 1);
      //   setNewCreateQuizBody(newArr);

      // for new creatquiz body
      const existingIndex = createQuizSetWiseInfo.findIndex(
        (obj: any) =>
          obj.subjectName === subjectDetails.subjectName &&
          obj.version === subjectDetails.version
      );
      if (existingIndex !== -1) {
        const newCreatQuizArr = [...createQuizSetWiseInfo];
        newCreatQuizArr.splice(existingIndex, 1);
        setCreateQuizSetWiseInfo(newCreatQuizArr);
      }
    } catch (error: any) {
      console.log("Error in get question ans ids", error);
    }
  };

  const fetchQuestionsForSetAndSubject = (
    subjectDetails: subjectWiseQuizListResponse
  ) => {
    getSubjectwiseQuizAnswers(
      subjectDetails.version,
      subjectDetails.subjectName
    )
      .then((response: any) => {
        setSubjecSetQuestions(response.data);
      })
      .catch((error: any) => {
        // setLoader(false);
        console.log("error in subjwise answersapi");
      });
  };

  const handleCheckBoxChange = (event: any, questionDeatils: any) => {
    try {
      const existingIndex = createQuizSetWiseInfo.findIndex(
        (obj: any) =>
          obj.subjectName === questionDeatils.subjectName &&
          obj.version === questionDeatils.version
      );
      console.log("value of existingid in check box chcange is", existingIndex);
      console.log("value of check box is", event.target.checked);
      if (event.target.checked) {
        if (existingIndex === -1) {
          setCreateQuizSetWiseInfo((prev: any) => [
            ...prev,
            {
              version: questionDeatils.version,
              subjectName: questionDeatils.subjectName,
              questionIds: [questionDeatils.questionId],
            },
          ]);
        } else {
          const newArray = [...createQuizSetWiseInfo];
          newArray[existingIndex].questionIds.push(questionDeatils.questionId);
          setCreateQuizSetWiseInfo(newArray);
        }
      } else {
        if (existingIndex !== -1) {
          const newArray = [...createQuizSetWiseInfo];
          const indexOfQuestionId = newArray.indexOf(
            questionDeatils.questionId
          );
          newArray[existingIndex].questionIds.splice(indexOfQuestionId, 1);
          if (newArray[existingIndex].questionIds.length < 1) {
            newArray.splice(existingIndex, 1);
          }
          setCreateQuizSetWiseInfo(newArray);
        }
      }
    } catch (error: any) {
      console.log("Error in add question to createquiz body", error);
    }
  };
  console.log("new create body is", createQuizSetWiseInfo);

  const createQuizfromBody = () => {
    console.log("body of create on submit is", createQuizSetWiseInfo);
    const totalQuestions = createQuizSetWiseInfo.reduce(
      (numOfElement: number, obj: any) => numOfElement + obj.questionIds.length,
      0
    );
    console.log("total questions is", totalQuestions);
    const createQuizBody = {
      quizTopic: "react-mid",
      totalQuestions: totalQuestions,
      quizTimeInMinutes: 60,
      quizLinkExpireInHours: 3,
      quizSetWiseInfo: createQuizSetWiseInfo,
    };

    createQuiz(createQuizBody)
      .then((response: any) => {
        console.log("creat quiz response is", response.data);
        setQuizLink(
          `http://localhost:3000/rms-aug/test/${response.data?.quizId}/${response.data?.quizLink}`
        );
      })
      .catch((error: any) => console.log("Error in create quiz", error));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      function () {
        // setCopied(true);
      },
      function (err) {
        console.error("Could not copy text: ", err);
      }
    );
  };

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
                            <Checkbox
                              checked={getQuestionIdFromNewCreateQuizBody(obj)}
                              onChange={(event: any) =>
                                handleCheckBoxChange(event, obj)
                              }
                              inputProps={{ "aria-label": "controlled" }}
                            />

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
                                    <Typography
                                      className="option"
                                      key={index}
                                    >{` ${optionIds[index]}.${cur} `}</Typography>
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
              <Typography key={index}>{`${index + 1}. ${obj.subjectName} - ${
                obj.totalQuestionsCount
              } Questions`}</Typography>
            ))}
          </Box>
        )}

        <Box>
          <Button variant="contained">Preview</Button>
        </Box>
        <Box>
          <Button variant="contained" onClick={createQuizfromBody}>
            Creat Quiz
          </Button>
        </Box>

        {quizLink && (
          <Box className="box-link">
            <Typography>{`Test Link :`}</Typography>
            <Box className="test-link">
              <Typography>{quizLink}</Typography>
              <Button
                className="copy"
                variant="outlined"
                onClick={() => copyToClipboard(quizLink)}
              >
                <SvgIcon
                  className="icon"
                  // sx={{ marginLeft: -1 }}
                  component={ContentCopyIcon}
                  inheritViewBox
                />
                Copy
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};
export default SearchQuestionSets;
