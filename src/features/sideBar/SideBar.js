import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
// import ToDoorSearch from "common/ToDoorSearch";
import nephetsColored from "images/Nephets Assets/Nehpets Consulting Colored.svg";
import nephets from "images/Nephets Assets/Nehpets Consulting Grey Outline 1.svg";

// import coatOfArm from "images/Residency/coat-of-arm.png";
import { Avatar, Paper } from "@mui/material";
import { RouteEnum } from "constants/RouteConstants";
import { useLocation, useNavigate } from "react-router-dom";
import useAuthUser from "hooks/useAuthUser";

const drawerWidth = "100%";

function Sidebar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [activeLinkId, setActiveLinkId] = React.useState(null);
  const [array, setArray] = React.useState([
    { name: "Home", link: RouteEnum.HOME },
    { name: "About Us", link: RouteEnum.ABOUT_US },
    { name: "Coaching", link: RouteEnum.COACHING },
    { name: "Temporal Residence", link: RouteEnum.TEMPORAL_RESIDENCE },
    { name: "Permanent Residence", link: RouteEnum.PERMANENT_RESIDENCE },
  ]);

  const location = useLocation();

  const history = useNavigate();
  const authUser = useAuthUser();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLinkClick = (id, link) => {
    setActiveLinkId(id);
    history(link);
    handleDrawerToggle();
  };

  // const logoutz = () => {
  //   localStorage.clear();

  //   setTimeout(function () {
  //     history(RouteEnum.HOME);
  //   }, 3000);
  // };

  const drawer = (
    <div className=" h-full bg-[#472E2E]">
      {/* <Toolbar /> */}

      <List className="py-4 ">
        {array.map(
          (text, id) =>
            text.name && (
              <ListItem
                className="py-1 text-center flex justify-center "
                key={text}
                disablePadding
              >
                <ListItemButton
                  id={id}
                  onClick={() => handleLinkClick(id, text.link)}
                  className={
                    activeLinkId === id
                      ? `bg-primary-main font-bold text-3xl text-white  text-center flex justify-center hover:bg-primary-main hover:text-white `
                      : " text-white font-bold text-3xl hover:bg-primary-main text-center flex justify-center  hover:text-white "
                  }
                  sx={{
                    fontSize: "30px",
                  }}
                >
                  {/* <ListItemIcon>
                    {id % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon> */}
                  {/* <ListItemText primary={text?.name} /> */}
                  <Typography className="font-bold text-center" variant="h6">
                    {text?.name}
                  </Typography>
                </ListItemButton>
              </ListItem>
            )
        )}
      </List>
      <Divider />
      {/* <List>
        {["Log Out"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              onClick={logoutz}
              sx={{
                color: mobileOpen ? "blue" : "inherit",
                "&.Mui-selected": {
                  color: "blue",
                },
              }}
            >
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box className="w-full border bg-red-600 mb-4" sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        // className=""
        position="fixed"
        sx={{
          width: "100%",
          // backgroundColor: "#472E2E",
          // width: { lg: `calc(100% - ${drawerWidth}px)` },
          // ml: { lg: `${drawerWidth}px` },
        }}
      >
          <Paper elevation={3}
            className={`${
              location.pathname === "/ielts"
                ? "bg-white flex justify-between fixed top-0 z-20 p-2 w-full px-[6%] pb-0  rounded-none"
                : "pb-0 bg-[#662817] p-2 flex justify-between fixed top-0 z-20 w-full px-[6%] rounded-none"
            }`}
          >
            <img
              className="w-16"
              alt="Logo"
              src={location.pathname === "/ielts" ? nephetsColored : nephets}
            />
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { lg: "none" } }}
              className="text-white"
            >
              <MenuIcon />
            </IconButton>
          </Paper>
       
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { lg: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            border: "2px solid red",
            display: { xs: "block", lg: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", lg: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    
    </Box>
  );
}

export default Sidebar;
