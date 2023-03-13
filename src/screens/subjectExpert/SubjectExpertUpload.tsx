import QuestionSetsTable from "../../components/SubjectExpertComponents/QuestionSetsTable/QuestionSetsTable";
import SubjectExpertNewUpload from "../../components/SubjectExpertComponents/SubjectExpertNewUpload/SubjectExpertNewUpload";
import SubjectList from "../../components/SubjectExpertComponents/SubjectList";
import TopNavBar from "../../components/TopNavBar/TopNavBar";

const SubjectExpertUpload = (props: any) => {
  return (
    <>
      <TopNavBar role={props.role} setRole={props.setRole} />
      <SubjectExpertNewUpload />
    </>
  );
};
export default SubjectExpertUpload;
