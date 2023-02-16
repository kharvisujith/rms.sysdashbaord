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
import { getTotalQuizLinksInfo } from '../../api/apiAgent';
import NavBarInterviewer from '../NavBar/NavBarInterviewer';

interface Column {
  id: 'quizId' | 'candidateId' | 'quizCodeExpirationAt' | 'quizSubmittedAt' | 'lastLoggedIn'| 'loginAttempts' | 'url';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'quizId', label: 'QuizId', minWidth: 70 },
  { id: 'candidateId', label: 'CandidateId', minWidth: 150 },
  {
    id: 'quizCodeExpirationAt',
    label: 'QuizCodeExpirationAt',
    minWidth: 150,
    //align: 'right',
    // format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'quizSubmittedAt',
    label: 'QuizSubmittedAt',
    minWidth: 150,
    //align: 'right',
    // format: (value: number) => value.toLocaleString('en-US'),
  },
   {
    id: 'lastLoggedIn',
    label: 'LastLoggedIn',
    minWidth: 150,
    //align: 'center',
    // format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'loginAttempts',
    label: 'LoginAttempts',
    minWidth: 10,
   // align: 'right',
    //format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'url',
    label: 'Url',
    minWidth: 100,
    //align: 'right',
    //format: (value: number) => value.toLocaleString('en-US'),
  },
];

interface Data {
  quizId: number;
  candidateId: string;
  quizCodeExpirationAt: string;
  quizSubmittedAt: string;
  lastLoggedIn: string;
  loginAttempts: number;
  url: string;
}

// function createData(candidateId: string, quizCodeExpirationAt: string, quizSubmittedAt: number, lastLoggedIn: number,loginAttempts:number,url:string): Data {
//   const density = population / size;
//   return { name, code, population, size, density };
// }

//const rows = GetTotalQuizLinksInfo;

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

const InterviewerQuizTable=()=> {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [totalQuizInfo, setTotalQuizInfo] = useState<any>([]);
  //const [text, setText] = useState('');
  const totalQuizurlInfo = async () => {
    getTotalQuizLinksInfo()
      .then((response:any) => {
        setTotalQuizInfo(response.data);
      })
      .catch((error: any) => console.log("error in total quiz info api"));
  };
  useEffect(() => {
    totalQuizurlInfo();
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
  return ( totalQuizInfo.length>0? 
    <>
    {/* <NavBarInterviewer /> */}
     {/* totalQuizInfo.length>0? */}
    {/* <Paper className={classes.root}> */}
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
            {totalQuizInfo.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row:any) => {
              console.log("test data",totalQuizInfo);
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {/* {column.format && typeof value === 'number' ? column.format(value) : value} */}
                        {column.format && typeof value === 'number' ? column.id=='url'?column.format(value):value :column.id=='url'?value.slice(value.length - 12):value} 
                        {column.id==='url' &&(row['quizCodeExpirationAt']==null || row['quizSubmittedAt']==null)  ?<button onClick={() => copyCodeToClipboard(value)}>Copy</button>:''}
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
        count={totalQuizInfo.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
     {/* </Paper> */}
      {/* :<span><h5>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;No Quiz results</h5></span> */}
    </>   
     :<span><h5>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;No Quiz results</h5></span> 
)
};
export default InterviewerQuizTable;
