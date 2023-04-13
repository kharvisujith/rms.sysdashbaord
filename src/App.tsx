import { useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import PageNotFound from "./screens/PageNotFound/PageNotFound";
import SubjectExpert from "./screens/subjectExpert/SubjectExpert";
import SubjectExpertUpload from "./screens/subjectExpert/SubjectExpertUpload";
import { history } from "./utils/helper/_helper";
import CandidatInfoScreen from "./screens/Candidate/CandidateInfoScreen";
import StartQuizScreen from "./screens/Candidate/StartQuizScreen";
import TestCompletedScreen from "./screens/Candidate/TestCompletedScreen";
import InterviewerHomeScreen from "./screens/Interviewer/InterviewerHomeScreen";
import CreateQuizScreen from "./screens/Interviewer/CreateQuizScreen";
import SubmittedQuizScreen from "./screens/Interviewer/SubmittedQuizScreen";
import { useAppSelector } from "./Store/ConfigureStrore";

const App = () => {
  const { role } = useAppSelector((state: any) => state.interviewer);
  history.navigate = useNavigate();
  history.location = useLocation();

  useEffect(() => {}, []);
  return (
    <>
      {role === "Interviewer" ? (
        <>
          <Routes>
            <Route path="/" element={<InterviewerHomeScreen />} />
            <Route path="/createquiz" element={<CreateQuizScreen />} />
            <Route path="/submitted-quiz" element={<SubmittedQuizScreen />} />
            <Route path="*" element={<PageNotFound />} />
            <Route
              path="/rms-aug/test/:id/:key"
              element={<CandidatInfoScreen />}
            />
            <Route path="/rms-aug/test/start" element={<StartQuizScreen />} />
            <Route path="/test_submitted" element={<TestCompletedScreen />} />
          </Routes>
        </>
      ) : role === "Subject Expert" ? (
        <>
          <Routes>
            <Route path="/" element={<SubjectExpert />} />
            <Route
              path="/subjectexpert/new"
              element={<SubjectExpertUpload />}
            />
            <Route path="*" element={<PageNotFound />} />
            <Route
              path="/rms-aug/test/:id/:key"
              element={<CandidatInfoScreen />}
            />
            <Route path="/rms-aug/test/start" element={<StartQuizScreen />} />
            <Route path="/test_submitted" element={<TestCompletedScreen />} />
          </Routes>
        </>
      ) : (
        <>
          <Routes>
            <Route
              path="/rms-aug/test/:id/:key"
              element={<CandidatInfoScreen />}
            />
            <Route path="/rms-aug/test/start" element={<StartQuizScreen />} />
            <Route path="/test_submitted" element={<TestCompletedScreen />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </>
      )}
    </>
  );
};
export default App;
