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
import snake from "images/Nephets Assets/BackDrop.svg";
import finegirlImage from "images/Nephets Assets/ImageFinegirl.svg";

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

function Home(props) {
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
    <div className=" w-full bg-black">
      <div
        className="relative bg-no-repeat bg-center bg-cover h-[810px] box-border text-white w-full flex flex-col items-end justify-end px-[3%] pb-[5%]"
        style={{
          position: "relative",
          backgroundImage: `url('${snake}')`,
        }}
      >
        <div className="flex gap-16 items-end justify-end  w-full">
          <Typography
            variant="h1"
            className="font-bold  text-[128px]  text-right"
          >
            Immigration & Visa Consultant Agent
          </Typography>

          <div className="w-2/12  min-w-[269px]">
            <Typography>
              Planning together to achieve your japa dreams. We work wirh you to
              achieve your dreams of traveling abroad.
            </Typography>
            <Button className="rounded-full h-12 px-12 mt-8 mb-3">
              Book Now
            </Button>
          </div>
        </div>
      </div>
      <div className="bg-[#FCF9EE] px-[40px] py-[80px]">
        <Typography className="text-[64px]">
          At Nehpets Consulting, we are more than just a consultancy—we are your
          dedicated channel to success in the world of Canadian immigration.{" "}
        </Typography>
        <div class="flex justify-between gap-4">
          <WallCards number="250+" type="Visas" />
          <WallCards number="250+" type="IELTS" />
          <WallCards number="250+" type="Students" />
          <WallCards number="250+" type="Coaches" />
          {/* <WallCards /> */}
        </div>

        <div>
          <Typography className="font-bold text-[88px] text-left mb-12 mt-28 ">
            Our Services
          </Typography>
          <div class="flex gap-8 w-full">
            <div className="w-2/5">
              <WallCardsServices
                title="IELTS"
                text=" The International English Language Testing System (IELTS) is an exam that is been done on a weekly or bi-weekly basis across different countries, Which is designed to help you work, study or migrate to a country where English is the native language. LEARN MORE…"
              />
            </div>

            <div className="w-3/5">
              <WallCardsServices
                title="IMMIGRATION"
                text="Navigating immigration and visa processes is a substantial endeavor that demands thorough assessment before taking any steps. Within this pivotal phase, it is crucial to inquire about fundamental aspects, including the various types of visas available. LEARN MORE…"
              />
            </div>
          </div>

          <div class="flex gap-8 w-full mt-12 ">
            <div className="w-3/5">
              <WallCardsServices
                title="TRAVEL CONSULTATION"
                text="Embarking on travel or leaving your country is a significant undertaking that requires careful consideration. During this crucial phase, it's essential to pose fundamental questions to yourself, a stage I refer to as the evaluation phase. LEARN MORE"
              />
            </div>

            <div className="w-2/5">
              <WallCardsServices
                title="EFFICIENT VISA SERVICE"
                text="get your visa and travel in less than 6 months"
              />
            </div>
          </div>
        </div>

        <div className="mx-[40px] my-[80px] flex flex-col justify-center items-start gap-8 bg-[#662817] text-white p-[10%] rounded-[48px]">
          <Typography className="text-[124px] leading-[120px]">
            Get coached by experienced tutors
          </Typography>
          <Typography className="text-base w-2/5">
            We’ve been coaching and registering students for IELTS exams for
            educational opportunities in foreign countri
          </Typography>

          <Button className="h-12 bg-white text-black px-12">Book Now</Button>
        </div>

        <div className="mx-[40px] my-[80px] flex flex-col  gap-8 text-black">
          <Typography className="text-[88px] leading-[120px] w-4/5">
            What our customers are saying
          </Typography>
          <div class="w-full flex gap-6">
            <WallCardsTestimonies avatar ={finegirlImage} />
            <WallCardsTestimonies avatar ={finegirlImage} />
            <WallCardsTestimonies avatar ={finegirlImage} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
