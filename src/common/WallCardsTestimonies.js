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
  Avatar,
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
// import { Avatar } from "antd";

function WallCardsTestimonies({ avatar, title, text }) {
  return (
    <div className="relative">
      <div>
        <Paper
          elevation={2}
          className="bg-[#F1D0C9] py-[40px] px-[24px] flex flex-col gap-6 rounded-3xl"
        >
          <div class="flex gap-3">
            <Avatar src={avatar} className="w-16 h-16" />
            <div>
              <Typography className="font-bold text-base">
                Sarah Olayemi
              </Typography>
              <Typography className="text-base">Student Visa</Typography>
            </div>
          </div>
          <div>
            <Typography className="font-bold text-[32px] mb-2">
              Amazing Services
            </Typography>
            <Typography className="text-base">
              I registered for the 2022 diet, the classes were very insightful.
              with lots of materials, videos, individual and group assessments
              and an interview session. With the help of this, I was able to
              score a band mark of 7. This has prompted me in continuing my
              immigration process which has yielded success I’d recommend this
              to anyone.
            </Typography>
          </div>
        </Paper>
      </div>
    </div>
  );
}

export default WallCardsTestimonies;
