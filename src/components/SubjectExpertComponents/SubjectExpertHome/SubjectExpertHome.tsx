import { Box, Button } from "@mui/material";
import "./SubjectExpertHome.style.scss";
import SelectSubject from "../SelectSubject/SelectSubject";
import SearchInput from "../SearchInput/SearchInput";
import QuestionsModifyTable from "../QuestionsModifyTable/QuestionsModifyTable";

const SubjectExpertHome = () => {
  return (
    <>
      <Box className="container">
        <Box className="options-box">
          <Box className="buttons-container">
            <Button variant="outlined" className="button-option">
              View My Question Sets
            </Button>
          </Box>

          <SearchInput from={"home"} />
          <SelectSubject />
        </Box>

        <Box>
          <QuestionsModifyTable />
        </Box>
      </Box>
    </>
  );
};

export default SubjectExpertHome;
