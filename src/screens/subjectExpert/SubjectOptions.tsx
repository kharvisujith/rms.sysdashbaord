import React, { ChangeEvent, useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
//import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { makeStyles } from '@material-ui/core/styles';
import "./SubjectExpert.style.scss";
//import { AuthContext } from "../../context/AuthContectProvider";
//import FileUploadSingle from "./FileUploadSingle";
import CloseIcon from "@mui/icons-material/Close";
import Menu from "@material-ui/icons/Menu";
//import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
//import { EXCEL_FILE_BASE64 } from "../../data/constant";
//import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
//import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
//import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
//import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
//import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
//import { Link, Button, Drawer } from "@mui/material";
//import { signout } from "../redux/accountSlice";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import PasswordIcon from "@mui/icons-material/Password";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import useMediaQuery from "@mui/material/useMediaQuery";
import FileUploadSingle from "../../components/FileUpload/FileUploadSingle";
//import "./SubjectExpert.css";
import { ThemeProvider, createTheme, styled, Theme, useTheme, CSSObject } from "@mui/material/styles";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogContent,
  Grid,
  Typography,
  SvgIcon,
  Collapse,
  Icon,
  DialogTitle,
  TextField,
  AppBar,
} from "@mui/material";
// import "./screens/quiz/common.css";
import FileSaver from "file-saver";
import HomeIcon from '@mui/icons-material/Home';
import { ExpandLess, ExpandMore, StarBorder } from "@material-ui/icons";
import SubjectIcon from '@mui/icons-material/Subject';
import ArticleIcon from '@mui/icons-material/Article';
import { downnLoadExcel, upLoadExcel } from "../../api/apiAgent";
import Swal from "sweetalert2";
import SubjectList from "../../components/SubjectExpertDataList/SubjectList";







const SubjectOptions = (props:any) => {
  const navigate = useNavigate();
 
  const [file, setFile] = useState<File>();
  const [data, setData] = useState<any>({
    set: "",
    subject: "",
  });
  const [formError, setFormError] = useState<any>({
    set: false,
    subject: false,
    file: false,
  });
  const [openList, setOpenList] = useState(false);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  // const handleDrawerOpen = () => {
  //   setReOpen(true);
  // };

  // const handleDrawerClose = () => {
  //   setReOpen(false);
  // };

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
  }));
  const classes = useStyles();
  const downloadFile = () => {
    downnLoadExcel()
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "excel-file.xlsx"); // set the downloaded file name
        document.body.appendChild(link);
        link.click();
      })
      .then((res) => {
        console.log("downloaded sucessfully");
        Swal.fire({
          title: "Success",
          text: "Template downloaded succesfully",
          icon: "success",
          confirmButtonText: "Okay",
        });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: "Failed",
          text: "Failed to Download the template",
          icon: "error",
          confirmButtonText: "Okay",
        });
      });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormError({ ...formError, [e?.target.name]: false });
      console.log(e.target.files[0]);
      setFile(e.target.files[0]);
    }
  };
  const handleUploadClick = () => {
    if (file && data.set && data.subject) {
      console.log("starting upload");
      const formData = new FormData();
      formData.append("formFile", file);

      upLoadExcel(data.set, data.subject, formData)
        .then((res) => res.data)
        .then((res) => {
          console.log("uploaded succesfully");
          setOpen(false);
          Swal.fire({
            title: "Success",
            text: "Question Set Uploaded Succesfully",
            icon: "success",
            confirmButtonText: "Okay",
          });
        })
        .catch((error: any) => {
          console.log(error);
          Swal.fire({
            title: "Failed",
            text: "Failed to Upload Question Set",
            icon: "error",
            confirmButtonText: "Okay",
          });
        });
    } else if (!data.set) {
      console.log("inside !data.set");
      setFormError({ ...formError, set: true });
    } else if (!data.subject) {
      setFormError({ ...formError, subject: true });
    } else if (!file) {
      setFormError({ ...formError, file: true });
    }
  };

  const handleTextChange = (e: any) => {
    console.log(e.target.value);
    console.log(typeof e.target.value);
    if (e.target.name === "set") {
      const value = parseInt(e.target.value);
      console.log(typeof value);
    }
    setFormError({ ...formError, [e?.target.name]: false });
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };


  return (
    <>
    <Box className="main-layout-wrap">
    <AppBar position="static">
      <Toolbar>
        
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            {/* <Menu>
              <MenuItem>Profile</MenuItem>
              <MenuItem>My account</MenuItem>
              <MenuItem>Logout</MenuItem>
            </Menu> */}
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
    <Box sx={{ "& button": { m: 2 } }}>
        <Button variant="contained" onClick={downloadFile}>
          Download Template
        </Button>
        <Button variant="contained" onClick={handleOpen}>
          Upload Quiz Question Set
        </Button>
      </Box>
      <Box>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Upload Questions Set</DialogTitle>
          <DialogContent className="Dialog-Container">
            <TextField
              name="set"
              label="Set Number"
              variant="standard"
              type="number"
              className="items"
              onChange={handleTextChange}
            />
            {formError.set && (
              <Typography className="error">Please Enter Set Number</Typography>
            )}

            <TextField
              name="subject"
              label="Subject Name"
              variant="standard"
              type="text"
              className="items"
              onChange={handleTextChange}
            />
            {formError.subject && (
              <Typography className="error">
                Please Enter Subject Name
              </Typography>
            )}
            <TextField
              name="file"
              variant="standard"
              type="file"
              id="file"
              className="file"
              onChange={handleFileChange}
            />
            {formError.file && (
              <Typography className="error">
                Please Choose excel file
              </Typography>
            )}
            <Box>
              <Button
                className="button"
                variant="contained"
                onClick={handleUploadClick}
              >
                Submit
              </Button>
              <Button
                className="button"
                variant="contained"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            </Box>
            </DialogContent>
        </Dialog>
      </Box>
      

    </Box>
    
    </>
  );





};

export default SubjectOptions;