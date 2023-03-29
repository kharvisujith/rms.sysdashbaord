import { useEffect, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Interviewer from "./screens/Interviewer/Interviewer";
import PageNotFound from "./screens/PageNotFound/PageNotFound";
import CreateQuiz from "./screens/CreateQuiz/CreateQuiz";
import SubmittedQuiz from "./screens/SubmittedQuiz/SubmittedQuiz";
import SubjectExpert from "./screens/subjectExpert/SubjectExpert";
import SubjectExpertUpload from "./screens/subjectExpert/SubjectExpertUpload";
import { history } from "./utils/helper/_helper";
import CandidatInfoScreen from "./screens/Candidate/CandidateInfoScreen";
import StartQuizScreen from "./screens/Candidate/StartQuizScreen";
import TestCompletedScreen from "./screens/Candidate/TestCompletedScreen";

const App = () => {
  history.navigate = useNavigate();
  history.location = useLocation();

  const [role, setRole] =
    useState<"Interviewer" | "Subject Expert" | null>("Interviewer");

  useEffect(() => {
    console.log("rle in useEff main is", role);
  }, []);
  return (
    <>
      {/* {role === "Interviewer" || role === "Subject Expert" ? (
        <TopNavBar role={role} setRole={setRole} />
      ) : null} */}
      {role === "Interviewer" ? (
        <>
          {/* <TopNavBar role={role} setRole={setRole} /> */}

          <Routes>
            <Route
              path="/"
              element={<Interviewer role={role} setRole={setRole} />}
            />
            <Route
              path="/createquiz"
              element={<CreateQuiz role={role} setRole={setRole} />}
            />
            <Route
              path="/submitted-quiz"
              element={<SubmittedQuiz role={role} setRole={setRole} />}
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
      ) : role === "Subject Expert" ? (
        <>
          {/* <TopNavBar role={role} setRole={setRole} /> */}
          <Routes>
            <Route
              path="/"
              element={<SubjectExpert role={role} setRole={setRole} />}
            />
            <Route
              path="/subjectexpert/new"
              element={<SubjectExpertUpload role={role} setRole={setRole} />}
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
          {/* <TopNavBarTest /> */}
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
