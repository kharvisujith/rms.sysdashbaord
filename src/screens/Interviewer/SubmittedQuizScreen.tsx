import TopNavBar from "../../components/TopNavBar/TopNavBar";
import SubmitQuizes from "../../components/InterviewerComponents/SubmittedQuiz/SubmittedQuizes";

const SubmittedQuizScreen = (props: any) => {
  return (
    <>
      <TopNavBar role={props.role} setRole={props.setRole} />
      <SubmitQuizes />
    </>
  );
};
export default SubmittedQuizScreen;
