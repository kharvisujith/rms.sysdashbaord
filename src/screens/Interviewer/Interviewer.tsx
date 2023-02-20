import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import {
  Collapse,
  CSSObject,
  Divider,
  Drawer,
  Icon,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  SvgIcon,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";
//import { AuthContext } from "../../context/AuthContectProvider";

import Menu from "@material-ui/icons/Menu";
import SideBar from "../../components/TopNavBar/TopNavBar";
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
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import QuizIcon from "@mui/icons-material/Quiz";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import InterviewerQuizTable from "../../components/InterviewerQuizList/InterviewerQuizTable";
import NavBarInterviewer from "../../components/NavBar/NavBarInterviewer";

// const drawerWidth = 240;

// const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
//   open?: boolean;
// }>(({ theme, open }) => ({
//   flexGrow: 1,
//   padding: theme.spacing(3),
//   transition: theme.transitions.create('margin', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   marginLeft: `-${drawerWidth}px`,
//   ...(open && {
//     transition: theme.transitions.create('margin', {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//     marginLeft: 0,
//   }),
// }));
// // const openedMixin = (theme: Theme): CSSObject => ({
// //   width: drawerWidth,
// //   transition: theme.transitions.create("width", {
// //     easing: theme.transitions.easing.sharp,
// //     duration: theme.transitions.duration.enteringScreen,
// //   }),
// //   overflowX: "hidden",
// // });

// // const closedMixin = (theme: Theme): CSSObject => ({
// //   transition: theme.transitions.create("width", {
// //     easing: theme.transitions.easing.sharp,
// //     duration: theme.transitions.duration.leavingScreen,
// //   }),
// //   overflowX: "hidden",
// //   width: `calc(${theme.spacing(7)} + 1px)`,
// //   [theme.breakpoints.up("sm")]: {
// //     width: `calc(${theme.spacing(8)} + 1px)`,
// //   },
// // });

// const DrawerHeader = styled("div")(({ theme }) => ({
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "flex-end",
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
// }));

// interface AppBarProps extends MuiAppBarProps {
//   open?: boolean;
// }

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== "open",
// })<AppBarProps>(({ theme, open }) => ({
//   zIndex: theme.zIndex.drawer + 1,
//   transition: theme.transitions.create(["width", "margin"], {
//     easing: theme.transitions.easing.easeOut,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     marginLeft: drawerWidth,
//     width: `calc(100% - ${drawerWidth}px)`,
//     transition: theme.transitions.create(["width", "margin"], {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

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
  // { title: "Back", path: "/assignments", icon: <HomeIcon /> },
  //{ title: "C#", path: "/Subjects", icon: <UploadFileIcon /> },
  // { title: "FileUpload", path: "/", icon: <UploadFileIcon /> },
];

// const subjectlinks = [
//   { title: "React", path: "/subjects", icon: <SubjectIcon /> },
//   { title: "C#", path: "/subjects", icon: <SubjectIcon /> },
//   { title: "CosmosDb", path: "/subjects", icon: <SubjectIcon /> },
//   { title: "JavaSript", path: "/subjects", icon: <SubjectIcon /> },
//   // { title: "FileUpload", path: "/", icon: <UploadFileIcon /> },
// ];

const Interviewer = () => {
  

  return (
    <>
      <NavBarInterviewer />
      <InterviewerQuizTable />
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

export default Interviewer;