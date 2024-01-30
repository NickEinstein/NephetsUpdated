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
import Checkbox from "@mui/material/Checkbox";

import STBDisplay from "features/Compliance/STBMainDisplay";

import {
  Autocomplete,
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
import {
  AccountCircle,
  BackspaceTwoTone,
  DeleteOutlineOutlined,
  Wallet,
} from "@mui/icons-material";
import ToDoorSearch from "common/ToDoorSearch";
import { post, get, put } from "services/fetch";
import SuperAdminApi from "apis/UserApi";
import vector from "images/Vector.svg";
import cert from "images/Certificate of Compliance.png";
import ProcurementApi from "apis/ProcurementApi.js";
import moment from "moment";
import ComplianceApi from "apis/ComplianceApi.js";
import STBMain from "./STBMain";
import EXCOREQ from "features/procurementRequest/EXCOREQ";
import docIcon from "images/DocuploadIcon.svg";
import ServicesApi from "apis/ServicesApi";
import useLogout from "hooks/useLogout";
import MuiDialog from "common/CustomDialog";
import ProcurementDocument from "common/ProcurementCertificate";
import LoadingModalEdoGov from "common/LoadingModalEdoGov";

function ComplianceDetails(props) {
  const user = useAuthUser();
  const { logout } = useLogout();

  const { enqueueSnackbar } = useSnackbar();
  const [current, setCurrent] = React.useState(false);
  const [excoPayload, setExcoPayload] = React.useState();
  const [mda, setmda] = React.useState();
  const [tempIds, settempIds] = React.useState(0);

  const [through, setthrough] = React.useState([]);
  const [standardApprovers, setstandardApprovers] = React.useState([]);
  const [stbArray, setStbArray] = React.useState([]);
  const [show, setshow] = React.useState(false);
  const [showSTBDisplay, setshowSTBDisplay] = React.useState(false);
  const [filtered, setFiltered] = React.useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const history = useNavigate();

  // const authUser = useAuthUser();
  const { id } = useParams();

  const getMdas = ServicesApi.useGetMdasQuery({});
  const mdas = getMdas?.data || [];
  const getEmployee = ServicesApi.useGetEmployeesQuery({
    id: mda,
  });
  const employees = getEmployee?.data || [];

  const getprocurements = ComplianceApi.useGetComplianceRequestQuery({
    id,
  });
  const procurements = getprocurements?.data;

  const [approveComplianceMutation, approveComplianceMutationResult] =
    ComplianceApi.useApproveComplianceRequestMutation();

  const [addComplianceSTBDecision, addComplianceSTBDecisionResult] =
    ComplianceApi.useComplianceSTBDecisionMutation();

  const [addComplianceExcoConclusion, addComplianceExcoConclusionResult] =
    ComplianceApi.useComplianceExcoConclusionMutation();

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  function numberWithCommas(x) {
    // serPrice.value = x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //  formState.target_amount=cleanupNumber(serPrice.value)
    return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const [comment, setComment] = React.useState();

  const handleChange = (event) => {};

  const redirect = useNavigate();

  const todeleteApprovers = (idx) => {
    let temp = through?.filter((e) => e.key !== idx);
    setthrough(temp);
  };

  const timeConversion = (difference) => {
    const duration = moment.duration(+difference);
    const hours = Math.floor(duration?.asHours());
    const minutes = Math.floor(duration?.asMinutes()) % 60;
    const days = Math.floor(duration?.asDays());

    // Set the formatted difference in the state
    // return (`${days}`);
    return `${hours} hours and ${minutes} minutes ago`;
  };

  const submitStbDecisions = async () => {
    try {
      // setIsLoading(true);
      const data = await addComplianceSTBDecision({
        data: stbArray,
      }).unwrap();

      console.log(data);
      // TODO extra login
      // setIsLoading(false);
      if (data.data) {
        enqueueSnackbar("Compliance Request Successfully Approved", {
          variant: "success",
        });

        // return true

        onSubmit("approved");

        // submitStbDecisions();
      }
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

  const submitExcoConclusions = async () => {
    console.log(excoPayload);
    try {
      // setIsLoading(true);
      const data = await addComplianceExcoConclusion({
        data: excoPayload,
      }).unwrap();

      console.log(data);
      // TODO extra login
      // setIsLoading(false);
      if (data.data) {
        enqueueSnackbar("Compliance Request Successfully Approved", {
          variant: "success",
        });

        // return true

        onSubmit("approved");

        // submitStbDecisions();
      }
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

  const onSubmit = async (action) => {
    // submitStbDecisions();
    let payload = {
      requestId: +id,
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
      const data = await approveComplianceMutation({
        data: { ...payload },
      }).unwrap();

      console.log(data);
      // TODO extra login
      // setIsLoading(false);
      if (data.data) {
        enqueueSnackbar("Compliance Request Successfully Approved", {
          variant: "success",
        });

        if (localStorage.getItem("fromdashboard") == "true") {
          logout();
          // localStorage.clear();

          // console.log(push);
          history(RouteEnum.HOME);
        } else {
          redirect(RouteEnum.COMPLIANCE_REVIEW);
        }
      }

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

  const stbData = (data) => {
    setStbArray(data);
  };

  const handleAllSubmissions = () => {
    if (user.isSTB) {
      submitStbDecisions("Approved");
    }
    if (user.isEXCO) {
      submitExcoConclusions("approved");
    } else onSubmit("approved");
  };

  const excoData = (payload) => {
    setExcoPayload(payload);
    console.log(payload);
    // props.getExcoInfo(payload);
  };

  return (
    <div class="w-full">
      {!procurements ? (
        <LoadingModalEdoGov />
      ) : (
        <div className="w-full ">
          <div
            onClick={() => redirect(-1)}
            className="p-5 flex items-center gap-2 cursor-pointer absolute right-10 top-24"
          >
            <BackspaceTwoTone /> <Typography>Back</Typography>
          </div>
          <div class="flex gap-8  w-full items-start bg-white">
            <Card className="flex gap-3 w-2/5 flex-col">
              <div className="border-2 border-primary-main flex gap-3 flex-col  p-4 py-10 w-full">
                <div>
                  <Typography className="text-[#3C7E2D] ml-3 text-base font-bold">
                    Budget Type
                  </Typography>
                  <TextField
                    variant="outlined"
                    className="bg-white border-2 border-primary-main rounded-full"
                    // label="Field 1"
                    // name="subject"
                    value={procurements?.budgetTypeName?.toUpperCase()}
                    onChange={handleChange}
                    fullWidth
                  />
                </div>
                <div>
                  <Typography className="text-[#3C7E2D] ml-3 text-base font-bold">
                    Cost Implication
                  </Typography>
                  <TextField
                    variant="outlined"
                    className="bg-white border-2 border-primary-main rounded-full"
                    // label="Field 1"
                    // name="subject"
                    value={numberWithCommas(procurements?.costImplication)}
                    // onChange={handleChange}
                    fullWidth
                  />
                </div>
              </div>
              <div className="relative cursor-pointer group ">
                <img src={cert} />
                <div className=" z-[100]">
                  <div className="hover:bg-black p-4 absolute top-0 bottom-0 flex justify-center items-center left-0 right-0 op hover:opacity-30 z-[10]"></div>
                  <Button
                    onClick={handleOpenDialog}
                    className="bg-primary-main hidden group-hover:block z-[20] bottom-1/2 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white"
                  >
                    Click to View
                  </Button>
                </div>
              </div>
              {/* <Button
                variant="outlined"
                className="bg-[#E8FFDA] border-[#3C7E2D] h-12 mt-5 text-black w-full px-8 "
              >
                View Approved Initiatives
              </Button> */}
              {/* <Typography className="text-center mt-5">
              Additional Supporting Document
            // </Typography>
            <img src={cert} /> */}
            </Card>
            <div className="w-full">
              <div className="w-full">
                <div class="flex gap-3 items-center  mb-8">
                  <img src={vector} />
                  <Typography className="text-primary-main font-bold text-xl">
                    {procurements?.subject?.toUpperCase()}
                  </Typography>
                </div>
                <Card className="flex gap-3 flex-col">
                  <div>
                    <div className="flex flex-col gap-4">
                      <Typography className="text-[#3C7E2D] ml-3 mb-4 text-lg font-bold">
                        Enter Vendor Details
                      </Typography>
                      <div>
                        <Typography className="text-[#3C7E2D] ml-3 text-lg font-bold">
                          Vendor Name
                        </Typography>
                        <TextField
                          variant="outlined"
                          className="bg-white border-2 border-primary-main rounded-full"
                          // label="Vendor Name"
                          name="vendorName"
                          value={procurements?.vendor}
                          onChange={handleChange}
                          fullWidth
                          placeholder="Vendor Name"
                        />
                      </div>
                      <div>
                        <Typography className="text-[#3C7E2D] ml-3 text-lg font-bold">
                          Vendor Address
                        </Typography>
                        <TextField
                          variant="outlined"
                          className="bg-white border-2 border-primary-main rounded-full"
                          // label="Vendor Company Address"
                          name="vendorCompanyAddress"
                          value={procurements?.companyAddress}
                          onChange={handleChange}
                          fullWidth
                          placeholder="Vendor Company Address"
                        />
                      </div>
                      <div className="w-full">
                        {/* <Typography className="text-[#3C7E2D] ml-3 text-lg font-bold">
                              Transaction ID/Reference No.
                            </Typography> */}
                        <Typography className="text-[#3C7E2D] ml-3 text-lg font-bold">
                          Service Description
                        </Typography>
                        <TextField
                          variant="outlined"
                          className="bg-white border-2 border-primary-main rounded-lg w-full"
                          // label="Service Description"
                          multiline
                          rows={2}
                          name="serviceDescription"
                          value={procurements?.serviceDescription?.toUpperCase()}
                          onChange={handleChange}
                          fullWidth
                          placeholde
                          // r="Subject"
                        />
                      </div>
                      <div>
                        <Typography className="text-[#3C7E2D] ml-3 text-lg font-bold">
                          Project Duration
                        </Typography>
                        <TextField
                          type="text"
                          variant="outlined"
                          className="bg-white border-2 border-primary-main rounded-lg w-full "
                          // label="Contract Duration"
                          name="contractDuration"
                          value={`${procurements?.projectDuration} `}
                          onChange={handleChange}
                          fullWidth
                          placeholde
                          // r="Subject"
                        />
                      </div>
                    </div>
                    {/* <img src={cert}/> */}
                  </div>
                  <Divider className="my-8" />
                  <div>
                    <Typography className="text-[#3C7E2D] ml-3 text-lg font-bold">
                      Transaction ID/Reference No.
                    </Typography>
                    <TextField
                      variant="outlined"
                      className="bg-white border-2 border-primary-main rounded-full"
                      // label="Field 1"
                      // name="subject"
                      value={procurements?.requisitionId?.toUpperCase()}
                      onChange={handleChange}
                      fullWidth
                    />
                  </div>
                  <div class="flex gap-6">
                    <div className="w-full">
                      <Typography className="text-[#3C7E2D] ml-3 text-lg font-bold">
                        From
                      </Typography>
                      <TextField
                        variant="outlined"
                        className="bg-white border-2 border-primary-main rounded-full"
                        // label="From"
                        name="From:"
                        value={procurements?.initiator?.toUpperCase()}
                        // onChange={handleChange}
                        fullWidth
                        placeholder="From:"
                      />
                    </div>
                    {/* <div className="w-full">
                    <Typography className="text-[#3C7E2D] ml-3 text-lg font-bold">
                      To
                    </Typography>
                    <TextField
                      variant="outlined"
                      className="bg-white border-2 border-primary-main rounded-full"
                      // label="Field 1"
                      name="To:"
                      value={procurements?.to}
                      // onChange={handleChange}
                      fullWidth
                      placeholder="To:"
                    />
                  </div> */}
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
                        value={procurements?.mdaName}
                        // onChange={handleChange}
                        fullWidth
                        placeholder="From:"
                      />
                    </div>
                  </div>
                  <div>
                    <Typography className="font-bold text-primary-main">
                      Project Description
                    </Typography>
                    <Typography className="p-2 border border-primary-main rounded">
                      {procurements?.details}
                    </Typography>
                  </div>
                  <div>
                    <Typography>Initiator's Documents</Typography>
                    {procurements?.documents.map((e) => (
                      <div className="flex flex-col gap-2 items-start mt-4">
                        <div className="flex gap-2 items-center">
                          <img src={docIcon} />{" "}
                          <a
                            className="font-bold text-purple-400 text-base"
                            target="_blank"
                            href={e?.docPath}
                          >
                            {e?.docName}
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* <TextField
                  variant="outlined"
                  className="bg-white border-2 border-primary-main rounded-full"
                  // label="Field 1"
                  name="Project Description:"
                  value={procurements?.description}
                  onChange={handleChange}
                  multiline
                  rows={3}
                  fullWidth
                  placeholder="Project Description:"
                /> */}
                  {/* <TextField
                  variant="outlined"
                  // color="error"
                  className="bg-white border border-2 border-primary-main rounded-full"
                  // label="Field 1"
                  name="Approval Details "
                  value={procurements?.approvaldetails}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  fullWidth
                  placeholder="Approval Details "
                /> */}
                </Card>
              </div>
            </div>
          </div>
          {procurements?.stbDecisions.length > 0 && (
            <div className="w-full items-center flex justify-center mt-8">
              <Button
                className={
                  !showSTBDisplay
                    ? "bg-yellow-300 text-black mx-auto h-16"
                    : "h-16 mb-8"
                }
                onClick={() => {
                  setshowSTBDisplay(!showSTBDisplay);
                }}
              >
                {!showSTBDisplay ? "Display" : "Collapse"} STB Findings
              </Button>
            </div>
          )}
          {showSTBDisplay && (
            <div>
              <STBDisplay dataz={procurements?.stbDecisions} />
            </div>
          )}
          <div>
            <div>
              <div className="w-full mt-7">
                {" "}
                <div className="bg-primary-light p-4 w-full flex justify-between  border-[#3C7E2D]/20 border-t-2 border-b-2 mb-3">
                  <Typography className="font-bold">
                    Approval Journey
                  </Typography>
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
                      {/* </div> */}
                    </div>
                    {procurements?.approvers?.map((e) => (
                      <div className="grid grid-cols-12 p-3  border-b-2 border-[#3C7E2D]/20">
                        <div className="flex items-center gap-2 col-span-4">
                          <Avatar />
                          <div>
                            <Typography>{e?.approverName}</Typography>
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
                            {timeConversion(
                              moment(new Date()).diff(e?.modifiedAt)
                            )}
                          </Typography>
                        </div>
                        <div className="col-span-2 pl-4 ">
                          <div className="col-span-2 pl-4 ">
                            <div className="flex items-center gap-2">
                              {e?.approvalStatus.toUpperCase() ==
                                "APPROVED" && (
                                <div className="p-2 bg-green-500 rounded-full"></div>
                              )}
                              {(e?.approvalStatus.toUpperCase() == "PENDING" ||
                                e?.approvalStatus == 0 ||
                                e?.approvalStatus == 3) && (
                                <div className="p-2 bg-yellow-400 rounded-full"></div>
                              )}
                              <Typography>
                                {e?.approvalStatus == 0 ||
                                e?.approvalStatus == 3
                                  ? "PENDING"
                                  : e?.approvalStatus?.toUpperCase()}
                              </Typography>
                            </div>
                          </div>
                        </div>
                        <div className="col-span-2 pl-4">
                          <Typography>{e?.comments}</Typography>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-8">
                {user?.isSTB && (
                  <STBMain stbData={stbData} procurements={procurements} />
                )}
                {user?.isEXCO && (
                  <EXCOREQ excoData={excoData} procurements={procurements} />
                )}
              </div>
              {/* <div className="w-full mt-7">
              <div className="bg-primary-light p-2 w-full flex justify-between">
                <Typography className="font-bold">Assign Memo</Typography>
                <Button className="font-bold bg-[#3C7E2D]">Collapse</Button>
              </div>
              <div className="w-4/5 flex flex-col gap-4">
                <TextField
                  variant="outlined"
                  className="bg-white border-2 border-primary-main rounded-full"
                  name="Select "
                  value={formData.quantity}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  fullWidth
                  placeholder="Approval Assignee "
                />
                <TextField
                  variant="outlined"
                  className="bg-white border-2 border-primary-main rounded-full"
                  name="Details "
                  onChange={handleChange}
                  multiline
                  rows={4}
                  fullWidth
                  placeholder="Details "
                />
                <Button className="p-3 text-base font-bold">
                  Submit Details
                </Button>
              </div>
            </div> */}
              <div className=" w-full mt-8">
                <div
                  onClick={() => setCurrent((prev) => !prev)}
                  className={`${
                    !current ? "bg-primary-light" : "bg-yellow-200"
                  } p-4 border-t-2 border-b-2 w-full flex justify-between cursor-pointer`}
                >
                  <Typography className="font-bold">Send For Review</Typography>
                  {/* <Button className="font-bold bg-[#3C7E2D]">Collapse</Button> */}
                </div>
                {current && (
                  <div>
                    <div class="flex gap-6 mt-4">
                      <div className="w-full">
                        {/* <Typography>MDA</Typography> */}
                        <FormControl className="" fullWidth>
                          {/* <InputLabel id="demo-simple-select-label">
                              Select Budget Item Category
                            </InputLabel> */}
                          <Autocomplete
                            className=" m-2"
                            disablePortal
                            // name="mda"
                            // label="MDA"
                            onChange={(event, newValue) => setmda(newValue.id)}
                            // id="combo-box-demo"
                            options={mdas?.map((e) => ({
                              label: e?.name,
                              id: e?.id,
                              key: e.id,
                            }))}
                            sx={{ width: 300 }}
                            renderInput={(params) => (
                              <TextField {...params} label="MDA" />
                            )}
                          />
                        </FormControl>
                      </div>
                      <div className="w-full">
                        {/* <Typography>Through</Typography> */}
                        <Autocomplete
                          className=" m-2"
                          disablePortal
                          // multiple={}
                          // name="through"
                          onChange={(event, newValue) => {
                            setthrough([
                              ...through,
                              {
                                id: 0,
                                key: tempIds + 1,
                                sequence: 0,
                                procurementRequestId: 0,
                                comments: "",
                                approvalStatus: "",
                                signature: "",
                                signature64: "",
                                name: newValue.label,
                                userId: newValue.id,
                                actionTaken: "",
                                mdaId: 1,
                                createdAt: "2023-12-20T14:23:31.234Z",
                                receivedDate: "2023-12-20T14:23:31.235Z",
                                modifiedAt: "2023-12-20T14:23:31.235Z",
                                createdBy: 0,
                                modifiedBy: 0,
                                isDelete: false,
                              },
                            ]);
                            settempIds((prev) => prev + 1);
                          }}
                          // onChange={(event, newValue) => handleChangez(event, newValue)}
                          // id="combo-box-demo"
                          options={employees?.map((e) => ({
                            label: e?.name,
                            id: e?.id,
                          }))}
                          sx={{ width: 300 }}
                          renderInput={(params) => (
                            <TextField {...params} label="Assignees" />
                          )}
                        />
                        <div className="items-center">
                          {[...through, ...standardApprovers].map((e, idx) => (
                            <div className="bg-[#E8FFDA] flex justify-between p-4 mb-1">
                              <Typography>{e.name}</Typography>
                              <div class="flex gap-3 items-center">
                                {/* <Typography>Assigner {idx + 1}</Typography> */}
                                {
                                  <DeleteOutlineOutlined
                                    onClick={() => todeleteApprovers(e?.key)}
                                    sx={{ fontSize: 26 }}
                                    className="text-red-500 cursor-pointer"
                                  />
                                }
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div class=" w-full justify-start mt-4">
                      <Typography className="text-primary-main font-bold text-xl">
                        Input Comment
                      </Typography>
                      <TextField
                        variant="outlined"
                        // color="error"
                        className="bg-white border-2 border-primary-main rounded-full"
                        // label="Field 1"
                        name="Details "
                        // value={formData.quantity}
                        onChange={(e) => setComment(e?.target.value)}
                        multiline
                        rows={4}
                        fullWidth
                        placeholder="Details "
                      />
                      <Button
                        // onClick={() => approveProcurementMethod("assigned")}
                        className="px-12 w-1/4 py-3 mt-4 text-base font-bold"
                      >
                        Send For Review
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              <div className="w-full mt-7">
                <div className="bg-primary-light p-4 border-t-2 border-b-2 w-full flex justify-between">
                  <Typography className="font-bold">Take Action</Typography>
                  {/* <Button className="font-bold bg-[#3C7E2D]">Collapse</Button> */}
                </div>
                <div className="w-4/5 flex flex-col gap-4">
                  <Typography>Input your comments</Typography>
                  <TextField
                    variant="outlined"
                    // color="error"
                    className="bg-white border-2 border-primary-main rounded-full"
                    // label="Field 1"
                    name="Details "
                    // value={formData.quantity}
                    onChange={(e) => setComment(e?.target.value)}
                    multiline
                    rows={4}
                    fullWidth
                    placeholder="Details "
                  />
                  <div className="flex gw-full gap-4">
                    {/* <Button className="bg-[#3C7E2D]/60 w-full p-3 text-base font-bold">
                    Select an Action
                  </Button> */}
                    <Button
                      onClick={() => handleAllSubmissions("approved")}
                      className=" w-full p-3 text-base font-bold"
                    >
                      Approve
                    </Button>{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <MuiDialog
            isOpen={isDialogOpen}
            onClose={handleCloseDialog}
            contentComponent={
              <ProcurementDocument procurementData={procurements} />
            }
          />
        </div>
      )}
    </div>
  );
}

export default ComplianceDetails;
