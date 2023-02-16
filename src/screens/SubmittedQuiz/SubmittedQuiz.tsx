import React from 'react';
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
import { getTotalSubmittedQuizInfo,getSubmittedQuizInfo } from '../../api/apiAgent';
import Interviewer from "../Interviewer/Interviewer";

interface Column {
  id: 'quizId' | 'candidateId' | 'totalQuestions' | 'answeredQuestions'| 'notAnsweredQuestions' | 'correctAnswers'| 'inCorrectAnswers'| 'interviewLevel' | 'createdBy'| 'createdDate';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: Column[] = [
  //{ id: 'quizId', label: 'QuizId', minWidth: 30 },
  { id: 'candidateId', label: 'CandidateId', minWidth: 150 },
  { id: 'totalQuestions', label: 'TotalQuestions', minWidth: 30 },
  { id: 'answeredQuestions', label: 'TotalAnswered', minWidth: 30 },
  { id: 'notAnsweredQuestions', label: 'NotAnswered', minWidth: 30 },
  { id: 'correctAnswers', label: 'CorrectAnswers', minWidth: 30 },
  { id: 'inCorrectAnswers', label: 'InCorrectAnswers', minWidth: 30 },
  { id: 'interviewLevel', label: 'InterviewLevel', minWidth: 30 },
  { id: 'createdBy', label: 'CreatedBy', minWidth: 150 },
  { id: 'createdDate', label: 'CreatedDate', minWidth: 150 },
  { id: 'quizId', label: 'Result', minWidth: 50 },
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

const SubmittedQuiz=()=> {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [totalSubmittedQuizInfoList, setTotalSubmittedQuizInfoList] = useState<any>([]);
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
  }, []);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
const copyCodeToClipboard=(data:any)=>{
  navigator.clipboard.writeText(data);
};
  return (totalSubmittedQuizInfoList.length>0?
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
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
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                        {/* {column.format && typeof value === 'number' ? column.id=='url'?column.format(value):value :column.id=='url'?value.slice(value.length - 12):value} 
                        {column.id==='url' &&(row['quizCodeExpirationAt']==null || row['quizSubmittedAt']==null)  ?<button onClick={() => copyCodeToClipboard(value)}>Copy</button>:''} */}
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
    :<span><h5>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;No Submitted Quiz Results</h5></span>
)};
export default SubmittedQuiz;
