export interface QuizDetails {
  quizId: number;
  quizLink: string;
  quizLinkExpiresAt: string;
  // createdBy: string;
  // updatedBy: string;
  // createdDate: string;
  // updatedDate: string;
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

export interface quizQuestions {}
export interface SingleQuestionsProps {}
//   openDialog:boolean,
//    handleClose:boolean,
//   setOpenDialog:boolean,
//    quizQuestions:,
//    quizId : string
// }
