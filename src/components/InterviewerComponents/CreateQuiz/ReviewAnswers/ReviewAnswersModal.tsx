import { Box, Button } from "@mui/material";
import ReactModal from "react-modal";

import "./ReviewAnswersModal.style.scss";
import "../../../Common/Common.style.scss";
import CloseIcon from "@mui/icons-material/Close";
import { customStylesModal } from "../../SubmittedQuiz/SubmittedQuizes";
import AllSubmittedQuestionsAnswers from "../../DispalyQuizCandidateSubmittedQuestionsAnswers/AllSubmittedQuestionsAnswers";

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
              // className="close-button"
              //   style={{ display: "flex", justifyContent: "center" }}
              className="close-button-container"
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
