import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import StartQuiz from "./screens/StartQuiz/StartQuiz";
import RmsHome from "./screens/Home/RmsHome";
import Interviewer from "./screens/Interviewer/Interviewer";
import PageNotFound from "./screens/PageNotFound/PageNotFound";
import TestCompleted from "./screens/TestCompleted/TestCompleted";
import NavBar from "./screens/subjectExpert/SubjectExpert";
import SubjectOptions from "./screens/subjectExpert/SubjectExpert";
import CandidateInfo from "./screens/Candidate/CandidateInfo";
import CreateQuiz from "./screens/CreateQuiz/CreateQuiz";
// import SubmitQuiz from "./screens/SubmitQuiz/SubmitQuiz";
import SubmittedQuiz from "./screens/SubmittedQuiz/SubmittedQuiz";
import SingleQuestion from "./screens/DispalyQuizQuestions/SingleQuestion";

let testAllreadyCompleted = false;
const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<RmsHome />} />
        <Route path="/assignments" element={<SubjectOptions />} />
        <Route path="/reviewer" element={<Interviewer />} />

        <Route path="/test_submitted" element={<TestCompleted />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/subjects" element={<SubjectOptions />} />

        <Route path="/rms-aug/test/:id/:key" element={<CandidateInfo />} />
        <Route path="/rms-aug/test/start" element={<StartQuiz />} />
        {/* <Route
          path="/rms-aug/test/start/questions"
          element={<SingleQuestion />}
        /> */}
        <Route path="/createquiz" element={<CreateQuiz />} />
        <Route path="/submitted-quiz" element={<SubmittedQuiz />} />
      </Routes>
    </>
  );
};
export default App;
