import InterviewerQuizTable from "../../components/InterviewQuizList/InterviewerQuizTable";
import TopNavBar from "../../components/TopNavBar/TopNavBar";
const Interviewer = (props: any) => {
  return (
    <>
      <TopNavBar role={props.role} setRole={props.setRole} />
      <InterviewerQuizTable />
    </>
  );
};

export default Interviewer;
