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
  isCorrect:boolean;
}
export interface submittedQuizResponse {
  questionId: number;
  candidateId: string;
  totalQuestions: number;
  answeredQuestions: number;
  notAnsweredQuestions: number;
  correctAnswers: number;
  inCorrectAnswers:number;
  interviewLevel:number;
  createdBy:string;
  createdDate:string;
}
export interface submittedQuizDetailedInfoResponse {
  questionId: number;
  quizSets:createQuizRequest[];
  totalQuestions: number;
  answeredQuestions: number;
  notAnsweredQuestions: number;
  correctAnswers: number;
  inCorrectAnswers:number;
}


//   openDialog:boolean,
//    handleClose:boolean,
//   setOpenDialog:boolean,
//    quizQuestions:,
//    quizId : string
// }
