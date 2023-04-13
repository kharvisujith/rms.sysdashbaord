export interface CandidateDetails {
  candidateName: string;
  // middleName?: string;
  // lastName: string;
  email: string;
  phone: string;
}

export interface verifyCandidateRequestBody {
  id: number;
  key: string;
}

export interface submitCandidateInfoRequestBody {
  qId: number;
  confirmcode: string;
  user: CandidateDetails;
}

export interface candidateFromError {
  candidateName: boolean;
  email: boolean;
  phone: boolean;
}

export interface quizAnswers {
  questionId: number | string;
  questionType: string;
  questionAnswers: string[];
  questionAnswerIds: string[];
}

export interface selectedAnswersBody {
  subjectName: string;
  version: string;
  quizAnswers: quizAnswers[];
}

export interface submitQuizRequestBody {
  quizId: number;
  totalQuestions: number;
  answeredQuestions: number;
  notAnsweredQuestions: number;
  data: selectedAnswersBody[];
}

export interface candiDateSliceStates {
  verifyCredentials: {
    id: string;
    key: string;
  };
  verifiedStatus: {
    candidateInfoPage: boolean;
    startQuizPage: boolean;
  };
  errorMessage: string;
  testQuestions: any[];

  isTestStarted: boolean;
  // selectedAnswers: [],

  loadingStatus: {
    buttonLoader: boolean;
    pageLoader: boolean;
  };
}
