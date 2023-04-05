import { subjectWiseQuizListResponse } from "../Interviewer/InterviewerInterface";

export interface QuesitonSetsTableColumns {
  id:
    | "subjectName"
    | "totalQuestionsCount"
    | "version"
    | "createdBy"
    | "updatedBy"
    | "createdDate"
    | "updatedDate"
    | "view"
    | "tag";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

export interface questionSets {
  createdBy: string;
  createdDate: string;
  subjectName: string;
  tag: string;
  totalQuestionsCount: number;
  updatedBy: string;
  updatedDate: string;
  version: string;
}
export interface questionsForSetWithAnswers {
  question: string;
  questionAnswers: string[];
  questionAnswersIds: string[];
  questionId: number;
  questionOptions: string[];
  questionType: string;
  subjectName: string;
  tag: string;
  version: string;
}

export interface questionForUpdate {
  questionId: number;
  question: string;
  questionType: string;
  questionOptions: string;
  questionAnswers: string;
  questionAnswerIds: string;
}

export interface UpdateQuestionsSet {
  version: string;
  subjectName: string;
  tag: string;
  updateQuizDetails: questionForUpdate[];
}

export interface subjectExpertSliceState {
  searchText: string;
  subject: string;
  questionsModifyTableData: subjectWiseQuizListResponse[]; // this should be moved to common
  isModifyQuestionsModalOpen: boolean;
  modifyModalQuestions: questionsForSetWithAnswers;
  editQuestionStates: {
    anchorElEdit: HTMLButtonElement | null;
    editQuestionDetails: questionsForSetWithAnswers;
    editedQuestions: UpdateQuestionsSet | null;
    tempQuestionData: questionsForSetWithAnswers[] | [];
    editedQuestionNumbers: any[];
    viewQuestionModalState: {
      isViewQuestionModalOpen: boolean;
      viewQuestions: questionSets;
    };
  };
  loadingStatus: {
    tableLoader: boolean;
    modalLoader: boolean;
  };
}
