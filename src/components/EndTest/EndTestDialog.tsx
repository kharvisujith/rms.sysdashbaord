import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
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
    openDialog,
    handleClose,
    setOpenDialog,
    selectedAnswers,
    totalNumberOfQuestions,
    Ref,
    quizId,
    setOpenEndDialog,
  } = props;
  const navigate = useNavigate();
  const [totalAnswerdQuestions, setTotalAnsweredQuestion] = useState<number>(0);

  const endTest = () => {
    setOpenEndDialog(false);
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
        setOpenDialog(false);
        clearInterval(Ref.current);
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
      <Box sx={{ marginTop: 5, marginLeft: 10 }}>
        <Dialog
          open={openDialog}
          onClose={handleClose}
          style={{ width: "100%", border: "2px solid red" }}
        >
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
            <Button onClick={handleClose} color="primary" variant="contained">
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
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};
export default EndTestDialog;
