import { Box, Typography, Grid, Card, Button, CardContent, Checkbox, FormControl, FormControlLabel } from "@mui/material";
import { any } from "prop-types";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImportsNotUsedAsValues } from "typescript";
import { setEnvironmentData } from "worker_threads";
import { createQuiz, getSubjectwiseQuiz } from "../../api/apiAgent";
import SideBar from "../../components/SideBar/SideBar";
import QuizDetails from "../../Interface/QuizDetails";



const CreateQuiz = (props:any) => {
    const navigate = useNavigate();
    const [subjectList, setSubjectList] = useState<any>([]);
    const [checked, setChecked] = useState( false);
    const[values, setValues] = useState<any>([]);
    const [newquiz, setNewQuiz] = useState<any>([]);
     
    

     const handleCheckboxChange = (e :any, quiz: any) => {
         // if(e.target.checked) {
            const existindex = values.findIndex((ele : any) => {
              return ele.subjectName === quiz.subjectName && ele.setNumber === quiz.setNumber
              
            })
            // console.log(existindex, 'index');
            if (existindex !== -1 && !e.target.checked ) {
              
                setValues((prev: any) => [...prev.slice(0, existindex), 
                                  ...prev.slice(existindex+1)  ])
            }
            
            else {
              setValues([...values, {setNumber: quiz.setNumber, subjectName: quiz.subjectName}])
            }
            
      };
     console.log(values, 'value of use state');
     

     const handleSubmit = () => {
      // e.preventDefault();
       createQuiz(values)    
         .then((res) =>
        { 
          setNewQuiz(res.data);
          return res.data;
        }) 
        .then((res:any) => {
          console.log("Succesfully submitted", res.data);
        })
        .catch((error: any) => console.log("error"));
    };
  
    console.log(newquiz, 'quiz values');

    const subjectwiseQuizDetails = async () => {
        getSubjectwiseQuiz("")
          .then((response: any) => {
            setSubjectList(response.data);
          })
          .catch((error: any) => console.log("error in subjwiseapi"));
      };

      
      useEffect(() => {
        subjectwiseQuizDetails();
      }, []);

      

      

    return (
        <>
        <SideBar />
          <Box  
           sx={{
          marginTop: 5,
          marginLeft: 10,
          // display: "flex",
          // flexDirection: "column",
          //  alignItems: "center",
        }}>
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
                          {/* /{elem.subjectName} */}
                          <FormControlLabel
                          control={
                          <Checkbox
                        name="checkbox-1"
                        //checked={checkboxData.value}
                       onChange={(e: any) => handleCheckboxChange(e, elem)}
                              />
                             }
                       label={elem.subjectName}
                           />

                           
                         
                          
                          
                       
                          {/* <Button variant="contained">View</Button> */}
                        </Typography>
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
            </Box>
            <Button variant="contained" 
            type="submit"
             sx={{
                marginTop: 5,
                marginLeft: 10,
                // display: "flex",
                // flexDirection: "column",
                  alignItems: "center",
              }}
             
              onClick={handleSubmit}
            >
              Create
            </Button> 
          </Box>
           
        </>
      );



};

export default CreateQuiz;