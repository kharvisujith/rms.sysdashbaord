import InterviewerQuizTable from "../../components/InterviewerComponents/InterviewerHome/InterviewerQuizTable";
import TopNavBar from "../../components/TopNavBar/TopNavBar";
const InterviewerHomeScreen = (props: any) => {
  return (
    <>
      <TopNavBar
      //  role={props.role} setRole={props.setRole}
      />
      <InterviewerQuizTable />
    </>
  );
};

export default InterviewerHomeScreen;
