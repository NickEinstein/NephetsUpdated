import React, { useState } from "react";
import LoginAPi from "apis/LoginApi";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSnackbar } from "notistack";

import LoginHeader from "common/LoginHeader";
import snake from "images/Nephets Assets/coaching.svg";
import snake2 from "images/Nephets Assets/coachingBig.svg";
import handshake from "images/Nephets Assets/IELTSImage.svg";

import { MediaQueryBreakpointEnum } from "constants/Global";
import { useMediaQuery, Button } from "@mui/material";

import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Coaching(props) {
  const [isLoading, setIsLoading] = React.useState(false);

  const history = useNavigate();

  const redirect = () => {
    history("/dashboard");
  };
  const islg = useMediaQuery(MediaQueryBreakpointEnum.lg);
  const ismd = useMediaQuery(MediaQueryBreakpointEnum.md);
  const issm = useMediaQuery(MediaQueryBreakpointEnum.sm);

  return (
    <div className=" w-full bg-black ">
      <div className="relative bg-no-repeat bg-[#662817] bg-cover max-h-[810px] box-border text-white w-full flex flex-col lg:px-10 p-[6%] py-8 pt-12 lg:pb-10  lg:pt-40 ">
        <div className="flex flex-col lg:flex-row lg:gap-16 gap-6 items-end w-full">
          <Typography
            variant="h1"
            className="font-bold  lg:text-[5.2rem] text-4xl  text-left lg:leading-[90px] leading-35px"
          >
            What You Should Know Before Your Journey Starts
          </Typography>

          <div className="lg:w-2/12 min-w-[295px] pb-3 ">
            <Typography className="text-base">
              Planning together to achieve your japa dreams. We work wirh you to
              achieve your dreams of traveling abroad.
            </Typography>
            <Button className="h-12 px-12 text-primary-main bg-white mt-5 font-bold">
              Book Now
            </Button>
          </div>
        </div>
      </div>
      <img alt="" src={!issm ? snake : snake2} className=" w-full lg:h-full" />

      <div className="bg-[#FCF9EE] lg:px-[40px] lg:py-[80px] flex flex-col lg:flex-row w-full lg:gap-28 gap-6 items-center p-[6%]">
        <Typography className="lg:text-[88px] text-[32px] font-bold w-full">
          What is IELTS
        </Typography>
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
      <div className="bg-[#FCF9EE] lg:px-[40px] lg:py-[80px] flex flex-col lg:flex-row w-full gap-16 items-center p-[6%]">
        <img className=" lg:rounded-xl" src={handshake} />
        <div className="flex flex-col w-full gap-6 items-center">
          <Typography className="lg:text-6xl 4xl font-bold w-full">
            Why IELTS
          </Typography>
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

      <div className="bg-[#F7F6F2] lg:px-[40px] lg:py-[80px] grid lg:grid-cols-2 grid-cols-1 w-full items-center lg:gap-28 gap-12 p-[6%]">
        <div className="bg-[#F1D0C9] px-4 py-8 pr-10 rounded-xl">
          <Typography className="lg:text-[80px] lg:leading-[80px] text-[36px]  font-bold w-full">
            REQUIREMENTS
          </Typography>
          <Typography className="lg:pr-24">
            To be qualified to write the IELTS examination, you must have a
            valid passport from your country of residence, or which has at least
            six months before it expires.
          </Typography>
        </div>

        <div className="bg-[#FFE8D3] px-4 py-8 pr-10 rounded-xl">
          <Typography className="lg:text-[80px] lg:leading-[80px] text-[36px]  font-bold w-full">
            How to apply
          </Typography>
          <Typography className="lg:pr-24">
            To apply for the IELTS examination, you will have to provide the
            necessary information, book a convenient date and time, attach your
            passport, and proceed to make payment for the exams.
          </Typography>
        </div>

        {/* <div className="bg-[#FFE8D3] px-4 py-8 pr-10 rounded-xl">
          <Typography className="text-[80px] leading-[80px] w-full">Vision</Typography>
          <Typography className="pr-24">
          To be a generally accepted Canadian immigration platform to foster success and 
achieve dreams.
          </Typography>
        </div> */}
      </div>
    </div>
  );
}

export default Coaching;
