import { Box, Button, Container, TextField, Typography } from "@mui/material";
 import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar/SideBar";
import { axiosClient, submitCandidateInfo  } from "../api/apiAgent";
import CandidateDetails from "../Interface/CandidateDetails";

const CandidateInfo = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<CandidateDetails>({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phone: "",
  });  
  const handleChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!user) {
      return;
    }
    submitCandidateInfo(1, 'ueFRzpMyVr3Hco11Y6XOfYEpFqVxnApqXcD27u45kOPZdJNR2ziB3DCL-ZGgvCMn1DfxX19Fx1k6ZacIrbyb-w!!',user)    
      .then((res:any) =>
      { setUser(res.data)
      } ) 
      .then((res:any) => console.log("Succesfully saved")
      //  navigate(/quiz)
      )
      .catch((error: any) => console.log("error"));
  };
return(
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
    }}>
    <Box
      sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth onChange={handleChange} value={user.email}
        type="text"
        label="Candidate Email Address"
        name="email"/>
       <TextField
        margin="normal"
        required
        fullWidth
        type="text" onChange={handleChange} value={user.firstName}
        label="FirstName"
        name="firstName"/>
      <TextField
        margin="normal"
        fullWidth
        type="text" onChange={handleChange} value={user.middleName}
        label="MiddleName"
        name="middleName"/>
      <TextField
        margin="normal"
        required
        fullWidth
        type="text" onChange={handleChange} value={user.lastName}
        label="LastName"
        name="lastName"/>
      <TextField
        margin="normal"
        required
        fullWidth
        type="text" onChange={handleChange} value={user.phone}
        label="PhoneNumber"
        name="phone" />
    <Box>
      <Button
        type="submit"
        variant="contained"
        sx={{ mt: 3, mb: 2, ml: 20 }}
        onClick={handleSubmit}>
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