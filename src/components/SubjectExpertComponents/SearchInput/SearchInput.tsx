import {
  Box,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { searchInputProps } from "../../../Interface/SubjectExpert/SearchInput";

const SearchInput = (props: searchInputProps) => {
  const { setSearchText, text } = props;
  return (
    <>
      <Box>
        <FormControl
          sx={{
            m: 1,
            width: "25ch",
          }}
          variant="standard"
        >
          <InputLabel htmlFor="search">{text}</InputLabel>
          <Input
            id="search"
            type="text"
            onChange={(e: any) => setSearchText(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            }
          />
        </FormControl>
      </Box>
    </>
  );
};
export default SearchInput;
