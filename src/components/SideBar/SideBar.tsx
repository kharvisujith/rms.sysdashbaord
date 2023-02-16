import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { Button, Typography } from "@mui/material";

const SideBar = (props: any) => {
  const navigate = useNavigate();

  return (
    // <Box className="main-layout-wrap">
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
          onClick={() => navigate(-1)}
        >
          Augmento labs RMS
        </Typography>
        <Button color="inherit">Log out</Button>
      </Toolbar>
    </AppBar>

    // {/* </Box> */}
  );
};
export default SideBar;
