import { Box, Button } from "@mui/material";
import ReactModal from "react-modal";

import "./ReviewAnswersModal.style.scss";
import "../../../Common/Common.style.scss";
import CloseIcon from "@mui/icons-material/Close";
import { customStylesModal } from "../../SubmittedQuiz/SubmittedQuizes";
import AllSubmittedQuestionsAnswers from "../../DispalyQuizCandidateSubmittedQuestionsAnswers/AllSubmittedQuestionsAnswers";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../Store/ConfigureStrore";
import { handleReviewAnswersModal } from "../../../../Redux/interviewerSlice";

const ReviewAnswersModal = (props: any) => {
  // const {
  //   // openReviewModal,
  //   // setOpenReviewModal,
  //   // quizSubjectInfo,
  //   // totalQuizDetailedInfo,
  //   // loader,
  // } = props;

  const dispatch = useAppDispatch();
  const { loadingStatus, isReviewModalOpen } = useAppSelector(
    (state: any) => state.interviewer
  );
  return (
    <>
      <ReactModal
        isOpen={isReviewModalOpen}
        contentLabel="Minimal Modal Example"
        ariaHideApp={false}
        style={customStylesModal}
      >
        <>
          <AllSubmittedQuestionsAnswers
          // quizSubjectInfo={quizSubjectInfo}
          // totalQuizDetailedInfo={totalQuizDetailedInfo}
          // loader={loader}
          />
          {!loadingStatus.modalLoader ? (
            <Box className="close-button-container">
              <Button
                variant="contained"
                color="error"
                onClick={() => dispatch(handleReviewAnswersModal())}
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
