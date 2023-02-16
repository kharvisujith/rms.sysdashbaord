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

//   openDialog:boolean,
//    handleClose:boolean,
//   setOpenDialog:boolean,
//    quizQuestions:,
//    quizId : string
// }
