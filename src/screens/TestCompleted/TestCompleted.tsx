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
import SideBar from "../../components/SideBar/SideBar";

const TestCompleted = (props: any) => {
  const location = useLocation();
  console.log("value of answer in submitted is", location.state);

  const showSuccess = () => {
    Swal.fire({
      title: "Success",
      text: "Test Submitted Succesfully",
      icon: "success",
      confirmButtonText: "Okay",
    });
  };
  useEffect(() => {
    showSuccess();
  });
  return (
    <>
       <SideBar />
      <Box className="test-submitted-box">
        {/* <Box className="test-submitted-report">
          <Typography></Typography>
          <Typography>This test has already completed</Typography>
          <Typography>This test has already completed</Typography>
        </Box> */}
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
                {`Total Number of Questions - ${location.state.totalNumberOfQuestions}`}
              </Typography>
              <Typography color="text.secondary">
                {`Questions Answered - ${location.state.answered}`}
              </Typography>
              <Typography color="text.secondary">
                {`Questions Not Answered - ${location.state.notAnswered}`}
              </Typography>
              {/* <Typography variant="body2">
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
              </Typography> */}
            </CardContent>
          </Card>
        </Box>
      </Box>
    
        {/* <h1>test submitted succ</h1>test submitted succesfully */}
      {/* <TableContainer component={Paper}>
        <Table sx={{ minWidth: 150 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Test Information (Demo Data rendered)</TableCell>
              <TableCell align="right">Values</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.calories}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}
    </>
  );
};
export default TestCompleted;
