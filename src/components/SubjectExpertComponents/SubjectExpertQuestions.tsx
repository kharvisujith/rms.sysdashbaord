import { Box, Button, CircularProgress, FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { useNavigate } from "react-router-dom";
import { getSerchForCreateQuiz, getSubjectwiseQuiz, getSubjectwiseQuizAnswers } from "../../api/apiAgent";
import { subjectwiseQuizAnswersResponse, subjectWiseQuizListResponse } from "../../Interface/QuizDetails";
import AllQuestionsAnswers from "../DispalyQuizQuestionsAnswers/AllQuestionsAnswers";
import TopNavBar from "../TopNavBar/TopNavBar";
import "./SubjectList.style.scss";
import SearchIcon from "@mui/icons-material/Search";
import ViewModal from "./ViewModal";


const SubjectExpertQuestions = (props : any) => {
    const navigate = useNavigate();
    const [loader, setLoader] = useState<boolean>(false);
    const [OpenTestModal, setOpenTestModal] = useState<boolean>(false);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [subjectAnswersList, setSubjectAnswerList] = useState<
      subjectwiseQuizAnswersResponse[]
    >([]);
    const [subjectList, setSubjectList] = useState<subjectWiseQuizListResponse[]>(
        []
      );
      const [searchText, setSearchText] = useState<string>();
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

    const handleSearchInputChange = (event: any) => {
        console.log("event is", event.target.value);
        setSearchText(event.target.value);
        console.log(searchText, 'search');
      };
    
      const handleSearchQuestionSet = () => {
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
    // const endTestButtonHandler = () => {
    //   setOpenTestModal(false);
    //   setLoader(false);
    // };
  
    // const handleClose = () => {
    //   setOpenDialog(false);
    // };
  
    // const customStyles = {
    //   overlay: { zIndex: 1000 },
    // };

    // useEffect(() => {
    //     subjectwiseQuizDetails(subject);
    //   }, [subject]);

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
              onChange={handleSearchInputChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={handleSearchQuestionSet}>
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
                      // onClick={() =>
                      //   handleSelectQuestionsModalOpen(subjectDetails)
                      // }
                    >
                      Select Questions
                    </Button>
                    {/* {getIndexFromNewCreateQuizBody(subjectDetails) ? ( */}
                      <Button
                        //  variant="contained"
                        // onClick={() => handleDeletQuestionSet(subjectDetails)}
                      >
                        Remove ALL
                      </Button>
                    {/* ) : ( */}
                      <Button
                        // variant="contained"
                        // onClick={() => handleAddQuestionSet(subjectDetails)}
                      >
                        Add ALL
                      </Button>
                    {/* )} */}
                  </Box>
                </Box>
              </Paper>
              
            )
          )}
    {/* </Box> */}
    {/* ))} */}
         <ViewModal
          OpenTestModal={OpenTestModal}
          setOpenTestModal={setOpenTestModal}
          quizSubjectInfo={subjectAnswersList}
        />
</Box>
 
  </>
  


);
    

};

export default SubjectExpertQuestions;