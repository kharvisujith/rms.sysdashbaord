//for interviewer
export interface selectedQuestionsCreateQuizWithTag {
  subjectName: string;
  version: string;
  tag: string;
  questionIds: number[];
}
export interface selectedQuestionsCreateQuiz {
  subjectName: string;
  version: string;
  questionIds: number[];
}

export interface createQuizRequestBody {
  quizTopic: string;
  totalQuestions: number;
  quizTimeInMinutes: number;
  quizLinkExpireInHours: number;
  quizSetWiseInfo: selectedQuestionsCreateQuiz[];
}

export interface createQuizResponse {
  quizId: number;
  quizLink: string;
  quizLinkExpiresAt: string;
}

//for both used
export interface subjectWiseQuizListResponse {
  subjectName: string;
  version: string;
  totalQuestionsCount: number;
  createdBy?: string;
  updatedBy?: string;
  createdDate?: string;
  updatedDate?: string;
  tag?: string;
}

export interface subjectwiseQuizAnswersResponse {
  questionId: number;
  version: string;
  subjectName: string;
  question: string;
  questionType: string;
  questionOptions: string[];
  questionAnswers: string[];
  questionAnswersIds: string[];
}

export interface pastEvaluationsTableDataResponse {
  questionId: number;
  version: string;
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
export interface submittedQuizIndividualSummaryResponse {
  questionId: number;
  subjectName: string;
  version: string;
  totalQuestions: number;
  answeredQuestions: number;
  notAnsweredQuestions: number;
  correctAnswers: number;
  inCorrectAnswers: number;
}

export interface createQuizTableColumns {
  id: "version" | "subjectName" | "totalQuestionsCount" | "select";
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

// pastEvaluationsTableData: [],
// pastEvaluationIndividualSummaryData: [],
// pastEvaluationIndividualAnswersData: [],
// subjectwiseQuestionSets: [],
// createQuizSetWiseInfoBody: [],
// searchText: "",
// selectQuestions: [],
// isReviewModalOpen: false,
// isSelectQuestionModalOpen: false,
// previewModalStates: {
//   isPreviewModalOpen: false,
//   previewQuestions: [],
//   quizLink: "",
// },
// loadingStatus: {
//   tableLoader: false,
//   moadlLoader: false,
//   cardLoader: false,
//   buttonLoader: false,
// },

export interface interviewerSliceStates {
  pastEvaluationsTableData: pastEvaluationsTableDataResponse[];
  pastEvaluationIndividualSummaryData: submittedQuizIndividualSummaryResponse[];
  pastEvaluationIndividualAnswersData: any[];
  subjectwiseQuestionSets: subjectwiseQuizAnswersResponse[];
  createQuizSetWiseInfoBody: selectedQuestionsCreateQuizWithTag[];
  searchText: string;
  selectQuestions: subjectwiseQuizAnswersResponse[];
  isReviewModalOpen: boolean;
  isSelectQuestionModalOpen: boolean;
  previewModalStates: {
    isPreviewModalOpen: boolean;
    previewQuestions: subjectwiseQuizAnswersResponse[];
    quizLink: string;
  };
  loadingStatus: {
    tableLoader: boolean;
    moadlLoader: boolean;
    cardLoader: boolean;
    buttonLoader: boolean;
  };
  role: any;
}
