import SubjectList from "../../components/SubjectExpertComponents/SubjectList";
import NavBar from "../../components/NavBar/NavBar";
import "./SubjectExpert.style.scss";
const SubjectOptions = (props: any) => {
  return (
    <>
      <NavBar />
      <SubjectList />
    </>
  );
};

export default SubjectOptions;
