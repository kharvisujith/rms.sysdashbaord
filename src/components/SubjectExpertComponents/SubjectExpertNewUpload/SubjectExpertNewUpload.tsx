import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { getSubjectwiseQuiz } from "../../../api/apiAgent";
import { subjectWiseQuizListResponse } from "../../../Interface/Interviewer/InterviewerInterface";
import { questionSets } from "../../../Interface/SubjectExpert/SubjectExpert";
import DownloadAndUpload from "../DownloadAndUpload/DownloadAndUpload";
import QuestionSetsTable from "../QuestionSetsTable/QuestionSetsTable";
import SearchInput from "../SearchInput/SearchInput";
import SelectSubject from "../SelectSubject/SelectSubject";

const SubjectExpertNewUpload = () => {
  const [subject, setSubject] = useState<string>("ALL");
  //const [searchText, setSearchText] = useState<string>("");

  const [subjectWiseQuestionSets, setSubjectWiseQuestionSets] = useState<
    questionSets[]
  >([]);
  const [isQuizSetExists, setIsQuizSetExists] = useState<boolean>(true);

  const subjectwiseQuizDetails = async (subject: string) => {};

  return (
    <>
      <Box className="container">
        <Box className="options-box">
          <DownloadAndUpload
            subject={subject}
            setSubject={setSubject}
            subjectwiseQuizDetails={subjectwiseQuizDetails}
          />
          <SearchInput from="newUpload" />
          <SelectSubject />
        </Box>

        <QuestionSetsTable
        // subjectWiseQuestionSets={subjectWiseQuestionSets}
        // isQuizSetExists={isQuizSetExists}
        />
      </Box>
    </>
  );
};
export default SubjectExpertNewUpload;
