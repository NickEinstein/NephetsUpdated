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

import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Coaching(props) {
  const [isLoading, setIsLoading] = React.useState(false);

  const history = useNavigate();

  const redirect = () => {
    history("/dashboard");
  };

  return (
    <div className=" w-full bg-black ">
      <LoginHeader />
      <div className="relative bg-no-repeat bg-[#662817] bg-cover h-[810px] box-border text-white w-full flex flex-col px-10 py-20 pb-[5%]">
        <div className="flex gap-16 items-end  w-full">
          <Typography
            variant="h1"
            className="font-bold  text-[128px]  text-left leading-[140px]"
          >
            What You Should Know Before Your Journey Starts
          </Typography>

          <div className="w-2/12  min-w-[295px] pb-7 ">
            <Typography className="text-base">
              At Nehpets Consulting, we are more than just a consultancy—we are
              your dedicated channel to success in the world of Canadian
              immigration.
            </Typography>

            <Button className="bg-white h-12 px-12 text-black text-base font-bold mt-4">Book Now</Button>
          </div>
        </div>
      </div>
      <img src={snake} className=" w-full" />

      <div className="bg-[#FCF9EE] px-[40px] py-[80px] flex w-full items-center">
        <Typography className="text-[88px] w-full">What is IELTS</Typography>
        <Typography className="text-base w-full">
          The International English Language Testing System (IELTS) is an exam
          that is been done on a weekly or bi-weekly basis across different
          countries. Which is designed to help you work, study or migrate to a
          country where English is the native language. This includes countries
          such as Australia, Canada, New Zealand, the UK and the USA. This exam
          tests your ability, fluency and proficiency to listen, read, write and
          speak in English will be assessed during the test. IELTS is graded on
          a scale of 1-9.
        </Typography>
      </div>

      <div className="bg-[#FCF9EE] px-[40px] py-[80px] flex w-full items-center gap-28">
        <img className="w-[656px] h-[388px] rounded-xl" src={handshake} />
        <div>
          <Typography className="text-[88px] w-full">Why IELTS</Typography>
          <Typography className="text-base w-full">
            If you intend to live, school or work in an English-speaking
            country, it is necessary to enroll and write the IELTS exams,
            especially for immigration purposes. In recent times we have seen
            the reduction of IELTS exanimation been a major requirement to
            entering an English-speaking country, especially in the area of
            schooling prior to the fact that the host or applicant country is an
            English-speaking country.
          </Typography>
        </div>
      </div>

      <div className="bg-[#FCF9EE] px-[40px] py-[80px] flex w-full items-center gap-28">
        <div className="bg-[#F1D0C9] px-4 py-8 pr-10 rounded-xl w-full">
          <Typography className="text-[80px] leading-[100px] w-full">
            Requirements
          </Typography>
          <Typography className="pr-24">
            To be qualified to write the IELTS examination, you must have a
            valid passport from your country of residence, or which has at least
            six months before it expires.
          </Typography>
        </div>

        <div className="bg-[#FFE8D3] px-4 py-8 pr-10 rounded-xl w-full">
          <Typography className="text-[80px] leading-[100px] w-full">
          How to apply
          </Typography>
          <Typography className="pr-24">
            To be a generally accepted Canadian immigration platform to foster
            success and achieve dreams.
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default Coaching;
