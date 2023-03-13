import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";

const SelectSubject = (props: any) => {
  const { subject, setSubject } = props;
  // const [subject, setSubject] = useState<string>("ALL");
  const handleSubjectChange = (event: SelectChangeEvent) => {
    console.log("handle subject changee is calledddd");
    setSubject(event.target.value);
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
            value={subject}
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
