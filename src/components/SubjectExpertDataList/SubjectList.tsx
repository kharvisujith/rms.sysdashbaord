import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getSuBjectwiseQuiz } from "../../api/apiAgent";

const SubjectList = () => {
  const [subjectList, setSubjectList] = useState<any>([]);

  const subjectwiseQuizDetails = async () => {
    getSuBjectwiseQuiz("")
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
      <Box>
        <Typography variant="h5" align="center">
          Available Question Sets
        </Typography>
        <Box>
          <Grid container spacing={1} alignItems="flex-start">
            {subjectList.map((elem: any, index: any) => (
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
                    <Button variant="contained">View</Button>
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
      </Box>
    </>
  );
};

export default SubjectList;
