import { makeStyles, Paper, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import { getTotalSubmittedQuizInfo, getSubmittedQuizInfo, getSubmittedQuizDetailedInfo } from "../../api/apiAgent";
import AllSubmittedQuestionsAnswers from "../../components/DispalyQuizCandidateSubmittedQuestionsAnswers/AllSubmittedQuestionsAnswers";
import NavBarInterviewer from "../../components/NavBar/NavBarInterviewer";
import { submittedQuizResponse, submittedQuizAnswersResponse, submittedQuizDetailedInfoResponse } from "../../Interface/QuizDetails";
import { columns } from "./SubmittedQuizTableColumn";
import "./SubmittedQuiz.style.scss"; 


// const useStyles = makeStyles({
//         root: {
//           width: '100%',
//         },
        
//         container: {
//           maxHeight: 440,
//         },
//       });
      const SubmitQuizes=(props:any)=> {
        // const classes = useStyles();
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
        const customStyles = {
          overlay: { zIndex: 1000 },
        };
      const StartTestViewButtonHandler = (e: any) => {
        getSubmittedQuizInfo(e)
          .then((response) => {
            setDetailedSubmittedQuizInfoList(response.data);
          })
          .catch((error: any) => console.log("error in detailed Subject Answer answersapi"));
          
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
           <NavBarInterviewer />
           <Box className='subjectlist-box'> 
           <Paper>
           <Typography
                  variant="h5"
                  className="table-title"
                  // sx={{ marginLeft: 5 }}
                >
                  Submitted Quiz Results
                </Typography>
            
            <TableContainer className="table-container">
              <Table stickyHeader>
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
            </Box>
                <div className="quiz-start-btn-wrap">
                <ReactModal
                  isOpen={OpenTestModal}
                  contentLabel="Minimal Modal Example"
                  ariaHideApp={false}
                  style={customStyles}
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

      export default SubmitQuizes;