import { Box, Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
import TopNavBar from "../../components/TopNavBar/TopNavBar";
import "./PageNotFound.style.scss";

const PageNotFound = () => {
  return (
    <>
      <TopNavBar />
      <Box className="error-box">
        <Typography variant="h4">404 Not Found</Typography>
      </Box>

      <Divider className="divider" />
    </>
  );
};
export default PageNotFound;
