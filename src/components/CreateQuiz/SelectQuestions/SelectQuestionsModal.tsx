import { Modal, Box, Typography, Paper, Checkbox, Button } from "@mui/material";
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
  } = props;
  return (
    <>
      <ReactModal
        isOpen={selectQuestionOpen}
        contentLabel="Minimal Modal Example"
        ariaHideApp={false}
        style={customStylesModal}
      >
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
                    onChange={(event: any) => handleCheckBoxChange(event, obj)}
                    inputProps={{ "aria-label": "controlled" }}
                    className="select-check-box"
                  />
                </Box>
              )
            )}
          </Box>
          <Box className="close-modal-button">
            <Button
              variant="contained"
              onClick={() => setSelectQuestionOpen(false)}
            >
              {/* Close */}
              Save
            </Button>
          </Box>
        </Box>
      </ReactModal>
    </>
  );
};
export default SelectQuestionsModal;
