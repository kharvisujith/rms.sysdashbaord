import { NavLink, useNavigate } from "react-router-dom";
//import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@mui/icons-material/Close";
import Menu from "@material-ui/icons/Menu";
import Divider from "@mui/material/Divider";
//import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
//import "./SubjectExpert.style.scss";
import {
  Alert,
  AlertTitle,
  Card,
  CardContent,
  Collapse,
  CSSObject,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Icon,
  List,
  MenuItem,
  styled,
  SvgIcon,
  TextField,
  Theme,
  Typography,
  useTheme,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import {
  axiosClient,
  downnLoadExcel,
  getSubjectwiseQuiz,
  upLoadExcel,
} from "../../api/apiAgent";
import { ChangeEvent, useEffect, useState } from "react";
import Swal from "sweetalert2";
import SubjectList from "../../components/SubjectExpertDataList/SubjectList";
import HomeIcon from "@mui/icons-material/Home";
import { ExpandLess, ExpandMore, StarBorder } from "@material-ui/icons";
import SubjectIcon from "@mui/icons-material/Subject";
import ArticleIcon from "@mui/icons-material/Article";
import NavBar from "../../components/NavBar/NavBar";

const links = [
  { title: "HomePage", path: "/", icon: <HomeIcon /> },
  //{ title: "C#", path: "/Subjects", icon: <UploadFileIcon /> },
  // { title: "FileUpload", path: "/", icon: <UploadFileIcon /> },
];

const subjectlinks = [
  { title: "React", path: "/subjects", icon: <SubjectIcon /> },
  { title: "C#", path: "/subjects", icon: <SubjectIcon /> },
  { title: "CosmosDb", path: "/subjects", icon: <SubjectIcon /> },
  { title: "JavaSript", path: "/subjects", icon: <SubjectIcon /> },
  // { title: "FileUpload", path: "/", icon: <UploadFileIcon /> },
];

const SubjectExpert = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  //const [reopen, setReOpen] = useState(false);
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

  return (
    <>
      <NavBar />

      <SubjectList />
    </>
  );
};

export default SubjectExpert;
