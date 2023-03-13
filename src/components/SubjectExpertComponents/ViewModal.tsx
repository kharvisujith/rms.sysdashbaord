import { Box, CircularProgress, Button } from "@mui/material";
import { useState } from "react";
import ReactModal from "react-modal";
import { getSubjectwiseQuizAnswers } from "../../api/apiAgent";
import {
  subjectwiseQuizAnswersResponse,
  subjectWiseQuizListResponse,
} from "../../Interface/QuizDetails";
import AllQuestionsAnswers from "../DispalyQuizQuestionsAnswers/AllQuestionsAnswers";
import CloseIcon from "@mui/icons-material/Close";

const ViewModal = (props: any) => {
  const { openTestModal, setOpenTestModal, quizSubjectInfo } = props;
  const [loader, setLoader] = useState<boolean>(false);
  // const [OpenTestModal, setOpenTestModal] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [subjectAnswersList, setSubjectAnswerList] = useState<
    subjectwiseQuizAnswersResponse[]
  >([]);
  const [subjectList, setSubjectList] = useState<subjectWiseQuizListResponse[]>(
    []
  );

  //   const StartTestViewButtonHandler = (row: any) => {
  //     setOpenTestModal(true);
  //     setLoader(true);
  //     getSubjectwiseQuizAnswers(row.version, row.subjectName)
  //       .then((response: any) => {
  //         setSubjectAnswerList(response.data);
  //         setLoader(false);
  //       })
  //       .catch((error: any) => {
  //         setLoader(false);
  //         console.log("error in subjwise answersapi");
  //       });
  //   };
  const endTestButtonHandler = () => {
    setOpenTestModal(false);
    setLoader(false);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const customStyles = {
    overlay: { zIndex: 1000 },
  };
  return (
    <ReactModal
      isOpen={openTestModal}
      contentLabel="Minimal Modal Example"
      ariaHideApp={false}
      style={customStyles}
    >
      <>
        {loader ? (
          <Box className="modal-loader">
            <CircularProgress />
          </Box>
        ) : (
          <AllQuestionsAnswers
            openDialog={openDialog}
            handleClose={handleClose}
            setOpenDialog={setOpenDialog}
            quizSubjectInfo={subjectAnswersList}
          />
        )}

        <Box style={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="error"
            onClick={endTestButtonHandler}
            endIcon={<CloseIcon />}
          >
            Close
          </Button>
        </Box>
      </>
    </ReactModal>
  );
};

export default ViewModal;
