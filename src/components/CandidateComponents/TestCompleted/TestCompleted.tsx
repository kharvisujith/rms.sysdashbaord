import { Box, Card, CardContent, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import "./TestCompleted.style.scss";

const TestCompleted = () => {
  const location = useLocation();

  return (
    <>
      <Box className="test-submitted-box">
        <Box className="test-summary">
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Test Summary
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Status : Completed
              </Typography>
              <Typography color="text.secondary">
                {`Total Number of Questions - ${location.state?.totalNumberOfQuestions}`}
              </Typography>
              <Typography color="text.secondary">
                {`Questions Answered - ${location.state?.answered}`}
              </Typography>
              <Typography color="text.secondary">
                {`Questions Not Answered - ${location.state?.notAnswered}`}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </>
  );
};
export default TestCompleted;
