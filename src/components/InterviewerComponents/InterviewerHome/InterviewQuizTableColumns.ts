import { createdQuizTableColumns } from "../../../Interface/Interviewer/InterviewerInterface";

export const createdQuizColumns: createdQuizTableColumns[] = [
  { id: "quizId", label: "QuizId", minWidth: 70 },
  { id: "candidateId", label: "CandidateId", minWidth: 150 },
  {
    id: "quizCodeExpirationAt",
    label: "QuizCodeExpirationAt",
    minWidth: 150,
    //align: 'right',
    // format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: "quizSubmittedAt",
    label: "QuizSubmittedAt",
    minWidth: 150,
    //align: 'right',
    // format: (value: number) => value.toLocaleString('en-US'),
  },
  // {
  //   id: "lastLoggedIn",
  //   label: "LastLoggedIn",
  //   minWidth: 150,
  //   //align: 'center',
  //   // format: (value: number) => value.toLocaleString('en-US'),
  // },
  {
    id: "loginAttempts",
    label: "LoginAttempts",
    minWidth: 10,
    // align: 'right',
    //format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: "url",
    label: "Url",
    minWidth: 100,
    //align: 'right',
    //format: (value: number) => value.toLocaleString('en-US'),
  },
];
