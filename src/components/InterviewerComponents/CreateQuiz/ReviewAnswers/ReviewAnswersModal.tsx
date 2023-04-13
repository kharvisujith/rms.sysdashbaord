import { Box, Button, CircularProgress } from "@mui/material";
import ReactModal from "react-modal";

import "./ReviewAnswersModal.style.scss";
import "../../../Common/Common.style.scss";
import CloseIcon from "@mui/icons-material/Close";
import AllSubmittedQuestionsAnswers from "../../DispalyQuizCandidateSubmittedQuestionsAnswers/AllSubmittedQuestionsAnswers";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../Store/ConfigureStrore";
import { handleReviewAnswersModal } from "../../../../Redux/interviewerSlice";
import { customStylesModal } from "../../../../utils/Utils";
import "../../../Common/Common.style.scss";

const ReviewAnswersModal = () => {
  const dispatch = useAppDispatch();
  const {
    loadingStatus: { modalLoader },
    isReviewModalOpen,
  } = useAppSelector((state: any) => state.interviewer);
  return (
    <>
      <ReactModal
        isOpen={isReviewModalOpen}
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
              <AllSubmittedQuestionsAnswers />
              <Box className="footer-container">
                <Box className="footer-content">
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => dispatch(handleReviewAnswersModal())}
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
export default ReviewAnswersModal;
