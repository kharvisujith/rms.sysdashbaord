import {
  Modal,
  Box,
  Typography,
  Paper,
  Checkbox,
  Button,
  CircularProgress,
} from "@mui/material";
import ReactModal from "react-modal";
import { subjectwiseQuizAnswersResponse } from "../../../Interface/QuizDetails";
import { customStylesModal } from "../../../screens/SubmittedQuiz/SubmittedQuiz";
import "./SelectQuestionsModal.style.scss";

const SelectQuestionsModal = (props: any) => {
  const {
    selectQuestionOpen,
    setSelectQuestionOpen,
    subjectSetQuestions,
    handleCheckBoxChange,
    getQuestionIdFromNewCreateQuizBody,
    previewLoader,
  } = props;
  return (
    <>
      <ReactModal
        isOpen={selectQuestionOpen}
        contentLabel="Minimal Modal Example"
        ariaHideApp={false}
        style={customStylesModal}
      >
        {!previewLoader ? (
          <Box>
            <Box className="modal-container">
              {subjectSetQuestions?.map(
                (obj: subjectwiseQuizAnswersResponse, index: number) => (
                  <Box key={index} className="questions">
                    <Typography className="text">{`${index + 1}.  ${
                      obj.question
                    }`}</Typography>
                    <Checkbox
                      checked={getQuestionIdFromNewCreateQuizBody(obj)}
                      onChange={(event: any) =>
                        handleCheckBoxChange(event, obj)
                      }
                      inputProps={{ "aria-label": "controlled" }}
                      className="select-check-box"
                    />
                  </Box>
                )
              )}
            </Box>

            <Box className="save-button">
              <Button
                variant="contained"
                onClick={() => setSelectQuestionOpen(false)}
              >
                Save
              </Button>
            </Box>
          </Box>
        ) : (
          <Box className="modal-loader">
            <CircularProgress />
          </Box>
        )}
      </ReactModal>
    </>
  );
};
export default SelectQuestionsModal;
