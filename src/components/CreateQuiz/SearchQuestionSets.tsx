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
  Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import {
  createQuiz,
  getPreviewQuestionsForCreateQuiz,
  getSerchForCreateQuiz,
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
import SelectQuestionsModal from "./SelectQuestionsModal";
import PreviewQuestionsModal from "./PreviewQuestionsModal";
import { string } from "prop-types";

const SearchQuestionSets = () => {
  const [searchText, setSearchText] = useState<string>();
  const [subjectwiseDetails, setSubjectwiseDeatails] = useState<
    subjectWiseQuizListResponse[]
  >([]);
const [name, setName] = useState<any[]>([]);
  const [subjectSetQuestions, setSubjecSetQuestions] = useState<
    subjectwiseQuizAnswersResponse[]
  >([]);

  const [quizLink, setQuizLink] = useState<string>();

  const [selectQuestionOpen, setSelectQuestionOpen] = useState<boolean>(false);
  const [previewQuestionOpen, setPreviewQuestionOpen] =
    useState<boolean>(false);
  const [previewQuestionsData, setPreviewQuestionsData] = useState<any[]>([]);

  const handleSearchInputChange = (event: any) => {
    console.log("event is", event.target.value);
    setSearchText(event.target.value);
    console.log(searchText, 'search');
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
    // console.log(
    //   "valaue of questionDeatails.questinid is ",
    //   questionDeatils.questionId
    // );
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
      subjectDetails.subjectName,
    )
      .then((response: any) => {
        setSubjecSetQuestions(response.data);
        console.log("reponse of preview open is", response.data);
      })
      .catch((error: any) => {
        // setLoader(false);
        console.log("error in subjwise answersapi");
      });
  };

  const handleCheckBoxChange = (event: any, questionDeatils: any) => {
    try {
      console.log(
        "question details in check box is",
        questionDeatils,
        questionDeatils.questionId
      );
      const existingIndex = createQuizSetWiseInfo.findIndex(
        (obj: any) =>
          obj.subjectName === questionDeatils.subjectName &&
          obj.version === questionDeatils.version
      );
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
        console.log("inside else part of check false");
        if (existingIndex !== -1) {
          const newArray = [...createQuizSetWiseInfo];
          const indexOfQuestionId = newArray[existingIndex].questionIds.indexOf(
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

  const handleSelectQuestionsModalOpen = (
    subjectDetails: subjectWiseQuizListResponse
  ) => {
    setSelectQuestionOpen(true);
    fetchQuestionsForSetAndSubject(subjectDetails);
  };

  const handlePreviewQuestionModalOpen = () => {
    setPreviewQuestionOpen(true);
    console.log("value of request body is", createQuizSetWiseInfo);
    getPreviewQuestionsForCreateQuiz(createQuizSetWiseInfo)
      .then((response: any) => {
        console.log("reponse in preview is", response.data);
        setPreviewQuestionsData(response.data);
      })
      .catch((error: any) => {
        console.log("Error in preview quiz", error);
      });
  };

  console.log("value of body create quiz is", createQuizSetWiseInfo);

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
                  <IconButton onClick={handleSearchQuestionSet}>
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
              <Paper>
                <Box>
                  <Typography>
                    {" "}
                    {`${subjectDetails.subjectName} contains ${
                      subjectDetails.totalQuestionsCount
                    } Questions, Created by ${"Test User"}, Tag - ${
                      subjectDetails.tag
                    } `}
                  </Typography>

                  <Box>
                    <Button
                      onClick={() =>
                        handleSelectQuestionsModalOpen(subjectDetails)
                      }
                    >
                      Select Questions
                    </Button>
                    {getIndexFromNewCreateQuizBody(subjectDetails) ? (
                      <Button
                        //  variant="contained"
                        onClick={() => handleDeletQuestionSet(subjectDetails)}
                      >
                        Remove ALL
                      </Button>
                    ) : (
                      <Button
                        // variant="contained"
                        onClick={() => handleAddQuestionSet(subjectDetails)}
                      >
                        Add ALL
                      </Button>
                    )}
                  </Box>
                </Box>
              </Paper>
            )
          )}
        </Box>
        {/* {newCreateQuizBody.length > 0 && (
          <Box>
            <Typography>Selected Sets</Typography>
            {newCreateQuizBody.map((obj: createQuizRequest, index: number) => (
              <Typography key={index}>{`${index + 1}. ${obj.subjectName} - ${
                obj.totalQuestionsCount
              } Questions`}</Typography>
            ))}
          </Box>
        )} */}

        {subjectwiseDetails?.length > 0 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              marginTop: 5,
              marginBottom: 5,
            }}
          >
            <Button
              variant="contained"
              sx={{ marginRight: 5 }}
              onClick={() => handlePreviewQuestionModalOpen()}
            >
              Preview
            </Button>

            {/* <Button variant="contained" onClick={createQuizfromBody}>
              Creat Quiz
            </Button> */}
          </Box>
        )}

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
                  component={ContentCopyIcon}
                  inheritViewBox
                />
                Copy
              </Button>
            </Box>
          </Box>
        )}
        <SelectQuestionsModal
          selectQuestionOpen={selectQuestionOpen}
          setSelectQuestionOpen={setSelectQuestionOpen}
          subjectSetQuestions={subjectSetQuestions}
          handleCheckBoxChange={handleCheckBoxChange}
          getQuestionIdFromNewCreateQuizBody={
            getQuestionIdFromNewCreateQuizBody
          }
        />
        <PreviewQuestionsModal
          previewQuestionOpen={previewQuestionOpen}
          setPreviewQuestionOpen={setPreviewQuestionOpen}
          previewQuestionsData={previewQuestionsData}
          setPreviewQuestionsData={setPreviewQuestionsData}
          handleCheckBoxChange={handleCheckBoxChange}
          getQuestionIdFromNewCreateQuizBody={
            getQuestionIdFromNewCreateQuizBody
          }
          createQuizSetWiseInfo={createQuizSetWiseInfo}
          setCreateQuizSetWiseInfo={setCreateQuizSetWiseInfo}
          setQuizLink={setQuizLink}
          setSubjectwiseDeatails={setSubjectwiseDeatails}
        />
      </Box>
    </>
  );
};
export default SearchQuestionSets;
