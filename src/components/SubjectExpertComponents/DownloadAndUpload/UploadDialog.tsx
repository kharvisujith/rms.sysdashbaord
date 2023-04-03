import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  CircularProgress,
  Button,
} from "@mui/material";
import { ChangeEvent, useState } from "react";
import Swal from "sweetalert2";
import { upLoadExcel } from "../../../api/apiAgent";
import "./DownloadAndUpload.style.scss";

const UploadDialog = (props: any) => {
  const { openFileUpload, setOpenFileUpload, subject, subjectwiseQuizDetails } =
    props;

  const [formError, setFormError] = useState<any>({
    version: false,
    subject: false,
    tags: false,
    file: false,
  });
  const [uploadData, setUploadData] = useState<any>({
    version: "",
    subject: "",
    tags: "",
  });
  const [file, setFile] = useState<File>();
  const [loader, setLoader] = useState<Boolean>(false);
  const handleUploadClick = () => {
    if (uploadData.version && uploadData.subject && uploadData.tags && file) {
      setLoader(true);
      const formData = new FormData();
      formData.append("formFile", file);

      upLoadExcel(
        uploadData.version,
        uploadData.subject,
        uploadData.tags,
        formData
      )
        .then((res) => res.data)
        .then((res) => {
          setLoader(false);
          setOpenFileUpload(false);
          subjectwiseQuizDetails(subject);
          setUploadData({ version: "", subject: "", tags: "" });
          Swal.fire({
            title: "Success",
            text: "Question Set Uploaded Succesfully",
            icon: "success",
            confirmButtonText: "Okay",
            customClass: "swal-alert",
          });
        })
        .catch((error: any) => {
          setLoader(false);
          Swal.fire({
            title: "Failed",
            text: "Failed to Upload Question Set",
            icon: "error",
            confirmButtonText: "Okay",
            customClass: "swal-alert",
          });
        });
    } else if (!uploadData.version) {
      setFormError({ ...formError, version: true });
    } else if (!uploadData.subject) {
      setFormError({ ...formError, subject: true });
    } else if (!uploadData.tags) {
      setFormError({ ...formError, tags: true });
    } else if (!file) {
      setFormError({ ...formError, file: true });
    }
  };

  const handleTextChange = (e: any) => {
    setFormError({ ...formError, [e?.target.name]: false });

    const name = e.target.name;
    const value = e.target.value;
    if (subject === "ALL") {
      setUploadData((prev: any) => ({ ...prev, [name]: value }));
    } else {
      setUploadData({ [name]: value, subject: subject });
    }
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormError({ ...formError, [e?.target.name]: false });
      setFile(e.target.files[0]);
    }
  };
  return (
    <>
      <Dialog open={openFileUpload} onClose={() => setOpenFileUpload(false)}>
        <DialogTitle>Upload Questions Set</DialogTitle>
        <DialogContent className="Dialog-Container">
          <TextField
            name="version"
            label="Version Number"
            variant="standard"
            type="text"
            className="items"
            onChange={handleTextChange}
          />
          {formError.version && (
            <Typography className="error">
              Please Enter Version Number
            </Typography>
          )}

          <FormControl variant="standard" className="items">
            <InputLabel id="demo-simple-select-standard-label">
              Subject
            </InputLabel>
            <Select
              name="subject"
              label="Subject Name"
              value={subject === "ALL" ? uploadData.subject : subject}
              onChange={handleTextChange}
              disabled={subject === "ALL" ? false : true}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"REACT"}>REACT</MenuItem>
              <MenuItem value={"JAVASCRIPT"}>JAVASCRIPT</MenuItem>
              <MenuItem value={"CSHARP"}>C#</MenuItem>
            </Select>
          </FormControl>
          {formError.subject && (
            <Typography className="error">Please Enter Subject Name</Typography>
          )}
          <TextField
            name="tags"
            label="Tags"
            variant="standard"
            type="text"
            className="items"
            onChange={handleTextChange}
          />
          {formError.tags && (
            <Typography className="error">Please Enter Tags</Typography>
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
            <Typography className="error">Please Choose excel file</Typography>
          )}
          <Box className="buttons-box">
            {loader ? (
              <Box className="button-loader">
                <CircularProgress />
              </Box>
            ) : (
              <>
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
                  onClick={() => setOpenFileUpload(false)}
                >
                  Cancel
                </Button>
              </>
            )}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default UploadDialog;
