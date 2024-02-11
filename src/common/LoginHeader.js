import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
// import trustedBy1 from './images/Vector.png'
import toDoorLogo from "images/Nephets Assets/Nehpets Consulting Grey Outline 1.svg";
import toDoorLogoColored from "images/Nephets Assets/Nehpets Consulting Colored.svg";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Input,
  Menu,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { RouteEnum } from "constants/RouteConstants";

const LoginHeader = ({ white }) => {
  const history = useNavigate();
  const redirect = (push) => {
    //   localStorage.setItem('auth', null)
    history(push);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (push) => {
    setAnchorEl(null);
    history(push);
  };
  const [scrollPosition, setScrollPosition] = useState(0);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     // const position = window.scrollY;
  //     setScrollPosition(window.scrollY);
  //     // console.log(window.scrollY);
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   // Clean up the event listener
  //   // return () => {
  //   //   // window.removeEventListener("scroll", handleScroll);
  //   // };
  // }, []);

  // console.log(scrollPosition)

  return (
    <Paper elevation={2} className="w-full fixed top-0 right-0 left-0 z-10">
      <div
        className={`flex justify-between items-center w-full px-10 ${
          white ? "bg-white" : "bg-primary-main"

        }`}
      >
        <div
          onClick={() => redirect(RouteEnum.HOME)}
          className="flex relative items-center justify-center w-32 mt-4 cursor-pointer"
        >
          <img
            src={white ? toDoorLogoColored : toDoorLogo}
            alt="softwork logo"
            className="w-36"
            onClick={redirect}
          />
        </div>
        <div className="text-base flex gap-6 w-full justify-end items-center font-bold text-primary-main">
          <Typography
            onClick={() => redirect(RouteEnum.HOME)}
            className={`font-bold text-base cursor-pointer ${
              white ? "text-primary-main" : "text-white"
            }`}
          >
            Home
          </Typography>
          <Typography
            onClick={() => redirect(RouteEnum.ABOUT_US)}
            className={`font-bold text-base cursor-pointer ${
              white ? "text-primary-main" : "text-white"
            }`}
          >
            About us
          </Typography>
          <Typography
            onClick={() => redirect(RouteEnum.COACHING)}
            className={`font-bold text-base cursor-pointer ${
              white ? "text-primary-main" : "text-white"
            }`}
          >
            Coaching
          </Typography>
          <Button
            variant="outlined"
            className={`${
              white
                ? "bg-white text-primary-main border-none font-bold text-base cursor-pointer"
                : "bg-primary-main text-white font-bold text-base cursor-pointer"
            }`}
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            Dashboard
          </Button>
          <Menu
            className="mt-3"
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              onClick={() => handleClose(RouteEnum.PERMANENT_RESIDENCE)}
            >
              Permanent Residence
            </MenuItem>
            <MenuItem onClick={() => handleClose(RouteEnum.TEMPORAL_RESIDENCE)}>
              Temporal Residence
            </MenuItem>
          </Menu>

          <Button
            className={`font-bold px-8 h-12 ${
              !white ? "text-primary-main bg-white" : "text-white"
            }`}
          >
            Book Now
          </Button>
        </div>
      </div>
    </Paper>
  );
};
export default LoginHeader;
