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
import { useParams } from "react-router-dom";
import "./CandidateInfo.style.scss";
import { CircularProgress } from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "../../../Store/ConfigureStrore";
import { submitCandidateInfo } from "../../../Redux/candidateSlice";
import {
  CandidateDetails,
  submitCandidateInfoRequestBody,
  verifyCandidateRequestBody,
} from "../../../Interface/CandidateDetails";

import { verifyCandidate } from "../../../Redux/candidateSlice";

const CandidateInfo = (props: any) => {
  const dispatch = useAppDispatch();
  const { errorMessage, verifiedStatus, loadingStatus, verifyCredentials } =
    useAppSelector((state: any) => state.candidate);

  const { id, key } = useParams();

  const navigate = useNavigate();

  const [user, setUser] = useState<CandidateDetails>({
    candidateName: "",
    email: "",
    phone: "",
  });
  const [formError, setFormError] = useState<any>({
    candidateName: false,
    email: false,
    phone: false,
  });

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  const phone_regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  // /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  const handleChange = (e: any) => {
    setFormError({ ...formError, [e?.target.name]: false });
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    if (!user) {
      return;
    }
    if (user.email && user.candidateName && phone_regex.test(user.phone)) {
      try {
        const values: submitCandidateInfoRequestBody = {
          qId: parseInt(id!),
          confirmcode: key!,
          user: user,
        };
        await dispatch(submitCandidateInfo(values));
      } catch (error: any) {
        console.log(error);
      }
    } else if (!user.email) {
      setFormError({ ...formError, email: true });
    } else if (!regex.test(user.email)) {
      setFormError({ ...formError, email: true });
    } else if (!user.candidateName) {
      setFormError({ ...formError, name: true });
    } else if (!phone_regex.test(user.phone)) {
      setFormError({ ...formError, phone: true });
    }
  };

  useEffect(() => {
    dispatch({ type: "candidate/setVerifyCredentials", payload: { id, key } });
  }, [id, key]);

  useEffect(() => {
    const verify = async () => {
      if (isNaN(parseInt(id!))) {
        navigate("/notfound");
      } else {
        try {
          const values: verifyCandidateRequestBody = {
            id: parseInt(id!),
            key: key!,
          };
          await dispatch(
            verifyCandidate({ data: values, fromPage: "candidateInfo" })
          );
        } catch (error: any) {
          console.log("error in verify candiate", error);
        }
      }
    };
    verify();
  }, [key, id, navigate]);

  if (!verifiedStatus.candidateInfoPage && !loadingStatus.pageLoader) {
    return (
      <>
        <Box className="error-box">
          {errorMessage ? (
            <Typography variant="h4">{`${errorMessage}`}</Typography>
          ) : null}
        </Box>
        <Divider className="divider" />
      </>
    );
  }

  return (
    <>
      {loadingStatus.pageLoader ? (
        <Box className="page-loader">
          <CircularProgress />
        </Box>
      ) : (
        <>
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
                {formError.email && (
                  <Typography className="error">
                    Please include @ and enter valid email
                  </Typography>
                )}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  type="text"
                  onChange={handleChange}
                  value={user.candidateName}
                  label="CandidateName"
                  name="candidateName"
                />
                {formError.candidateName && (
                  <Typography className="error">Please Enter Name</Typography>
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
                  <Typography className="error">
                    Please Enter Valid Phone Number
                  </Typography>
                )}

                <Box className="button-box">
                  {loadingStatus.buttonLoader ? (
                    <Box className="button-loader">
                      <CircularProgress />
                    </Box>
                  ) : (
                    <Button
                      type="submit"
                      variant="contained"
                      onClick={handleSubmit}
                      sx={{ margin: 2 }}
                    >
                      Submit
                    </Button>
                  )}
                </Box>
              </Box>
            </Box>
          </Container>
        </>
      )}
    </>
  );
};

export default CandidateInfo;
