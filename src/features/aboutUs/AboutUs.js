import React, { useState } from "react";
import LoginAPi from "apis/LoginApi";
// import SignupApi from "apis/SignupApi";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSnackbar } from "notistack";

import { FcGoogle } from "react-icons/fc";
// import { Button, TextField, Typography } from "@mui/material";
import PasswordTextField from "common/PasswordTextField";
import { getTextFieldFormikProps } from "utils/FormikUtils";
import useAuthUser from "hooks/useAuthUser";
import { Link, Navigate } from "react-router-dom";
import { RouteEnum } from "constants/RouteConstants";
import LoginHeader from "common/LoginHeader";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import toDoorLogo from "images/Ellipse 30.png";
import background from "images/background.png";
import snake from "images/Nephets Assets/aboutUs-bg.svg";
import handshake from "images//Nephets Assets/handshake.svg";

// import ReactDOM from 'react-dom';
// import trustedBy1 from './images/Vector.png'
import trustedBy2 from "images/Rectangle 7.png";
import trustedBy3 from "images/Rectangle 106.png";
// import LoginHeader from './LoginHeader';
// import trustedBy3 from './images/trustedBy-3.png'
// import trustedBy4 from './images/trustedBy-4.png'
import {
  Avatar,
  Button,
  Input,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import WallCards from "common/CompanyRiderCard";
import WallCardsServices from "common/WallCardsServices";
import WallCardsTestimonies from "common/WallCardsTestimonies";

function AboutUs(props) {
  const [isLoading, setIsLoading] = React.useState(false);

  // console.log(localStorage.getItem('authUser'))
  const history = useNavigate();

  const redirect = () => {
    // localStorage.setItem('authUser', 'true')

    history("/dashboard");
  };

  // console.log(localStorage.getItem('authUser'))

  // const authUser = useAuthUser();

  const { enqueueSnackbar } = useSnackbar();
  const [loginMuation, loginMutationResult] = LoginAPi.useLoginMutation();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    validationSchema: yup.object({
      username: yup.string().trim().required(),
      password: yup.string().trim().required(),
    }),
    onSubmit: async (values) => {
      console.log(values);
      localStorage.setItem("il", true);
      // redirect();
      // history('/dashboard')

      try {
        setIsLoading(true);
        const data = await loginMuation({ data: values }).unwrap();
        // TODO extra login
        setIsLoading(false);
        if (data.data)
          enqueueSnackbar("Logged in successful", { variant: "success" });
        redirect();
      } catch (error) {
        setIsLoading(false);

        enqueueSnackbar(
          error?.data?.message || "Something went wrong",
          "Failed to login",
          {
            variant: "error",
          }
        );
      }
    },
  });

  return (
    <div className=" w-full bg-black ">
      <LoginHeader />
      <div className="relative bg-no-repeat bg-[#662817] bg-cover h-[810px] box-border text-white w-full flex flex-col px-10 py-20 pb-[5%]">
        <div className="flex gap-16 items-end  w-full">
          <Typography
            variant="h1"
            className="font-bold  text-[128px]  text-left leading-[140px]"
          >
            We are a channel for your successful immigration.
          </Typography>

          <div className="w-2/12  min-w-[295px] pb-7 ">
            <Typography className="text-base">
              At Nehpets Consulting, we are more than just a consultancy—we are
              your dedicated channel to success in the world of Canadian
              immigration.
            </Typography>
          </div>
        </div>
      </div>
      <img src={snake} className=" w-full" />

      <div className="bg-[#FCF9EE] px-[40px] py-[80px] flex w-full items-center">
        <Typography className="text-[88px] w-full">Who we are</Typography>
        <Typography className="text-base w-full">
          Nehpets Consult Limited is a privately owned enterprise which is in
          the business of providing Canada immigration processes, IELTS
          examinations and preparations and general travel consultation. Was
          incorporated by CAC Nigeria in March 2023, but has been in operation
          since September 2022. Nehpets Consult is classified under the travel
          and educational sector of the economy.
        </Typography>
      </div>

      <div className="bg-[#FCF9EE] px-[40px] py-[80px] flex w-full items-center gap-28">
        <img className="w-[656px] h-[388px] rounded-xl" src={handshake} />
        <div>
          <Typography className="text-[88px] w-full">What we do</Typography>
          <Typography className="text-base w-full">
            Nehpets Consulting prepares their clients for IELTS. This online
            preparation comes with IELTS Materials and a study pack. Tutorial
            sessions, sample tests, one on one interactions and individual
            feedback. Nehpets consulting can help you process your visa
            applications ranging from Canadian permanent residency visas to
            study, work, visiting visas and so on. At Neehpets Consulting, we
            believe that every traveller is peculiar and must be approached
            perculiarly, therefore our team of experts will help you discover
            your relocation plans, and then tailor them to your personal
            needs.As a student, Nehpets Consulting can help you source for
            pocket friendly schools and provide all the support you will need.
          </Typography>
        </div>
      </div>

      <div className="bg-[#FCF9EE] px-[40px] py-[80px] flex w-full items-center gap-28">
        <div className="bg-[#F1D0C9] px-4 py-8 pr-10 rounded-xl">
          <Typography className="text-[80px] leading-[80px] w-full">Mission</Typography>
          <Typography className="pr-24">
            To be a generally accepted Canadian immigration platform to foster
            success and a chieve dreams.
          </Typography>
        </div>

        <div className="bg-[#FFE8D3] px-4 py-8 pr-10 rounded-xl">
          <Typography className="text-[80px] leading-[80px] w-full">Vision</Typography>
          <Typography className="pr-24">
          To be a generally accepted Canadian immigration platform to foster success and 
achieve dreams.
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
