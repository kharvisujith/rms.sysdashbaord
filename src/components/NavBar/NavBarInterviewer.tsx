import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
//import { AuthContext } from "../../context/AuthContectProvider";
import { Collapse, CSSObject, Divider, Drawer, Icon, List, ListItem, ListItemButton, ListItemIcon, ListItemText, styled, SvgIcon, Theme, Typography, useTheme } from "@mui/material";
import Menu from "@material-ui/icons/Menu";
import SideBar from "../TopNavBar/TopNavBar";
import { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import { ExpandLess, ExpandMore, StarBorder } from "@material-ui/icons";
import SubjectIcon from "@mui/icons-material/Subject";
import ArticleIcon from "@mui/icons-material/Article";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MuiDrawer from "@mui/material/Drawer";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import QuizIcon from '@mui/icons-material/Quiz';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
// import SubmittedQuiz from "../../screens/SubmittedQuiz/SubmittedQuiz";

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));
// const openedMixin = (theme: Theme): CSSObject => ({
//   width: drawerWidth,
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
//   overflowX: "hidden",
// });

// const closedMixin = (theme: Theme): CSSObject => ({
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: "hidden",
//   width: `calc(${theme.spacing(7)} + 1px)`,
//   [theme.breakpoints.up("sm")]: {
//     width: `calc(${theme.spacing(8)} + 1px)`,
//   },
// });

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

// const Drawer = styled(MuiDrawer, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   width: drawerWidth,
//   flexShrink: 0,
//   whiteSpace: "nowrap",
//   boxSizing: "border-box",
//   ...(open && {
//     ...openedMixin(theme),
//     "& .MuiDrawer-paper": openedMixin(theme),
//   }),
//   ...(!open && {
//     ...closedMixin(theme),
//     "& .MuiDrawer-paper": closedMixin(theme),
//   }),
// }));

const links = [
  { title: "HomePage", path: "/", icon: <HomeIcon /> },
];


const NavBarInterviewer = (props: any) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
    const [openList, setOpenList] = useState(false);
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
  }));
  const classes = useStyles();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  return (
    <>
      <Box sx={{ display: "flex" }}>
        <>
          <AppBar  position="fixed" open={open}>
            <Toolbar >
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                id="menu-button"

                sx={{
                   marginRight: 5,
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Augmento Labs 
              </Typography>
              <Typography variant="h6" component="div" sx={{ flexGrow: 0.02 }}>
                Log out
              </Typography>
            </Toolbar>
          </AppBar>
          {/* <ThemeProvider theme={darkTheme}> */}
          <Drawer variant="persistent" open={open}  sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}  anchor="left">
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </DrawerHeader>
            <Divider />

            <List className="account-menu-list">
            <ListItem disablePadding>
                <ListItemButton 
                  onClick={() => {
                    navigate("/");
                    handleDrawerClose();
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: -0.5,
                      mr: open ? 3 : "auto",
                      justifyContent: "right",
                    }}
                  >
                    <SvgIcon component={HomeIcon} inheritViewBox />
                  </ListItemIcon>
                  <ListItemText primary={"Main Page"} />
                </ListItemButton>
              </ListItem> 

              <ListItem disablePadding>
                <ListItemButton 
                  onClick={() => {
                    navigate("/reviewer");
                    handleDrawerClose();
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: -0.5,
                      mr: open ? 3 : "auto",
                      justifyContent: "right",
                    }}
                  >
                    <SvgIcon component={HomeIcon} inheritViewBox />
                  </ListItemIcon>
                  <ListItemText primary={"Interviewer Home Page"} />
                </ListItemButton>
              </ListItem>
              
              <ListItem disablePadding>
                <ListItemButton 
                  onClick={() => {
                    navigate("/createquiz");
                    handleDrawerClose();
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: -0.5,
                      mr: open ? 3 : "auto",
                      justifyContent: "right",
                    }}
                  >
                    <SvgIcon component={QuizIcon} inheritViewBox />
                  </ListItemIcon>
                  <ListItemText primary={"Create Quiz"} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton 
                  onClick={() => {
                    navigate("/SubmittedQuiz");
                    handleDrawerClose();
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: -0.5,
                      mr: open ? 3 : "auto",
                      justifyContent: "right",
                    }}
                  >
                    <SvgIcon component={AssignmentTurnedInIcon} inheritViewBox />
                  </ListItemIcon>
                  <ListItemText primary={"Submit Quiz"} />
                </ListItemButton>
              </ListItem>
              {/* <ListItem disablePadding>
                <ListItemButton 
                  onClick={() => {
                    navigate("/reviewer");
                    handleDrawerClose();
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: -0.5,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <SvgIcon component={KeyboardBackspaceIcon} inheritViewBox />
                  </ListItemIcon>
                  <ListItemText primary={"Back"} />
                </ListItemButton>
              </ListItem> */}
              
              </List>
              </Drawer>
              </>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
        </Box>
      </Box>
      {/* <InterviewerQuizTable></InterviewerQuizTable> */}
      
    </>
    // <>
    // < SideBar />
    /* <Box className="main-layout-wrap"> */
      /* <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <Menu>
              <MenuItem>Profile</MenuItem>
              <MenuItem>My account</MenuItem>
              <MenuItem>Logout</MenuItem>
            </Menu>
          </IconButton>
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
      <hr /> */
      /* <p>
        <h1>Interviewer Page Development in progrss</h1>
        <br />
        <button onClick={() => navigate(-1)}>Home</button>
      </p> */
    /* </Box> */
    /* </> */
    
  );
};

export default NavBarInterviewer;
