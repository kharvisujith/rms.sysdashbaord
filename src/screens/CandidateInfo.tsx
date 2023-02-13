import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar/SideBar";
import {
  axiosClient,
  submitCandidateInfo,
  verifyCandidate,
} from "../api/apiAgent";
import CandidateDetails from "../Interface/CandidateDetails";
import { useParams } from "react-router-dom";

const CandidateInfo = (props: any) => {
  const { id, key } = useParams();
  console.log("value of id and key is", id, key);

  const navigate = useNavigate();

  const [user, setUser] = useState<CandidateDetails>({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [quizQuestions, setQuizQuestions] = useState<any>([]);
  const [isKeyValid, setIsKeyValid] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<any>();
  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = (e: any) => {
    // e.preventDefault();
    if (!user) {
      return;
    }
    submitCandidateInfo(parseInt(id!), key!, user)
      .then((res: any) => {
        console.log(" succes submit response is", res.data);
        setQuizQuestions(res.data);
        return res.data;
        //  setUser(res.data);
      })
      .then((res: any) => {
        console.log("Value of usesTate after submit succes is", res);
        navigate("/rms-aug/test/start", { state: { data: res, quizId: id } });
      })
      .catch((error: any) => {
        console.log("error in submitt");
        setErrorMessage(error.response.data);
      });
  };

  useEffect(() => {
    console.log("value of key is", key);

    verifyCandidate(parseInt(id!), key!)
      .then((res: any) => {
        console.log("response from validation is", res.data);
        setIsKeyValid(true);
      })
      .catch((error: any) => {
        console.log("error in validation  is", error);
        setErrorMessage(error.response.data);
      });

    // if (key!.length > 20) {
    //   console.log("yessss");
    //   setIsKeyValid(true);
    // } else {
    //   setIsKeyValid(false);
    //   console.log("nooooo accessss");
    // }
    // we have to check if the key is valid and not expired -> if good then proceed else return error
  }, [key, id]);

  if (!isKeyValid) {
    return <Typography>{`Invalid Interview link`}</Typography>;
  }

  return (
    <>
      <SideBar />
      <Typography variant="h4" sx={{ mt: 5, textAlign: "center" }}>
        Enter Details
      </Typography>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              onChange={handleChange}
              value={user.email}
              type="text"
              label="Candidate Email Address"
              name="email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              type="text"
              onChange={handleChange}
              value={user.firstName}
              label="FirstName"
              name="firstName"
            />
            <TextField
              margin="normal"
              fullWidth
              type="text"
              onChange={handleChange}
              value={user.middleName}
              label="MiddleName"
              name="middleName"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              type="text"
              onChange={handleChange}
              value={user.lastName}
              label="LastName"
              name="lastName"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              type="text"
              onChange={handleChange}
              value={user.phone}
              label="PhoneNumber"
              name="phone"
            />
            <Box>
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2, ml: 20 }}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default CandidateInfo;
