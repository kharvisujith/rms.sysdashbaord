import {
  Box,
  Button,
  Checkbox,
  Popover,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import ReactModal from "react-modal";
import "./PreviewQuestionsModal.style.scss";
import EditIcon from "@mui/icons-material/Edit";
import UpdateIcon from "@mui/icons-material/Update";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { CircularProgress } from "@material-ui/core";
import {
  selectedQuestionsCreateQuiz,
  selectedQuestionsCreateQuizWithTag,
  subjectwiseQuizAnswersResponse,
} from "../../../../Interface/Interviewer/InterviewerInterface";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../Store/ConfigureStrore";
import {
  genrateQuizLink,
  handlePreviewModal,
} from "../../../../Redux/interviewerSlice";
import { customStylesModal } from "../../../../utils/Utils";

const PreviewQuestionsModal = () => {
  const {
    previewModalStates,
    createQuizSetWiseInfoBody,
    loadingStatus: { modalLoader },
  } = useAppSelector((state: any) => state.interviewer);
  const dispatch = useAppDispatch();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalQuestionCount, setTotalQuestionCount] = useState<number>(0);
  const [quizTopic, setQuizTopic] = useState<string>("");
  const [addedTopic, setAddedTopic] = useState<string>("");
  const [assignedTestTime, setAssignedTestTime] = useState<number>(60);
  const [assignedTestExpiry, setAssignedTestExpiry] = useState<number>(2);
  const [validationError, setValidationError] = useState<any>({
    quizTopic: false,
  });

  const [anchorElTestTime, setAnchorElTestTime] =
    useState<HTMLButtonElement | null>(null);
  const [anchorlElTestExpiry, setAnchorElTestExpiry] =
    useState<HTMLButtonElement | null>(null);

  const [testTimings, setTestTimings] = useState<any>({
    quizTime: 60,
    quizExpiry: 2,
  });

  const [buttonLoader, setButtonLoader] = useState<Boolean>(false);
  const handlePreviewPageChange = () => {
    const totalQuestions = createQuizSetWiseInfoBody?.reduce(
      (numOfElement: number, obj: selectedQuestionsCreateQuizWithTag) =>
        numOfElement + obj.questionIds.length,
      0
    );

    setTotalQuestionCount(totalQuestions);
    currentPage === 1 ? setCurrentPage(2) : setCurrentPage(1);
  };

  const handleTopicChange = (event: any) => {
    setQuizTopic(event.target.value);
  };

  const handleAddTopic = () => {
    setAddedTopic(quizTopic);
    setValidationError({ ...validationError, quizTopic: false });
    setQuizTopic("");
  };

  const handleEditTestTime = (event: any) => {
    setAnchorElTestTime(event.currentTarget);
  };

  const handleEditTestExpiry = (event: any) => {
    setAnchorElTestExpiry(event.currentTarget);
  };

  const handleCloseEditTestTime = () => {
    setAnchorElTestTime(null);
  };
  const handleCloseEditTestExpiry = () => {
    setAnchorElTestExpiry(null);
  };

  const handleEditOnChange = (event: any) => {
    setTestTimings((prev: any) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleEditUpdate = (event: any) => {
    if (event.target.name === "testTime") {
      setAssignedTestTime(parseInt(testTimings.quizTime));
      setAnchorElTestTime(null);
    } else {
      setAssignedTestExpiry(parseInt(testTimings.quizExpiry));
      setAnchorElTestExpiry(null);
    }
  };

  const GenrateQuizLink = async () => {
    try {
      if (!addedTopic) {
        setValidationError({ ...validationError, quizTopic: true });
        return;
      }
      setButtonLoader(true);
      const selectedQuestionCreateQuizBody: selectedQuestionsCreateQuiz[] =
        createQuizSetWiseInfoBody.map(
          (obj: selectedQuestionsCreateQuizWithTag) => {
            const { tag, ...rest } = obj;
            return rest;
          }
        );
      const createQuizLinkBody = {
        quizTopic: addedTopic,
        totalQuestions: totalQuestionCount,
        quizTimeInMinutes: assignedTestTime,
        quizLinkExpireInHours: assignedTestExpiry,
        quizSetWiseInfo: selectedQuestionCreateQuizBody,
      };

      await dispatch(genrateQuizLink(createQuizLinkBody));
      setAddedTopic("");
      setCurrentPage(1);
    } catch (error: any) {
      console.log("Error in create Quiz", error);
    }
  };

  const checkIdInCreateQuizBody = (
    questionDeatils: subjectwiseQuizAnswersResponse
  ) => {
    const findIndex = createQuizSetWiseInfoBody?.findIndex(
      (obj: any) =>
        obj.subjectName === questionDeatils.subjectName &&
        obj.version === questionDeatils.version
    );
    if (findIndex !== -1) {
      const newArr = [...createQuizSetWiseInfoBody];
      const isIdPresent = newArr[findIndex].questionIds.includes(
        questionDeatils.questionId
      );
      if (isIdPresent) return true;
      else return false;
    } else {
      return false;
    }
  };

  return (
    <>
      <ReactModal
        isOpen={previewModalStates.isPreviewModalOpen}
        contentLabel="Minimal Modal Example"
        ariaHideApp={false}
        style={customStylesModal}
      >
        <Box className="modal-container">
          {modalLoader ? (
            <Box className="modal-loader">
              <CircularProgress />
            </Box>
          ) : (
            <>
              <Box className="content-container">
                {currentPage === 1 ? (
                  <>
                    <Box>
                      {previewModalStates.previewQuestions?.map(
                        (questionData: any, index: number) => (
                          <Box key={index} className="questions">
                            <Typography>{`${index + 1}.  ${
                              questionData.question
                            }`}</Typography>
                            <Checkbox
                              checked={checkIdInCreateQuizBody(questionData)}
                              onChange={(event: any) =>
                                dispatch({
                                  type: "interviewer/handleSelectQuestionsCheckBoxChange",
                                  payload: {
                                    event: event,
                                    questionDeatils: questionData,
                                  },
                                })
                              }
                              inputProps={{ "aria-label": "controlled" }}
                              className="select-check-box"
                            />
                          </Box>
                        )
                      )}
                    </Box>
                  </>
                ) : (
                  <>
                    <Box>
                      <Box>
                        <Box className="quiz-topic-container">
                          <Box className="quiz-topic">
                            <Typography>Topcis Covered</Typography>
                          </Box>
                          <Box className="add-topic-container">
                            <TextField
                              variant="outlined"
                              className="text-field"
                              label={addedTopic ? "Update Topic" : "Add Topic*"}
                              size="small"
                              onChange={handleTopicChange}
                              value={quizTopic}
                            />

                            <Button
                              variant={quizTopic ? "outlined" : "contained"}
                              className="button"
                              onClick={handleAddTopic}
                              disabled={quizTopic ? false : true}
                              endIcon={
                                addedTopic ? <UpdateIcon /> : <AddIcon />
                              }
                            >
                              {addedTopic ? "Update" : "Add"}
                            </Button>
                          </Box>
                          {validationError.quizTopic && (
                            <Typography variant="body2" color="error">
                              Please Add Topic
                            </Typography>
                          )}
                          {addedTopic ? (
                            <Box>
                              <Typography>{`Quiz Topic : ${addedTopic}`}</Typography>
                            </Box>
                          ) : null}
                        </Box>

                        <Box className="quiz-info-container">
                          <Box className="element-box">
                            <Box className="info-container ">
                              <Typography>{`Total Number Of Questions Selected ${totalQuestionCount}`}</Typography>
                            </Box>
                          </Box>
                          <Box className="element-box">
                            <Box className="info-container">
                              <Typography>{`Estimated Time Rrequired ${assignedTestTime} Minutes`}</Typography>
                            </Box>

                            <Button
                              variant="outlined"
                              className="button"
                              onClick={handleEditTestTime}
                              endIcon={<EditIcon />}
                            >
                              Edit
                            </Button>
                            <Popover
                              open={Boolean(anchorElTestTime)}
                              anchorEl={anchorElTestTime}
                              onClose={handleCloseEditTestTime}
                              anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                              }}
                            >
                              <Box className="edit-popover">
                                <TextField
                                  label="Test Duration In Minutes"
                                  type="number"
                                  variant="standard"
                                  name="quizTime"
                                  value={testTimings.quizTime}
                                  onChange={handleEditOnChange}
                                />
                                <Button
                                  name="testTime"
                                  onClick={handleEditUpdate}
                                  //variant="outlined"
                                >
                                  Update
                                </Button>
                              </Box>
                            </Popover>
                          </Box>

                          <Box className="element-box">
                            <Box className="info-container">
                              <Typography>{`Test Link Expires in ${assignedTestExpiry} hours`}</Typography>
                            </Box>

                            <Button
                              variant="outlined"
                              className="button"
                              onClick={handleEditTestExpiry}
                              endIcon={<EditIcon />}
                            >
                              Edit
                            </Button>
                          </Box>
                          <Popover
                            open={Boolean(anchorlElTestExpiry)}
                            anchorEl={anchorlElTestExpiry}
                            onClose={handleCloseEditTestExpiry}
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "left",
                            }}
                          >
                            <Box className="edit-popover">
                              <TextField
                                label="Test Expiry in Hours"
                                type="number"
                                variant="standard"
                                name="quizExpiry"
                                value={testTimings.quizExpiry}
                                onChange={handleEditOnChange}
                              />
                              <Button
                                name="LinkExpiryTime"
                                //   variant="outlined"
                                onClick={handleEditUpdate}
                              >
                                Update
                              </Button>
                            </Box>
                          </Popover>
                        </Box>
                        <Box className="generate-link-btn">
                          {buttonLoader ? (
                            <Box className="button-loader">
                              <CircularProgress />
                            </Box>
                          ) : (
                            <Button
                              variant="contained"
                              className="generate-btn"
                              onClick={GenrateQuizLink}
                            >
                              Generate Link
                            </Button>
                          )}
                        </Box>
                      </Box>
                    </Box>
                  </>
                )}
              </Box>
              <Box className="footer-container">
                <Box className="footer-content">
                  <Button variant="outlined" onClick={handlePreviewPageChange}>
                    {currentPage === 1 ? "Next" : "Back"}
                  </Button>

                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                      dispatch(handlePreviewModal());
                      setCurrentPage(1);
                    }}
                    endIcon={<CloseIcon />}
                  >
                    Close
                  </Button>
                </Box>
              </Box>
            </>
          )}
        </Box>
      </ReactModal>
    </>
  );
};
export default PreviewQuestionsModal;
