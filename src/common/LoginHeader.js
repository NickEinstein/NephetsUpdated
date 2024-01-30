import React from "react";
import ReactDOM from "react-dom";
// import trustedBy1 from './images/Vector.png'
import toDoorLogo from "images/Nephets Assets/Nehpets Consulting Grey Outline 1.svg";
import toDoorLogoColored from "images/Nephets Assets/Nehpets Consulting Colored.svg";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Input,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

const LoginHeader = ({ white }) => {
  const history = useNavigate();
  const redirect = () => {
    //   localStorage.setItem('auth', null)
    history("/");
  };
  return (
    <div
      className={`flex justify-between items-center  w-full py-4 px-10 ${
        white ? "bg-white" : "bg-primary-main"
      }`}
    >
      <div className="flex relative items-center justify-center w-32 ">
        <img
          src={white ? toDoorLogoColored : toDoorLogo}
          alt="softwork logo"
          className="w-36"
          onClick={redirect}
        />
      </div>
      <div className="text-base flex gap-6 w-full justify-end items-center font-bold text-primary-main">
        <Typography
          className={`font-bold text-base ${
            white ? "text-primary-main" : "text-white"
          }`}
        >
          Home
        </Typography>
        <Typography
          className={`font-bold text-base ${
            white ? "text-primary-main" : "text-white"
          }`}
        >
          About us
        </Typography>
        <Typography
          className={`font-bold text-base ${
            white ? "text-primary-main" : "text-white"
          }`}
        >
          Coaching
        </Typography>
        <Typography
          className={`font-bold text-base ${
            white ? "text-primary-main" : "text-white"
          }`}
        >
          Visa
        </Typography>
        <Button
          className={`font-bold px-8 h-12 ${
            !white ? "text-primary-main bg-white" : "text-white"
          }`}
        >
          Book Now
        </Button>
      </div>
    </div>
  );
};
export default LoginHeader;
