import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SideBar from "../components/SideBar";



const CandidateInfo = () => {
  const navigate = useNavigate();

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
      // onSubmit={handlesubmit}
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
        label="FullName"
        name="FullName"
      
      />
      <TextField
        margin="normal"
        required
        fullWidth
        type="text"
        label="PhoneNumber"
        name="PhoneNumber"
      
      />
    <Box>
      <Button
        type="submit"
        // fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2, ml: 24 }}
      >
        Submit
      </Button>
      <Button
        type="button"
        // fullWidth
        variant="contained"
        onClick={() => {
        navigate("/quiz");
        }}
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