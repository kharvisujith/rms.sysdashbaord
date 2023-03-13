import { QuesitonSetsTableColumns } from "../../Interface/SubjectExpert";

export const QuestionSetscolumns: QuesitonSetsTableColumns[] = [
  { id: "subjectName", label: "Subject Name", minWidth: 70 },
  {
    id: "version",
    label: "Version Number",
    minWidth: 70,
    //align: 'right',
    // format: (value: number) => value.toLocaleString('en-US'),
  },
  { id: "totalQuestionsCount", label: "Total Questions", minWidth: 70 },
  {
    id: "createdBy",
    label: "Created By",
    minWidth: 100,
    //align: 'right',
    // format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: "updatedBy",
    label: "Updated By",
    minWidth: 100,
    //align: 'center',
    // format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: "createdDate",
    label: "Created Date",
    minWidth: 100,
    // align: 'right',
    //format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: "updatedDate",
    label: "Updated Date",
    minWidth: 100,
    //align: 'right',
    //format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: "view",
    label: "View",
    minWidth: 100,
    //align: 'right',
    //format: (value: number) => value.toLocaleString('en-US'),
  },
];
