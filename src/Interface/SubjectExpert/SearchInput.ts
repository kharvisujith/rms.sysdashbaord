import { Dispatch, SetStateAction } from "react";

export interface searchInputProps {
  setSearchText: Dispatch<SetStateAction<string>>;
  text: string;
}
