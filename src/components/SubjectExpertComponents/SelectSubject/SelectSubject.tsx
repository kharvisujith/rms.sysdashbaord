import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { selectSubjectProps } from "../../../Interface/SubjectExpert/SelectSubject";
import { useAppDispatch, useAppSelector } from "../../../Store/ConfigureStrore";
import {
  fetchSubjectwiseQuestionSets,
  handleSubject,
} from "../../../Redux/subjectexpertSlice";
import { useEffect } from "react";

const SelectSubject = () => {
  //const { subject, setSubject } = props;
  const dispatch = useAppDispatch();
  const { subject } = useAppSelector((state: any) => state.subjectExpert);
  const handleSubjectChange = (event: SelectChangeEvent) => {
    dispatch({
      type: "subjectExpert/handleSubject",
      payload: { value: event.target.value },
    });
    //setSubject(event.target.value);
  };

  const subjectwiseQuizDetails = async () => {
    try {
      console.log("inside select subject Becase subject chnageddd");
      await dispatch(fetchSubjectwiseQuestionSets());
    } catch (error: any) {
      console.log("Error in fetching quiz data", error);
    }
    // setLoader(true);
    // getSubjectwiseQuiz(subject === "ALL" ? "" : subject)
    //   .then((response: any) => {
    //     // setLoader(false);
    //     if (response.status === 204) {
    //       setIsQuizSetExists(false);
    //     } else {
    //       setSubjectWiseQuestionSets(response.data);
    //       setIsQuizSetExists(true);
    //     }
    //   })
    //   .catch((error: any) => {
    //     console.log("error in subjwiseapi");
    //     //     setLoader(false);
    //   });
  };

  useEffect(() => {
    subjectwiseQuizDetails();
  }, [subject]);
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
