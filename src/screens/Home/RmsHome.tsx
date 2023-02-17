import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Button, Typography } from "@mui/material";
import SideBar from "../../components/TopNavBar/TopNavBar";
import { dummycheck } from "../../api/apiAgent";

const RmsHome = (props: any) => {
  const navigate = useNavigate();

  const getData = () => {
    console.log("get dta calledd");
    dummycheck(1)
      .then((res: any) => {
        console.log("response is", res);
        console.log("response.data is", res.data);
      })
      .catch((error: any) => console.log("error in dumy api"));
  };

  return (
    <>
      <SideBar />
      {/* <Box className="main-layout-wrap"> */}
      {/* <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            onClick={() => navigate(-1)}
          >
            Augmento labs RMS
          </Typography>
        </Toolbar>
      </AppBar>
      <hr /> */}
      <div>
        <p style={{ paddingLeft: "190px" }}>
          <li>
            {" "}
            <strong>Subject Expert</strong> is any authenticated user(every one){" "}
          </li>
          <li>
            {" "}
            <strong>Interviewer</strong> is any authenticated user{" "}
          </li>
          <li>
            {" "}
            <strong>Candidate</strong> will never be authenticated{" "}
          </li>
        </p>
        <p style={{ textAlign: "center" }}>
          <button onClick={() => navigate("/assignments")}>
            Subject Expert
          </button>{" "}
          &nbsp;&nbsp;&nbsp;
          <button onClick={() => navigate("/reviewer")}>Interviewer</button>
          &nbsp;&nbsp;&nbsp;
        </p>
      </div>
      <Button onClick={getData}>Check</Button>
    </>
  );
};
export default RmsHome;
