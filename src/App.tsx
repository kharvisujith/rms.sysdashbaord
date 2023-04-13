import { useEffect, useState } from "react";
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

  // const [role, setRole] =
  //   useState<"Interviewer" | "Subject Expert" | null>("Interviewer");

  useEffect(() => {}, []);
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
              element={
                <InterviewerHomeScreen
                // role={role} setRole={setRole}
                />
              }
            />
            <Route
              path="/createquiz"
              element={
                <CreateQuizScreen
                // role={role} setRole={setRole}
                />
              }
            />
            <Route
              path="/submitted-quiz"
              element={
                <SubmittedQuizScreen
                //   role={role} setRole={setRole}
                />
              }
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
              element={
                <SubjectExpert
                //  role={role} setRole={setRole}
                />
              }
            />
            <Route
              path="/subjectexpert/new"
              element={
                <SubjectExpertUpload
                // role={role} setRole={setRole}
                />
              }
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
