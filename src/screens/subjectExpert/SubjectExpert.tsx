import SubjectList from "../../components/SubjectExpertComponents/SubjectList";
import "./SubjectExpert.style.scss";
import TopNavBar from "../../components/TopNavBar/TopNavBar";
const SubjectOptions = (props: any) => {
  return (
    <>
      <TopNavBar role={props.role} setRole={props.setRole} />
      <SubjectList />
    </>
  );
};

export default SubjectOptions;
