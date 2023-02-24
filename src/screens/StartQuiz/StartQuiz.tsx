import { Divider, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import ReactModal from "react-modal";
import "./StartQuiz.style.scss";
import SingleQuestion from "../DispalyQuizQuestions/SingleQuestion";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { verifyCandidate } from "../../api/apiAgent";
import { AxiosError, AxiosResponse } from "axios";
const StartQuiz = () => {
  const [OpenTestModal, setOpenTestModal] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [isKeyValid, setIsKeyValid] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [testStarted, setTestStarted] = useState<boolean>(false);

  const location = useLocation();

  const startTestButtonHandler = () => {
    setTestStarted(true);
    // navigate("")
    // setOpenTestModal(true);
  };

  window.addEventListener("beforeunload", (event) => {
    localStorage.setItem("testStarted", testStarted.toString());
    // localStorage.setItem("beforeunload", "true");
  });

  // window.addEventListener("unload", (event) => {
  //   localStorage.setItem("unload", "trueee");
  // });

  useEffect(() => {
    verifyCandidate(
      parseInt(location.state.verifyCredentials.id!),
      location.state.verifyCredentials.key!
    )
      .then((res: AxiosResponse) => {
        setIsKeyValid(true);
        setTestStarted(ts === "true");
      })
      .catch((error: any) => {
        if (error.response.status === 400) {
          if (error.response.data) {
            setErrorMessage(error.response.data);
          }
        }
      });
    const ts = localStorage.getItem("testStarted");
  }, [location.state.verifyCredentials]);

  if (!isKeyValid) {
    return (
      <>
        <Box className="error-box">
          <Typography variant="h4">{`${errorMessage}`}</Typography>
        </Box>
        <Divider className="divider" />
      </>
    );
  }

  return (
    <Box className="main-layout-wrap">
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            // onClick={() => navigate(-1)}
          >
            Quiz App
          </Typography>
          {/* <Button color="inherit">Log out</Button> */}
        </Toolbar>
      </AppBar>

      {!testStarted ? (
        <>
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
        </>
      ) : (
        <SingleQuestion
          quizQuestions={location.state}
          quizId={location.state.verifyCredentials.id}
        />
      )}

      {/* <Box className="quiz-start-btn-wrap">
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
            quizId={location.state.verifyCredentials.id}
          />
        </ReactModal>
      </Box> */}
    </Box>
  );
};

export default StartQuiz;
