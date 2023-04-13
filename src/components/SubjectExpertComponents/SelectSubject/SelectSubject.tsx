import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../Store/ConfigureStrore";

const SelectSubject = () => {
  const dispatch = useAppDispatch();
  const { subject } = useAppSelector((state: any) => state.subjectExpert);
  const handleSubjectChange = (event: SelectChangeEvent) => {
    dispatch({
      type: "subjectExpert/handleSubject",
      payload: { value: event.target.value },
    });
  };

  return (
    <>
      <Box>
        <FormControl
          sx={{
            minWidth: 100,
          }}
        >
          <InputLabel>Subject</InputLabel>
          <Select
            value={subject === "" ? "ALL" : subject}
            onChange={handleSubjectChange}
            autoWidth
            label="Subject"
          >
            <MenuItem selected value="ALL">
              All
            </MenuItem>
            <MenuItem value={"REACT"}>REACT</MenuItem>
            <MenuItem value={"JAVASCRIPT"}>JAVASCRIPT</MenuItem>
            <MenuItem value={"CSHARP"}>C#</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </>
  );
};
export default SelectSubject;
