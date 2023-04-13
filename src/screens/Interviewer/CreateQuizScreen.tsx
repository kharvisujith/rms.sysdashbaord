import MakeQuiz from "../../components/InterviewerComponents/CreateQuiz/MakeQuiz/MakeQuiz";
import TopNavBar from "../../components/TopNavBar/TopNavBar";

const CreateQuizScreen = (props: any) => {
  return (
    <>
      <>
        <TopNavBar
        //  role={props.role} setRole={props.setRole}
        />
        <MakeQuiz />
      </>
    </>
  );
};
export default CreateQuizScreen;
