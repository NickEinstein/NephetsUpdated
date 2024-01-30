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
import docIcon from "images/DocuploadIcon.svg";
import parser from "html-react-parser";

import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

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
  Paper,
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
  // Logout,
  Wallet,
} from "@mui/icons-material";
import ToDoorSearch from "common/ToDoorSearch";
import { post, get, put } from "services/fetch";
import SuperAdminApi from "apis/UserApi";
import vector from "images/Vector.svg";
import ExpenseStepper from "common/ExpenseStepper";
import ProcurementApi from "apis/ProcurementApi.js";
import moment from "moment";
import ServicesApi from "apis/ServicesApi";
import FileUploadComponent from "common/FileUploadComponent";
import LoadingModalEdoGov from "common/LoadingModalEdoGov";
import useLogout from "hooks/useLogout";

function ProcurementDetails(props) {
  const { logout } = useLogout();

  const user = useAuthUser();
  const { enqueueSnackbar } = useSnackbar();

  const [onEdit, setOnEdit] = React.useState(true);
  const [procurementMethodString, setprocurementMethodString] =
    React.useState();
  const [current, setCurrent] = React.useState(false);
  const [filtered, setFiltered] = React.useState([]);
  const [mda, setmda] = React.useState();
  const [tempIds, settempIds] = React.useState(0);
  const [documentFiles, setDocumentFiles] = React.useState([]);

  const [through, setthrough] = React.useState([]);
  const [standardApprovers, setstandardApprovers] = React.useState([]);
  const [formData, setFormData] = React.useState({});

  const history = useNavigate();

  const authUser = useAuthUser();
  const { id } = useParams();

  const getprocurements = ProcurementApi.useGetprocurementByIdQuery({
    id,
  });
  const procurements = getprocurements?.data?.data;

  const getMdas = ServicesApi.useGetMdasQuery({});
  const mdas = getMdas?.data || [];
  const getEmployee = ServicesApi.useGetEmployeesQuery({
    id: mda,
  });
  const employees = getEmployee?.data || [];

  const [
    processProccurementMethodMutation,
    processProcurementMethodMutationResult,
  ] = ProcurementApi.useSubmitProcurementMethodMutation();
  // console.log(procurements);

  const [approveProccurementMutation, approveProcurementMutationResult] =
    ProcurementApi.useApproveProcurementRequestMutation();

  const getAssignerEnquiry = ProcurementApi.useGetAssignerEnquiryQuery({
    id,
  });
  const assignerEnquiry = getAssignerEnquiry?.data?.data;

  const getAssignerEnquiryById = ProcurementApi.useGetAssignerEnquiryByIdQuery({
    id,
  });
  const assignerEnquiryById = getAssignerEnquiryById?.data?.data?.items;
  const enquiry = getAssignerEnquiryById?.data?.data;

  const getProcurementMethodTypesz =
    ProcurementApi.useGetProcurementMethodTypesQuery({
      // id: mda,
    });
  const procurementMethodTypesz = getProcurementMethodTypesz?.data?.data || [];

  // console.log(getAssignerEnquiryById?.data?.data?.items)

  function numberWithCommas(x) {
    // serPrice.value = x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //  formState.target_amount=cleanupNumber(serPrice.value)
    return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const [comment, setComment] = React.useState();

  const handleChange = (event, newValue) => {
    console.log(newValue);
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

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
  const todeleteApprovers = (idx) => {
    console.log(idx);
    console.log(through);
    let temp = through?.filter((e) => e.key !== idx);
    setthrough(temp);
  };
  const procurementMethodData = [...procurementMethodTypesz];

  const approveProcurementMethod = async (action) => {
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
      assignees: [...through, ...standardApprovers].map((e) => ({
        assigneeId: e?.userId,
        assignerId: user?.id,
        procurementRequestId: +id,
        comment: comment,
      })),
    };

    console.log(payload);
    try {
      // setIsLoading(true);
      const data = await approveProccurementMutation({
        data: { ...payload },
      }).unwrap();

      console.log(data);
      // TODO extra login
      // setIsLoading(false);
      if (data.data) {
        enqueueSnackbar("Procurement Method Successfully Processed", {
          variant: "success",
        });

        if (localStorage.getItem("fromdashboard") == "true") {
          // alert('huu')
          logout();
          history(RouteEnum.HOME);
        } else {
          redirect(RouteEnum.PROCUREMENT_REVIEW);
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

  const handleFileChange = (fileData, name) => {
    setDocumentFiles([
      ...documentFiles,
      { key: fileData?.doclink, name: name, path: fileData?.doclink },
    ]);
    // Handle the selected file, for example, you can upload it to a server
    // console.log('Selected File:', file);
  };

  const onSubmit = async (action) => {
    // procurementMethod: procurementMethodData.find(
    //   (e) => e.id == procurementMethodString
    // ).name,
    // procurementMethodId: procurementMethodString,
    let payload = {
      requisitionId: procurements?.referenceNumber,
      subject: procurements?.title,
      procurementMethod: procurementMethodString
        ? procurementMethodData.find((e) => e.id == procurementMethodString)
            .name
        : procurements?.procurementMethod,
      procurementMethodId: procurementMethodString
        ? procurementMethodString
        : procurements?.procurementMethodId,
      serviceDescription:
        formData.serviceDescription || procurements?.serviceDescription,
      status: 3,
      mdaId: user.mdaId,
    };

    try {
      // setIsLoading(true);
      const data = await processProccurementMethodMutation({
        data: { ...payload },
      }).unwrap();

      console.log(data);
      // TODO extra login
      // setIsLoading(false);
      if (data.data) {
        enqueueSnackbar("Procurement Method Successfully Processed", {
          variant: "success",
        });
        approveProcurementMethod(action);
      }
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

  const todeleteImages = (idx) => {
    let temp = documentFiles?.filter((e) => e.key !== idx);
    setDocumentFiles(temp);
  };
  return (
    <div>
      {!procurements ? (
        <div>
          <LoadingModalEdoGov />
        </div>
      ) : (
        <div className="w-full ">
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
                {!onEdit && (
                  <Paper elevation={3} className="mb-5 p-5 bg-[#3C7E2D]/20">
                    <div class="flex justify-between mb-4">
                      <Typography className="text-[#3C7E2D] ml-3 text-lg font-bold">
                        Edit
                      </Typography>
                      <Button
                        onClick={() => {
                          setOnEdit((prev) => !prev);
                          setprocurementMethodString("");
                          setFormData({ ...formData, serviceDescription: "" });
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                    <div className="flex gap-6 items-center ">
                      <FormControl className="" fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Select Procurement Method
                        </InputLabel>
                        <Select
                          // labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          label="Select Procurement Methid "
                          // variant="standard"
                          onChange={(e) =>
                            setprocurementMethodString(e.target.value)
                          }
                        >
                          {procurementMethodData.map((e) => (
                            <MenuItem value={e?.id}> {e?.name}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <div className="w-full">
                        {/* <Typography className="text-[#3C7E2D] ml-3 text-lg font-bold">
                              Transaction ID/Reference No.
                            </Typography> */}
                        <TextField
                          variant="outlined"
                          className="bg-white border-2 border-primary-main rounded-lg w-full"
                          label="Service Description"
                          multiline
                          rows={2}
                          name="serviceDescription"
                          value={formData?.serviceDescription}
                          onChange={handleChange}
                          fullWidth
                          placeholde
                          // r="Subject"
                        />
                      </div>
                    </div>
                  </Paper>
                )}
                {onEdit && (
                  <Paper elevation={3} className="mb-5 p-5">
                    <div class="flex justify-between">
                      <Typography className="text-[#3C7E2D] ml-3 text-lg font-bold">
                        This section is editable
                      </Typography>
                      <Button onClick={() => setOnEdit((prev) => !prev)}>
                        Edit
                      </Button>
                    </div>
                    <div className="flex gap-6 items-center ">
                      <div className="w-full">
                        <Typography className="ml-3">
                          Procurement Method
                        </Typography>
                        <TextField
                          variant="outlined"
                          className="bg-white border-2 border-primary-main rounded-lg w-full"
                          // label="Service Description"
                          multiline
                          rows={2}
                          name="procurementMethod"
                          value={procurements?.procurementMethod}
                          onChange={handleChange}
                          fullWidth
                          placeholde
                          // r="Subject"
                        />
                      </div>
                      <div className="w-full">
                        {/* <Typography className="text-[#3C7E2D] ml-3 text-lg font-bold">
                              Transaction ID/Reference No.
                            </Typography> */}
                        <Typography className="ml-3">
                          Service Description
                        </Typography>
                        <TextField
                          variant="outlined"
                          className="bg-white border-2 border-primary-main rounded-lg w-full"
                          // label="Service Description"
                          multiline
                          rows={2}
                          name="serviceDescription"
                          value={
                            procurements?.serviceDescription ||
                            formData?.serviceDescription
                          }
                          onChange={handleChange}
                          fullWidth
                          placeholde
                          // r="Subject"
                        />
                      </div>
                    </div>
                  </Paper>
                )}
                <Card className="flex gap-3 flex-col">
                  <div>
                    <Typography className="text-[#3C7E2D] ml-3 text-lg font-bold">
                      Transaction ID/Reference No.
                    </Typography>
                    <TextField
                      variant="outlined"
                      className="bg-white border-2 border-primary-main rounded-full"
                      // label="Field 1"
                      // name="subject"
                      value={procurements?.referenceNumber?.toUpperCase()}
                      onChange={handleChange}
                      fullWidth
                      placeholde
                      // r="Subject"
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
                      {parser(procurements?.description)}
                    </Typography>
                  </div>
                  {/* <div>
                    <Typography className="font-bold text-primary-main">
                      Project Description
                    </Typography>
                    <Typography className="p-2 border border-primary-main rounded">
                      {procurements?.description}
                    </Typography>
                  </div> */}
                  <div className="my-4">
                    <Typography className="font-bold ml-2">
                      Attach Documents
                    </Typography>
                    <FileUploadComponent onFileChange={handleFileChange} />
                    <div className="mt-2">
                      {documentFiles.map((e) => (
                        <div class="flex justify-center space-between items-center bg-green-200 p-3 w-2/3 rounded-2xl">
                          <Typography className="  text-black font-bold rounded-full w-full">
                            {e?.name}
                          </Typography>
                          <DeleteOutlineOutlined
                            onClick={() => todeleteImages(e?.key)}
                            sx={{ fontSize: 26 }}
                            className="text-red-500 cursor-pointer"
                          />
                        </div>
                      ))}
                    </div>
                    {/* <Button>Upload Document</Button> */}
                  </div>
                  <div className="w-3/4 flex justify-between">
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
                    <div>
                      <Typography>Approver's Documents</Typography>
                      {procurements?.approverDocuments.map((e) => (
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
                  <Typography className="font-bold">
                    Approval Journey
                  </Typography>
                  {/* <Button className="font-bold bg-[#3C7E2D]">Collapse</Button> */}
                </div>
                <div className="w-10/12 border-[#3C7E2D] border-b-2 border">
                  <div>
                    <Typography className="p-2 font-black">
                      Approving Officers Comment
                    </Typography>
                    <div className="grid grid-cols-12">
                      {/* <div className="flex gap-5"> */}
                      <Typography className="col-span-3 p-2 bg-primary-light font-bold">
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
                      <Typography className="col-span-1 p-2 bg-primary-light font-bold">
                        Signature
                      </Typography>
                      {/* </div> */}
                    </div>
                    {procurements?.approvers?.map((e) => (
                      <div className="grid grid-cols-12 p-3  border-b-2 border-[#3C7E2D]/20">
                        <div className="flex items-center gap-2 col-span-3">
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
                            {timeConversion(
                              moment(new Date()).diff(e?.modifiedAt)
                            )}
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
                        <div className="col-span-1 pl-4">
                          {e?.approvalStatus.toUpperCase() == "APPROVED" && (
                            <img className="" src={e?.signature} />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
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
              <div className="flex gap-6 mt-8">
                <div className="w-full">
                  <div
                    onClick={() => setCurrent((prev) => !prev)}
                    className={`${
                      current ? "bg-primary-light" : "bg-yellow-200"
                    } p-4 border-t-2 border-b-2 w-full flex justify-between cursor-pointer`}
                  >
                    <Typography className="font-bold">Take Action</Typography>
                    {/* <Button className="font-bold bg-[#3C7E2D]">Collapse</Button> */}
                  </div>
                  {!current && (
                    <div className="w-4/5 flex flex-col gap-2 mt-6">
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
                      <div className="flex gw-full gap-4 mt-12">
                        {/* <Button className="bg-[#3C7E2D]/60 w-full p-3 text-base font-bold">
                      Select an Action
                    </Button> */}
                        <Button
                          onClick={() => onSubmit("approved")}
                          className=" w-full p-3 text-base font-bold"
                        >
                          Action
                        </Button>{" "}
                      </div>
                    </div>
                  )}
                </div>
                <div className=" w-full">
                  <div
                    onClick={() => setCurrent((prev) => !prev)}
                    className={`${
                      !current ? "bg-primary-light" : "bg-yellow-200"
                    } p-4 border-t-2 border-b-2 w-full flex justify-between cursor-pointer`}
                  >
                    <Typography className="font-bold">
                      Send For Review
                    </Typography>
                    {/* <Button className="font-bold bg-[#3C7E2D]">Collapse</Button> */}
                  </div>
                  {current && (
                    <div>
                      <div className="w-full mt-7">
                        {assignerEnquiryById?.map((items) => (
                          <div className="flex flex-col gap-3 items-start my-5 w-full mt-6 ">
                            <div className="w-1/2">
                              <Typography variant="h6">Assigner</Typography>
                              <div class="flex gap-3 w-full ">
                                <Avatar />
                                <div className="w-full">
                                  <Typography className="font-bold text-[#3c7e2d]">
                                    {items?.enquiry?.assigner}
                                  </Typography>
                                  <Typography className="">
                                    {items?.enquiry?.comments}
                                  </Typography>
                                </div>
                              </div>
                            </div>

                            <div className="w-1/2 self-end">
                              <Typography variant="h5" className="mb-2">
                                Replies
                              </Typography>
                              {items?.replies?.map((replyer) => (
                                <div className=" w-full mb-2">
                                  <div className="w-full flex flex-start gap-3">
                                    <Avatar />
                                    <div>
                                      <Typography className="font-bold text-[#3c7e2d]">
                                        {replyer?.name.toUpperCase()}
                                      </Typography>
                                      <Typography>
                                        {replyer?.comment}
                                      </Typography>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
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
                              onChange={(event, newValue) =>
                                setmda(newValue.id)
                              }
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
                            {[...through, ...standardApprovers].map(
                              (e, idx) => (
                                <div className="bg-[#E8FFDA] flex justify-between p-4 mb-1">
                                  <Typography>{e.name}</Typography>
                                  <div class="flex gap-3 items-center">
                                    {/* <Typography>Assigner {idx + 1}</Typography> */}
                                    {
                                      <DeleteOutlineOutlined
                                        onClick={() =>
                                          todeleteApprovers(e?.key)
                                        }
                                        sx={{ fontSize: 26 }}
                                        className="text-red-500 cursor-pointer"
                                      />
                                    }
                                  </div>
                                </div>
                              )
                            )}
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
                          className="bg-white -2 border-primary-main rounded-full"
                          // label="Field 1"
                          name="Details "
                          // value={formData.quantity}
                          onChange={(e) => setComment(e?.target.value)}
                          multiline
                          rows={4}
                          fullWidth
                          placeholder="Details "
                        />
                        <fiv class="w-100 flex justify-end">
                          <Button
                            onClick={() => approveProcurementMethod("assigned")}
                            className="px-12 w-2/4 py-3 mt-4 text-base font-bold"
                          >
                            Send for Review
                          </Button>
                        </fiv>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProcurementDetails;
