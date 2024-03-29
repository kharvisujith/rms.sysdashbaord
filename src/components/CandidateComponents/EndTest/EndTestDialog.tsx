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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { apiAgent } from "../../../api/apiAgent";

import { CaluclateTotalNumberOfAnswers } from "../../../utils/Utils";
import "./EndTestDialog.style.scss";
const EndTestDialog = (props: any) => {
  const {
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

  const endTest = async () => {
    const quizAnswerModel = {
      quizId: parseInt(quizId),
      totalQuestions: totalNumberOfQuestions,
      answeredQuestions: totalAnswerdQuestions,
      notAnsweredQuestions: totalNumberOfQuestions - totalAnswerdQuestions,
      data: selectedAnswers,
    };

    try {
      setLoader(true);
      const res = await apiAgent.candidate.submitQuiz(quizAnswerModel);
      if (res.status === 200) {
        Swal.fire({
          title: "Success",
          text: "Test Submitted Succesfully",
          icon: "success",
          confirmButtonText: "Okay",
          customClass: "swal-alert",
        });
        clearInterval(Ref.current);
        localStorage.clear();
        navigate("/test_submitted", {
          state: {
            totalNumberOfQuestions: totalNumberOfQuestions,
            answered: totalAnswerdQuestions,
            notAnswered: totalNumberOfQuestions - totalAnswerdQuestions,
          },
        });
      }
    } catch (error: any) {
      setOpenEndDialog(false);
      Swal.fire({
        title: "error",
        text: "Failed to Submitt Test, Please Retry",
        icon: "error",
        confirmButtonText: "Okay",
      }).finally(() => setLoader(false));
    }
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
