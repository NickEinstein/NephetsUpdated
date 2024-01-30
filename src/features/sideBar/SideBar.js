import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { BsPeople } from "react-icons/bs";
import MailIcon from "@mui/icons-material/Mail";
import message from "images/message.svg";
import messageW from "images/messageW.svg";
import messages from "images/messages.svg";
import messagesW from "images/messagesW.svg";
import companies from "images/lifebuoy.svg";
import companiesW from "images/lifebuoyW.svg";
import dashboard from "images/category-2.svg";
import dashboardW from "images/category-2W.svg";
import trips from "images/routing.svg";
import tripsW from "images/routingW.svg";
import rider from "images/profile-2user.svg";
import riderW from "images/profile-2userW.svg";
import map from "images/map.svg";
import mapW from "images/mapW.svg";
import logouts from "images/logout.png";
import LoginHeader from "common/LoginHeader";
import { RouteEnum } from "constants/RouteConstants";
import { useNavigate } from "react-router-dom";
import { Logout } from "@mui/icons-material";
import useLogout from "hooks/useLogout";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const drawerWidth = 240;

export default function PermanentDrawerLeft() {
  const history = useNavigate();
  const { logout } = useLogout();
const location = useLocation();
const currentUrl = location.pathname;


  const [outcasts, setOutcasts] = React.useState([
    { name: "Logout", linx: RouteEnum.HOME, image: logouts },
  ]);

  const [pat, setPat] = React.useState([
    {
      name: "Dashboard",
      d: RouteEnum.DASHBOARD,
      image: dashboard,
      image2: dashboardW,
      imageboolean: true,
      color: true,
    },
    {
      name: "Manage Companies",
      d: RouteEnum.MANAGE_COMPANIES,
      image: companies,
      image2: companiesW,
      imageboolean: false,
      color: false,
    },
    {
      name: "Manage riders",
      d: RouteEnum.MANAGE_RIDERS,
      image: rider,
      color: false,
      image2: riderW,
      imageboolean: false,
    },
    {
      name: "Manage Customers",
      d: RouteEnum.MANAGE_CUSTOMERS,
      image: rider,
      color: false,
      image2: riderW,
      imageboolean: false,
    },
    {
      name: "Trips",
      d: RouteEnum.TRIPS,
      image: trips,
      color: false,
      image2: tripsW,
      imageboolean: false,
    },
    {
      name: "Maps",
      d: RouteEnum.MAPS,
      image: map,
      color: false,
      image2: mapW,
      imageboolean: false,
    },
    // {name:'Reviews', d:RouteEnum.MANAGE_COMPANIES},
    // {
    //   name: "Reviews",
    //   // d: "",
    //   image: message,
    //   color: false,
    //   image2: messageW,
    //   imageboolean: false,
    // },
    // {
    //   name: "Support",
    //   d: RouteEnum.SUPPORT,
    //   image: messages,
    //   image2: messagesW,
    //   image2: messagesW,
    //   color: false,
    //   imageboolean: false,
    // },

    {
      name: "Settings",
      d: RouteEnum.SETTINGS,
      // image: message,
      color: false,
      // image2: messageW,
      imageboolean: false,
    },

    // {name:'Support', d:RouteEnum.SUPPORT}
  ]);

  const redirect = (push) => {
    console.log(push);
    history(push);
    // logout()
  };

   useEffect(() => {
     changeColorOnActive();
   }, [currentUrl]);


  // const logout = (push) => {
  //   localStorage.clear();
  //   console.log("hi");
  //   history(push);
  // };

  // const pat =

  const changeColorOnActive = (num) => {
    let k = pat.map((e, index) => ({
      key: e.name,
      name: e.name,
      d: e.d,
      image: e.image,
      image2: e.image2,
      imageboolean: e.d == currentUrl ? true : false,
      color: e.d == currentUrl ? true : false,
    }));

    console.log(k);
    setPat(k);
  };

  return (
    <Box sx={{ display: "flex", backgroundColor: "#1E1E1E" }}>
      {/* <CssBaseline /> */}
      {/* <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Permanent drawer
          </Typography>
        </Toolbar>
      </AppBar> */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        {/* <Toolbar /> */}
        <div className="px-3 py-5">
          <LoginHeader />
        </div>
        {/* <Divider /> */}
        <List>
          {pat.map((text, index) => (
            <ListItem
              style={{
                backgroundColor: text.color ? "#0C3BAA" : "",
                color: text.color ? "white" : "",
              }}
              // inkBarStyle={{ background: "yellow" }}
              key={text.name}
              disablePadding
            >
              <ListItemButton
                onClick={() => {
                  redirect(text.d);
                  changeColorOnActive(index);
                }}
              >
                <ListItemIcon>
                  <img src={text.imageboolean ? text.image2 : text.image} />
                </ListItemIcon>
                <ListItemText primary={text.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {outcasts.map((text, index) => (
            <ListItem
              className={index % 2 == 0 ? "mt-6" : ""}
              key={text.name}
              disablePadding
            >
              <ListItemButton onClick={() => logout(text.linx)}>
                <ListItemIcon>
                  <img src={text.image} />
                  {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                </ListItemIcon>
                <ListItemText primary={text.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
