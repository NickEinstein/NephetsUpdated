import React, { useState } from "react";
import {
  Avatar,
  Paper,
  Typography,
} from "@mui/material";

function WallCardsTestimonies({ avatar, title, text }) {
  return (
    <div className="relative">
      <div>
        <Paper
          elevation={2}
          className="bg-[#F1D0C9] py-[40px] px-[24px] flex flex-col lg:gap-6 gap-3 rounded-3xl"
        >
          <div class="flex gap-3">
            <Avatar src={avatar} className="w-12 h-12" />
            <div>
              <Typography className="font-bold text-base">
                Sarah Olayemi
              </Typography>
              <Typography className="text-base">Student Visa</Typography>
            </div>
          </div>
          <div>
            <Typography className="font-bold tlg:ext-[32px] text-[22px] mb-2">
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