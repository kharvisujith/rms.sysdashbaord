import { Box, Button, CircularProgress } from "@mui/material";
import ReactModal from "react-modal";
import AllQuestionsAnswers from "../DispalyQuizQuestionsAnswers/AllQuestionsAnswers";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch, useAppSelector } from "../../../Store/ConfigureStrore";
import { handleViewQuestionModal } from "../../../Redux/subjectexpertSlice";

export const customStyles = {
  overlay: { zIndex: 1000 },
};

const ViewQuestionsModal = () => {
  // const {
  //   openViewQuestionsModal,
  //   setOpenViewQuestionsModal,
  //  // viewQuestions,
  //   //  setViewQuestions,
  // } = props;

  const dispatch = useAppDispatch();
  const {
    viewQuestionModalState: { isViewQuestionModalOpen },
    loadingStatus: { modalLoader },
  } = useAppSelector((state: any) => state.subjectExpert);

  return (
    <>
      <ReactModal
        isOpen={isViewQuestionModalOpen}
        contentLabel="Minimal Modal Example"
        ariaHideApp={false}
        style={customStyles}
      >
        <Box className="modal-container">
          {modalLoader ? (
            <Box className="modal-loader">
              <CircularProgress />
            </Box>
          ) : (
            <>
              <AllQuestionsAnswers />
              <Box className="footer-container">
                {!modalLoader ? (
                  <Box className="footer-content">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => dispatch(handleViewQuestionModal())}
                      endIcon={<CloseIcon />}
                    >
                      Close
                    </Button>
                  </Box>
                ) : null}
              </Box>
            </>
          )}
        </Box>
      </ReactModal>
    </>
  );
};
export default ViewQuestionsModal;
