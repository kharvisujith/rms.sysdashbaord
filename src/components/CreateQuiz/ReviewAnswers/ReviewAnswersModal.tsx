import { Box, Button } from "@mui/material";
import ReactModal from "react-modal";
import { customStylesModal } from "../../../screens/SubmittedQuiz/SubmittedQuiz";
import AllSubmittedQuestionsAnswers from "../../DispalyQuizCandidateSubmittedQuestionsAnswers/AllSubmittedQuestionsAnswers";
import "./ReviewAnswersModal.style.scss";
import CloseIcon from "@mui/icons-material/Close";

const ReviewAnswersModal = (props: any) => {
  const {
    openReviewModal,
    setOpenReviewModal,
    quizSubjectInfo,
    totalQuizDetailedInfo,
    loader,
  } = props;
  return (
    <>
      <ReactModal
        isOpen={openReviewModal}
        contentLabel="Minimal Modal Example"
        ariaHideApp={false}
        style={customStylesModal}
      >
        <>
          <AllSubmittedQuestionsAnswers
            quizSubjectInfo={quizSubjectInfo}
            totalQuizDetailedInfo={totalQuizDetailedInfo}
            loader={loader}
          />
          {!loader ? (
            <Box
              className="close-button"
              //   style={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                variant="contained"
                color="error"
                onClick={() => setOpenReviewModal(false)}
                endIcon={<CloseIcon />}
              >
                Close
              </Button>
            </Box>
          ) : null}
        </>
      </ReactModal>
    </>
  );
};
export default ReviewAnswersModal;
