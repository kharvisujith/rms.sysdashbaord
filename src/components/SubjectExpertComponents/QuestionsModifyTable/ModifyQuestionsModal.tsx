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
import { deleteQuestionsById, updateQuestion } from "../../../api/apiAgent";
import Swal from "sweetalert2";
import {
  questionsForSetWithAnswers,
  UpdateQuestionsSet,
} from "../../../Interface/SubjectExpert/SubjectExpert";
import EditPopover from "./EditPopover/EditPopover";

const ModifyQuestionsModal = (props: any) => {
  const {
    openModifyQuestionsModal,
    setOpenModifyQuestionsModal,
    modifyQuestionsData,
    fetchSubjectwiseQuizQuestonAnswers,
    subjectwiseQuizDetails,
    subject,
  } = props;

  console.log("modified dat is", modifyQuestionsData);

  const [searchText, setSearchText] = useState<string>("");
  const [anchorElEdit, setAnchorElEdit] =
    useState<HTMLButtonElement | null>(null);

  const [editQuestionDetails, setEditQuestionDetails] =
    useState<questionsForSetWithAnswers | null>();

  // const [tempQuestionDetails, setTempQuestionDetails] = useState<any>([]);
  const [tempQuestionData, setTempQuestionData] = useState<
    questionsForSetWithAnswers[] | []
  >([]);

  const [editedQuestions, setEditedQuestions] =
    useState<UpdateQuestionsSet | null>();

  const [questionIndexInTempData, setQuestionIndexInTempData] =
    useState<number>(-1);

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

  // const handleOpenEdit = (event: any) => {
  //   setAnchorElEdit(event.currentTarget);
  // };
  const handleCloseEdit = () => {
    setAnchorElEdit(null);
  };

  // const handleEditUpdate = () => {
  //   setAnchorElEdit(null);
  // };

  const handleOpenEditPopover = (
    event: any,
    questiondetails: questionsForSetWithAnswers
  ) => {
    setEditQuestionDetails(questiondetails);
    setAnchorElEdit(event.currentTarget);
  };

  // const handleEmptyQuestion = () => {
  //   console.log("empty question called");
  //   setOpenModifyQuestionsModal(false);
  //   subjectwiseQuizDetails(subject);
  // };

  const confirmSave = () => {
    Swal.fire({
      title: "Are you sure?",
      text: `Modified ${editedQuestions?.updateQuizDetails?.length} Questions out of ${modifyQuestionsData?.length}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update",
      showLoaderOnConfirm: true,
      customClass: "swal-alert",
    }).then((result) => {
      if (result.isConfirmed) {
        updateQuestion(editedQuestions!)
          .then((response: any) => {
            Swal.fire({
              title: "Success",
              text: "Updated Succesfully",
              icon: "success",
              confirmButtonText: "Okay",
              customClass: "swal-alert",
            });
          })
          .catch((error: any) => {
            console.log("error in questions updated");
            Swal.fire({
              title: "error",
              text: "Failed to delete",
              icon: "error",
              confirmButtonText: "Okay",
              customClass: "swal-alert",
            });
          });
        // deleteQuestionsById(
        //   questionDeatails.questionId,
        //   questionDeatails.version,
        //   questionDeatails.subjectName
        // )
        //   .then((response: any) => {
        //     fetchSubjectwiseQuizQuestonAnswers(questionDeatails);
        // Swal.fire({
        //   title: "Success",
        //   text: "Deleted Succesfully",
        //   icon: "success",
        //   confirmButtonText: "Okay",
        //   customClass: "swal-alert",
        // });
        //   })
        //   .catch((error: any) => {
        // Swal.fire({
        //   title: "error",
        //   text: "Failed to delete",
        //   icon: "error",
        //   confirmButtonText: "Okay",
        //   customClass: "swal-alert",
        // });
        //   });
      }
    });
  };

  // const getEditedQuestionNumber = () => {
  //   //  modifyQuestionsData.filter((ele:any)=>{
  //   //   editedQuestions?.updateQuizDetails.includes(ele.questionId) ? return
  //   //  }
  //   console.log("get edited question number is calledd");
  //   const questionNumbers = modifyQuestionsData.map(
  //     (ele: any, index: number) => {
  //       const isQuestionExist = editedQuestions?.updateQuizDetails.map(
  //         (cur: any) => cur.questionId === ele.questionId
  //       );
  //     }
  //   );
  // };

  // console.log("valueo fquestion Numbers is", questionNumbers);
  // return questionNumbers.tostring();

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
            {/* {
              modifyQuestionsData?.length > 0 ? ( */}
            <>
              <Box>
                {modifyQuestionsData?.length > 0 && (
                  // <Box>
                  //   <Typography style={{ padding: 20, textAlign: "center" }}>
                  //     <strong>{"SubjectName:"}&ensp;</strong>
                  //     {`${modifyQuestionsData[0]?.subjectName}`}&emsp;
                  //     <strong>{"Description:"}&ensp;</strong>
                  //     {`${modifyQuestionsData[0]?.tag}`}&emsp;
                  //     <strong>{"Version:"}&ensp;</strong>
                  //     {`${modifyQuestionsData[0].version}`}&emsp;
                  //     <strong>{"TotalQuestions:"}&ensp;</strong>
                  //     {`${modifyQuestionsData.length}`}
                  //   </Typography>
                  // <LinearProgress
                  //   variant={"determinate"}
                  //   color={"primary"}
                  //   value={0}
                  // />
                  // </Box>
                  <Box>
                    <Box className="modal-headings-container">
                      <Box className="headings">
                        <Typography className="topic">Subject : </Typography>
                        <Typography>
                          {modifyQuestionsData[0]?.subjectName}
                        </Typography>
                      </Box>
                      <Box className="headings">
                        <Typography className="topic">
                          Description :{" "}
                        </Typography>
                        <Typography>{modifyQuestionsData[0]?.tag}</Typography>
                      </Box>
                      <Box className="headings">
                        <Typography className="topic">Version : </Typography>
                        <Typography>
                          {modifyQuestionsData[0]?.version}
                        </Typography>
                      </Box>
                      <Box className="headings">
                        <Typography className="topic">
                          TotalQuestions :
                        </Typography>
                        <Typography>{modifyQuestionsData.length}</Typography>
                      </Box>
                    </Box>
                    <LinearProgress
                      variant={"determinate"}
                      color={"primary"}
                      value={0}
                    />
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
                        <Box className="question-main" key={index}>
                          <Typography>{`${index + 1}. ${
                            questionDeatails.question
                          }`}</Typography>
                          <Box className="icons-box">
                            <IconButton
                              size="small"
                              onClick={(event: any) =>
                                handleOpenEditPopover(event, questionDeatails)
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
              {editedQuestions ? (
                <Box>
                  <Typography>{`Modified Questions :${"1 , 2"} `}</Typography>
                </Box>
              ) : null}

              <EditPopover
                anchorElEdit={anchorElEdit}
                setAnchorElEdit={setAnchorElEdit}
                handleCloseEdit={handleCloseEdit}
                editQuestionDetails={editQuestionDetails}
                setEditQuestionDetails={setEditQuestionDetails}
                editedQuestions={editedQuestions}
                setEditedQuestions={setEditedQuestions}
                // tempQuestionDetails={tempQuestionDetails}
                // setTempQuestionDetails={setTempQuestionDetails}
                tempQuestionData={tempQuestionData}
                setTempQuestionData={setTempQuestionData}
                questionIndexInTempData={questionIndexInTempData}
                setQuestionIndexInTempData={setQuestionIndexInTempData}
                // alreadyEditedIndex, setAlreadyEditedIndex
              />
            </>
            {/* // ) : (
              //   <>{handleEmptyQuestion()}</>
              // )

              // <Box>
              //   <h1>No content available</h1>
              //   {/* and call the table api so that it gets dleted 
               </Box>
            } */}
          </Box>
          <Box className="modal-close-button-container">
            <Button variant="outlined" onClick={confirmSave}>
              Save
            </Button>
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
