import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getSubjectwiseQuiz,getSubjectwiseQuizAnswers } from "../../api/apiAgent";
import AllQuestionsAnswers from "../DispalyQuizQuestionsAnswers/AllQuestionsAnswers";
import ReactModal from "react-modal";
const SubjectList = () => {
  const [subjectList, setSubjectList] = useState<any>([]);
  const [OpenTestModal, setOpenTestModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [subjectAnswersList, setSubjectAnswerList] = useState<any>([]);
  const handleClose = () => {
    setOpenDialog(false);
  };

  const StartTestViewButtonHandler = (e:any) => { 
    
       getSubjectwiseQuizAnswers(e.setNumber,e.subjectName)
         .then((response) => {
           setSubjectAnswerList(response.data);
        })
        .catch((error: any) => console.log("error in subjwise answersapi"));
        setModalContent("listView");
    setOpenTestModal(true);
  };
  const endTestButtonHandler = () => {
    setOpenTestModal(false);
  };

  const handleCloseFromModal = () => {
    setOpenTestModal(false);
  };
  const subjectwiseQuizDetails = async () => {
    getSubjectwiseQuiz("")
      .then((response) => {
        setSubjectList(response.data);
      })
      .catch((error: any) => console.log("error in subjwiseapi"));
  };
  useEffect(() => {
    subjectwiseQuizDetails();
  }, []);
  return (
    <>
      <Box  
       sx={{
      marginTop: 2,
      marginLeft: 10,}}
      >
      {/* // display: "flex",
      // flexDirection: "column",
      //  alignItems: "center", */}
    
        <Typography variant="h5" align="center">
          Available Question Sets
        </Typography>
        <Box>
          <Grid container spacing={1} alignItems="flex-start">
            {subjectList &&
              subjectList.map((elem: any, index: any) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card>
                    <Typography
                      variant="h6"
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      style={{ padding: 20 }}
                    >
                      {elem.subjectName}
                      <Button variant="contained" 
                      // sx={{ marginTop: 2,
                      //   marginLeft: 10}} 
                      onClick={() => StartTestViewButtonHandler(elem)}>View</Button>
                    </Typography>
                    <CardContent>
                      <Typography>
                        <strong>
                          {`Set : ${elem.setNumber}`} &nbsp; &nbsp;
                          {`Total Questions : ${elem.totalQuestionsCount}`}
                        </strong>
                      </Typography>
                      <Typography>
                        {`Created By : ${
                          elem.createdBy == null ? "Test User" : elem.createdBy
                        }`}
                        <br />
                        {`Updated By : ${
                          elem.updatedBy == null ? "Test User" : elem.updatedBy
                        }`}
                        <br />
                        {`Created Date : ${elem.createdDate}`}
                        <br />
                        {`Updated Date : ${elem.updatedDate}`}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Box>
        <div className="quiz-start-btn-wrap">
        <ReactModal
          isOpen={OpenTestModal}
          contentLabel="Minimal Modal Example"
          ariaHideApp={false}
        >
         
          {modalContent && modalContent === "listView" ? (<>
            <AllQuestionsAnswers
              openDialog={openDialog}
              handleClose={handleClose}
              setOpenDialog={setOpenDialog}
              quizSubjectInfo={subjectAnswersList}
            />
            <Box style={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              color="error"
              onClick={endTestButtonHandler}
            >
              Close
            </Button>
          </Box>
          </>
          ) : null}
        </ReactModal>
        </div>
      </Box>
    </>
  );
};

export default SubjectList;
