import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import "./TestCompleted.style.scss";
import SideBar from "../../components/TopNavBar/TopNavBar";
import TopNavBarTest from "../../components/TopNavBar/TopNavBarTest";

const TestCompleted = (props: any) => {
  const location = useLocation();

  return (
    <>
      <TopNavBarTest />
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
