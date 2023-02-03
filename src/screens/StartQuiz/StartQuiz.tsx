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
import { useEffect, useState } from "react";
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
  //const [numberOfQuestions, setNumberOfQuestions] = useState<number>();

  const handleClose = () => {
    setOpenDialog(false);
  };

  const startTestButtonHandler = (viewToRender: "listView" | "slideView") => {
    setModalContent(viewToRender);
    setOpenTestModal(true);
  };
  const endTestButtonHandler = () => {
    setOpenTestModal(false);
  };

  const handleCloseFromModal = () => {
    setOpenTestModal(false);
  };

  function createData(name: string, calories: number) {
    return { name, calories };
  }

  const rows = [
    createData("Total no of Questions", 5),
    createData("Question Answered", 0),
    createData("Question Not Answered", 0),
  ];

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
      })
      .catch((error) => console.log("error is get question", error));
  }, []);

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
            />
          ) : null}
          {modalContent && modalContent === "listView" ? (
            <AllQuestions
              openDialog={openDialog}
              handleClose={handleClose}
              setOpenDialog={setOpenDialog}
              quizQuestions={quizQuestions}
            />
          ) : null}
        </ReactModal>
        <div className="quiz-info-wrapper">
          <span className="quiz-information">
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
          </span>
          <Button
            className="quiz-start-btn"
            variant="contained"
            color="success"
            onClick={() => startTestButtonHandler("slideView")}
          >
            Start Slide View Test
          </Button>
          <Button
            className="quiz-start-btn"
            variant="contained"
            color="success"
            onClick={() => startTestButtonHandler("listView")}
          >
            Start in List View Test
          </Button>
        </div>
      </div>
    </Box>
  );
};

export default StartQuiz;
