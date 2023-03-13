import {
  Box,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchInput = (props: any) => {
  const { setSearchText } = props;
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
          <InputLabel htmlFor="search">Search For other Sets</InputLabel>
          <Input
            id="search"
            type="text"
            onChange={(e: any) => setSearchText(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                {/* <IconButton onClick={handleSearchQuestion}> */}
                <SearchIcon />
                {/* </IconButton> */}
              </InputAdornment>
            }
          />
        </FormControl>
      </Box>
    </>
  );
};
export default SearchInput;
