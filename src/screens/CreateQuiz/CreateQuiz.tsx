import MakeQuiz from "../../components/CreateQuiz/MakeQuiz/MakeQuiz";
import TopNavBar from "../../components/TopNavBar/TopNavBar";

const CreateQuiz = (props: any) => {
  return (
    <>
      <TopNavBar role={props.role} setRole={props.setRole} />
      <MakeQuiz />
    </>
  );
};
export default CreateQuiz;
