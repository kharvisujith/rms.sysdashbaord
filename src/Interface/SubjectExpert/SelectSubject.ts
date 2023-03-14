import { Dispatch, SetStateAction } from "react";

export interface selectSubjectProps {
  subject: string;
  setSubject: Dispatch<SetStateAction<string>>;
}
