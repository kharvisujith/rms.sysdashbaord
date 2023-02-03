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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./EndTestDialog.style.scss";
const EndTestDialog = (props: any) => {
  const {
    openDialog,
    handleClose,
    setOpenDialog,
    selectedAnswers,
    totalNumberOfQuestions,
  } = props;
  console.log("value of total number of questions", totalNumberOfQuestions);

  const navigate = useNavigate();

  const endTest = () => {
    setOpenDialog(false);
    console.log("test ended");
    navigate("/test_submitted");
    console.log("the final answer set is", selectedAnswers);
  };

  return (
    <>
      <Box>
        <Dialog
          open={openDialog}
          onClose={handleClose}
          style={{ width: "100%", border: "2px solid red" }}
        >
          <DialogTitle>{"Do want to End the Test? "}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {`Total Number Of Questions : ${totalNumberOfQuestions}`} <br />
              {`Questions Answered : ${selectedAnswers.length}`} <br />
              {`Questions Not Answered : ${
                totalNumberOfQuestions - selectedAnswers.length
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
              submit and End Test
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
};
export default EndTestDialog;
