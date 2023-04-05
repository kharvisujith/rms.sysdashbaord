import { Box, Button } from "@mui/material";
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
    viewQuestionModalState: { isViewQuestionModalOpen, viewQuestions },
  } = useAppSelector((state: any) => state.subjectExpert);
  return (
    <>
      <ReactModal
        isOpen={isViewQuestionModalOpen}
        contentLabel="Minimal Modal Example"
        ariaHideApp={false}
        style={customStyles}
      >
        <>
          {/* {loader ? (
            <Box className="modal-loader">
              <CircularProgress />
            </Box>
          ) : ( */}
          <AllQuestionsAnswers
          // viewQuestions={viewQuestions}
          // setViewQuestions={setViewQuestions}
          />

          <Box className="close-button-container">
            <Button
              variant="contained"
              color="error"
              onClick={() => dispatch(handleViewQuestionModal())}
              endIcon={<CloseIcon />}
            >
              Close
            </Button>
          </Box>
        </>
      </ReactModal>
    </>
  );
};
export default ViewQuestionsModal;
