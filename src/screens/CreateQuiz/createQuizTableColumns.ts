import { createQuizTableColumns } from "../../Interface/QuizDetails";

const creatQuizTableColumns: createQuizTableColumns[] = [
  { id: "setNumber", label: "Set Number", minWidth: 70 },
  { id: "subjectName", label: "Subject Name", minWidth: 70 },
  { id: "totalQuestionsCount", label: "Total Questions", minWidth: 70 },
  { id: "select", label: "Select", minWidth: 70 },
];

export default creatQuizTableColumns;
