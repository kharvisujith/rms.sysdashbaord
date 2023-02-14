import {
  Box,
  Typography,
  Grid,
  Card,
  Button,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  SvgIcon,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  makeStyles,
} from "@mui/material";
import { any } from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { ImportsNotUsedAsValues } from "typescript";
import { setEnvironmentData } from "worker_threads";
import { createQuiz, getSubjectwiseQuiz } from "../../api/apiAgent";
import SideBar from "../../components/SideBar/SideBar";
import QuizDetails from "../../Interface/QuizDetails";
import "./CreateQuiz.style.scss";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Interviewer from "../Interviewer/Interviewer";

const CreateQuiz = (props: any) => {
  const navigate = useNavigate();
  const [subjectList, setSubjectList] = useState<any>([]);
  const [checked, setChecked] = useState(false);
  const [values, setValues] = useState<any>([]);
  const [newquiz, setNewQuiz] = useState<any>({});
  // const [isQuizCreated, setIsQuizCreated] = useState<boolean>(false);
  const [quizLink, setQuizLink] = useState<any>();
  // const useStyles = makeStyles({
  //   table: {
  //     width: 400,
  //     margin: "auto"
  //   }
  //  });
   	
// const classes = useStyles();
   

  const handleCheckboxChange = (e: any, quiz: any) => {
    // if(e.target.checked) {
    const existindex = values.findIndex((ele: any) => {
      return (
        ele.subjectName === quiz.subjectName && ele.setNumber === quiz.setNumber
      );
    });
    // console.log(existindex, 'index');
    if (existindex !== -1 && !e.target.checked) {
      setValues((prev: any) => [
        ...prev.slice(0, existindex),
        ...prev.slice(existindex + 1),
      ]);
    } else {
      setValues([
        ...values,
        { setNumber: quiz.setNumber, subjectName: quiz.subjectName },
      ]);
    }
  };
  console.log(values, "value of use state");

  const handleSubmit = () => {
    // e.preventDefault();
    createQuiz(values)
      .then((res) => {
        setNewQuiz(res.data);
        Swal.fire({
          title: "Success",
          text: "Quiz created Succesfully",
          icon: "success",
          confirmButtonText: "Okay",
        });
        setQuizLink(
          `http://localhost:3000/rms-aug/test/${res.data?.quizId}/${res.data?.quizLink}`
        );
        //  setIsQuizCreated(true);
        return res.data;
      })
      .then((res: any) => {
        console.log("Succesfully submitted", res.data);
      })
      .catch((error: any) => {
        console.log("error");
        Swal.fire({
          title: "error",
          text: "Failed to create quiz! please retry",
          icon: "error",
          confirmButtonText: "Okay",
        });
      });
  };

  console.log(newquiz, "quiz values");

  const subjectwiseQuizDetails = async () => {
    getSubjectwiseQuiz("")
      .then((response: any) => {
        setSubjectList(response.data);
      })
      .catch((error: any) => console.log("error in subjwiseapi"));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      function () {
        console.log("copiies");
        // setCopied(true);
      },
      function (err) {
        console.error("Could not copy text: ", err);
      }
    );
  };

  useEffect(() => {
    subjectwiseQuizDetails();
  }, []);

  return (
    <>
     <Interviewer />
      <Box
        sx={{
          marginTop: -1,
          marginLeft: 10,
          // display: "flex",
          // flexDirection: "column",
          //  alignItems: "center",
        }}
      > 
        <Typography variant="h5" align="center">
          Available Question Sets
        </Typography>
        </Box>
        <TableContainer component={Paper} 
        sx={{marginTop: 4}}
        
        >
          
        <Table aria-label="simple table"
        
        // sx={{tableLayout: "auto",
        // width: "max-content",
        // height: "max-content"
        //   }}
        >
        <TableHead >
         <TableRow>
           <TableCell align="center">Set Number</TableCell>
           <TableCell align="center">Subject Name</TableCell>
           <TableCell align="center">Total Questions</TableCell>
           <TableCell align="center">Check Box</TableCell>
           </TableRow>
           </TableHead>
          <TableBody>
            {subjectList && subjectList.map((row:any) => (
              <TableRow key={row.id}
               sx={{'&:last-child td, &:last-child th': {border: 0}}}
               >
                <TableCell align="center">{row.setNumber}</TableCell>
                <TableCell align="center">{row.subjectName}</TableCell>
                <TableCell align="center">{row.totalQuestionsCount}</TableCell>
                <TableCell align="center">
                {/* <FormControlLabel */}
                        
                          <Checkbox
                            name="checkbox-1"
                            
                            onChange={(e: any) => handleCheckboxChange(e, row)}
                          />
                        
                      {/* label={row.setNumber} */}
                      {/* >  */}
                </TableCell>

                </TableRow>
            ))}
           
          </TableBody>
         </Table>
        </TableContainer>
        {/* <Box>
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
                    > */}
                      {/* /{elem.subjectName} */}
                      {/* <FormControlLabel
                        control={
                          <Checkbox
                            name="checkbox-1"
                            
                            onChange={(e: any) => handleCheckboxChange(e, elem)}
                          />
                        }
                        label={elem.subjectName}
                      /> */}

                    {/* </Typography>
                    <CardContent>
                      <Typography>
                        <strong>
                          {`Set : ${elem.setNumber}`} &nbsp; &nbsp;
                          {`Total Questions : ${elem.totalQuestionsCount}`}
                        </strong>
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Box> */}
        <Button
          variant="contained"
          type="submit"
          sx={{
            marginTop: 5,
            marginLeft: 90,
            // display: "flex",
            // flexDirection: "column",
            alignItems: "center",
          }}
          onClick={handleSubmit}
        >
          Create
        </Button>

        {quizLink && (
          <Box sx={{marginTop: 5 }}>
            {/* <Typography> */}
              {/* {`Test Link :`} */}
              {/* </Typography> */}
            <Box className="test-link">
              <Typography>
                {quizLink}
                {/* {`http://localhost:3000/rms-aug/test/${newquiz?.quizId}/${newquiz?.quizLink}`} */}
              </Typography>
              <Button
                variant="outlined"
                onClick={() => copyToClipboard(quizLink)}
                
                
              >
                <SvgIcon 
                sx={{marginLeft:-1}}
                component={ContentCopyIcon} inheritViewBox />
                Copy
              </Button>
            </Box>
          </Box>
         )} 
      
    </>
  );
};

export default CreateQuiz;
