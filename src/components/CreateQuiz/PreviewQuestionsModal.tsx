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
import { createQuiz } from "../../api/apiAgent";
import { customStylesModal } from "../../screens/SubmittedQuiz/SubmittedQuiz";
import "./PreviewQuestionsModal.style.scss";

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
  } = props;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalQuestionCount, setTotalQuestionCount] = useState<number>();
  const [quizTopic, setQuizTopic] = useState<string>();
  const [addedTopic, setAddedTopic] = useState<string>();
  // const [assignedTime, setAssignedTime] = useState<any>({
  //   testTime: 60,
  //   LinkExpiryTime: 2,
  // });
  const [assignedTestTime, setAssignedTestTime] = useState<number>(60);
  const [assignedTestExpiry, setAssignedTestExpiry] = useState<number>(2);

  const [anchorElTestTime, setAnchorElTestTime] =
    useState<HTMLButtonElement | null>(null);
  const [anchorlElTestExpiry, setAnchorElTestExpiry] =
    useState<HTMLButtonElement | null>(null);

  const [editTimeChange, setEditTimeChange] = useState<any>({
    quizTime: "",
    quizExpiry: "",
  });

  const handlePreviewPageChange = () => {
    const totalQuestions = createQuizSetWiseInfo?.reduce(
      (numOfElement: number, obj: any) => numOfElement + obj.questionIds.length,
      0
    );

    setTotalQuestionCount(totalQuestions);
    currentPage === 1 ? setCurrentPage(2) : setCurrentPage(1);
  };

  const handleTopicChange = (event: any) => {
    setQuizTopic(event.target.value);
  };

  const handleAddTopic = () => {
    setQuizTopic("");
    setAddedTopic(quizTopic);
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
    setEditTimeChange((prev: any) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleEditUpdate = (event: any) => {
    if (event.target.name === "testTime") {
      setAssignedTestTime(parseInt(editTimeChange.quizTime));
      setAnchorElTestTime(null);
    } else {
      setAssignedTestExpiry(parseInt(editTimeChange.quizExpiry));
      setAnchorElTestExpiry(null);
    }
  };

  const GenrateQuizLink = () => {
    const createLinkBody = {
      quizTopic: addedTopic,
      totalQuestions: totalQuestionCount,
      quizTimeInMinutes: assignedTestTime,
      quizLinkExpireInHours: assignedTestExpiry,
      quizSetWiseInfo: createQuizSetWiseInfo,
    };
    createQuiz(createLinkBody)
      .then((response: any) => {
        console.log("creat quiz response is", response.data);
        setQuizLink(
          `http://localhost:3000/rms-aug/test/${response.data?.quizId}/${response.data?.quizLink}`
        );
        setPreviewQuestionOpen(false);

        setCurrentPage(1);
        setAddedTopic("");
        setSubjectwiseDeatails([]);
        setPreviewQuestionsData([]);
        setCreateQuizSetWiseInfo([]);
      })
      .catch((error: any) => console.log("Error in create quiz", error));
    console.log("final body is", createLinkBody);
  };

  return (
    <>
      <ReactModal
        isOpen={previewQuestionOpen}
        contentLabel="Minimal Modal Example"
        ariaHideApp={false}
        style={customStylesModal}
      >
        {currentPage === 1 ? (
          <>
            {previewQuestionsData.map((questionData: any, index: number) => (
              <Box key={index} className="questions-container">
                <Typography>{`${index + 1}.  ${
                  questionData.question
                }`}</Typography>
                <Checkbox
                  checked={getQuestionIdFromNewCreateQuizBody(questionData)}
                  onChange={(event: any) =>
                    handleCheckBoxChange(event, questionData)
                  }
                  inputProps={{ "aria-label": "controlled" }}
                  className="select-check-box"
                />
              </Box>
            ))}
            <Button variant="contained" onClick={handlePreviewPageChange}>
              Next
            </Button>
          </>
        ) : (
          <>
            <Box>
              <Box className="quiz-topic-container">
                <Box className="quiz-topic">
                  <Typography>Topcis Covered</Typography>
                </Box>
                <Box className="add-topic-container">
                  <TextField
                    variant="outlined"
                    className="text-field"
                    label={addedTopic ? "Update Topic" : "Add Topic"}
                    size="small"
                    onChange={handleTopicChange}
                    value={quizTopic}
                  />

                  <Button
                    variant="contained"
                    className="button"
                    onClick={handleAddTopic}
                    disabled={quizTopic ? false : true}
                  >
                    {addedTopic ? "Update" : "Add"}
                  </Button>
                </Box>
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
                    variant="contained"
                    className="button"
                    onClick={handleEditTestTime}
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
                        value={editTimeChange.quizTime}
                        onChange={handleEditOnChange}
                      />
                      <Button name="testTime" onClick={handleEditUpdate}>
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
                    variant="contained"
                    className="button"
                    onClick={handleEditTestExpiry}
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
                      value={editTimeChange.quizExpiry}
                      onChange={handleEditOnChange}
                    />
                    <Button
                      name="LinkExpiryTime"
                      variant="contained"
                      onClick={handleEditUpdate}
                    >
                      Update
                    </Button>
                  </Box>
                </Popover>
              </Box>
              <Box>
                <Button variant="contained" onClick={GenrateQuizLink}>
                  Generate Link
                </Button>
              </Box>

              <Button variant="contained" onClick={handlePreviewPageChange}>
                Back
              </Button>
            </Box>
          </>
        )}

        {/* {currentPage === 1 ? (
          <Button variant="contained" onClick={handlePreviewPageChange}>
            Next
          </Button>
        ) : (
          <Button variant="contained" onClick={handlePreviewPageChange}>
            Back
          </Button>
        )} */}

        <Button onClick={() => setPreviewQuestionOpen(false)}>Close</Button>
      </ReactModal>
    </>
  );
};
export default PreviewQuestionsModal;