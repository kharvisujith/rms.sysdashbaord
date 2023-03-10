import { Typography } from "@material-ui/core";
import { Box, Button, Chip, Grid, Paper } from "@mui/material";
import { useState } from "react";
import { getTotalSubmittedQuizInfo } from "../../../api/apiAgent";
import { submittedQuizResponse } from "../../../Interface/QuizDetails";
import "./MakeQuiz.style.scss";
import PastEvaluationsTable from "../PastEvaluationsTable/PastEvaluationsTable";
import SearchQuestionSets from "../SearchQuestionSets/SearchQuestionSets";

const favSub = ["React", "javascript", "c#"];

const MakeQuiz = () => {
  const [pastEvaluationsData, setpastEvaluationsData] = useState<
    submittedQuizResponse[]
  >([]);

  const handleTagsClick = (subjectName: string) => {
    getTotalSubmittedQuizInfo()
      .then((response: any) => {
        setpastEvaluationsData(response.data);
        // setLoader(false);
        console.log("response", response.data);
      })
      .catch((error: any) => {
        // setLoader(false);
        console.log("error in total quiz info api");
      });
  };

  return (
    <>
      <Box className="container">
        <Box className="favorites-container">
          <Grid container className="tags-box" spacing={2}>
            <Grid item xs={10} md={4}>
              <Typography variant="h6">Favorites</Typography>
              <Paper className="tags-container">
                {favSub.map((tagname: string, index: number) => (
                  <Chip
                    label={tagname}
                    key={index}
                    size="small"
                    className="tagname"
                    onClick={() => handleTagsClick("react")}
                  />
                ))}
              </Paper>
            </Grid>
            <Grid item xs={6} md={6} display="flex" justifyContent="flex-end">
              <Button variant="contained">New Question Set</Button>
            </Grid>
          </Grid>
        </Box>
        <PastEvaluationsTable
          pastEvaluationsData={pastEvaluationsData}
          setpastEvaluationsData={setpastEvaluationsData}
        />

        <SearchQuestionSets />
      </Box>
    </>
  );
};
export default MakeQuiz;
