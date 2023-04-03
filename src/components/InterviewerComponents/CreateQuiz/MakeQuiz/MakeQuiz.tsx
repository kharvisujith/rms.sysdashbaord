import { Typography } from "@material-ui/core";
import { Box, Button, Chip, Grid, Paper } from "@mui/material";
import "./MakeQuiz.style.scss";
import PastEvaluationsTable from "../PastEvaluationsTable/PastEvaluationsTable";
import SearchQuestionSets from "../SearchQuestionSets/SearchQuestionSets";

const favSub = ["React", "javascript", "c#"];

const MakeQuiz = () => {
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
                    // onClick={() => handleTagsClick("react")}
                  />
                ))}
              </Paper>
            </Grid>
            <Grid item xs={6} md={6} display="flex" justifyContent="flex-end">
              <Button variant="contained">New Question Set</Button>
            </Grid>
          </Grid>
        </Box>
        <PastEvaluationsTable />

        <SearchQuestionSets />
      </Box>
    </>
  );
};
export default MakeQuiz;
