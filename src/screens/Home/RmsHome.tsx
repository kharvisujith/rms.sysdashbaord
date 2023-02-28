import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import { Container } from "@mui/material";
import TopNavBar from "../../components/TopNavBar/TopNavBar";

const RmsHome = (props: any) => {
  const navigate = useNavigate();
  const getData = () => {
    console.log("getDAta is calledd");
  };

  return (
    <>
      <TopNavBar />

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
    </>
  );
};
export default RmsHome;
