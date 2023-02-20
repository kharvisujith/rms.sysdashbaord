import {
  Box,
  Toolbar,
  IconButton,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  SvgIcon,
  ListItemText,
  Theme,
  CSSObject,
  makeStyles,
  styled,
  useTheme,
  Collapse,
  Icon,
  Drawer,
} from "@mui/material";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import { ExpandLess, ExpandMore, StarBorder } from "@material-ui/icons";
import SubjectIcon from "@mui/icons-material/Subject";
import ArticleIcon from "@mui/icons-material/Article";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MuiDrawer from "@mui/material/Drawer";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

// const openedMixin = (theme: Theme): CSSObject => ({
//   width: drawerWidth,
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
//   overflowX: "hidden",
// });

// const closedMixin = (theme: Theme): CSSObject => ({
//   transition: theme.transitions.create("width", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: "hidden",
//   width: `calc(${theme.spacing(7)} + 1px)`,
//   [theme.breakpoints.up("sm")]: {
//     width: `calc(${theme.spacing(8)} + 1px)`,
//   },
// });

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

// const Drawer = styled(MuiDrawer, {
//   shouldForwardProp: (prop) => prop !== "open",
// })(({ theme, open }) => ({
//   width: drawerWidth,
//   flexShrink: 0,
//   whiteSpace: "nowrap",
//   boxSizing: "border-box",
//   ...(open && {
//     ...openedMixin(theme),
//     "& .MuiDrawer-paper": openedMixin(theme),
//   }),
//   ...(!open && {
//     ...closedMixin(theme),
//     "& .MuiDrawer-paper": closedMixin(theme),
//   }),
// }));

const links = [
  { title: "HomePage", path: "/", icon: <HomeIcon /> },
  { title: "Back", path: "/assignments", icon: <HomeIcon /> },
  //{ title: "C#", path: "/Subjects", icon: <UploadFileIcon /> },
  // { title: "FileUpload", path: "/", icon: <UploadFileIcon /> },
];

const subjectlinks = [
  { title: "React", path: "/subjects", icon: <SubjectIcon /> },
  { title: "C#", path: "/subjects", icon: <SubjectIcon /> },
  { title: "CosmosDb", path: "/subjects", icon: <SubjectIcon /> },
  { title: "JavaScript", path: "/subjects", icon: <SubjectIcon /> },
  // { title: "FileUpload", path: "/", icon: <UploadFileIcon /> },
];

const NavBar = (props: any) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(false);
  const [openList, setOpenList] = useState<boolean>(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // const useStyles = makeStyles((theme) => ({
  //     root: {
  //       flexGrow: 1,
  //     },
  //     menuButton: {
  //       marginRight: theme.spacing(2),
  //     },
  //   }));
  //   const classes = useStyles();

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <>
          <AppBar className="Appbar" position="fixed" open={open}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                id="menu-button"
                className={open ? "menu-icon-open" : "menu-icon-close"}
                sx={{
                  marginRight: 5,
                  ...(open && { display: "none" }),
                }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Augmento Labs
              </Typography>
              <Typography variant="h6" component="div" sx={{ flexGrow: 0.02 }}>
                {/* <Button color="inherit" onClick={authContext.logout}> */}
                Log out
              </Typography>
              {/* </Button> */}
              {/* LOG OUT */}
              {/* </Typography> */}
            </Toolbar>
          </AppBar>
          {/* <ThemeProvider theme={darkTheme}> */}
          <Drawer
            variant="persistent"
            open={open}
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
            anchor="left"
          >
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "rtl" ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </DrawerHeader>
            <Divider />
            <List className="account-menu-list">
              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate("/");
                    handleDrawerClose();
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: -0.5,
                      mr: open ? 3 : "auto",
                      justifyContent: "right",
                    }}
                  >
                    <SvgIcon component={HomeIcon} inheritViewBox />
                  </ListItemIcon>
                  <ListItemText primary={"Main Page"} />
                </ListItemButton>
              </ListItem>

              <ListItem disablePadding>
                <ListItemButton
                  onClick={() => {
                    navigate("/assignments");
                    handleDrawerClose();
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: -0.5,
                      mr: open ? 3 : "auto",
                      justifyContent: "right",
                    }}
                  >
                    <SvgIcon component={HomeIcon} inheritViewBox />
                  </ListItemIcon>
                  <ListItemText primary={" SubjectExpert Home Page"} />
                </ListItemButton>
              </ListItem>

              <ListItemButton
                className="account-menu-list"
                onClick={() => {
                  setOpenList(!openList);
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: -0.5,
                    mr: open ? 3 : "auto",
                    justifyContent: "right",
                  }}
                >
                  <Icon component={ArticleIcon} />
                </ListItemIcon>
                <ListItemText
                  primary="Subjects"
                  sx={{ opacity: open ? 1 : 0 }}
                />
                {openList ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openList} timeout="auto" unmountOnExit>
                <List>
                  {subjectlinks.map(({ title, path, icon }, index: number) => {
                    return (
                      <ListItem
                        onClick={() => {
                          handleDrawerClose();
                        }}
                        component={NavLink}
                        to={path}
                        state={title}
                        key={index}
                        sx={{
                          color: "inherit",
                          typography: "body1",
                          "&:hover": {
                            color: "grey.500",
                          },
                          "&.active": {
                            color: "text.secondary",
                          },
                        }}
                      >
                        <ListItemButton
                          sx={{
                            minHeight: 48,
                            justifyContent: open ? "initial" : "right",
                            px: 2.5,
                          }}
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: -0.5,
                              mr: open ? 3 : "auto",
                              justifyContent: "right",
                            }}
                          >
                            {icon}
                          </ListItemIcon>
                          <ListItemText
                            primary={title}
                            sx={{ opacity: open ? 1 : 0 }}
                          />
                        </ListItemButton>
                      </ListItem>
                    );
                  })}
                </List>
              </Collapse>
              {/* /* <ListItem disablePadding>
                <ListItemButton 
                  onClick={() => {
                    navigate("/assignments");
                    handleDrawerClose();
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: -0.5,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    <SvgIcon component={KeyboardBackspaceIcon} inheritViewBox />
                  </ListItemIcon>
                  <ListItemText primary={"Back"} />
                </ListItemButton>
              </ListItem> */}
            </List>
          </Drawer>
        </>
        {/* <Main open={open}> */}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
        </Box>
        {/* </Main> */}
      </Box>
    </>
  );
};
export default NavBar;
