import {
  Box,
  Button,
  CircularProgress,
  LinearProgress,
  Typography,
} from "@mui/material";
import ReactModal from "react-modal";
import { customStyles } from "../QuestionSetsTable/ViewQuestionModal";
import CloseIcon from "@mui/icons-material/Close";
import "./QuestionsModifyTable.style.scss";
import SearchInput from "../SearchInput/SearchInput";
import { useEffect, useState } from "react";
import { IconButton } from "@material-ui/core";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { apiAgent } from "../../../api/apiAgent";
import Swal from "sweetalert2";
import { questionsForSetWithAnswers } from "../../../Interface/SubjectExpert/SubjectExpert";
import EditPopover from "./EditPopover/EditPopover";
import { useAppDispatch, useAppSelector } from "../../../Store/ConfigureStrore";
import {
  clearEditData,
  closeModifyQuestionModal,
  deleteQuestion,
  fetchSubjectwiseQuestionSets,
  updateEditedQuestion,
} from "../../../Redux/subjectexpertSlice";

const ModifyQuestionsModal = () => {
  const dispatch = useAppDispatch();
  const {
    searchText,
    modifyModalQuestions,
    loadingStatus: { modalLoader },
    isModifyQuestionsModalOpen,
    editQuestionStates: { editedQuestions, editedQuestionNumbers },
  } = useAppSelector((state: any) => state.subjectExpert);

  const [validationError, setValidationError] = useState<any[]>([]);

  const handleOpenEditPopover = (
    event: any,
    questionDetails: questionsForSetWithAnswers
  ) => {
    dispatch({
      type: "subjectExpert/openEditPopover",
      payload: { event: event, questionDetails: questionDetails },
    });
  };

  const handleCloseEditModal = () => {
    setValidationError([]);
    dispatch(closeModifyQuestionModal());
    dispatch(clearEditData());
  };

  const handleDeleteQuestion = async (questionDetails: any) => {
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
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await dispatch(deleteQuestion(questionDetails));
          Swal.fire({
            title: "Success",
            text: "Deleted Succesfully",
            icon: "success",
            confirmButtonText: "Okay",
            customClass: "swal-alert",
          });

          const response =
            await apiAgent.subjectExpert.getQuestionAnswersForQuestionSet(
              questionDetails.version,
              questionDetails.subjectName
            );

          if (response.status === 204) {
            handleCloseEditModal();
            await dispatch(fetchSubjectwiseQuestionSets());
          } else if (response.status === 200) {
            clearEditData();
            dispatch({
              type: "subjectExpert/setModalQuestions",
              payload: { value: response.data },
            });
          }
        } catch (error: any) {
          console.log("Error", error);
        }
      }
    });
  };

  const confirmSave = () => {
    Swal.fire({
      title: "Are you sure?",
      text: `Modified ${editedQuestions?.updateQuizDetails?.length} Questions out of ${modifyModalQuestions?.length}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update",
      showLoaderOnConfirm: true,
      customClass: "swal-alert",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await dispatch(updateEditedQuestion(editedQuestions));
        setValidationError([]);
      }
    });
  };

  useEffect(() => {
    if (modifyModalQuestions?.length > 0) {
      const newArr = JSON.parse(JSON.stringify(modifyModalQuestions));

      dispatch({
        type: "subjectExpert/setTempQuestionData",
        payload: { data: newArr },
      });
    }
  }, [modifyModalQuestions]);

  useEffect(() => {
    dispatch({
      type: "subjectExpert/setSearchTextToEmpty",
      payload: { from: "modifyModal" },
    });
  }, []);

  return (
    <>
      <ReactModal
        isOpen={isModifyQuestionsModalOpen}
        contentLabel="Minimal Modal Example"
        ariaHideApp={false}
        style={customStyles}
      >
        <Box className="modal-container">
          {modalLoader ? (
            <Box className="modal-loader">
              <CircularProgress />
            </Box>
          ) : (
            <>
              <Box className="header-container">
                <Box className="header-content">
                  <Box className="headings">
                    <Typography className="topic">Subject : </Typography>
                    <Typography>
                      {modifyModalQuestions[0]?.subjectName}
                    </Typography>
                  </Box>
                  <Box className="headings">
                    <Typography className="topic">Description : </Typography>
                    <Typography>{modifyModalQuestions[0]?.tag}</Typography>
                  </Box>
                  <Box className="headings">
                    <Typography className="topic">Version : </Typography>
                    <Typography>{modifyModalQuestions[0]?.version}</Typography>
                  </Box>
                  <Box className="headings">
                    <Typography className="topic">TotalQuestions :</Typography>
                    <Typography>{modifyModalQuestions.length}</Typography>
                  </Box>
                </Box>
                <LinearProgress
                  variant={"determinate"}
                  color={"primary"}
                  value={0}
                />
              </Box>
              <Box className="content-container">
                <Box>
                  <Box>
                    <SearchInput from={"modifyModal"} />
                  </Box>
                  <Box>
                    {modifyModalQuestions?.length > 0 &&
                      modifyModalQuestions
                        .slice()
                        .filter(
                          (row: questionsForSetWithAnswers) =>
                            !searchText?.modifyModal?.length ||
                            row.question
                              .toLowerCase()
                              .includes(searchText.modifyModal.toLowerCase())
                        )
                        .map(
                          (
                            questionDeatails: questionsForSetWithAnswers,
                            index: number
                          ) => (
                            <Box className="question-main" key={index}>
                              <Typography>{`${index + 1}. ${
                                questionDeatails.question
                              }`}</Typography>
                              <Box className="icons-box">
                                <IconButton
                                  size="small"
                                  onClick={(event: any) =>
                                    handleOpenEditPopover(
                                      event,
                                      questionDeatails
                                    )
                                  }
                                >
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
                  {editedQuestions && editedQuestionNumbers?.length > 0 && (
                    <>
                      <Box className="info-div">
                        <Typography
                          variant="body1"
                          className="info"
                        >{`Total Modified Questions : ${editedQuestionNumbers?.length}`}</Typography>

                        <Box className="question-details">
                          <Typography
                            variant="body1"
                            className="info"
                          >{`Question Numbers : ${` `}`}</Typography>
                          {editedQuestionNumbers.length > 0 &&
                            editedQuestionNumbers?.map(
                              (cur: any, index: number) => (
                                <Typography className="info" key={index}>
                                  {` ${cur.questionNumber}-${cur.questionType[0]}`}
                                  {index < editedQuestionNumbers.length - 1
                                    ? `,`
                                    : null}
                                </Typography>
                              )
                            )}
                        </Box>
                      </Box>
                    </>
                  )}
                </Box>
                <EditPopover
                  validationError={validationError}
                  setValidationError={setValidationError}
                />
              </Box>
              <Box className="footer-container">
                <Box className="footer-content">
                  <Button
                    variant="contained"
                    onClick={confirmSave}
                    color="primary"
                    className="save-button"
                    disabled={editedQuestions ? false : true}
                  >
                    Save
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleCloseEditModal}
                    endIcon={<CloseIcon />}
                  >
                    Close
                  </Button>
                </Box>
              </Box>
            </>
          )}
        </Box>
      </ReactModal>
    </>
  );
};
export default ModifyQuestionsModal;
