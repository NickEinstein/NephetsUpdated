import React, { useState } from "react";
import LoginAPi from "apis/LoginApi";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSnackbar } from "notistack";

import LoginHeader from "common/LoginHeader";
import snake2 from "images/Nephets Assets/aboutUs-bg.svg";
import snake from "images/Nephets Assets/aboutUs2.svg";

import handshake from "images//Nephets Assets/handshake.svg";
import { MediaQueryBreakpointEnum } from "constants/Global";
import { Button, useMediaQuery } from "@mui/material";

  
import {
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function AboutUs(props) {
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
      <div className="relative bg-no-repeat bg-[#662817] bg-cover max-h-[810px] box-border text-white w-full flex flex-col lg:px-10 p-[6%] py-8 pt-12 lg:pb-28  lg:py-20 ">
        <div className="flex flex-col lg:flex-row lg:gap-16 gap-6 items-end  w-full">
          <Typography
            variant="h1"
            className="font-bold lg:text-[5.2rem] text-4xl text-left lg:leading-[90px] leading-35px"
          >
            We are a channel for your successful immigration.
          </Typography>

          <div className="lg:w-2/12 min-w-[295px] pb-3 ">
            <Typography className="text-base">
              At Nehpets Consulting, we are more than just a consultancy—we are
              your dedicated channel to success in the world of Canadian
              immigration.
            </Typography>
            <Button className="h-12 px-12 text-primary-main bg-white mt-5 font-bold">
              Book Now
            </Button>
          </div>
        </div>
      </div>
      <img alt="" src={!issm?snake:snake2} className=" w-full lg:h-full" />

      <div className="bg-[#FCF9EE] lg:px-[40px] lg:py-[80px] flex flex-col lg:flex-row w-full lg:gap-28 gap-6 items-center p-[6%]">
        <Typography className="lg:text-6xl text-[32px] font-bold w-full">Who we are</Typography>
        <Typography className="text-base w-full">
          Nehpets Consult Limited is a privately owned enterprise which is in
          the business of providing Canada immigration processes, IELTS
          examinations and preparations and general travel consultation. Was
          incorporated by CAC Nigeria in March 2023, but has been in operation
          since September 2022. Nehpets Consult is classified under the travel
          and educational sector of the economy.
        </Typography>
      </div>
        <div className="bg-[#FCF9EE] lg:px-[40px] lg:py-[80px] flex flex-col lg:flex-row w-full gap-16 items-center p-[6%]">
        <img className=" lg:rounded-xl" src={handshake} />
        <div className="flex flex-col w-full gap-6 items-center">
          <Typography className="lg:text-6xl text-4xl font-bold w-full">What we do</Typography>
          <Typography className="text-base w-full">
            Nehpets Consult Limited is a privately owned enterprise which is in
            the business of providing Canada immigration processes, IELTS
            examinations and preparations and general travel consultation. Was
            incorporated by CAC Nigeria in March 2023, but has been in operation
            since September 2022. Nehpets Consult is classified under the travel
            and educational sector of the economy.
          </Typography>
        </div>
      </div>


     
      <div className="bg-[#F7F6F2] lg:px-[40px] lg:py-[80px] grid lg:grid-cols-2 grid-cols-1 w-full items-center lg:gap-28 gap-12 p-[6%]">
        <div className="bg-[#F1D0C9] px-4 py-8 pr-10 rounded-xl">
          <Typography className="lg:text-[80px] lg:leading-[80px] text-[50px]  font-bold w-full">Mission</Typography>
          <Typography className="lg:pr-24">
            To be a generally accepted Canadian immigration platform to foster
            success and a chieve dreams.
          </Typography>
        </div>

        <div className="bg-[#FFE8D3] px-4 py-8 pr-10 rounded-xl">
          <Typography className="lg:text-[80px] lg:leading-[80px] text-[50px]  font-bold w-full">Vision</Typography>
          <Typography className="lg:pr-24">
          To be a generally accepted Canadian immigration platform to foster success and 
achieve dreams.
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

export default AboutUs;
