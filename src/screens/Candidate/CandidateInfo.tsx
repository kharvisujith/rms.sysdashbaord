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
import {
  axiosClient,
  submitCandidateInfo,
  verifyCandidate,
} from "../../api/apiAgent";
import CandidateDetails from "../../Interface/CandidateDetails";
import { useParams } from "react-router-dom";
import CandidateNavBar from "../../components/TopNavBar/CandidateNavBar";
import "./CandidateInfo.style.scss";


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
  const [formError, setFormError] = useState<any>({
    firstName: false,
    lastName: false,
    email: false,
    phone: false
  });
  const [quizQuestions, setQuizQuestions] = useState<any>([]);
  const [isKeyValid, setIsKeyValid] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<any>();

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
 


  const handleChange = (e: any) => {
    setFormError({ ...formError, [e?.target.name]: false });
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  
  
  const handleSubmit = (e: any) => {
        if (!user) {
           return;
          }
    if (user.email && user.firstName && user.lastName && user.phone)
    {
      submitCandidateInfo(parseInt(id!), key!, user)
       .then((res: any) => {
        setQuizQuestions(res.data);
        console.log(res.data, 'response is');
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
    }  else if (!user.email) {
      setFormError({ ...formError, email: true });
     } else if (!regex.test(user.email)) {
        setFormError({ ...formError, email: true });
    } else if (!user.firstName) {
      setFormError({ ...formError, firstName: true });
    } else if (!user.lastName) {
      setFormError({ ...formError, lastName: true });
    } else if (!user.phone) {
      setFormError({ ...formError, phone: true });
    }
   

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
          <Typography variant="h4">{`${errorMessage}`}</Typography>
        </Box>
        <Divider className="divider" />
      </>
    );
  }

  return (
    <>
      <CandidateNavBar />
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
          <Box 
            //  onSubmit={handleSubmit}
             //noValidate
            sx={{ mt: 1 }}>
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
             {formError.email && (
              <Typography className="error">Please include @ and enter valid email</Typography>
            )}
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
             {formError.firstName && (
              <Typography className="error">Please Enter First Name</Typography>
            )}
            
            <TextField
              margin="normal"
              required
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
             {formError.lastName && (
              <Typography className="error">Please Enter Last Name</Typography>
            )}
          
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
             {formError.phone && (
              <Typography className="error">Please Enter Phone Number</Typography>
            )}
             
           
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
