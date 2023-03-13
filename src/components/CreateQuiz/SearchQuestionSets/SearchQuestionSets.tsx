import {
  Box,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  Button,
  SvgIcon,
  Paper,
  Chip,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import {
  filterQuestionsSets,
  getPreviewQuestionsForCreateQuiz,
  getSubjectwiseQuiz,
  getSubjectwiseQuizAnswers,
} from "../../../api/apiAgent";
import {
  selectedQuestionsCreateQuizWithTag,
  subjectwiseQuizAnswersResponse,
  subjectWiseQuizListResponse,
} from "../../../Interface/QuizDetails";
import { Typography } from "@material-ui/core";
import "./SearchQuestionSets.style.scss";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import SelectQuestionsModal from "../SelectQuestions/SelectQuestionsModal";
import PreviewQuestionsModal from "../PreviewQuestions/PreviewQuestionsModal";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const SearchQuestionSets = () => {
  const [createQuizSetWiseInfo, setCreateQuizSetWiseInfo] = useState<
    selectedQuestionsCreateQuizWithTag[]
  >([]);
  const [searchText, setSearchText] = useState<string>();
  const [subjectwiseDetails, setSubjectwiseDeatails] = useState<
    subjectWiseQuizListResponse[]
  >([]);

  const [subjectSetQuestions, setSubjecSetQuestions] = useState<
    subjectwiseQuizAnswersResponse[]
  >([]);

  const [quizLink, setQuizLink] = useState<string>();

  const [selectQuestionOpen, setSelectQuestionOpen] = useState<boolean>(false);
  const [previewQuestionOpen, setPreviewQuestionOpen] =
    useState<boolean>(false);
  const [previewQuestionsData, setPreviewQuestionsData] = useState<any[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [previewLoader, setPreviewLoader] = useState<boolean>(false);

  const handleSearchInputChange = (event: any) => {
    console.log("event is", event.target.value);
    setSearchText(event.target.value);
  };

  const handleSearchQuestionSet = () => {
    console.log("value is", searchText);
    setLoader(true);
    if (searchText) {
      filterQuestionsSets(searchText.split(" "))
        .then((response: any) => {
          console.log("filer response is", response);
          setSubjectwiseDeatails(response.data);
        })
        .catch((error: any) => {
          console.log("error in subjwiseapi");
          // setLoader(false);
        })
        .finally(() => setLoader(false));
    }
  };

  const getIndexFromNewCreateQuizBody = (
    subjectDetails: subjectWiseQuizListResponse
  ) => {
    const findIndex = createQuizSetWiseInfo.findIndex(
      (obj: selectedQuestionsCreateQuizWithTag) =>
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
      (obj: selectedQuestionsCreateQuizWithTag) =>
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

  const checkForSubjectAndVersion = (subjectName: string, version: string) => {
    console.log("subject and version is", subjectName, version);
    console.log("create djsdklsdjkjk", createQuizSetWiseInfo);
    const filterdArr = createQuizSetWiseInfo.filter(
      (obj: selectedQuestionsCreateQuizWithTag) =>
        obj.subjectName === subjectName && obj.version === version
    );
    console.log("filterd array is", filterdArr);
    if (filterdArr.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  const handleAddQuestionSet = async (
    subjectDetails: subjectWiseQuizListResponse
  ) => {
    try {
      const existingIndex = createQuizSetWiseInfo.findIndex(
        (obj: selectedQuestionsCreateQuizWithTag) =>
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

        if (existingIndex === -1) {
          setCreateQuizSetWiseInfo((prev: any) => [
            ...prev,
            {
              version: subjectDetails.version,
              subjectName: subjectDetails.subjectName,
              tag: subjectDetails.tag,
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
      // for new creatquiz body
      const existingIndex = createQuizSetWiseInfo.findIndex(
        (obj: selectedQuestionsCreateQuizWithTag) =>
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
    setPreviewLoader(true);
    getSubjectwiseQuizAnswers(
      subjectDetails.version,
      subjectDetails.subjectName
    )
      .then((response: any) => {
        setSubjecSetQuestions(response.data);
        console.log("reponse of preview open is", response.data);
      })
      .catch((error: any) => {
        // setLoader(false);
        console.log("error in subjwise answersapi");
      })
      .finally(() => setPreviewLoader(false));
  };

  const handleCheckBoxChange = (event: any, questionDeatils: any) => {
    try {
      console.log(
        "question details in check box is",
        questionDeatils,
        questionDeatils.questionId
      );
      const existingIndex = createQuizSetWiseInfo.findIndex(
        (obj: selectedQuestionsCreateQuizWithTag) =>
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
              tag: questionDeatils.tag,
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
    setPreviewLoader(true);
    getPreviewQuestionsForCreateQuiz(createQuizSetWiseInfo)
      .then((response: any) => {
        console.log("reponse in preview is", response.data);
        setPreviewQuestionsData(response.data);
      })
      .catch((error: any) => {
        console.log("Error in preview quiz", error);
      })
      .finally(() => {
        console.log("inside finallyyyyyy");
        setPreviewLoader(false);
      });
  };

  console.log("createquizsetwiseinfo is", createQuizSetWiseInfo);

  useEffect(() => {
    setLoader(true);
    getSubjectwiseQuiz("")
      .then((response) => {
        console.log("response of searc is keeeeeeeeeeek", response.data);
        setSubjectwiseDeatails(response.data);
      })
      .catch((error: any) => {
        console.log("error in subjwiseapi");
        // setLoader(false);
      })
      .finally(() => setLoader(false));
  }, []);

  return (
    <>
      <Box className="search-main-container">
        <Box>
          <FormControl className="search-input" variant="standard">
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

        {!loader ? (
          <Box className="search-result-container">
            {subjectwiseDetails.length > 0 &&
              subjectwiseDetails?.map(
                (
                  subjectDetails: subjectWiseQuizListResponse,
                  index: number
                ) => (
                  <Paper key={index}>
                    <Box className="search-result">
                      <Box className="search-text">
                        <Typography>
                          {`${subjectDetails.subjectName} contains ${
                            subjectDetails.totalQuestionsCount
                          } Questions, Created by ${"Test User"}, Tag - ${
                            subjectDetails.tag
                          } `}
                        </Typography>
                      </Box>

                      <Box className="selected-icon">
                        {checkForSubjectAndVersion(
                          subjectDetails.subjectName,
                          subjectDetails.version
                        ) && (
                          <IconButton size="small">
                            <CheckCircleIcon
                              className="icon"
                              fontSize="small"
                            />
                          </IconButton>
                        )}
                      </Box>

                      <Box className="search-buttons">
                        <Button
                          variant="outlined"
                          onClick={() =>
                            handleSelectQuestionsModalOpen(subjectDetails)
                          }
                        >
                          Select Questions
                        </Button>
                        {getIndexFromNewCreateQuizBody(subjectDetails) ? (
                          <Button
                            variant="outlined"
                            onClick={() =>
                              handleDeletQuestionSet(subjectDetails)
                            }
                          >
                            Remove ALL
                          </Button>
                        ) : (
                          <Button
                            variant="outlined"
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
        ) : (
          <Box className="table-loader ">
            <CircularProgress />
          </Box>
        )}

        {createQuizSetWiseInfo.length > 0 && (
          <Box>
            <Box className="selected-sets-box">
              <Typography variant="h6">Selected Question Sets</Typography>
              <Box className="selected-sets">
                <Paper className="selected-tags-container">
                  {createQuizSetWiseInfo.map(
                    (
                      obj: selectedQuestionsCreateQuizWithTag,
                      index: number
                    ) => (
                      <Chip
                        label={`${obj.tag} - ${obj.questionIds.length} Questions`}
                        key={index}
                        size="small"
                        className="tagname"
                        // onClick={() => handleTagsClick("react")}
                      />
                    )
                  )}
                </Paper>
              </Box>
            </Box>
          </Box>
        )}

        {createQuizSetWiseInfo?.length > 0 && (
          <Box className="preview-button-contaner">
            <Button
              variant="contained"
              onClick={() => handlePreviewQuestionModalOpen()}
              disabled={createQuizSetWiseInfo.length > 0 ? false : true}
              className="preview-button"
            >
              Preview
            </Button>
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
          previewLoader={previewLoader}
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
          previewLoader={previewLoader}
        />
      </Box>
    </>
  );
};
export default SearchQuestionSets;
