import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import api from "../../api/users";
import List from "@mui/material/List";
import { useNavigate, useLocation } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import { GiJourney } from "react-icons/gi";
import { FaHome } from "react-icons/fa";
import ListItemIcon from "@mui/material/ListItemIcon";
import "../../screens/common.css";
import { AiOutlineLogout } from "react-icons/ai";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
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
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function Home() {
  const theme = useTheme();
  const location = useLocation();
  let currentPath = location.pathname;
  const navigate = useNavigate();
  const userRole = localStorage.getItem("userRole");
  const [open, setOpen] = React.useState(true);
  const [currentUserEmail, setCurrentUserEmail] = React.useState(null);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const onLogOut = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    navigate("/");
  };
  const getCurrentUser = async () => {
    let currentuser = localStorage.getItem("userId");
    const response = await api.get(`/users/${currentuser}`);
    setCurrentUserEmail(response.data.email);
  };
  React.useEffect(() => {
    getCurrentUser();
    console.log("Location is", location.pathname);
  }, []);
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <div className="toolbar">
            <Typography variant="h6" noWrap component="div">
              FakeReservations
            </Typography>
            <Typography variant="h6" noWrap component="div">
              Dashboard
            </Typography>
            <Typography variant="h6" noWrap component="div">
              {currentUserEmail} |
              <div className="logouticon">
                <AiOutlineLogout onClick={() => onLogOut()} />
              </div>
            </Typography>
          </div>
        </Toolbar>
      </AppBar>
      <Box>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            <ListItem button key="Dashboard">
              <ListItemIcon>
                <FaHome style={{ fontSize: "1.5rem" }} />
              </ListItemIcon>
              <Link className="siderbar_link" to={"/home/dashboard"}>
                Dashboard
              </Link>
            </ListItem>

            {userRole !== "admin" && (
              <ListItem button key="PlanJourney">
                <ListItemIcon>
                  <GiJourney style={{ fontSize: "1.5rem" }} />
                </ListItemIcon>
                <Link className="siderbar_link" to={"/home/reservation"}>
                  Make Reservation
                </Link>
              </ListItem>
            )}
          </List>
          <Divider />
        </Drawer>
      </Box>
      <Box>
        <div className="content">
          <Outlet />
        </div>
      </Box>
    </Box>
  );
}
