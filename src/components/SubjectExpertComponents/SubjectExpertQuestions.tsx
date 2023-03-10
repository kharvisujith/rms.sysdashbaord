import { Box, Button, CircularProgress, FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { useNavigate } from "react-router-dom";
import { deleteQquestionsForSubjectExpert, deleteSetForSubjectExpert, getSubjectwiseQuiz, getSubjectwiseQuizAnswers } from "../../api/apiAgent";
import { subjectwiseQuizAnswersResponse, subjectWiseQuizListResponse } from "../../Interface/QuizDetails";
import AllQuestionsAnswers from "../DispalyQuizQuestionsAnswers/AllQuestionsAnswers";
import TopNavBar from "../TopNavBar/TopNavBar";
import "./SubjectList.style.scss";
import SearchIcon from "@mui/icons-material/Search";
import ViewModal from "./ViewModal";
import Swal from "sweetalert2";
import QuestionsOpenModal from "./QuestionsOpenModal";
import "./QuestionsOpenModal.style.scss";


const SubjectExpertQuestions = (props : any) => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState<boolean>(false);
    const [OpenTestModal, setOpenTestModal] = useState<boolean>(false);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [subjectAnswersList, setSubjectAnswerList] = useState<
      subjectwiseQuizAnswersResponse[]
    >([]);
    const [subjectList, setSubjectList] = useState<subjectWiseQuizListResponse[]>([]);
      const [searchText, setSearchText] = useState<string>();
      const [subjectSetQuestions, setSubjectSetQuestions] = useState<
      subjectwiseQuizAnswersResponse[]
    >([]);
    const [selectQuestionOpen, setSelectQuestionOpen] = useState<boolean>(false);
  
       const [createQuizSetWiseInfo, setCreateQuizSetWiseInfo] = useState<any>([]);
    // const viewButton = (row: any) => {
    //     return (
    //       <Button
    //         onClick={() => StartTestViewButtonHandler(row)}
    //         variant="contained"
    //       >
    //         View My Question Sets
    //       </Button>
    //     );
    //   };

    const handleSearchInput = (event: any) => {
        console.log("event is", event.target.value);
        setSearchText(event.target.value);
        console.log(searchText, 'search');
      };
    
      const handleSearchQuestion = () => {
        console.log("value is", searchText);
        if (searchText) {
          getSubjectwiseQuiz(searchText)
            .then((response) => {
              console.log("response of searc is", response.data);
              setSubjectList(response.data);
            })
            .catch((error: any) => {
              console.log("error in subjwiseapi");
              // setLoader(false);
            });
        }
      };

    const StartTestViewButtonHandler = (ele: any) => {
      setOpenTestModal(true);
      setLoader(true);
      getSubjectwiseQuizAnswers(ele.version, ele.subjectName)
        .then((response: any) => {
          setSubjectAnswerList(response.data);
          setLoader(false);
        })
        .catch((error: any) => {
          setLoader(false);
          console.log("error in subjwise answersapi");
        });
    };

    const handleDeleteSet = (
      subjectDetails: any
    ) => {
      deleteSetForSubjectExpert(subjectDetails.version, subjectDetails.subjectName)
      .then((response: any) => {
            setSubjectList(response.data);
            setLoader(false);
            Swal.fire({
              title: "Success",
              text: "Deleted Succesfully",
              icon: "success",
              confirmButtonText: "Okay",
            });
            navigate("/subjectexpert");
          })
          .catch((error: any) => {
            setLoader(false);
            Swal.fire({
              title: "error",
              text: "Failed to delete",
              icon: "error",
              confirmButtonText: "Okay",
            });
            
  });
};

const fetchQuestionsForSetAndSubject = (
  subjectDetails: subjectWiseQuizListResponse
) => {
  getSubjectwiseQuizAnswers(
    subjectDetails.version,
    subjectDetails.subjectName
  )
    .then((response: any) => {
      setSubjectSetQuestions(response.data);
      console.log("reponse of modal is", response.data);
    })
    .catch((error: any) => {
      // setLoader(false);
      console.log("error in subjwise answersapi");
    });
};
// setSubjectSetQuestions
const handleSelectQuestionsModalOpen = (
  subjectDetails: subjectWiseQuizListResponse
) => {
  setSelectQuestionOpen(true);
  fetchQuestionsForSetAndSubject(subjectDetails);
};

const getQuestionIdFromSubjectExpert = (
  questionDeatils: subjectwiseQuizAnswersResponse
) => {
  const findIndex = createQuizSetWiseInfo.findIndex(
    (obj: any) =>
      obj.subjectName === questionDeatils.subjectName &&
      obj.version === questionDeatils.version
  );

  console.log(findIndex, 'index value');
 
};

const handleCheckBoxChange = (event: any, questionDeatils: any) => {
  try {
    console.log(
      "question details in check box is",
      questionDeatils,
      questionDeatils.questionId
    );
    const existingIndex = createQuizSetWiseInfo.findIndex(
      (obj: any) =>
        obj.subjectName === questionDeatils.subjectName &&
        obj.version === questionDeatils.version
    );
    if (event.target.checked) {
      if (existingIndex === -1) {
        setCreateQuizSetWiseInfo((prev: any) => [
          ...prev,
          {
            version: questionDeatils.version,
            subjectName: questionDeatils.subjectName,
            questionIds: [questionDeatils.questionId],
          },
        ]);
      } else {
        const newArray = [...createQuizSetWiseInfo];
        newArray[existingIndex].questionIds.push(questionDeatils.questionId);
        setCreateQuizSetWiseInfo(newArray);
      }
    } else {
      console.log("inside else part of check false");
      if (existingIndex !== -1) {
        const newArray = [...createQuizSetWiseInfo];
        const indexOfQuestionId = newArray[existingIndex].questionIds.indexOf(
          questionDeatils.questionId
        );

        newArray[existingIndex].questionIds.splice(indexOfQuestionId, 1);
        if (newArray[existingIndex].questionIds.length < 1) {
          newArray.splice(existingIndex, 1);
        }
        setCreateQuizSetWiseInfo(newArray);
      }
    }
  } catch (error: any) {
    console.log("Error in add question to createquiz body", error);
  }
};
console.log("new create body is", createQuizSetWiseInfo);

const handleDeleteQuestions = (
  questionDeatails: subjectwiseQuizAnswersResponse
) => {
  deleteQquestionsForSubjectExpert(questionDeatails.questionId, questionDeatails.version, questionDeatails.subjectName)
  .then((response: any) => {
    setSubjectSetQuestions(response.data);
        setLoader(false);
        Swal.fire({
          title: "Success",
          text: "Deleted Succesfully",
          icon: "success",
          confirmButtonText: "Okay",
        });
        navigate("/subjectexpert");
      })
      .catch((error: any) => {
        setLoader(false);
        Swal.fire({
          title: "error",
          text: "Failed to delete",
          icon: "error",
          confirmButtonText: "Okay",
        });
        
});
};

return  (
<>
   <TopNavBar role={props.role} setRole={props.setRole} />
   
    <Box className="new-box">
       <Box className="box-new">
         <Button
         className="button-name-new"
         variant="contained"
         onClick={() => {
         navigate("/subjectexpert");
       
          }}
         >
         New
         </Button>
       </Box>
    
    <Box className="box">
  
      <Button
       className="button-name"
       variant="contained"
        // onClick={() => StartTestViewButtonHandler(ele)}
       >
       View My Question Sets
      </Button>
  
    </Box>
        
       <Box>
          <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
            <InputLabel htmlFor="search">Search For other Sets</InputLabel>
            <Input
              id="search"
              type="text"
              onChange={handleSearchInput}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={handleSearchQuestion}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Box>
         {subjectList.map(
            (subjectDetails: subjectWiseQuizListResponse, index: number) => (
              <Paper>
                <Box>
                  <Typography>
                    {" "}
                    {`${subjectDetails.subjectName}  ${
                      subjectDetails.createdBy
                    }    ${
                      subjectDetails.tag
                    } ${subjectDetails.version}`}
                  </Typography>

                  <Box>
                    <Button
                      onClick={() =>
                        handleSelectQuestionsModalOpen(subjectDetails)
                      }
                    >
                      View
                    </Button>
                    {/* {getIndexFromNewCreateQuizBody(subjectDetails) ? ( */}
                    
                      <Button
                       // variant="contained"
                           onClick={() => handleDeleteSet(subjectDetails)}
                      >
                        Delete
                      </Button>
                      
                    {/* ) : ( */}
                      {/* <Button
                        // variant="contained"
                        // onClick={() => handleAddQuestionSet(subjectDetails)}
                      >
                        Add ALL
                      </Button> */}
                    {/* )} */}
                  </Box>
                </Box>
              </Paper>
              
            )
          )}
          <QuestionsOpenModal
          selectQuestionOpen={selectQuestionOpen}
          setSelectQuestionOpen={setSelectQuestionOpen}
          subjectSetQuestions={subjectSetQuestions}
          handleCheckBoxChange={handleCheckBoxChange}
          getQuestionIdFromSubjectExpert={
            getQuestionIdFromSubjectExpert
          }
          handleDeleteQuestions={handleDeleteQuestions}
          
          
        />
    {/* </Box> */}
    {/* ))} */}
         {/* <ViewModal
          OpenTestModal={OpenTestModal}
          setOpenTestModal={setOpenTestModal}
          quizSubjectInfo={subjectAnswersList}
        /> */}
</Box>
 
  </>
  


);
    

};

export default SubjectExpertQuestions;