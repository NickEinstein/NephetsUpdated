import React, { useEffect, useState } from "react";
import UserApi from "apis/UserApi";
import { useFormik } from "formik";
import { MdRefresh, MdOutlineSearch, MdSearch } from "react-icons/md";
import * as yup from "yup";
import { useSnackbar } from "notistack";
// import { Button, TextField, Typography } from "@mui/material";
import PasswordTextField from "common/PasswordTextField";
import { getTextFieldFormikProps } from "utils/FormikUtils";
import useAuthUser from "hooks/useAuthUser";
import { Link, Navigate, useParams } from "react-router-dom";
import { RouteEnum } from "constants/RouteConstants";
import LoginHeader from "common/LoginHeader";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import parser from "html-react-parser";
import Checkbox from "@mui/material/Checkbox";

import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import WallCards from "common/WallCardsServices";
import { AccountCircle, BackspaceTwoTone, Wallet } from "@mui/icons-material";
import ToDoorSearch from "common/ToDoorSearch";
import { post, get, put } from "services/fetch";
import SuperAdminApi from "apis/UserApi";
import vector from "images/Vector.svg";
import ExpenseStepper from "common/ExpenseStepper";
import ProcurementApi from "apis/ProcurementApi.js";
import moment from "moment";

function ProcurementDetails(props) {
  const { enqueueSnackbar } = useSnackbar();

  const [userType, setUserType] = React.useState("");
  const [show, setshow] = React.useState(false);
  const [dataType, setdataType] = React.useState("companies");
  const [filtered, setFiltered] = React.useState([]);

  const history = useNavigate();

  const authUser = useAuthUser();
  const { id } = useParams();

  const getprocurements = ProcurementApi.useGetprocurementByIdQuery({
    id,
  });
  const procurements = getprocurements?.data?.data;

  const [approveProccurementMutation, approveProcurementMutationResult] =
    ProcurementApi.useApproveProcurementRequestMutation();
  // console.log(procurements);

  function numberWithCommas(x) {
    // serPrice.value = x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //  formState.target_amount=cleanupNumber(serPrice.value)
    return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const [comment, setComment] = React.useState();

  const handleChange = (event) => {};

  const redirect = useNavigate();

  const timeConversion = (difference) => {
    console.log(difference);
    const duration = moment.duration(+difference);
    const hours = Math.floor(duration?.asHours());
    const minutes = Math.floor(duration?.asMinutes()) % 60;
    const days = Math.floor(duration?.asDays());

    // Set the formatted difference in the state
    // return (`${days}`);
    return `${hours} hours and ${minutes} minutes ago`;
  };

  const onSubmit = async (action) => {
    let payload = {
      requestId: id,
      comment: comment,
      action: action,
      approverDocuments: [
        // {
        //   id: 0,
        //   procurementRequestId: 0,
        //   docName: "string",
        //   docPath: "string",
        //   createdAt: "2023-12-21T17:39:36.245Z",
        //   modifiedAt: "2023-12-21T17:39:36.245Z",
        //   createdBy: 0,
        //   modifiedBy: 0,
        //   isDelete: true,
        // },
      ],
      assignees: [
        // {
        //   assigneeId: 0,
        //   assignerId: 0,
        //   procurementRequestId: 0,
        //   comment: "string",
        // },
      ],
    };

    try {
      // setIsLoading(true);
      const data = await approveProccurementMutation({
        data: { ...payload },
      }).unwrap();

      console.log(data);
      // TODO extra login
      // setIsLoading(false);
      if (data.data)
        enqueueSnackbar("Procurement Request Successfully Sent", {
          variant: "success",
        });
      // redirect(RouteEnum.DASHBOARD);
    } catch (error) {
      console.log(error);
      // setIsLoading(false);
      // enqueueSnackbar(
      //   error?.data?.message || "Something went wrong",
      //   "Failed to login",
      //   {
      //     variant: "error",
      //   }
      // );
    }
  };

  console.log(procurements?.approvers);
  return (
    <div className="w-full pb-12">
      <div
        onClick={() => redirect(-1)}
        className="p-5 flex items-center gap-2 cursor-pointer absolute right-10 top-24"
      >
        <BackspaceTwoTone /> <Typography>Back</Typography>
      </div>
      <div class="flex gap-8  w-full items-start bg-white">
        <Card className="flex gap-3 w-2/5 flex-col border-2 border-primary-main p-4 py-10">
          <FormControl className="" fullWidth>
            {/* <InputLabel id="demo-simple-select-label">
              Select Budget Type
            </InputLabel> */}
            <Typography className="ml-2">Budget Type</Typography>
            <TextField
              variant="outlined"
              className="bg-white border-2 border-primary-main rounded-full"
              // label="Field 1"
              value="Capital"
              name=""
              // value={procurements?.referenceNumber?.toUpperCase()}
              onChange={handleChange}
              fullWidth
              // placeholde
              // r="Subject"
            />
          </FormControl>
          <FormControl className="mt-5" fullWidth>
            <Typography className="ml-2">Budget Item</Typography>

            {/* <InputLabel id="demo-simple-select-label">
              Select Budget Item Category
            </InputLabel> */}
            <TextField
              variant="outlined"
              className="bg-white border-2 border-primary-main rounded-full"
              // label="Field 1"
              value={procurements?.budgetTypeName}
              name=""
              // value={procurements?.referenceNumber?.toUpperCase()}
              onChange={handleChange}
              fullWidth
              // placeholde
              // r="Subject"
            />
          </FormControl>
          {/* <FormControl className="mt-5" fullWidth>
           
            <Typography className="ml-2">Available Budget Amount</Typography>

            <TextField
              variant="outlined"
              className="bg-white border-2 border-primary-main rounded-full"
              value={procurements?.financialImplication}
              name=""
              onChange={handleChange}
              fullWidth
              
            />
          </FormControl> */}
        </Card>
        <div className="w-full">
          <div className="w-full">
            <div class="flex gap-3 items-center  mb-8">
              <img src={vector} />
              <Typography className="text-primary-main font-bold text-xl">
                {procurements?.title?.toUpperCase()}
              </Typography>
            </div>
            <Card className="flex gap-3 flex-col">
              <div>
                <Typography className="text-[#3C7E2D] ml-3 text-lg font-bold">
                  Transaction ID/Reference No.
                </Typography>
                <TextField
                  variant="outlined"
                  className="bg-white border-2 border-primary-main rounded-full"
                  // label="Field 1"
                  name="subject"
                  value={procurements?.referenceNumber?.toUpperCase()}
                  onChange={handleChange}
                  fullWidth
                  placeholde
                  r="Subject"
                />
              </div>
              <div>
                <Typography className="text-[#3C7E2D] ml-3 text-lg font-bold">
                  From
                </Typography>
                <TextField
                  variant="outlined"
                  className="bg-white border-2 border-primary-main rounded-full"
                  // label="From"
                  name="From:"
                  value={procurements?.createdBy?.toUpperCase()}
                  // onChange={handleChange}
                  fullWidth
                  placeholder="From:"
                />
              </div>
              <div className="flex gap-6 items-center">
                <div className="w-full">
                  <Typography className="text-[#3C7E2D] ml-3 text-lg font-bold">
                    MDA
                  </Typography>

                  <TextField
                    variant="outlined"
                    className="bg-white border-2 border-primary-main rounded-full"
                    // label="Field 1"
                    name="MDA:"
                    value={procurements?.mda?.name}
                    // onChange={handleChange}
                    fullWidth
                    placeholder="From:"
                  />
                </div>
              </div>
              <div>
                <Typography className="text-[#3C7E2D] ml-3 text-lg font-bold">
                  To
                </Typography>
                <TextField
                  variant="outlined"
                  className="bg-white border-2 border-primary-main rounded-full"
                  // label="Field 1"
                  name="To:"
                  value={procurements?.recipient?.name}
                  // onChange={handleChange}
                  fullWidth
                  placeholder="To:"
                />
              </div>

              <div>
                <Typography className="font-bold text-primary-main">
                  Project Description
                </Typography>
                <Typography className="p-2 border border-primary-main rounded">
                  {/* {procurements?.description} */}
                  {parser(procurements?.description + "")}
                </Typography>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <div>
        <div>
          <div className="w-full mt-7">
            {" "}
            <div className="bg-primary-light p-4 w-full flex justify-between  border-[#3C7E2D]/20 border-t-2 border-b-2 mb-3">
              <Typography className="font-bold">Approval Journey</Typography>
              {/* <Button className="font-bold bg-[#3C7E2D]">Collapse</Button> */}
            </div>
            <div className="w-4/5 border-[#3C7E2D] border-b-2 border">
              <div>
                <Typography className="p-2 font-black">
                  Approving Officers Comment
                </Typography>
                <div className="grid grid-cols-12">
                  {/* <div className="flex gap-5"> */}
                  <Typography className="col-span-4 p-2 bg-primary-light font-bold">
                    Assigned Officers
                  </Typography>
                  <Typography className="col-span-2 p-2 bg-primary-light font-bold">
                    In Tray
                  </Typography>
                  <Typography className="col-span-2 p-2 bg-primary-light font-bold">
                    Out Tray
                  </Typography>
                  <Typography className="col-span-2 p-2 bg-primary-light font-bold">
                    Approval Status
                  </Typography>
                  <Typography className="col-span-2 p-2 bg-primary-light font-bold">
                    Comment
                  </Typography>
                  <Typography className="col-span-2 p-2 bg-primary-light font-bold">
                    Signature
                  </Typography>
                  {/* </div> */}
                </div>
                {procurements?.approvers?.map((e) => (
                  <div className="grid grid-cols-12 p-3  border-b-2 border-[#3C7E2D]/20">
                    <div className="flex items-center gap-2 col-span-4">
                      <Avatar />
                      <div>
                        <Typography>{e?.name}</Typography>
                        <Typography className="text-ssm text-[#A39C9C]">
                          ######
                        </Typography>
                      </div>
                    </div>
                    <div className="col-span-2">
                      <Typography>
                        {e?.receivedDate
                          ? moment(e?.receivedDate).format("ll")
                          : "Awaiting"}
                      </Typography>
                      <Typography className="text-ssm text-[#A39C9C]">
                        {timeConversion(
                          moment(new Date()).diff(e?.receivedDate)
                        )}
                      </Typography>
                    </div>
                    <div className="col-span-2">
                      <Typography>
                        {e?.modifiedAt
                          ? moment(e?.modifiedAt).format("ll")
                          : "Awaiting"}
                      </Typography>
                      <Typography className="text-ssm text-[#A39C9C]">
                        {timeConversion(moment(new Date()).diff(e?.modifiedAt))}
                      </Typography>
                    </div>
                    <div className="col-span-2 pl-4 ">
                      <div className="flex items-center gap-2">
                        {e?.approvalStatus.toUpperCase() == "APPROVED" && (
                          <div className="p-2 bg-green-500 rounded-full"></div>
                        )}
                        {e?.approvalStatus.toUpperCase() == "PENDING" && (
                          <div className="p-2 bg-yellow-400 rounded-full"></div>
                        )}
                        <Typography>
                          {e?.approvalStatus?.toUpperCase()}
                        </Typography>
                      </div>
                    </div>
                    <div className="col-span-2 pl-4">
                      <Typography>{e?.comments}</Typography>
                    </div>
                    <div className="col-span-2 pl-4">
                      <img src={e?.signature} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProcurementDetails;
