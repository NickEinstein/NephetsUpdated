import React, { useState } from "react";
import { Typography } from "@mui/material";
import info from "images/aa/info.svg";

function BalanceInfo({ header, price }) {
  return (
    <div className=" w-full mb-5">
      <div>
        <div class="flex justify-between items-center">
          <Typography className="mb-3">{header}</Typography>
          <img src={info} />
        </div>

        <Typography className="text-3xl font-bold ">USD {price}</Typography>
      </div>
    </div>
  );
}

export default BalanceInfo;
