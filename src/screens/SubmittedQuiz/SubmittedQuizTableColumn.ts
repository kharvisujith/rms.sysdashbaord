import { SubmittedQuesitonSetsTableColumns } from "../../Interface/SubmittedQuizTable";

export const columns: SubmittedQuesitonSetsTableColumns[] = [
  //{ id: 'quizId', label: 'QuizId', minWidth: 30 },
  { id: "candidateId", label: "CandidateId", minWidth: 160 },
  { id: "createdBy", label: "CreatedBy", minWidth: 160 },
  // { id: 'createdDate', label: 'CreatedDate', minWidth: 160 ,//align: 'right',
  // format: (value: number) => value.toLocaleString('en-US'),},
  { id: "interviewLevel", label: "InterviewLevel", minWidth: 5 },
  { id: "totalQuestions", label: "TotalQuestions", minWidth: 10 },
  { id: "answeredQuestions", label: "Answered", minWidth: 10 },
  { id: "notAnsweredQuestions", label: "NotAnswered", minWidth: 10 },
  { id: "inCorrectAnswers", label: "InCorrect", minWidth: 10 },
  { id: "correctAnswers", label: "Correct", minWidth: 10 },
  { id: "quizId", label: "Result", minWidth: 20 },
];
