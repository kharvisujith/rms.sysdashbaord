import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import ReactModal from "react-modal";
import { useEffect, useRef, useState } from "react";
import "./StartQuiz.style.scss";
import AllQuestions from "../../components/DispalyQuizQuestions/AllQuestions";
import SingleQuestion from "../../components/DispalyQuizQuestions/SingleQuestion";
import { useNavigate } from "react-router-dom";
import { getQuizQuestions } from "../../api/apiAgent";

const StartQuiz = () => {
  const navigate = useNavigate();
  const [OpenTestModal, setOpenTestModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [quizQuestions, setQuizQuestions] = useState<any>();

  const handleClose = () => {
    setOpenDialog(false);
  };

  const startTestButtonHandler = (viewToRender: "listView" | "slideView") => {
    setModalContent(viewToRender);
    setOpenTestModal(true);
    // clearTimer(getDeadTime());
  };
  // const endTestButtonHandler = () => {
  //   setOpenTestModal(false);
  // };

  // const handleCloseFromModal = () => {
  //   setOpenTestModal(false);
  // };

  // function createData(name: string, calories: number) {
  //   return { name, calories };
  // }

  // // timer implementeations
  // const Ref = useRef<any>();

  // // The state for our timer
  // const [timer, setTimer] = useState("");

  // const getTimeRemaining = (e: any) => {
  //   // const e = new Date();
  //   const total =
  //     Date.parse(e.toISOString()) - Date.parse(new Date().toISOString());
  //   console.log("value of total is", total);

  //   //  const total = Date.parse(e) - Date.parse(new Date());
  //   const seconds = Math.floor((total / 1000) % 60);
  //   const minutes = Math.floor((total / 1000 / 60) % 60);
  //   const hours = Math.floor((total / 1000 / 60 / 60) % 24);
  //   return {
  //     total,
  //     hours,
  //     minutes,
  //     seconds,
  //   };
  // };

  // const startTimer = (e: any) => {
  //   let { total, hours, minutes, seconds } = getTimeRemaining(e);
  //   if (total >= 0) {
  //     setTimer(
  //       (hours > 9 ? hours : "0" + hours) +
  //         ":" +
  //         (minutes > 9 ? minutes : "0" + minutes) +
  //         ":" +
  //         (seconds > 9 ? seconds : "0" + seconds)
  //     );
  //   } else {
  //     console.log("inside else clear interval");
  //     clearInterval(Ref.current);
  //     // if the time is completed then autosubmit and navigate to submitted page
  //   }
  // };

  // const clearTimer = (e: any) => {
  //   if (Ref.current) {
  //     console.log("insdie clearinteval");
  //     clearInterval(Ref.current);
  //   }

  //   const id = setInterval(() => {
  //     startTimer(e);
  //   }, 1000);
  //   Ref.current = id;
  // };

  // const getDeadTime = () => {
  //   let deadline = new Date();

  //   deadline.setSeconds(deadline.getSeconds() + 10);
  //   // deadline.setMinutes(deadline.getMinutes() + 1);
  //   // deadline.setHours(deadline.getHours() + 1);
  //   return deadline;
  // };

  // We put empty array to act as componentDid
  // mount only
  // useEffect(() => {
  //   clearTimer(getDeadTime());
  // }, []);

  useEffect(() => {
    console.log("ueEffect is called");
    getQuizQuestions(1, "javascript")
      .then((res) => {
        setQuizQuestions(res.data);
        return res.data;
      })
      .then((resp) => {
        console.log("value of ress is", resp);
        console.log(resp.length);
        let hour = "00";
        let min = "00";
        let sec = "10";
        //   setTimer(hour + ":" + min + ":" + sec);
      })
      .catch((error) => console.log("error is get question", error));
  }, []);

  // useEffect(() => {
  //   console.log("useEffect of set timer is called");
  //   setTimer({ hrs: 0, mins: 0, secs: 5 });
  // }, []);

  console.log("value of quizquestion is", quizQuestions);

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
          <Typography>{`* Total Number Of Question - ${10}`}</Typography>
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
            startTestButtonHandler("slideView");
          }}
        >
          Start Test
        </Button>
        {/* <Button
          className="start-test-btn"
          variant="contained"
          color="success"
          onClick={() => startTestButtonHandler("listView")}
        >
          Start in List View Test
        </Button> */}
      </Box>

      <div className="quiz-start-btn-wrap">
        <ReactModal
          isOpen={OpenTestModal}
          contentLabel="Minimal Modal Example"
          ariaHideApp={false}
        >
          {modalContent && modalContent === "slideView" ? (
            <SingleQuestion
              openDialog={openDialog}
              handleClose={handleClose}
              setOpenDialog={setOpenDialog}
              quizQuestions={quizQuestions}
              // timer={timer}
            />
          ) : null}
          {/* {modalContent && modalContent === "listView" ? (
            <AllQuestions
              openDialog={openDialog}
              handleClose={handleClose}
              setOpenDialog={setOpenDialog}
              quizQuestions={quizQuestions}
            />
          ) : null} */}
        </ReactModal>
        <div className="quiz-info-wrapper">
          {/* <span className="quiz-information">
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 150 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Test Information (Demo Data rendered)</TableCell>
                    <TableCell align="right">Values</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.calories}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </span> */}
        </div>
      </div>
    </Box>
  );
};

export default StartQuiz;
