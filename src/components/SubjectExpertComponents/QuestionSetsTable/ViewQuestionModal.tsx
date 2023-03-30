import { Box, Button } from "@mui/material";
import ReactModal from "react-modal";
import AllQuestionsAnswers from "../DispalyQuizQuestionsAnswers/AllQuestionsAnswers";
import CloseIcon from "@mui/icons-material/Close";

export const customStyles = {
  overlay: { zIndex: 1000 },
};

const ViewQuestionsModal = (props: any) => {
  const {
    openViewQuestionsModal,
    setOpenViewQuestionsModal,
    viewQuestions,
    //  setViewQuestions,
  } = props;
  return (
    <>
      <ReactModal
        isOpen={openViewQuestionsModal}
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
            viewQuestions={viewQuestions}
            // setViewQuestions={setViewQuestions}
          />

          <Box className="close-button-container">
            <Button
              variant="contained"
              color="error"
              onClick={() => setOpenViewQuestionsModal(false)}
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
