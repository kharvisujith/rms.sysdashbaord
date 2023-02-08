import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";



const CandidateInfo = () => {
  const navigate = useNavigate();
  const [save, setSave] = useState<any>({
    attendees: "",
    firstname: "",
    middlename: "",
    lastname: "",
    phonenumber: "",
  });

   const handlesubmit = (e: any) => {
    console.log(e);
    const name = e.target.name;
    const value = e.target.value;
    setSave({ ...save, [name]: value });

  console.log(save); 
   }

   const handlenext = () => {
     if (!save)
     console.log("Please fill the details");
     else 
     navigate("/quiz");

   }
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
    }}
  >
 
    <Box
      component="form"
      onSubmit={handlesubmit}
      // noValidate
      sx={{ mt: 1 }}
    >
      <TextField
        margin="normal"
        required
        fullWidth
        type="email"
        label="Candidate Email Address"
        name="attendees"
        // onChange={handleDateTime}
      />
       <TextField
        margin="normal"
        required
        fullWidth
        type="text"
        label="FirstName"
        name="firstname"
      
      />
      <TextField
        margin="normal"
        required
        fullWidth
        type="text"
        label="MiddleName"
        name="middlename"
      
      />
      <TextField
        margin="normal"
        required
        fullWidth
        type="text"
        label="LastName"
        name="lastname"
      
      />
      <TextField
        margin="normal"
        required
        fullWidth
        type="text"
        label="PhoneNumber"
        name="phonenumber"
      
      />
    <Box>
      <Button
        type="submit"
        // fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2, ml: 24 }}
        onClick={handlesubmit}
      >
        Submit
      </Button>
      <Button
        type="button"
        // fullWidth
        variant="contained"
        onClick=  {
         handlenext
        }
        sx={{ mt: -11, mb: 1,  ml: 35}}
      >
        Next
      </Button>
      </Box>
    </Box>
    {/* <Button
        type="button"
        // fullWidth
        variant="contained"
        sx={{ mt: -6, ml: 40}}
      >
        Next
      </Button> */}
  </Box>
</Container>
</>
);
};

export default CandidateInfo;