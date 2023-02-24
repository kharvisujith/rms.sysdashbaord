import { useNavigate } from "react-router-dom";
import AppBar, { AppBarProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Button, IconButton, styled, Typography } from "@mui/material";
import { useState } from "react";

const SideBar = (props: any) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          // onClick={handleDrawerOpen}
          edge="start"
          id="menu-button"
          // className={open ? "menu-icon-open" : "menu-icon-close"}
        >
          {/* <MenuIcon /> */}
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Augmento Labs
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
export default SideBar;
