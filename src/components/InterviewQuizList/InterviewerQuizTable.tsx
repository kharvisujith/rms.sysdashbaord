import { Paper, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import { getTotalQuizLinksInfo } from "../../api/apiAgent";
import "./InterviewerQuizTable.style.scss";

interface Column {
    id:
      | "quizId"
      | "candidateId"
      | "quizCodeExpirationAt"
      | "quizSubmittedAt"
      | "lastLoggedIn"
      | "loginAttempts"
      | "url";
    label: string;
    minWidth?: number;
    align?: "right";
    format?: (value: number) => string;
  }

  const columns: Column[] = [
    { id: "quizId", label: "QuizId", minWidth: 70 },
    { id: "candidateId", label: "CandidateId", minWidth: 150 },
    {
      id: "quizCodeExpirationAt",
      label: "QuizCodeExpirationAt",
      minWidth: 150,
      //align: 'right',
      // format: (value: number) => value.toLocaleString('en-US'),
    },
    {
      id: "quizSubmittedAt",
      label: "QuizSubmittedAt",
      minWidth: 150,
      //align: 'right',
      // format: (value: number) => value.toLocaleString('en-US'),
    },
    {
      id: "lastLoggedIn",
      label: "LastLoggedIn",
      minWidth: 150,
      //align: 'center',
      // format: (value: number) => value.toLocaleString('en-US'),
    },
    {
      id: "loginAttempts",
      label: "LoginAttempts",
      minWidth: 10,
      // align: 'right',
      //format: (value: number) => value.toLocaleString('en-US'),
    },
    {
      id: "url",
      label: "Url",
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

  const InterviewQuiz = () => {
    //  const classes = useStyles();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalQuizInfo, setTotalQuizInfo] = useState<any>([]);
    //const [text, setText] = useState('');
    const totalQuizurlInfo = async () => {
      getTotalQuizLinksInfo()
        .then((response: any) => {
          setTotalQuizInfo(response.data);
        })
        .catch((error: any) => console.log("error in total quiz info api"));
    };
  
    const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };
    const copyCodeToClipboard = (data: any) => {
      navigator.clipboard.writeText(data);
    };
  
    
  
    useEffect(() => {
      totalQuizurlInfo();
    }, []);

    return (totalQuizInfo.length>0? 
        <>
        
        <Box className="quiztable-box">
    
        <Paper className="paper">
              <Typography
                variant="h5"
                className="table-title"
                // sx={{ marginLeft: 5 }}
              >
                Quiz Details
              </Typography>
              <TableContainer className="table-container">
                <Table stickyHeader>
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
                  {totalQuizInfo
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                   .map((row: any) => {
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={row.code}
                            >
                              {columns.map((column, index) => {
                                const value = row[column.id];
                                return (
                                  <TableCell key={index} align={column.align}>
                                      {column.format && typeof value === "number"
                                      ? column.id == "url"
                                      ? column.format(value)
                                      : value
                                      : column.id == "url"
                                      ? value.slice(value.length - 12)
                                      : value}
                                      {column.id === "url" &&
                                      (row["quizCodeExpirationAt"] == null ||
                                      row["quizSubmittedAt"] == null) ? (
                                      <button onClick={() => copyCodeToClipboard(value)}>
                                        Copy
                                      </button>
                                     ) : (
                                       ""
                                    )}
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
              
            </Paper>
        </Box>
        </>
        :
        <span><h5>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;No  Quiz results</h5></span>
        

    );
};

export default InterviewQuiz;
  