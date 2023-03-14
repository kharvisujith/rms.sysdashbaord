import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { getSubjectwiseQuiz } from "../../../api/apiAgent";
import { subjectWiseQuizListResponse } from "../../../Interface/QuizDetails";
import { questionSets } from "../../../Interface/SubjectExpert/SubjectExpert";
import DownloadAndUpload from "../DownloadAndUpload/DownloadAndUpload";
import QuestionSetsTable from "../QuestionSetsTable/QuestionSetsTable";
import SearchInput from "../SearchInput/SearchInput";
import SelectSubject from "../SelectSubject/SelectSubject";

const SubjectExpertNewUpload = () => {
  const [subject, setSubject] = useState<string>("ALL");
  const [searchText, setSearchText] = useState<string>("");

  const [subjectWiseQuestionSets, setSubjectWiseQuestionSets] = useState<
    questionSets[]
  >([]);
  const [isQuizSetExists, setIsQuizSetExists] = useState<boolean>(true);

  const subjectwiseQuizDetails = async (subject: string) => {
    console.log("subject wise quiz iss calllledddd");
    // setLoader(true);
    getSubjectwiseQuiz(subject === "ALL" ? "" : subject)
      .then((response: any) => {
        console.log("get then succes part where loader set is false");
        // setLoader(false);
        if (response.status === 204) {
          setIsQuizSetExists(false);
        } else {
          setSubjectWiseQuestionSets(response.data);
          setIsQuizSetExists(true);
        }
      })
      .catch((error: any) => {
        console.log("error in subjwiseapi");
        //     setLoader(false);
      });
  };

  useEffect(() => {
    subjectwiseQuizDetails(subject);
  }, [subject]);

  return (
    <>
      <Box className="container">
        <Box className="options-box">
          <DownloadAndUpload
            subject={subject}
            setSubject={setSubject}
            subjectwiseQuizDetails={subjectwiseQuizDetails}
          />
          <SearchInput setSearchText={setSearchText} text={"search"} />
          <SelectSubject subject={subject} setSubject={setSubject} />
        </Box>

        <QuestionSetsTable
          subjectWiseQuestionSets={subjectWiseQuestionSets}
          // setSubjectWiseQuestionSets={setSubjectWiseQuestionSets}
          isQuizSetExists={isQuizSetExists}
          searchText={searchText}
        />
      </Box>
    </>
  );
};
export default SubjectExpertNewUpload;