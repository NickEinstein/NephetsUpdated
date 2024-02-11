import React, { useState } from "react";
import snake from "images/Nephets Assets/OurServices-IELTS.png";
import Immigration from "images/Nephets Assets/ImmigrationImage.svg";
import visa from "images/Nephets Assets/VisaImage.svg";
import travel from "images/Nephets Assets/TravelImage.svg"
import IELTS from "images/Nephets Assets/OurServices-IELTS.png";


import {
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";

function WallCardsServices({ styled, title, text, bgImages }) {
  return (
    <div className="relative  items-center ">
      <div className="">
        <div
          className={`lg:h-[668px] h-[464px] rounded-3xl flex col lg:items-end items-center p-[5%] ${
            "w-full"
          } relative bg-no-repeat bg-center bg-cover `}
          // style={{
          //   position: "relative",
          //   backgroundImage: `url('${visa}')`,
          // }}
        >
          <div className="lg:pr-[5%] px-[3%] w-full text-white">
            <Typography className={`{"font-bold text-[32px] lg:text-[64px] mb-6 text-left"`}>
              {title}
            </Typography>
            <Typography className="text-base lg:w-4/5 w-full">{text}</Typography>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WallCardsServices;
