import {
  Box,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useAppDispatch } from "../../../Store/ConfigureStrore";

const SearchInput = (props: any) => {
  const { from } = props;
  const dispatch = useAppDispatch();

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
          <InputLabel htmlFor="search">{"Search"}</InputLabel>
          <Input
            id="search"
            type="text"
            onChange={(e: any) =>
              dispatch({
                type: "subjectExpert/handleSearchText",
                payload: { value: e?.target.value, from: from },
              })
            }
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
