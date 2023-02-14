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

const CreateQuiz = (props: any) => {
  const navigate = useNavigate();
  const [subjectList, setSubjectList] = useState<any>([]);
  const [checked, setChecked] = useState(false);
  const [values, setValues] = useState<any>([]);
  const [newquiz, setNewQuiz] = useState<any>({});
  // const [isQuizCreated, setIsQuizCreated] = useState<boolean>(false);
  const [quizLink, setQuizLink] = useState<any>();

  const handleCheckboxChange = (e: any, quiz: any) => {
    const existindex = values.findIndex((ele: any) => {
      return (
        ele.subjectName === quiz.subjectName && ele.setNumber === quiz.setNumber
      );
    });
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

  const handleSubmit = () => {
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
        return res.data;
      })
      .then((res: any) => {})
      .catch((error: any) => {
        Swal.fire({
          title: "error",
          text: "Failed to create quiz! please retry",
          icon: "error",
          confirmButtonText: "Okay",
        });
      });
  };

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
      <SideBar />
      <Box
        sx={{
          marginTop: 5,
          marginLeft: 10,
        }}
      >
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
                            onChange={(e: any) => handleCheckboxChange(e, elem)}
                          />
                        }
                        label={elem.subjectName}
                      />
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
        <Button
          variant="contained"
          type="submit"
          sx={{
            marginTop: 5,
            marginLeft: 10,
            alignItems: "center",
          }}
          onClick={handleSubmit}
        >
          Create
        </Button>

        {quizLink && (
          <Box>
            <Typography>{`Test Link :`}</Typography>
            <Box className="test-link">
              <Typography>
                {quizLink}
                {/* {`http://localhost:3000/rms-aug/test/${newquiz?.quizId}/${newquiz?.quizLink}`} */}
              </Typography>
              <Button
                variant="contained"
                onClick={() => copyToClipboard(quizLink)}
              >
                Copy
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default CreateQuiz;
