import SubmitedQuizes from "../../components/InterviewerComponents/SubmittedQuiz/SubmittedQuizes";
import TopNavBar from "../../components/TopNavBar/TopNavBar";

const SubmittedQuizScreen = (props: any) => {
  return (
    <>
      <TopNavBar
      //role={props.role} setRole={props.setRole}
      />
      <SubmitedQuizes />
    </>
  );
};
export default SubmittedQuizScreen;
