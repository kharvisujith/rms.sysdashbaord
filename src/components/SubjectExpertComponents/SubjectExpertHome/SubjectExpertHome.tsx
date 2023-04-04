import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { getSubjectwiseQuiz } from "../../../api/apiAgent";
import { subjectWiseQuizListResponse } from "../../../Interface/Interviewer/InterviewerInterface";

import "./SubjectExpertHome.style.scss";
import SelectSubject from "../SelectSubject/SelectSubject";
import SearchInput from "../SearchInput/SearchInput";
import QuestionsModifyTable from "../QuestionsModifyTable/QuestionsModifyTable";

const SubjectExpertHome = () => {
  // const [subject, setSubject] = useState<string>("ALL");
  // const [subjectWiseQuestionSets, setSubjectWiseQuestionSets] = useState<
  //   subjectWiseQuizListResponse[]
  // >([]);
  //const [isQuizSetExists, setIsQuizSetExists] = useState<boolean>(true);
  // const [searchText, setSearchText] = useState<string>("");

  // const subjectwiseQuizDetails = async () => {
  // setLoader(true);
  //  getSubjectwiseQuiz(subject === "ALL" ? "" : subject)
  //     .then((response: any) => {
  //       // setLoader(false);
  //       if (response.status === 204) {
  //         setIsQuizSetExists(false);
  //       } else {
  //         setSubjectWiseQuestionSets(response.data);
  //         setIsQuizSetExists(true);
  //       }
  //     })
  //     .catch((error: any) => {
  //       console.log("error in subjwiseapi");
  //       //     setLoader(false);
  //     });
  // };

  // useEffect(() => {
  //   subjectwiseQuizDetails();
  // }, [subject]);
  return (
    <>
      <Box className="container">
        <Box className="options-box">
          <Box className="buttons-container">
            {/* <Button
              variant="outlined"
              className="button-option"
              onClick={handleNewClick}
            >
              New
            </Button> */}
            <Button variant="outlined" className="button-option">
              View My Question Sets
            </Button>
          </Box>

          <SearchInput from={"home"} />
          <SelectSubject
          // subject={subject} setSubject={setSubject}
          />
        </Box>

        <Box>
          <QuestionsModifyTable
          //  QuestionsModifyTableData={subjectWiseQuestionSets}
          //  subjectwiseQuizDetails={subjectwiseQuizDetails}
          //  subject={subject}
          //  isQuizSetExists={isQuizSetExists}
          // searchText={searchText}
          />
        </Box>
      </Box>
    </>
  );
};

export default SubjectExpertHome;
