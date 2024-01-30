import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSnackbar } from "notistack";

import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import withdrawal from "images/aa/Withdrawal.svg";
import deposit from "images/aa/deposit.svg";
import { ArrowDownwardOutlined } from "@mui/icons-material";
import moment from "moment";

function TransactionRow({ items }) {
  return items?.metadata ? (
    <div className="flex items-start mt-6 w-full">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-3">
          <img src={deposit} />
          <div className="">
            <Typography className="font-bold">
              {items?.metadata?.product_name}
            </Typography>
            <Typography className="text-sm text-[#56616B]">
              {items?.metadata?.name}
            </Typography>
          </div>
        </div>
        <div>
          <Typography className="font-bold">USD {items?.amount}</Typography>
          <Typography className="text-sm text-[#56616B]">
            {moment(items?.date).format("ll")}
          </Typography>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex items-start mt-6 w-full">
      <div className="flex justify-between items-center w-full">
        <div className="flex items-center gap-3">
          <img src={withdrawal} />
          <div className="">
            <Typography className="font-bold">Cash Withdrawal</Typography>
            <Typography
              className={`"text-sm font-bold ${
                items.status == "successful"
                  ? "text-green-600"
                  : "text-yellow-300"
              }`}
            >
              {items?.status}
            </Typography>
          </div>
        </div>
        <div>
          <Typography className="font-bold">USD {items?.amount}</Typography>
          <Typography className="text-sm text-[#56616B]">
            {moment(items?.date).format("ll")}
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default TransactionRow;
