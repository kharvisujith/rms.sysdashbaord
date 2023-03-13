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
import { createQuiz } from "../../../api/apiAgent";
import { customStylesModal } from "../../../screens/SubmittedQuiz/SubmittedQuiz";
import "./PreviewQuestionsModal.style.scss";
import EditIcon from "@mui/icons-material/Edit";
import UpdateIcon from "@mui/icons-material/Update";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import {
  createQuizRequestBody,
  selectedQuestionsCreateQuiz,
  selectedQuestionsCreateQuizWithTag,
} from "../../../Interface/QuizDetails";
import { CircularProgress } from "@material-ui/core";

const PreviewQuestionsModal = (props: any) => {
  const {
    previewQuestionOpen,
    setPreviewQuestionOpen,
    previewQuestionsData,
    setPreviewQuestionsData,
    getQuestionIdFromNewCreateQuizBody,
    handleCheckBoxChange,
    createQuizSetWiseInfo,
    setCreateQuizSetWiseInfo,
    setQuizLink,
    setSubjectwiseDeatails,
    previewLoader,
  } = props;

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

  // const [editTimeChange, setEditTimeChange] = useState<any>({
  //   quizTime: 60,
  //   quizExpiry: 2,
  // });
  const [testTimings, setTestTimings] = useState<any>({
    quizTime: 60,
    quizExpiry: 2,
  });

  const [buttonLoader, setButtonLoader] = useState<Boolean>(false);
  const handlePreviewPageChange = () => {
    const totalQuestions = createQuizSetWiseInfo?.reduce(
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
    // setEditTimeChange((prev: any) => ({
    //   ...prev,
    //   [event.target.name]: event.target.value,
    // }));
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

  const GenrateQuizLink = () => {
    if (!addedTopic) {
      setValidationError({ ...validationError, quizTopic: true });
      return;
    }
    setButtonLoader(true);
    const selectedQuestionCreateQuizBody: selectedQuestionsCreateQuiz[] =
      createQuizSetWiseInfo.map((obj: selectedQuestionsCreateQuizWithTag) => {
        const { tag, ...rest } = obj;
        return rest;
      });
    const createQuizLinkBody = {
      quizTopic: addedTopic,
      totalQuestions: totalQuestionCount,
      quizTimeInMinutes: assignedTestTime,
      quizLinkExpireInHours: assignedTestExpiry,
      quizSetWiseInfo: selectedQuestionCreateQuizBody,
    };
    createQuiz(createQuizLinkBody)
      .then((response: any) => {
        console.log("creat quiz response is", response.data);
        setQuizLink(
          `http://localhost:3000/rms-aug/test/${response.data?.quizId}/${response.data?.quizLink}`
        );
        setPreviewQuestionOpen(false);
        setCurrentPage(1);
        setAddedTopic("");
        // setSubjectwiseDeatails([]);
        setPreviewQuestionsData([]);
        setCreateQuizSetWiseInfo([]);
      })
      .catch((error: any) => console.log("Error in create quiz", error))
      .finally(() => setButtonLoader(false));
  };

  // if (setPreviewLoader) {
  //   return (
  //     <Box className="modal-loader">
  //       <CircularProgress />
  //     </Box>
  //   );
  // }

  return (
    <>
      <ReactModal
        isOpen={previewQuestionOpen}
        contentLabel="Minimal Modal Example"
        ariaHideApp={false}
        style={customStylesModal}
      >
        {!previewLoader ? (
          <>
            <Box className="modal-container">
              {currentPage === 1 ? (
                <>
                  <Box className="questions-container">
                    {previewQuestionsData?.map(
                      (questionData: any, index: number) => (
                        <Box key={index} className="questions">
                          <Typography>{`${index + 1}.  ${
                            questionData.question
                          }`}</Typography>
                          <Checkbox
                            checked={getQuestionIdFromNewCreateQuizBody(
                              questionData
                            )}
                            onChange={(event: any) =>
                              handleCheckBoxChange(event, questionData)
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
                    <Box className="questions-container">
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
                            endIcon={addedTopic ? <UpdateIcon /> : <AddIcon />}
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

            <Box className="handle-modal">
              <Box>
                <Button variant="outlined" onClick={handlePreviewPageChange}>
                  {currentPage === 1 ? "Next" : "Back"}
                </Button>
              </Box>

              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  setPreviewQuestionOpen(false);
                  setCurrentPage(1);
                }}
                endIcon={<CloseIcon />}
              >
                Close
              </Button>
              <Box></Box>
            </Box>
          </>
        ) : (
          <Box className="modal-loader">
            <CircularProgress />
          </Box>
        )}
      </ReactModal>
    </>
  );
};
export default PreviewQuestionsModal;
