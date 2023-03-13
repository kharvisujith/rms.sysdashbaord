import SubjectList from "../../components/SubjectExpertComponents/SubjectList";
import "./SubjectExpert.style.scss";
import TopNavBar from "../../components/TopNavBar/TopNavBar";
import SubjectExpertHome from "../../components/SubjectExpertComponents/SubjectExpertHome/SubjectExpertHome";
const SubjectExpert = (props: any) => {
  return (
    <>
      <TopNavBar role={props.role} setRole={props.setRole} />
      {/* <SubjectList /> */}
      <SubjectExpertHome />
    </>
  );
};

export default SubjectExpert;
