import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import StartQuiz from "./screens/StartQuiz/StartQuiz";
import RmsHome from "./screens/Home/RmsHome";
import SubjectExpert from "./screens/subjectExpert/SubjectExpert";
import Interviewer from "./screens/Interviewer/Interviewer";
import PageNotFound from "./screens/PageNotFound/PageNotFound";
import TestCompleted from "./screens/TestCompleted/TestCompleted";

let testAllreadyCompleted = false;
const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (testAllreadyCompleted) {
      console.log("allready completed");
      navigate("/test_submitted");
    }
  }, [navigate]);

  return (
    <>
      <Routes>
        <Route path="/" element={<RmsHome />} />
        <Route path="/assignments" element={<SubjectExpert />} />
        <Route path="/reviewer" element={<Interviewer />} />
        <Route path="/quiz" element={<StartQuiz />} />
        <Route path="/test_submitted" element={<TestCompleted />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};
export default App;
