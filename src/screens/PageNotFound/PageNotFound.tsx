import { Box, Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
import "./PageNotFound.style.scss";

const PageNotFound = () => {
  return (
    <>
      <Box className="error-box">
        <Typography variant="h4">404 Not Found</Typography>
      </Box>

      <Divider className="divider" />
    </>
  );
};
export default PageNotFound;
