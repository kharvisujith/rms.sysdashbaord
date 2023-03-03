import { Modal, Box, Typography, Paper, Checkbox, Button } from "@mui/material";
import ReactModal from "react-modal";
import { subjectwiseQuizAnswersResponse } from "../../Interface/QuizDetails";
import { customStylesModal } from "../../screens/SubmittedQuiz/SubmittedQuiz";
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
      {/* <Modal
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      > */}
      <ReactModal
        isOpen={selectQuestionOpen}
        contentLabel="Minimal Modal Example"
        ariaHideApp={false}
        style={customStylesModal}
      >
        <Box>
          {subjectSetQuestions?.map(
            (obj: subjectwiseQuizAnswersResponse, index: number) => (
              <Box key={index} className="questions-container">
                <Typography>{`${index + 1}.  ${obj.question}`}</Typography>
                <Checkbox
                  checked={getQuestionIdFromNewCreateQuizBody(obj)}
                  onChange={(event: any) => handleCheckBoxChange(event, obj)}
                  inputProps={{ "aria-label": "controlled" }}
                  className="select-check-box"
                />
              </Box>
            )
          )}
          <Button onClick={() => setSelectQuestionOpen(false)}>Close</Button>
        </Box>
      </ReactModal>
      {/* </Modal> */}
    </>
  );
};
export default SelectQuestionsModal;
