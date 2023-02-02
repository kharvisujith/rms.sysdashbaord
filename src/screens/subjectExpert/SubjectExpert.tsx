import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import FileUploadSingle from "../../components/FileUpload/FileUploadSingle";
import CloseIcon from "@mui/icons-material/Close";
import Menu from "@material-ui/icons/Menu";
import { Dialog, DialogContent, MenuItem, Typography } from "@mui/material";
import { axiosClient, downnLoadExcel } from "../../api/apiAgent";
import { useState } from "react";

const SubjectExpert = (props: any) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

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
      .catch((error) => {
        console.error(error);
      });
    // axiosClient
    //   .get("/quiz/exportTemplate", { responseType: "blob" })
    //   .then((response) => {
    //     const url = window.URL.createObjectURL(new Blob([response.data]));
    //     const link = document.createElement("a");
    //     link.href = url;
    //     link.setAttribute("download", "excel-file.xlsx"); // set the downloaded file name
    //     document.body.appendChild(link);
    //     link.click();
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };

  return (
    <Box className="main-layout-wrap">
      <AppBar position="static">
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
      <hr />
      <Box sx={{ "& button": { m: 2 } }}>
        <div>
          <Button
            variant="contained"
            onClick={handleOpen}
            className={"manage-buttons"}
          >
            File Upload
          </Button>
        </div>
        <Dialog maxWidth="sm" open={open}>
          <DialogContent>
            <AppBar className="add-appbar">
              <Toolbar>
                <IconButton
                  color="inherit"
                  onClick={handleClose}
                  aria-label="close"
                  className="add-close-dialog"
                >
                  <CloseIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
            <FileUploadSingle />
          </DialogContent>
        </Dialog>
      </Box>
      <Button variant="contained" onClick={downloadFile}>
        Download
      </Button>
    </Box>
  );
};

export default SubjectExpert;
