export interface QuizDetails {
  quizId: number;
  quizLink: string;
  quizLinkExpiresAt: string;
  // createdBy: string;
  // updatedBy: string;
  // createdDate: string;
  // updatedDate: string;
}

export interface questionAnswer {
  questionId: number;
  questionType: string;
  questionAnswers: string[];
  questionAnswerIds: string[];
}

export interface questionAnswerData {
  subjectName: string;
  setNumber: number;
  quizAnswers: questionAnswer[];
}

export interface quizSubmitRequest {
  quizId: number;
  data: questionAnswerData[];
}

//export default QuizDetails;
export interface createQuizRequest {
  setNumber: number;
  subjectName: string;
  totalQuestionsCount: number;
}

export interface createQuizResponse {
  quizId: number;
  quizLink: string;
  quizLinkExpiresAt: string;
}

export interface subjectWiseQuizListResponse {
  subjectName: string;
  setNumber: number;
  totalQuestionsCount: number;
  createdBy?: string;
  updatedBy?: string;
  createdDate?: string;
  updatedDate?: string;
}

export interface subjectwiseQuizAnswersResponse {
  questionId: number;
  setNumber: number;
  subjectName: string;
  question: string;
  questionType: string;
  questionOptions: string[];
  questionAnswers: string[];
  questionAnswersIds: string[];
}

export interface submittedQuizAnswersResponse {
  questionId: number;
  setNumber: number;
  subjectName: string;
  question: string;
  questionType: string;
  questionOptions: string[];
  submittedAnswers: string[];
  submittedAnswersIds: string[];
  masterQuestionAnswers: string[];
  masterQuestionAnswersIds: string[];
  isCorrect: boolean;
}
export interface submittedQuizResponse {
  questionId: number;
  candidateId: string;
  totalQuestions: number;
  answeredQuestions: number;
  notAnsweredQuestions: number;
  correctAnswers: number;
  inCorrectAnswers: number;
  interviewLevel: number;
  createdBy: string;
  createdDate: string;
}
export interface submittedQuizDetailedInfoResponse {
  questionId: number;
  subjectName: string;
  setNumber: number;
  totalQuestions: number;
  answeredQuestions: number;
  notAnsweredQuestions: number;
  correctAnswers: number;
  inCorrectAnswers: number;
}

export interface createQuizTableColumns {
  id: "setNumber" | "subjectName" | "totalQuestionsCount" | "select";
  label: string;
  minWidth?: number;
  align?: string;
}

export type Order = "asc" | "desc";

export interface createdQuizTableColumns {
  id:
    | "quizId"
    | "candidateId"
    | "quizCodeExpirationAt"
    | "quizSubmittedAt"
    | "lastLoggedIn"
    | "loginAttempts"
    | "url";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}
