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
