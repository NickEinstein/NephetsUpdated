/* eslint-disable max-len */
import { Avatar, Typography } from "@mui/material";
import LoginAPi from "apis/LoginApi";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import { RouteEnum } from "constants/RouteConstants";
import edologo from "images/EdoLogo.svg";
import edologo2 from "images/Screenshot 2023-11-06 at 12.34 1.svg";
import moment from "moment";

const ProcurementDocument = ({ procurementData }) => {
  const [message, setMessage] = useState("Authenticating...");
  const { enqueueSnackbar } = useSnackbar();
  const [loginMuation, loginMutationResult] = LoginAPi.useLoginMutation();

  const redirect = useNavigate();
  // const { emp } = useParams();
  // console.log(emp);
  const location = useLocation();

  // console.log(location.search);

  // const queryParams = queryString.parse(location.search);
  // console.log(queryParams);
  // console.log(window.location);

  // Access individual parameters
  // const searchTerm = queryParams.search;
  // const category = queryParams.category;

  const handleAuthentication = async (emp) => {};
  console.log(procurementData);

  return (
    <div className="w-full">
      <div className="w-full  bg-white text-center flex flex-col items-center gap-4 px-[5%] mt-20">
        <Avatar className="h-16 w-16" src={edologo} />
        <div className="flex gap-5">
          <div>
            <div className="flex gap-4 justify-center">
              <Avatar className="w-16 h-16" src={edologo2} />

              <div>
                <Typography
                  variant="h5"
                  className="text-[#3C7E2D] font-bold text-lg"
                >
                  EDO STATE PUBLIC PROCUREMENT AGENCY
                </Typography>
                <Typography className="text-[#D80303] text-lg">
                  Transparency, Accountability & Value For Money
                </Typography>
              </div>
            </div>
            <div class="flex justify-between w-full my-8">
              <div className="">
                <Typography className="font-bold text-left text-lg">
                  {" "}
                  EDPPA/107/Vol.x/xxx
                </Typography>
                <Typography className="text-left text-lg">
                  The Managing Director
                </Typography>
                {/* <Typography className="text-left text-lg">
                  **** *** ******(Agency/MDA)
                </Typography>
                <Typography className="text-left text-lg">
                  *** ***** ******(Address line 1)
                </Typography>
                <Typography className="text-left text-lg">
                  *** **** ****** (Address line 2)
                </Typography> */}
                {/* <Typography>%%Address line 3</Typography> */}
              </div>
              <div className="w-2/6">
                <Typography className="font-bold text-lg text-[#D80303]">
                  Governor’s Office
                </Typography>
                <Typography className="text-lg">
                  8th Floor, Block C, Secretariat Complex, Sapele Road, Benin
                  City, Edo State.{" "}
                  <Typography className="text-lg">
                    {moment(procurementData?.createdAt).format('LL')}
                  </Typography>
                </Typography>
              </div>
            </div>
            <div className="my-16">
              <Typography
                variant="h6"
                className="text-[#3C7E2D] font-bold my-6"
              >
                APPROVAL TO USE RESTRICTED TENDERING METHOD OF PROCUREMENT
              </Typography>

              <div className="flex flex-col gap-4">
                <Typography className="text-lg">
                  This is to convey the Agency’s Approval for the use of
                  Restricted Method of Procurement <b>({procurementData?.procurementMethod})</b> for the{" "}
                  <span class="font-bold">
                    {procurementData?.title}
                    {/*  (%%Project details/description%%) */}
                  </span>{" "}
                  in compliance with Section 49 and 50 of the Edo State Public
                  Procurement Law, 2020.
                </Typography>
                <Typography className="text-lg">
                  2. Consequently, you are to ensure the use of <span class="font-bold">
                    Edo State
                    Bidding’s Document (Templates)
                  </span> for the drafing of your bidding
                  document before its issuance to selected service provider(s),
                  while ensuring due regards for accountability, transparency
                  and value for money in the Procurement Process in line with
                  the Law.
                </Typography>
                <Typography className="mt-5 text-lg">
                  Please accept the assurances of the Agency’s highest esteem.
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcurementDocument;
