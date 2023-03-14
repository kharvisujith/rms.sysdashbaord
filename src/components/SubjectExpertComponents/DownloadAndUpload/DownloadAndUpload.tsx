import { Box, Button, OutlinedInput, InputAdornment } from "@mui/material";
import { useState } from "react";
import Swal from "sweetalert2";
import { downnLoadExcel, upLoadExcel } from "../../../api/apiAgent";
import SearchIcon from "@mui/icons-material/Search";
import UploadDialog from "./UploadDialog";

const DownloadAndUpload = (props: any) => {
  const { subject, subjectwiseQuizDetails } = props;
  const [openFileUpload, setOpenFileUpload] = useState(false);

  const handleUploadFileOpen = () => {
    setOpenFileUpload(true);
  };

  const downloadFile = () => {
    downnLoadExcel()
      .then((response: any) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "template-quiz.xlsx");
        document.body.appendChild(link);
        link.click();
      })
      .then((res: any) => {
        Swal.fire({
          title: "Success",
          text: "Template downloaded succesfully",
          icon: "success",
          confirmButtonText: "Okay",
          customClass: "swal-alert",
        });
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: "Failed",
          text: "Failed to Download the template",
          icon: "error",
          confirmButtonText: "Okay",
          customClass: "swal-alert",
        });
      });
  };

  return (
    <>
      <Box className="question-upload-buttons">
        <Button
          variant="outlined"
          className="button-option"
          onClick={downloadFile}
        >
          Download Template
        </Button>
        <Button
          variant="outlined"
          className="button-option"
          onClick={handleUploadFileOpen}
        >
          Upload Question Set
        </Button>
      </Box>
      <Box>
        <UploadDialog
          openFileUpload={openFileUpload}
          setOpenFileUpload={setOpenFileUpload}
          subject={subject}
          subjectwiseQuizDetails={subjectwiseQuizDetails}
        />
      </Box>
    </>
  );
};
export default DownloadAndUpload;
