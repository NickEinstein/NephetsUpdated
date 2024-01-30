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

// import { RouteEnum } from "constants/RouteConstants";
// import ReactDOM from 'react-dom';
// import trustedBy1 from './images/Vector.png'
import snake from "images/Nephets Assets/OurServices-IELTS.png";
import trustedBy3 from "images/Rectangle 106.png";
// import LoginHeader from './LoginHeader';
// import trustedBy3 from './images/trustedBy-3.png'
// import trustedBy4 from './images/trustedBy-4.png'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Input,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

function WallCardsServices({ styled, title, text }) {
  return (
    <div className="relative">
      <div>
        <Paper
          className={`h-[668px] rounded-3xl flex col items-end p-[5%] ${
            styled && "w-full"
          } relative bg-no-repeat bg-center bg-cover `}
          style={{
            position: "relative",
            backgroundImage: `url('${snake}')`,
          }}
        >
          <div className="pr-[5%] text-white">
            <Typography className={`{"font-bold text-[64px] text-left"`}>
              {title}
            </Typography>
            <Typography className="text-base w-4/5">{text}</Typography>
          </div>
        </Paper>
      </div>
    </div>
  );
}

export default WallCardsServices;
