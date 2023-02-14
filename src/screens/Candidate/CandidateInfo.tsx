import {
  Box,
  Button,
  Container,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../../components/SideBar/SideBar";
import {
  axiosClient,
  submitCandidateInfo,
  verifyCandidate,
} from "../../api/apiAgent";
import CandidateDetails from "../../Interface/CandidateDetails";
import { useParams } from "react-router-dom";

const CandidateInfo = (props: any) => {
  const { id, key } = useParams();
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
    if (!user) {
      return;
    }
    submitCandidateInfo(parseInt(id!), key!, user)
      .then((res: any) => {
        setQuizQuestions(res.data);
        return res.data;
        //  setUser(res.data);
      })
      .then((res: any) => {
        navigate("/rms-aug/test/start", {
          state: {
            data: res,
            quizId: id,
            verifyCredentials: { id: id, key: key },
          },
        });
      })
      .catch((error: any) => {
        setErrorMessage(error.response.data);
      });
  };

  useEffect(() => {
    verifyCandidate(parseInt(id!), key!)
      .then((res: any) => {
        setIsKeyValid(true);
      })
      .catch((error: any) => {
        if (error.response.status === 400) {
          if (error.response.data) {
            setErrorMessage(error.response.data);
          }
        }
      });
  }, [key, id]);

  if (!isKeyValid) {
    return (
      <>
        <Box className="error-box">
          <Typography variant="h4">{`400 ${errorMessage}`}</Typography>
        </Box>
        <Divider className="divider" />
      </>
    );
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
