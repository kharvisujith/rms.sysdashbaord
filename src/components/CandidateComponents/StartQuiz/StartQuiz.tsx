import { CircularProgress, Divider, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import "./StartQuiz.style.scss";
import SingleQuestion from "../DispalyQuizQuestions/SingleQuestion";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../../../Store/ConfigureStrore";
import { startTest, verifyCandidate } from "../../../Redux/candidateSlice";
const StartQuiz = () => {
  const dispatch = useAppDispatch();
  const {
    verifyCredentials,
    verifiedStatus,
    loadingStatus,
    isTestStarted,
    errorMessage,
  } = useAppSelector((state: any) => state.candidate);

  //const [errorMessage, setErrorMessage] = useState<string>();

  const location = useLocation();

  useEffect(() => {
    if (verifiedStatus.startQuizPage) {
      window.addEventListener("beforeunload", (event) => {
        localStorage.setItem("testStarted", isTestStarted.toString());
      });
    }
    return () => {
      window.removeEventListener("beforeunload", (event) => {});
      window.removeEventListener("unload", (event) => {});
    };
  }, [isTestStarted, verifiedStatus.startQuizPage]);

  useEffect(() => {
    const verify = async () => {
      try {
        const data = {
          id: location.state.verifyCredentials.id,
          key: location.state.verifyCredentials.key,
        };
        await dispatch(
          verifyCandidate({
            data: data,
            fromPage: "startQuiz",
          })
        );
      } catch (error: any) {
        console.log("error in verify candiate", error);
      }
    };

    verify();
  }, [verifyCredentials]);

  if (!verifiedStatus.startQuizPage && !loadingStatus.pageLoader) {
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
      <Box className="main-layout-wrap">
        {loadingStatus.pageLoader ? (
          <Box className="page-loader">
            <CircularProgress />
          </Box>
        ) : !isTestStarted ? (
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
                  dispatch(startTest());
                }}
              >
                Start Test
              </Button>
            </Box>
          </>
        ) : (
          <SingleQuestion
            quizQuestions={location.state.testQuestions}
            quizId={location.state.verifyCredentials.id}
          />
        )}
      </Box>
    </>
  );
};

export default StartQuiz;
