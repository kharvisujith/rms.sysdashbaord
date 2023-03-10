import { NavLink, useNavigate } from "react-router-dom";
import AppBar, { AppBarProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import {
  Avatar,
  Button,
  Container,
  FormControl,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { AccountCircle } from "@material-ui/icons";
import AdbIcon from "@mui/icons-material/Adb";
import MenuIcon from "@mui/icons-material/Menu";
import "./TopNavBar.style.scss";
import { setOriginalNode } from "typescript";
import { randomColor } from "../../utils/Utils";
import logo from "../../assets/images/logo.png";
import LogoutIcon from "@mui/icons-material/Logout";
import { number } from "prop-types";

const subjectExperPages = [{ name: "Home", route: "/" }];
const InterviewerPages = [
  { name: "Home", route: "/" },
  { name: "Create Quiz", route: "/createquiz" },
  { name: "Submited Quiz", route: "/submitted-quiz" },
];
const settings = ["Logout"];

const TopNavBar = (props: any) => {
  const { role, setRole } = props;
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (route: any) => {
    setAnchorElNav(null);
    navigate(route);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleRoleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value);
    setAnchorElUser(null);
    navigate("/");
  };

  return (
    <AppBar position="static" className="app-bar">
      <Container maxWidth="xl">
        <Toolbar className="tool-bar" disableGutters>
          <Box
            className="logo-box"
            sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
          >
            <img src={logo} alt="augmentolabs" className="logo" />
          </Box>

          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {role === "Subject Expert"
                ? subjectExperPages.map((page: any, index: any) => (
                    <MenuItem
                      key={index}
                      onClick={() => handleCloseNavMenu(page.route)}
                    >
                      <NavLink
                        to={page.route}
                        className={({ isActive }) =>
                          isActive ? "active-page" : "page-names"
                        }
                      >
                        {page.name}
                      </NavLink>

                      {/* <Typography textAlign="center">{page.name}</Typography> */}
                    </MenuItem>
                  ))
                : role === "Interviewer"
                ? InterviewerPages.map((page: any, index: any) => (
                    <MenuItem
                      key={index}
                      onClick={() => handleCloseNavMenu(page.route)}
                    >
                      <NavLink
                        to={page.route}
                        className={({ isActive }) =>
                          isActive ? "active-page-menu" : "page-menu"
                        }
                      >
                        {page.name}
                      </NavLink>
                      {/* <Typography textAlign="center">{page.name}</Typography> */}
                    </MenuItem>
                  ))
                : null}
            </Menu>
          </Box>
          <Box
            className="logo-box"
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          >
            <img src={logo} alt="augmentolabs" className="logo" />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {role === "Subject Expert"
              ? subjectExperPages.map((page: any, index: number) => (
                  <Box className="pages">
                    <NavLink
                      to={page.route}
                      className={({ isActive }) =>
                        isActive ? "active-page" : "page-names"
                      }
                    >
                      {page.name}
                    </NavLink>
                  </Box>
                ))
              : role === "Interviewer"
              ? InterviewerPages.map((page: any, index: any) => (
                  <Box className="pages" key={index}>
                    <NavLink
                      to={page.route}
                      className={({ isActive }) =>
                        isActive ? "active-page" : "page-names"
                      }
                    >
                      {page.name}
                    </NavLink>
                  </Box>
                ))
              : null}
          </Box>
          {(role === "Interviewer" || role === "Subject Expert") && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip
                sx={{ backgroundColor: "#ffffff" }}
                title="Open Profile"
                arrow
              >
                <IconButton sx={{ p: 0 }} onClick={handleOpenUserMenu}>
                  <Avatar
                    style={{
                      backgroundColor: "grey",
                    }}
                  >
                    <AccountCircle />
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <Box className="user-profile-info">
                  <Avatar
                    style={{
                      backgroundColor: randomColor(),
                    }}
                  >
                    <AccountCircle />
                  </Avatar>
                  <Box className="user-details">
                    <Typography variant="body2">Demo User</Typography>
                    <Typography variant="caption" className="role-text">
                      {role}
                    </Typography>
                  </Box>
                </Box>

                <FormControl
                  variant="standard"
                  sx={{ m: 1, minWidth: 120, marginLeft: 2 }}
                  className="user-details"
                >
                  <InputLabel id="demo-simple-select-standard-label">
                    Switch Role
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={role}
                    onChange={handleRoleChange}
                    label="Age"
                  >
                    <MenuItem value={"Subject Expert"}>Subject Expert</MenuItem>
                    <MenuItem value={"Interviewer"}>Interviewer</MenuItem>
                  </Select>
                </FormControl>

                {settings.map((setting) => (
                  <MenuItem onClick={handleCloseUserMenu}>
                    <IconButton>
                      <LogoutIcon />
                    </IconButton>
                    <Typography textAlign="center">{setting}</Typography>

                    {/* <Typography textAlign="center">{setting}</Typography> */}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default TopNavBar;
