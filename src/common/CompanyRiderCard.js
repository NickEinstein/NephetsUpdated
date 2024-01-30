import React, { useState } from "react";
import UserApi from "apis/UserApi";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSnackbar } from "notistack";
// import { Button, TextField, Typography } from "@mui/material";
import PasswordTextField from "common/PasswordTextField";
import { getTextFieldFormikProps } from "utils/FormikUtils";
import useAuthUser from "hooks/useAuthUser";
import { Navigate } from "react-router-dom";
import { RouteEnum } from "constants/RouteConstants";
import LoginHeader from "common/LoginHeader";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import toDoorLogo from "images/Ellipse 30.png";
import background from "images/background.png";
import gigLogo from "images/Ellipse 56.png";

// import { RouteEnum } from "constants/RouteConstants";
// import ReactDOM from 'react-dom';
// import trustedBy1 from './images/Vector.png'
import trustedBy2 from "images/Rectangle 7.png";
import trustedBy3 from "images/Rectangle 106.png";
// import LoginHeader from './LoginHeader';
// import trustedBy3 from './images/trustedBy-3.png'
// import trustedBy4 from './images/trustedBy-4.png'
import { Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function WallCards({ number, type }) {
  return (
    <Paper
      elevation={2}
      className=" text-black text-center bg-[#F1D0C9] h-[187px] w-full flex justify-center items-center px-[40px] py-[83px] rounded-lg"
    >
      <div className="flex flex-col">
        <Typography className="text-[64px] font-bold text-left ">
          {number}
        </Typography>
        <Typography className="text-[24px] text-left -mt-4 ">{type}</Typography>
      </div>
    </Paper>
  );
}

export default WallCards;
