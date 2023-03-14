import { Box, Button, LinearProgress, Typography } from "@mui/material";
import ReactModal from "react-modal";
import { customStyles } from "../QuestionSetsTable/ViewQuestionModal";
import CloseIcon from "@mui/icons-material/Close";
import "./QuestionsModifyTable.style.scss";
import SearchInput from "../SearchInput/SearchInput";
import { useState } from "react";
import { Icon, IconButton } from "@material-ui/core";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteQuestionsById } from "../../../api/apiAgent";
import Swal from "sweetalert2";
import { questionsForSetWithAnswers } from "../../../Interface/SubjectExpert/SubjectExpert";

const ModifyQuestionsModal = (props: any) => {
  const {
    openModifyQuestionsModal,
    setOpenModifyQuestionsModal,
    modifyQuestionsData,
    fetchSubjectwiseQuizQuestonAnswers,
  } = props;

  const handleDeleteQuestion = (questionDeatails: any) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      showLoaderOnConfirm: true,
      customClass: "swal-alert",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteQuestionsById(
          questionDeatails.questionId,
          questionDeatails.version,
          questionDeatails.subjectName
        )
          .then((response: any) => {
            fetchSubjectwiseQuizQuestonAnswers(questionDeatails);
            Swal.fire({
              title: "Success",
              text: "Deleted Succesfully",
              icon: "success",
              confirmButtonText: "Okay",
              customClass: "swal-alert",
            });
          })
          .catch((error: any) => {
            Swal.fire({
              title: "error",
              text: "Failed to delete",
              icon: "error",
              confirmButtonText: "Okay",
              customClass: "swal-alert",
            });
          });
      }
    });
  };

  const [searchText, setSearchText] = useState<string>("");
  return (
    <>
      <ReactModal
        isOpen={openModifyQuestionsModal}
        contentLabel="Minimal Modal Example"
        ariaHideApp={false}
        style={customStyles}
      >
        <>
          <Box className="modal-container">
            <Box>
              {modifyQuestionsData?.length > 0 && (
                <Box>
                  <Typography style={{ padding: 20, textAlign: "center" }}>
                    <strong>{"SubjectName:"}&ensp;</strong>
                    {`${modifyQuestionsData[0]?.subjectName}`}&emsp;
                    <strong>{"Description:"}&ensp;</strong>
                    {`${modifyQuestionsData[0]?.tag}`}&emsp;
                    <strong>{"Version:"}&ensp;</strong>
                    {`${modifyQuestionsData[0].version}`}
                  </Typography>
                  <LinearProgress variant={"determinate"} color={"primary"} />
                </Box>
              )}
            </Box>

            <Box>
              <SearchInput
                setSearchText={setSearchText}
                text={"Search in Questions"}
              />
            </Box>
            <Box>
              {modifyQuestionsData?.length > 0 &&
                modifyQuestionsData
                  .slice()
                  .filter(
                    (row: questionsForSetWithAnswers) =>
                      !searchText.length ||
                      row.question
                        .toLowerCase()
                        .includes(searchText.toLowerCase())
                  )
                  .map(
                    (
                      questionDeatails: questionsForSetWithAnswers,
                      index: number
                    ) => (
                      <Box className="question-main">
                        <Typography>{`${index + 1}. ${
                          questionDeatails.question
                        }`}</Typography>
                        <Box className="icons-box">
                          <IconButton size="small">
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() =>
                              handleDeleteQuestion(questionDeatails)
                            }
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      </Box>
                    )
                  )}
            </Box>
          </Box>
          <Box className="modal-close-button-container">
            <Button
              variant="contained"
              color="error"
              onClick={() => setOpenModifyQuestionsModal(false)}
              endIcon={<CloseIcon />}
            >
              Close
            </Button>
          </Box>
        </>
      </ReactModal>
    </>
  );
};
export default ModifyQuestionsModal;
