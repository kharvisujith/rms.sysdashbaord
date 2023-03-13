import { Box, Button, OutlinedInput, InputAdornment } from "@mui/material";
import { useState } from "react";
import Swal from "sweetalert2";
import { downnLoadExcel, upLoadExcel } from "../../../api/apiAgent";
import SearchIcon from "@mui/icons-material/Search";
import UploadDialog from "./UploadDialog";

const DownloadAndUpload = (props: any) => {
  const { subject, subjectwiseQuizDetails } = props;
  const [openFileUpload, setOpenFileUpload] = useState(false);

  const [name, setName] = useState<string>("");

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

  return (
    <>
      <Box
        // className="question-upload-buttons"
        sx={{ display: "flex" }}
      >
        <Button
          variant="contained"
          // className="button"
          onClick={downloadFile}
        >
          Download Template
        </Button>
        <Button
          variant="contained"
          //  className="button"
          onClick={handleUploadFileOpen}
        >
          Upload Question Set
        </Button>

        {/* <Box
        // className="search-box"
        >
          <OutlinedInput
            //  className="search-input"
            id="outlined-adornment-weight"
            value={name}
            onChange={(e: any) => setName(e.target.value)}
            placeholder="Search"
            endAdornment={
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            }
            aria-describedby="outlined-weight-helper-text"
          />
        </Box> */}
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
