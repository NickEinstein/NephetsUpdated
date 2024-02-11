import React, { useState } from "react";
import { Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function WallCards({ number, type }) {
  return (
    <Paper
      elevation={2}
      className=" text-black text-center bg-[#F1D0C9] h-[187px] w-full flex justify-center items-center px-[40px] py-[83px] rounded-lg"
    >
      <div className="flex flex-col">
        <Typography className="text-5xl font-bold text-left ">
          {number}
        </Typography>
        <Typography className="text-[24px] text-left  ">{type}</Typography>
      </div>
    </Paper>
  );
}

export default WallCards;
