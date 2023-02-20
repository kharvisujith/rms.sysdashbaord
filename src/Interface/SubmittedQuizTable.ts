 export interface SubmittedQuesitonSetsTableColumns {
    id:
      | "quizId"
      | "candidateId"
      | "totalQuestions"
      | "answeredQuestions"
      | "notAnsweredQuestions"
      | "correctAnswers"
      | "inCorrectAnswers"
      | "interviewLevel"
      | "correctAnswers"
      | "createdBy"
      | "createdDate";
    label: string;
    minWidth?: number;
    align?: "right";
    format?: (value: number) => string;
  }