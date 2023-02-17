import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import { TableRow } from '@material-ui/core';
import { useEffect, useState } from "react";
import { getTotalSubmittedQuizInfo,getSubmittedQuizInfo,getSubmittedQuizDetailedInfo } from '../../api/apiAgent';
import { submittedQuizResponse,submittedQuizAnswersResponse,submittedQuizDetailedInfoResponse,createQuizRequest } from '../../Interface/QuizDetails';
import Interviewer from '../Interviewer/Interviewer';
import ReactModal from "react-modal";
import AllSubmittedQuestionsAnswers from '../../components/DispalyQuizCandidateSubmittedQuestionsAnswers/AllSubmittedQuestionsAnswers';


interface Column {
  id: 'quizId' | 'candidateId' | 'totalQuestions' | 'answeredQuestions'| 'notAnsweredQuestions' | 'correctAnswers'| 'inCorrectAnswers'| 'interviewLevel' | 'createdBy'| 'createdDate';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: Column[] = [
  //{ id: 'quizId', label: 'QuizId', minWidth: 30 },
  { id: 'candidateId', label: 'CandidateId', minWidth: 160 },
  { id: 'createdBy', label: 'CreatedBy', minWidth: 160 },
  // { id: 'createdDate', label: 'CreatedDate', minWidth: 160 },
  { id: 'interviewLevel', label: 'InterviewLevel', minWidth: 5 },
  { id: 'totalQuestions', label: 'TotalQuestions', minWidth: 10 },
  { id: 'answeredQuestions', label: 'Answered', minWidth: 10 },
  { id: 'notAnsweredQuestions', label: 'NotAnswered', minWidth: 10 },
  { id: 'inCorrectAnswers', label: 'InCorrect', minWidth: 10 },
  { id: 'correctAnswers', label: 'Correct', minWidth: 10 },
  { id: 'quizId', label: 'Result', minWidth: 20 },
];
interface Data {
  candidateId: string;
  totalQuestions: number;
  answeredQuestions: number;
  notAnsweredQuestions: number;
  correctAnswers: number;
  inCorrectAnswers: number;
  interviewLevel: number;
  createdBy: string;
  createdDate: string;
  quizId: number;
}
const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});
const SubmittedQuiz=(props:any)=> {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [totalSubmittedQuizInfoList, setTotalSubmittedQuizInfoList] = useState<submittedQuizResponse[]>([]);
  const [detailedSubmittedQuizInfoList, setDetailedSubmittedQuizInfoList] = useState<submittedQuizAnswersResponse[]>([]);
  const [individualQuizDetailedInfo, setIndividualQuizDetailedInfo] = useState<submittedQuizDetailedInfoResponse[]>([]);
  const [OpenTestModal, setOpenTestModal] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  //const [text, setText] = useState('');
  const totalSubmittedQuizurlInfo = async () => {
    getTotalSubmittedQuizInfo()
      .then((response:any) => {
        setTotalSubmittedQuizInfoList(response.data);
      })
      .catch((error: any) => console.log("error in total quiz info api"));
  };
  useEffect(() => {
    totalSubmittedQuizurlInfo();
  }, [props]);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };
  const endTestButtonHandler = () => {
    setOpenTestModal(false);
  };
const StartTestViewButtonHandler = (e: any) => {
  getSubmittedQuizInfo(e)
    .then((response) => {
      setDetailedSubmittedQuizInfoList(response.data);
    })
    .catch((error: any) => console.log("error in detailed Subject Answer answersapi"));
    
    // getSubmittedQuizDetailedInfo(e)
    // .then((response:any) => {
    //   // let obj: submittedQuizDetailedInfoResponse = JSON.parse('{ "myString": "string", "myNumber": 4 }');
    //   // setIndividualQuizDetailedInfo(JSON.parse(JSON.stringify(response.data)));
    //   // console.log("Result Set Detailed Info 1-"+JSON.stringify(response.data));
    //   //const testData: submittedQuizDetailedInfoResponse = JSON.parse(response.data);
    //   console.log("Result Set Detailed Info 1-"+response.data);
    //   setIndividualQuizDetailedInfo(response.data);
      
    // })
    // .catch((error: any) => console.log("error in detailed Subject Answer answersapi"));
    getSubmittedQuizDetailedInfo(e)
    .then((res: any) => {
      console.log("response is", res);
      console.log("response.data is", res.data);
      setIndividualQuizDetailedInfo(res.data);
    }).catch((error: any) => console.log("error in detailed Subject Answer answersapi"));

  setOpenTestModal(true);
};
console.log("Detailed Info"+individualQuizDetailedInfo);
  return (totalSubmittedQuizInfoList.length>0?
    <>
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column:any) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {totalSubmittedQuizInfoList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row:any) => {
              console.log("test data",totalSubmittedQuizInfoList);
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.id==='quizId'?<button onClick={() => StartTestViewButtonHandler(value)}>Review</button>:column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>

                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={totalSubmittedQuizInfoList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
          <div className="quiz-start-btn-wrap">
          <ReactModal
            isOpen={OpenTestModal}
            contentLabel="Minimal Modal Example"
            ariaHideApp={false}
          >
            <>
              <AllSubmittedQuestionsAnswers
                openDialog={openDialog}
                handleClose={handleClose}
                setOpenDialog={setOpenDialog}
                quizSubjectInfo={detailedSubmittedQuizInfoList}
                totalQuizDetailedInfo={individualQuizDetailedInfo}
               
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
          </ReactModal>
        </div></>
    :<span><h5>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;No Submitted Quiz Results</h5></span>
)};
export default SubmittedQuiz;
