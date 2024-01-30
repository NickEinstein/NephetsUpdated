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
import CKEditorComponent from "common/CKEditorComponent";

function InitiateProcurementRequest(props) {
  const { enqueueSnackbar } = useSnackbar();
  const redirect = useNavigate();

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
  console.log(user);

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

  // getProcurementApprovers;

  useEffect(() => {
    approvers &&
      setstandardApprovers([
        ...standardApprovers,
        ...approvers?.map((newValue, idx) => ({
          id: 0,
          sequence: idx + 1,
          procurementRequestId: 0,
          comments: "",
          approvalStatus: "",
          signature: "",
          signature64: "",
          name: newValue?.approverName,
          userId: newValue?.userId,
          actionTaken: "",
          mdaId: newValue?.mdaId,
          createdAt: "2023-12-20T14:23:31.234Z",
          receivedDate: "2023-12-20T14:23:31.235Z",
          modifiedAt: "2023-12-20T14:23:31.235Z",
          createdBy: 0,
          modifiedBy: 0,
          isDelete: false,
        })),
      ]);
  }, [approvers]);

  // const redirect = () => {
  //   history("/complete-signUp");
  // };

  const handleChange = (event, newValue) => {
    console.log(event.target.value);
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const postprocurement = (status) => {
    let payload = {
      procurementMethodSubject: formData.subject,
      procurementMethod: procurementMethodData.find(
        (e) => e.id == procurementMethodString
      ).name,
      procurementMethodId: procurementMethodString,
      serviceDescription: formData.serviceDescription,

      budgetTypeId: +budgettypeId?.key,
      budgetTypeName: budgettypeId?.label,

      id: 0,
      to: 0,
      from: user?.id,
      subject: formData.subject,
      projectDescription: "N/A",
      approvalDetails: formData.approvalDetails,
      costImplication: 0,
      urgency: 1,
      status: status,
      documents: [
        ...documentFiles,
        // {
        //   id: 0,
        //   name: "string",
        //   path: "string",
        // },
      ],
      mdaId: 1,
      approvers: [
        ...through,
        ...standardApprovers,
        // {
        //   id: 0,
        //   sequence: 0,
        //   procurementRequestId: 0,
        //   comments: "string",
        //   approvalStatus: "string",
        //   signature: "string",
        //   signature64: "string",
        //   name: "string",
        //   userId: 0,
        //   actionTaken: "string",
        //   mdaId: 1,
        //   createdAt: "2023-12-20T14:23:31.234Z",
        //   receivedDate: "2023-12-20T14:23:31.235Z",
        //   modifiedAt: "2023-12-20T14:23:31.235Z",
        //   createdBy: 0,
        //   modifiedBy: 0,
        //   isDelete: true,
        // },
      ],
    };

    // console.log(payload);
    onSubmit(payload);
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
  const [result, setResult] = React.useState();

  const authUser = useAuthUser();

  function numberWithCommas(x) {
    // serPrice.value = x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //  formState.target_amount=cleanupNumber(serPrice.value)
    return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const [proccurementMutation, procurementMutationResult] =
    ProcurementApi.useSubmitProcurementMutation();

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

        redirect(RouteEnum.DASHBOARD);

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

  const todeleteDocuments = (idx) => {
    console.log(idx);
    console.log(through);
    let temp = documentFiles?.filter((e) => e.key !== idx);
    setDocumentFiles(temp);
  };

  const getBudgetItem = ComplianceApi.useGetBudgetItemzQuery({});
  const budgetItem = getBudgetItem?.data?.data || [];

  const getBudgetType = ComplianceApi.useGetBudgetTypeQuery({});
  const budgetType = getBudgetType?.data?.data || [];

  const [budgetItemId, setbudgetItemId] = React.useState("companies");
  const [budgettypeId, setbudgettypeId] = React.useState([]);
  const [tempIds, settempIds] = React.useState(0);

  const todeleteApprovers = (idx) => {
    console.log(idx);
    console.log(through);
    let temp = through?.filter((e) => e.key !== idx);
    setthrough(temp);
  };

  // console.log(through);

  const handleTextAreaChange = (e, editor) => {
    setFormData({ ...formData, approvalDetails: editor });
    console.log(editor);
  };

  return (
    <div className="w-full ">
      <Typography className="text-primary-main font-bold mb-8 text-base">
        Initiate Procurement Request
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
                // placeholder="Subject"
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

              <TextField
                variant="outlined"
                className="bg-white border-2 border-primary-main rounded-full m-2"
                // label="Available Amount"
                // disabled
                name="budgetItem"
                // disabled
                value={
                  budItemz?.find((e) => e.name === budgettypeId?.label)?.amount
                }
                onChange={handleChange}
                fullWidth
                // placeholder="Subject"
              />
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
                      <TextField {...params} label="Approvers" />
                    )}
                  />
                  <div className="items-center">
                    {[...through, ...standardApprovers].map((e, idx) => (
                      <div className="bg-[#E8FFDA] flex justify-between p-4 mb-1">
                        <Typography>{e.name}</Typography>
                        <div class="flex gap-3 items-center">
                          <Typography>Approver {idx + 1}</Typography>
                          {[...through, ...standardApprovers].length -
                            (idx + 1) >=
                            3 && (
                            <DeleteOutlineOutlined
                              onClick={() => todeleteApprovers(e?.key)}
                              sx={{ fontSize: 26 }}
                              className="text-red-500 cursor-pointer"
                            />
                          )}
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
              <div>
                <Typography className="text-primary-main text-base bold mb-2">
                  Project Description
                </Typography>
                <CKEditorComponent onChange={handleTextAreaChange} />
              </div>
              {/* <TextField
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
              />*/}
            </Card>
            {/* ************************************************************COme back and do it************************************************************** */}
            {/* <div className="flex items-center gap-3 my-4">
              <Typography className="font-bold">Urgency Status:</Typography>
              <div className="flex gap-2">
                <Button className="py-2" variant="outlined">
                  Regular
                </Button>
                <Button className="py-2" variant="outlined">
                  Urgent
                </Button>
                <Button className="py-2" variant="outlined">
                  Super Urgent
                </Button>
              </div>
            </div>*/}
            <div className="my-4">
              <Typography className="font-bold ml-2">
                Attach Documents
              </Typography>
              <FileUploadComponent onFileChange={handleFileChange} />

              <div className="mt-2">
                {/* {documentFiles.map((e) => (
                  <Typography className="p-3 mt-2 bg-green-200 text-black font-bold rounded-full w-2/3">
                    {e?.name}
                  </Typography>
                ))} */}

                {documentFiles?.map((e) => (
                  <div className="flex justify-between items-center p-3 mt-2 bg-green-200 text-black font-bold rounded-full w-2/3">
                    <Typography className=" text-black font-bold">
                      {e?.name}
                    </Typography>

                    <DeleteOutlineOutlined
                      onClick={() => todeleteDocuments(e?.key)}
                      sx={{ fontSize: 26 }}
                      className="text-red-500 cursor-pointer"
                    />
                  </div>
                ))}
              </div>
              {/* <Button>Upload Document</Button> */}
            </div>
          </div>

          <Paper elevation={3} className="mb-5 p-5">
            <Typography className="text-[#3C7E2D] ml-3 text-lg font-bold">
              Please complete this section
            </Typography>
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
                  {/* <MenuItem value={2}> Direct sourcing</MenuItem> */}
                  {/* <MenuItem value={3}> Competitive bidding</MenuItem> */}
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
        </div>
      </div>

      {/* <SSBRequest /> */}
    </div>
  );
}

export default InitiateProcurementRequest;
