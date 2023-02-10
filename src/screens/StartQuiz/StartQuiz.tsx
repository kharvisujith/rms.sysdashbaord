import { Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import ReactModal from "react-modal";
import "./StartQuiz.style.scss";
import SingleQuestion from "../../components/DispalyQuizQuestions/SingleQuestion";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
const StartQuiz = () => {
  const [OpenTestModal, setOpenTestModal] = useState(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleClose = () => {
    setOpenDialog(false);
  };

  const startTestButtonHandler = () => {
    setOpenTestModal(true);
  };

  // useEffect(() => {
  //   console.log("ueEffect is called");
  //   getQuizQuestions(1, "javascript")
  //     .then((res) => {
  //       setQuizQuestions(res.data);
  //       return res.data;
  //     })
  //     .catch((error) => console.log("error is get question", error));
  // }, []);

  return (
    <Box className="main-layout-wrap">
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            onClick={() => navigate(-1)}
          >
            Quiz App
          </Typography>
          <Button color="inherit">Log out</Button>
        </Toolbar>
      </AppBar>

      <Box className="info-box">
        <Typography variant="h5">Test Informations : </Typography>
        <Box className="info-details">
          <Typography>{`* Includes Multiple Choice questions and Coding questions`}</Typography>
          <Typography>{`* Total Time given for the test is ${60} minutes`}</Typography>
          <Typography>{`* After the completion of the given time the test is autosubmitted`}</Typography>
          <Typography>{`* Do not switch the tabs once test is started`}</Typography>
        </Box>
      </Box>

      <Box className="start-test-box">
        <Button
          className="start-test-btn"
          variant="contained"
          color="error"
          onClick={() => {
            startTestButtonHandler();
          }}
        >
          Start Test
        </Button>
      </Box>

      <Box className="quiz-start-btn-wrap">
        <ReactModal
          isOpen={OpenTestModal}
          contentLabel="Minimal Modal Example"
          ariaHideApp={false}
        >
          <SingleQuestion
            openDialog={openDialog}
            handleClose={handleClose}
            setOpenDialog={setOpenDialog}
            quizQuestions={location.state}
          />
        </ReactModal>
      </Box>
    </Box>
  );
};

export default StartQuiz;
