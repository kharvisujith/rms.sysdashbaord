import {
  Modal,
  Box,
  Typography,
  Paper,
  Checkbox,
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from "@mui/material";
import { useState } from "react";
import ReactModal from "react-modal";
import { subjectwiseQuizAnswersResponse } from "../../Interface/QuizDetails";
import { customStylesModal } from "../../screens/SubmittedQuiz/SubmittedQuiz";
import AllQuestionsAnswers from "./DispalyQuizQuestionsAnswers/AllQuestionsAnswers";
import "./QuestionsOpenModal.style.scss";
import SearchIcon from "@mui/icons-material/Search";

const QuestionsOpenModal = (props: any) => {
  const {
    selectQuestionOpen,
    setSelectQuestionOpen,
    subjectSetQuestions,
    handleCheckBoxChange,
    getQuestionIdFromSubjectExpert,
    handleDeleteQuestions,
    createQuizSetWiseInfo,
  } = props;
  const [name, setName] = useState<string>("");
  // const [createQuizSetWiseInfo, setCreateQuizSetWiseInfo] = useState<any>([]);

  //   const getQuestionIdFromSubjectExpert = (
  //     questionDeatils: subjectwiseQuizAnswersResponse
  //   ) => {
  //     const findIndex = createQuizSetWiseInfo.findIndex(
  //       (obj: any) =>
  //         obj.subjectName === questionDeatils.subjectName &&
  //         obj.version === questionDeatils.version
  //     );

  //     console.log(findIndex, 'index value');

  //   };
  //   const [openDialog, setOpenDialog] = useState<boolean>(false);
  //   const handleClose = () => {
  //     setOpenDialog(false);
  //   };

  return (
    <>
      {/* <Modal
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      > */}
      <ReactModal
        isOpen={selectQuestionOpen}
        contentLabel="Minimal Modal Example"
        ariaHideApp={false}
        style={customStylesModal}
      >
        <Box>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
            <InputLabel htmlFor="search">Search In Questions</InputLabel>
            <Input
              id="search"
              type="text"
              onChange={(e: any) => setName(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Box>
        <Box>
          {subjectSetQuestions
            .filter(
              (obj: subjectwiseQuizAnswersResponse) =>
                !name.length ||
                obj.question.toLowerCase().includes(name.toLowerCase())
            )
            ?.map((obj: subjectwiseQuizAnswersResponse, index: number) => (
              <Box key={index} className="questions-container">
                <Typography>{`${index + 1}.  ${obj.question}`}</Typography>
                <Typography> {`${obj.questionAnswers} `} </Typography>
                <Typography> {`${obj.questionOptions}`} </Typography>

                {/* <AllQuestionsAnswers
                   openDialog={openDialog}
                  handleClose={handleClose}
                  setOpenDialog={setOpenDialog}
                  quizSubjectInfo={subjectSetQuestions}
                   /> */}
                <Checkbox
                  checked={getQuestionIdFromSubjectExpert(obj)}
                  onChange={(event: any) => handleCheckBoxChange(event, obj)}
                  inputProps={{ "aria-label": "controlled" }}
                  className="select-check-box"
                />

                {/* </Box>
            )
          )} */}
                <Box>
                  <Button>Edit</Button>

                  <Button
                    onClick={() => handleDeleteQuestions(subjectSetQuestions)}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            ))}
          <Button onClick={() => setSelectQuestionOpen(false)}>Close</Button>
        </Box>
      </ReactModal>
      {/* </Modal> */}
    </>
  );
};
export default QuestionsOpenModal;
