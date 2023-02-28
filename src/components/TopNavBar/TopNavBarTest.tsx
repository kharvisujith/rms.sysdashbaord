import { useNavigate } from "react-router-dom";
import AppBar, { AppBarProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Button, IconButton, styled, Typography } from "@mui/material";
import { useState } from "react";
import logo from "../../assets/images/logo.png";

const TopNavBarTest = (props: any) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <AppBar position="static" className="app-bar">
      <Toolbar>
        <Box className="logo-box">
          <img src={logo} alt="augmentolabs" className="logo" />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default TopNavBarTest;
