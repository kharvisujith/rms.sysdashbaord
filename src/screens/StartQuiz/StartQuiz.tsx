import { CircularProgress, Divider, Typography } from "@mui/material";
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
import CandidateNavBar from "../../components/TopNavBar/CandidateNavBar";
const StartQuiz = () => {
  const [isKeyValid, setIsKeyValid] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [testStarted, setTestStarted] = useState<boolean>(false);
  const [loader, setLoader] = useState<boolean>(false);

  const location = useLocation();

  const startTestButtonHandler = () => {
    setTestStarted(true);
    // navigate("")
    // setOpenTestModal(true);
  };

  useEffect(() => {
    if (isKeyValid) {
      window.addEventListener("beforeunload", (event) => {
        localStorage.setItem("testStarted", testStarted.toString());
      });
    }
    return () => {
      window.removeEventListener("beforeunload", (event) => {});
      window.removeEventListener("unload", (event) => {});
    };
  }, [testStarted, isKeyValid]);
  console.log("value of testStarted is", testStarted);

  useEffect(() => {
    setLoader(true);
    verifyCandidate(
      parseInt(location.state.verifyCredentials.id!),
      location.state.verifyCredentials.key!
    )
      .then((res: AxiosResponse) => {
        setIsKeyValid(true);
        setTestStarted(localStorage.getItem("testStarted") === "true");
        setLoader(false);
      })
      .catch((error: any) => {
        if (error.response.status === 400) {
          if (error.response.data) {
            setErrorMessage(error.response.data);
          } else {
            setErrorMessage("something wrong");
          }
        }
        setLoader(false);
      });
  }, [location.state.verifyCredentials]);

  if (!isKeyValid && !loader) {
    return (
      <>
        <Box className="error-box">
          {errorMessage ? (
            <Typography variant="h4">{`${errorMessage}`}</Typography>
          ) : null}
        </Box>
        <Divider className="divider" />
      </>
    );
  }

  return (
    <>
      <CandidateNavBar />
      <Box className="main-layout-wrap">
        {loader ? (
          <Box className="page-loader">
            <CircularProgress />
          </Box>
        ) : !testStarted ? (
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
            // isKeyValid={isKeyValid}
          />
        )}
      </Box>
    </>
  );
};

export default StartQuiz;
