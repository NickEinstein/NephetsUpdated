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
import { Link, Navigate } from "react-router-dom";
import { RouteEnum } from "constants/RouteConstants";
import LoginHeader from "common/LoginHeader";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import vector from "images/Vector.svg";

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
  DeleteForeverOutlined,
  DeleteOutlineOutlined,
  Wallet,
} from "@mui/icons-material";
import SSBRequest from "./EXCOREQ";
import { post, get, put } from "services/fetch";
import SuperAdminApi from "apis/UserApi";
import MyTable from "common/MyTable";
import ExpenseStepper from "common/ExpenseStepper";
import ServicesApi from "apis/ServicesApi";
import ProcurementApi from "apis/ProcurementApi.js";
import cert from "images/Certificate of Compliance.png";
import ComplianceApi from "apis/ComplianceApi.js";
import FileUploadComponent from "common/FileUploadComponent";
import { DatePicker } from "@mui/x-date-pickers";
import ExpenseApi from "apis/ExpenseApi";
import ComplianceForIDGeneration from "features/Compliance/ComplianceForIDGeneration";

function InitiateProcurementRequest(props) {
  const { enqueueSnackbar } = useSnackbar();

  const [documentFiles, setDocumentFiles] = React.useState([]);
  const [userType, setUserType] = React.useState("");
  const [show, setshow] = React.useState(false);
  const [fromDate, setsetFromDate] = React.useState("companies");
  const [filtered, setFiltered] = React.useState([]);
  const [mda, setmda] = React.useState();
  const [employee, setemployee] = React.useState();
  const [through, setthrough] = React.useState([]);
  const [actioneBy, setactioneBy] = React.useState([]);
  const [standardApprovers, setstandardApprovers] = React.useState([]);
  const [from, setFrom] = React.useState();
  const [procurementMethodString, setprocurementMethodString] =
    React.useState();
  const [formData, setFormData] = React.useState({});

  const user = useAuthUser();

  const getMdas = ServicesApi.useGetMdasQuery({});
  const mdas = getMdas?.data || [];

  const getEmployee = ServicesApi.useGetEmployeesQuery({
    id: mda,
  });
  const employees = getEmployee?.data || []; // const getEmployeesByMda = getMdas?.data

  const getBudItemz = ExpenseApi.useGetBudgetItemzQuery({
    // id: mda,
    id: +user.mdaId,
  });
  // console.log(getBudItemz)
  const budItemz = getBudItemz?.data?.capitalExpenditure || []; // const getEmployeesByMda = getMdas?.data

  const getApprovers = ProcurementApi.useGetProcurementApproversQuery({
    // id: mda,
  });
  const approvers = getApprovers?.data?.data || [];
  const getProcurementMethodTypesz =
    ProcurementApi.useGetProcurementMethodTypesQuery({
      // id: mda,
    });
  const procurementMethodTypesz = getProcurementMethodTypesz?.data?.data || [];
  const [
    processProccurementMethodMutation,
    processProcurementMethodMutationResult,
  ] = ProcurementApi.useSubmitProcurementMethodMutation();
  // console.log(procurements);
  // console.log(approvers);

  // getProcurementApprovers;

  // useEffect(() => {
  //   approvers &&
  //     setstandardApprovers([
  //       ...standardApprovers,
  //       ...approvers?.map((newValue, idx) => ({
  //         id: 0,
  //         sequence: idx + 1,
  //         procurementRequestId: 0,
  //         comments: "",
  //         approvalStatus: "",
  //         signature: "",
  //         signature64: "",
  //         name: newValue?.approverName,
  //         userId: newValue?.userId,
  //         actionTaken: "",
  //         mdaId: newValue?.mdaId,
  //         createdAt: "2023-12-20T14:23:31.234Z",
  //         receivedDate: "2023-12-20T14:23:31.235Z",
  //         modifiedAt: "2023-12-20T14:23:31.235Z",
  //         createdBy: 0,
  //         modifiedBy: 0,
  //         isDelete: false,
  //       })),
  //     ]);
  // }, [approvers]);

  const history = useNavigate();

  // const redirect = () => {
  //   history("/complete-signUp");
  // };

  const handleChange = (event, newValue) => {
    console.log(newValue);
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const postprocurement = (status) => {
    console.log(formData);
    let payload = {
      procurement: {
        id: 0,
        to: 0,
        from: user?.id,
        subject: formData.subject,
        projectDescription: formData.approvalDetails,
        approvalDetails: formData.approvalDetails,
        budgetTypeId: 1,
        budgetTypeName: "Capital",
        costImplication: formData.costImplication,
        procurementMethodSubject: formData.procurementMethodSubject,
        procurementMethod: procurementMethodData.find(
          (e) => e.id == procurementMethodString
        )?.name,
        procurementMethodId: procurementMethodString,
        serviceDescription: formData.serviceDescription,
        urgency: 1,
        status: 2,
        documents: [...documentFiles],
        mdaId: 2,
        approvers: [
          ...through,
          // {
          //   id: 0,
          //   sequence: 1,
          //   procurementRequestId: 0,
          //   comments: "string",
          //   approvalStatus: "string",
          //   signature: "string",
          //   signature64: "string",
          //   name: "string",
          //   userId: 87,
          //   actionTaken: "string",
          //   mdaId: 2,
          //   createdAt: "2024-01-12T19:03:29.222Z",
          //   receivedDate: "2024-01-12T19:03:29.222Z",
          //   modifiedAt: "2024-01-12T19:03:29.222Z",
          //   createdBy: 86,
          //   modifiedBy: 86,
          //   isDelete: false,
          // },
        ],
      },
      compliance: {
        ...excoInfo,
        budgetTypeId: 1,
        budgetTypeName: "Capital",
        costImplication: formData.costImplication,
        from: user?.id,
      },
    };

    onSubmit(payload);
    console.log(payload);
  };
  const handleFileChange = (fileData, name) => {
    setDocumentFiles([
      ...documentFiles,
      {
        key: fileData?.doclink,
        name: name,
        path: fileData?.doclink,
      },
    ]);
    // Handle the selected file, for example, you can upload it to a server
    // console.log('Selected File:', file);
  };

  const todeleteImages = (idx) => {
    let temp = documentFiles?.filter((e) => e.key !== idx);
    setDocumentFiles(temp);
  };
  const [result, setResult] = React.useState();

  const authUser = useAuthUser();

  function numberWithCommas(x) {
    // serPrice.value = x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //  formState.target_amount=cleanupNumber(serPrice.value)
    return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const [proccurementMutation, procurementMutationResult] =
    ProcurementApi.useSubmitExistingProcurementMutation();

  const onSubmit = async (values) => {
    console.log(values);
    // localStorage.setItem("il", true);
    // redirect();
    // history('/dashboard')

    try {
      // setIsLoading(true);
      const data = await proccurementMutation({
        data: { ...values },
      }).unwrap();

      console.log(data);
      // TODO extra login
      // setIsLoading(false);
      if (data.data) {
        enqueueSnackbar("Procurement Request Successfully Sent", {
          variant: "success",
        });

        // onSubmit2();
      }
      // redirect(RouteEnum.DASHBOARD);
    } catch (error) {
      console.log(error);
      enqueueSnackbar(
        error?.data?.title || "Procurement Request Successfully Sent",
        {
          variant: "error",
        }
      );
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
  const procurementMethodData = [
    ...procurementMethodTypesz,
    // {
    //   id: 1,
    //   name: "Single sourcing",
    // },
    // {
    //   id: 2,
    //   name: "Direct sourcing",
    // },
    // {
    //   id: 3,
    //   name: "Competitive bidding",
    // },
  ];

  const onSubmit2 = async (action) => {
    // from: user?.id,
    // subject: formData.subject,
    // projectDescription: "N/A",
    // approvalDetails: formData.approvalDetails,
    // costImplication: 0,
    // urgency: 1,
    let payload = {
      requisitionId: "",
      subject: formData.subject,
      procurementMethod: procurementMethodData.find(
        (e) => e.id == procurementMethodString
      ).name,
      procurementMethodId: procurementMethodString,
      serviceDescription: formData.serviceDescription,
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
      if (data.data)
        enqueueSnackbar("Procurement Method Successfully Processed", {
          variant: "success",
        });
      // approveProcurementMethod(action);
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

  const getBudgetItem = ComplianceApi.useGetBudgetItemzQuery({});
  const budgetItem = getBudgetItem?.data?.data || [];

  const getBudgetType = ComplianceApi.useGetBudgetTypeQuery({});
  const budgetType = getBudgetType?.data?.data || [];

  const [excoInfo, setExcoInfo] = React.useState();
  const [budgettypeId, setbudgettypeId] = React.useState([]);
  const [tempIds, settempIds] = React.useState(0);

  const todeleteApprovers = (idx) => {
    console.log(idx);
    console.log(through);
    let temp = through?.filter((e) => e.key !== idx);
    setthrough(temp);
  };

  const getExcoInfo = (payload) => {
    setExcoInfo(payload.compliance);
  };

  // console.log(through);

  return (
    <div className="w-full ">
      <Typography
        variant="h3"
        className="text-primary-main text-center font-bold mb-8"
      >
        Section 1: Procurement
      </Typography>

      <div class="flex gap-8 w-full items-start bg-white">
        <Card className="flex gap-3 w-2/5 flex-col">
          <div className="border-2 border-primary-main flex gap-3 flex-col  p-4 py-10 w-full">
            <div className="w-full">
              {/* <Typography>MDA</Typography> */}
              <TextField
                variant="outlined"
                className="bg-white border-2 border-primary-main rounded-full m-2"
                label="budgetType"
                name="budgetItem"
                // disabled
                value={"Capital"}
                onChange={handleChange}
                fullWidth
                placeholder="Subject"
              />
              <FormControl className="" fullWidth>
                {/* <InputLabel id="demo-simple-select-label">
                      Select Budget Item Category
                    </InputLabel> */}
                <Autocomplete
                  className=" m-2"
                  disablePortal
                  // name="mda"
                  // label="MDA"
                  onChange={(event, newValue) => setbudgettypeId(newValue)}
                  // id="combo-box-demo"
                  options={budItemz?.map((e) => ({
                    label: e?.name,
                    id: e?.budgetItemId,
                    key: e.id,
                  }))}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Budget Item" />
                  )}
                />
              </FormControl>
              <div>
                <Typography className="text-[#3C7E2D] ml-3 text-base font-bold">
                  Available Budget Amount
                </Typography>
                <TextField
                  variant="outlined"
                  className="bg-white border-2 border-primary-main rounded-full m-2"
                  // label="Available Budget Amount"
                  // disabled
                  name="budgetItem"
                  // disabled
                  value={
                    budItemz?.find((e) => e.name === budgettypeId?.label)
                      ?.amount
                  }
                  onChange={handleChange}
                  fullWidth
                  placeholder="Available Budget Amount"
                />
              </div>

              <div className="ml-2">
                <Typography className="text-[#3C7E2D] ml-3 text-base font-bold">
                  Cost Implication
                </Typography>
                <TextField
                  variant="outlined"
                  className="bg-white border-2 border-primary-main rounded-full"
                  // label="Field 1"
                  name="costImplication"
                  value={formData?.costImplication}
                  onChange={handleChange}
                  fullWidth
                />
              </div>
            </div>
            {/* <div className="w-full">
              <FormControl className="" fullWidth>
              
                <Autocomplete
                  className=" m-2"
                  disablePortal
                  onChange={(event, newValue) => setbudgetItemId(newValue)}
                  options={budgetItem?.map((e) => ({
                    label: e?.name,
                    id: e?.id,
                    key: e.id,
                  }))}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Budget Item" />
                  )}
                />
              </FormControl>
            </div> */}
          </div>
          {/* <Button
              variant="outlined"
              className="bg-[#E8FFDA] border-[#3C7E2D] h-12 mt-5 text-black w-full px-8 "
            >
              View Approved Initiatives
            </Button> */}
          {/* <Typography className="text-center mt-5">
            Additional Supporting Document
          </Typography>
          <img src={cert} /> */}
        </Card>
        <div className="w-full">
          <div className="w-full">
            <Card className="flex gap-3 flex-col">
              <TextField
                variant="outlined"
                className="bg-white border-2 border-primary-main rounded-full mt-2"
                label="Subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                fullWidth
                placeholder="Subject"
              />
              {/* <TextField
                variant="outlined"
                className="bg-white border-2 border-primary-main rounded-full"
                label="Transaction ID/Reference Number"
                name=""
                // value={formData.quantity}
                onChange={handleChange}
                fullWidth
                placeholder="Transaction ID/Reference Number"
              /> */}
              <div class="flex gap-6">
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
                {/*  */}
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
                          key: through.length + 1,
                          sequence: through.length + 1,
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
                      <TextField {...params} label="Approvers" />
                    )}
                  />
                  <div className="items-center">
                    {[...through].map((e, idx) => (
                      <div className="bg-[#E8FFDA] flex justify-between p-4 mb-1">
                        <Typography>{e.name}</Typography>
                        <div class="flex gap-3 items-center">
                          <Typography>Approver {idx + 1}</Typography>
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
              {/* <TextField
                variant="outlined"
                className="bg-white border-2 border-primary-main rounded-full"
                // label="Field 1"
                label="Project Descripption"
                name="projectDescription"
                value={formData.projectDescription}
                onChange={handleChange}
                multiline
                rows={3}
                fullWidth
                placeholder="Project Description:"
              /> */}
              <TextField
                variant="outlined"
                // color="error"
                className="bg-white  border-2 border-primary-main rounded-full"
                // label="Field 1"
                label="Project Description"
                name="approvalDetails"
                value={formData.approvalDetails}
                onChange={handleChange}
                multiline
                rows={4}
                fullWidth
                placeholder="Approval Details "
              />
            </Card>

            <div className="my-4">
              <div className="italic font-bold ">
                You are expected to provide atleast 3 documents.{" "}
                <Typography className="text-red-500">
                  1. Certificate of Compliance,
                </Typography>{" "}
                <Typography className="text-red-500">
                  2. Procurement Certificate,
                </Typography>{" "}
                <Typography className="text-red-500">
                  3. Advanced Payment certificate and any relevant documents
                </Typography>
              </div>
              <Typography className="font-bold ml-2 mt-3">
                Attach Documents
              </Typography>
              <FileUploadComponent onFileChange={handleFileChange} />

              <div className="mt-2">
                {/* {documentFiles.map((e) => (
                  <Typography className="p-3 mt-2 bg-green-200 text-black font-bold rounded-full w-2/3">
                    {e?.name}
                  </Typography>
                ))} */}

                {documentFiles.map((e) => (
                  <div class="flex justify-center space-between items-center bg-green-200 p-3 w-2/3 mt-2 rounded-2xl">
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
          </div>

          <Typography
            variant="h5"
            className="text-[#3C7E2D] ml-3 mb-2 text-center font-bold mt-12"
          >
            Section 1A: Procurement Methods
          </Typography>

          <Paper elevation={3} className="mb-5 p-5 w-full">
            <TextField
              variant="outlined"
              // color="error"
              className="bg-white  border-2 border-primary-main rounded-full w-full mb-4"
              // label="Field 1"
              label="Procurement Method Subject"
              name="procurementMethodSubject"
              value={formData.procurementMethodSubject}
              onChange={handleChange}
              fullWidth
              placeholder="Procurement Method Subject"
            />
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
                  onChange={(e) => setprocurementMethodString(e.target.value)}
                >
                  {procurementMethodData.map((e) => (
                    <MenuItem value={e?.id}> {e?.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <div className="w-full">
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
        </div>
      </div>
      <Typography
        variant="h3"
        className="text-[#3C7E2D] ml-3 text-center font-bold mt-16"
      >
        Section 2: Compliance
      </Typography>
      <ComplianceForIDGeneration getExcoAndSTBInfo={getExcoInfo} />

      <div className="w-full flex-col flex gap-4 my-4">
        {/* <Button
              onClick={() => postprocurement(0)}
              className="w-full h-12 bg-[#E8FFDA] text-black font-bold"
            >
              Save Draft
            </Button> */}
        <Button
          onClick={() => postprocurement(2)}
          className="w-full h-12 font-bold"
        >
          Submit Request
        </Button>
      </div>
      {/* <SSBRequest /> */}
    </div>
  );
}

export default InitiateProcurementRequest;
