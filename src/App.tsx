import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import StartQuiz from "./screens/StartQuiz/StartQuiz";
import Interviewer from "./screens/Interviewer/Interviewer";
import PageNotFound from "./screens/PageNotFound/PageNotFound";
import TestCompleted from "./screens/TestCompleted/TestCompleted";
import SubjectOptions from "./screens/subjectExpert/SubjectExpert";
import CandidateInfo from "./screens/Candidate/CandidateInfo";
import CreateQuiz from "./screens/CreateQuiz/CreateQuiz";
import SubmittedQuiz from "./screens/SubmittedQuiz/SubmittedQuiz";
import SubjectExpert from "./screens/subjectExpert/SubjectExpert";
import SubjectExpertUpload from "./screens/subjectExpert/SubjectExpertUpload";
import SubjectList from "./components/SubjectExpertComponents/SubjectList";

const App = () => {
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
            <Route path="/rms-aug/test/:id/:key" element={<CandidateInfo />} />
            <Route path="/rms-aug/test/start" element={<StartQuiz />} />
            <Route path="/test_submitted" element={<TestCompleted />} />
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
            <Route path="/rms-aug/test/:id/:key" element={<CandidateInfo />} />
            <Route path="/rms-aug/test/start" element={<StartQuiz />} />
            <Route path="/test_submitted" element={<TestCompleted />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/rms-aug/test/:id/:key" element={<CandidateInfo />} />
          <Route path="/rms-aug/test/start" element={<StartQuiz />} />
          <Route path="/test_submitted" element={<TestCompleted />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      )}
    </>
  );
};
export default App;
