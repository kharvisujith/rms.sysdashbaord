export interface SubjectwiseDetails {
  subjectName: string;
  version: string;
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
    | "version"
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
