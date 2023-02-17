export interface SubjectwiseDetails {
  subjectName: string;
  setNumber: number;
  totalQuestionsCount: number;
  createdBy?: string;
  updatedBy?: string;
  createdDate?: string;
  updatedDate?: string;
}

export interface QuesitonSetsTableColumns {
  id:
    | "subjectName"
    | "totalQuestionsCount"
    | "setNumber"
    | "createdBy"
    | "updatedBy"
    | "createdDate"
    | "updatedDate"
    | "view";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}
