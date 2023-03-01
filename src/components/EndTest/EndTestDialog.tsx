import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { submitQuiz } from "../../api/apiAgent";
import { CaluclateTotalNumberOfAnswers } from "../../utils/Utils";
import "./EndTestDialog.style.scss";
const EndTestDialog = (props: any) => {
  const {
    // openDialog,
    // handleClose,
    // setOpenDialog,
    selectedAnswers,
    totalNumberOfQuestions,
    Ref,
    quizId,
    openEndDialog,
    setOpenEndDialog,
  } = props;
  const navigate = useNavigate();
  const [totalAnswerdQuestions, setTotalAnsweredQuestion] = useState<number>(0);
  const [loader, setLoader] = useState<boolean>(false);
  // const [loader, setLoader] = useState<boolean>(false);

  const endTest = () => {
    setLoader(true);
    setLoader(true);
    const quizAnswerModel = {
      quizId: parseInt(quizId),
      totalQuestions: totalNumberOfQuestions,
      answeredQuestions: totalAnswerdQuestions,
      notAnsweredQuestions: totalNumberOfQuestions - totalAnswerdQuestions,
      data: selectedAnswers,
    };
    submitQuiz(quizAnswerModel)
      .then((response) => {
        Swal.fire({
          title: "Success",
          text: "Test Submitted Succesfully",
          icon: "success",
          confirmButtonText: "Okay",
        });
        setLoader(false);
        setOpenEndDialog(false);
        clearInterval(Ref.current);
        localStorage.clear();
        navigate("/test_submitted", {
          state: {
            totalNumberOfQuestions: totalNumberOfQuestions,
            answered: totalAnswerdQuestions,
            notAnswered: totalNumberOfQuestions - totalAnswerdQuestions,
          },
        });
      })
      .catch((error) => {
        Swal.fire({
          title: "error",
          text: "Failed to Submitt Test, Please Retry",
          icon: "error",
          confirmButtonText: "Okay",
        });
      });
  };

  useEffect(() => {
    setTotalAnsweredQuestion(CaluclateTotalNumberOfAnswers(selectedAnswers));
  }, [selectedAnswers]);

  return (
    <>
      <Box>
        <Dialog open={openEndDialog} onClose={() => setOpenEndDialog(false)}>
          <DialogTitle>{"Do want to End the Test? "}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {`Total Number Of Questions : ${totalNumberOfQuestions}`} <br />
              {`Questions Answered : ${totalAnswerdQuestions}`} <br />
              {`Questions Not Answered : ${
                totalNumberOfQuestions - totalAnswerdQuestions!
              }`}
            </DialogContentText>
          </DialogContent>
          <DialogActions className="actions">
            {loader ? (
              <Box className="button-loader loader">
                <CircularProgress />
              </Box>
            ) : (
              <>
                <Button
                  onClick={() => setOpenEndDialog(false)}
                  color="primary"
                  variant="contained"
                >
                  Cancel
                </Button>
                <Button
                  onClick={endTest}
                  autoFocus
                  variant="contained"
                  color="error"
                >
                  Submit and End Test
                </Button>
              </>
            )}
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};
export default EndTestDialog;
