import { Box, Button } from "@mui/material";
import ReactModal from "react-modal";
import { customStylesModal } from "../../../screens/SubmittedQuiz/SubmittedQuiz";
import AllSubmittedQuestionsAnswers from "../../DispalyQuizCandidateSubmittedQuestionsAnswers/AllSubmittedQuestionsAnswers";

const ReviewAnswersModal = (props: any) => {
  const {
    openReviewModal,
    setOpenReviewModal,
    quizSubjectInfo,
    totalQuizDetailedInfo,
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
          />
          <Box style={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              color="error"
              onClick={() => setOpenReviewModal(false)}
            >
              Close
            </Button>
          </Box>
        </>
      </ReactModal>
    </>
  );
};
export default ReviewAnswersModal;
