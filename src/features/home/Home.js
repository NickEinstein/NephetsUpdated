import React, { useState } from "react";
import LoginAPi from "apis/LoginApi";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSnackbar } from "notistack";

import snake from "images/Nephets Assets/BackDrop.svg";
import finegirlImage from "images/Nephets Assets/ImageFinegirl.svg";

import { Button, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import WallCards from "common/CompanyRiderCard";
import WallCardsServices from "common/WallCardsServices";
import WallCardsTestimonies from "common/WallCardsTestimonies";
import IELTS from "images/Nephets Assets/OurServices-IELTS.png";
import Immigration from "images/Nephets Assets/ImmigrationImage.svg";
import visa from "images/Nephets Assets/VisaImage.svg";
import travel from "images/Nephets Assets/TravelImage.svg";

function Home({ bgimage }) {
  const [isLoading, setIsLoading] = React.useState(false);

  const history = useNavigate();

  const redirect = () => {
    history("/dashboard");
  };

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
        className="relative bg-no-repeat border bg-center bg-cover lg:h-[530px] px-[6%] box-border text-white w-full flex flex-col items-end justify-end lg:px-[3%] lg:pb-[5%]"
        style={{
          position: "relative",
          backgroundImage: `url('${snake}')`,
        }}
      >
        <div className="flex flex-col justify-start lg:flex-row lg:gap-16 py-[20%] lg:py-0 lg:items-end items-center lg:justify-end w-full">
          <Typography
            variant="h1"
            className="font-bold text-[32px] text-left  lg:text-[6.42em] lg:text-right "
          >
            Immigration & Visa Consultant Agent
          </Typography>

          <div className="lg:w-2/12  min-w-[269px] w-full">
            <Typography className="text-[14px] hidden md:block">
              Planning together to achieve your japa dreams. We work wirh you to
              achieve your dreams of traveling abroad.
            </Typography>
            <Typography className="text-[14px] mt-5 md:hidden">
              Planning together to achieve your japa dreams.
              <br /> We work wirh you to achieve
              <br /> your dreams of traveling abroad.
            </Typography>
            <Button className="rounded-full h-12 px-12 mt-8 mb-3">
              Book Now
            </Button>
          </div>
        </div>
      </div>
      <div className="bg-[#FCF9EE] px-[6%] py-[10%] lg:px-[40px] lg:py-[80px]">
        <Typography className="lg:text-[64px] text-[24px] leading-6 lg:leading-normal">
          At Nehpets Consulting, we are more than just a consultancy—we are your
          dedicated channel to success in the world of Canadian immigration.{" "}
        </Typography>
        <div class="grid lg:grid-cols-4 mt-4 grid-cols-1 justify-between gap-4">
          <WallCards number="250+" type="Visas" />
          <WallCards number="250+" type="IELTS" />
          <WallCards number="250+" type="Students" />
          <WallCards number="250+" type="Coaches" />
          {/* <WallCards /> */}
        </div>

        <div>
          <Typography className="font-bold lg:text-[88px] text-[32px] text-left lg:mb-12 mb-6 lg:mt-28 mt-[12%] ">
            Our Services
          </Typography>
          <div class="grid lg:grid-cols-5 grid-cols-1 gap-8 w-full">
            <div  className="lg:col-span-2 col-span-1 w-full rounded-3xl"
              style={{
                position: "relative",
                backgroundImage: `url('${IELTS}')`,
              }}>
              <WallCardsServices
                bgImage={IELTS}
                title="IELTS"
                text=" The International English Language Testing System (IELTS) is an exam that is been done on a weekly or bi-weekly basis across different countries, Which is designed to help you work, study or migrate to a country where English is the native language. LEARN MORE…"
              />
            </div>

            <Paper  className="lg:col-span-3 col-span-1 w-full rounded-3xl relative bg-no-repeat bg-center bg-cover "
              style={{
                position: "relative",
                backgroundImage: `url('${Immigration}')`,
              }}>
              <WallCardsServices
                bgImage={Immigration}
                title="IMMIGRATION"
                text="Navigating immigration and visa processes is a substantial endeavor that demands thorough assessment before taking any steps. Within this pivotal phase, it is crucial to inquire about fundamental aspects, including the various types of visas available. LEARN MORE…"
              />
            </Paper>
          </div>

          <div class="grid lg:grid-cols-5 grid-cols-1 gap-8 w-full lg:mt-12 mt-6">
            <Paper  className="lg:col-span-2 col-span-1 w-full rounded-3xl"
              style={{
                position: "relative",
                backgroundImage: `url('${travel}')`,
              }}>
              <WallCardsServices
                bgImage={travel}
                title="TRAVEL"
                text="Embarking on travel or leaving your country is a significant undertaking that requires careful consideration. During this crucial phase, it's essential to pose fundamental questions to yourself, a stage I refer to as the evaluation phase. LEARN MORE"
              />
            </Paper>

            <Paper
              className="lg:col-span-3 col-span-1 w-full rounded-3xl relative bg-no-repeat bg-center bg-cover "
              style={{
                position: "relative",
                backgroundImage: `url('${visa}')`,
              }}
            >
              <WallCardsServices
                bgImage={visa}
                title="EFFICIENT VISA SERVICE"
                text="Get your visa and travel in less than 6 months"
              />
            </Paper>
          </div>
        </div>

        <div className="lg:mx-[40px] lg:my-[80px] my-[15%] flex flex-col justify-center items-start gap-8 bg-[#662817] text-white py-[24%] px-[6%] rounded-[48px]">
          <Typography className="lg:text-8xl lg:leading-[90px] text-[34px] leading-[38px]">
            Get coached by experienced tutors
          </Typography>
          <Typography className="lg:text-base text-[14px] lg:w-2/5 w-full">
            We’ve been coaching and registering students for IELTS exams for
            educational opportunities in foreign countri
          </Typography>

          <Button className="h-12 bg-white text-black px-12">Book Now</Button>
        </div>

        <div className="lg:mx-[40px] lg:my-[80px] flex flex-col my-[15%]  gap-8 text-black">
          <Typography className="lg:text-[88px] font-bold lg:leading-[120px] lg:w-4/5 text-[30px] leading-[35px] w-full">
            What our customers are saying
          </Typography>
          <div class="w-full grid lg:grid-cols-3 grid-cols-1 gap-6">
            <WallCardsTestimonies avatar={finegirlImage} />
            <WallCardsTestimonies avatar={finegirlImage} />
            <WallCardsTestimonies avatar={finegirlImage} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
