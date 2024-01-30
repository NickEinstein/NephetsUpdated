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
import ToDoorSearch from "common/ToDoorSearch";
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
import moment from "moment";

function EXCOREQ(props) {
  const { enqueueSnackbar } = useSnackbar();

  const [documentFiles, setDocumentFiles] = React.useState([]);
  const [preview, setpreview] = React.useState(false);
  const [fileReference, setfileReference] = React.useState(false);
  const [fileReference2, setfileReference2] = React.useState(false);
  const [actionInfo, setactionInfo] = React.useState(false);
  const [actionInfo2, setactionInfo2] = React.useState(false);
  const [meetingOrdinal, setmeetingOrdinal] = React.useState(false);
  const [meetingSubject, setmeetingSubject] = React.useState(false);
  const [show, setshow] = React.useState(false);
  const [memoGC, setsetmemoGC] = React.useState("companies");
  const [memoBy, setmemoBy] = React.useState([]);
  const [conclusionReferenceGC, setconclusionReferenceGC] = React.useState([]);
  const [conclusionTitle, setconclusionTitle] = React.useState([]);
  const [conclusionDetails, setconclusionDetails] = React.useState([]);
  const [mda, setmda] = React.useState();
  const [fromDate, setfromDate] = React.useState(null);
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

  const history = useNavigate();

  // const redirect = () => {
  //   history("/complete-signUp");
  // };

  const handleChange = (event, newValue) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const postprocurement = (status) => {
    let payload = {
      referenceNumber: "",
      fileReference1: formData.fileReference1,
      fileReference2: formData.fileReference2,
      actionInfo1: formData.actionInfo1,
      actionInfo2: formData.actionInfo2,
      meetingOrdinal: +formData.meetingOrdinal,
      meetingDate: fromDate,
      meetingSubject: formData?.meetingSubject,
      memoGC: formData.memoGC,
      memoBy: formData.memoBy,
      conclusionReferenceGC: formData.conclusionReferenceGC,
      conclusionTitle: formData?.conclusionTitle,
      conclusionDetails: formData?.conclusionDetails,
      actioners: [...actioneBy],
    };

    // {
    //   id: 0,
    //   to: 0,
    //   from: user?.id,
    //   subject: formData.subject,
    //   projectDescription: "N/A",
    //   approvalDetails: formData.approvalDetails,
    //   costImplication: 0,
    //   urgency: 1,
    //   status: status,
    //   documents: [
    //     ...documentFiles,
    //     // {
    //     //   id: 0,
    //     //   name: "string",
    //     //   path: "string",
    //     // },
    //   ],
    //   mdaId: 1,
    //   approvers: [
    //     ...through,
    //     ...standardApprovers,
    //     // {
    //     //   id: 0,
    //     //   sequence: 0,
    //     //   procurementRequestId: 0,
    //     //   comments: "string",
    //     //   approvalStatus: "string",
    //     //   signature: "string",
    //     //   signature64: "string",
    //     //   name: "string",
    //     //   userId: 0,
    //     //   actionTaken: "string",
    //     //   mdaId: 1,
    //     //   createdAt: "2023-12-20T14:23:31.234Z",
    //     //   receivedDate: "2023-12-20T14:23:31.235Z",
    //     //   modifiedAt: "2023-12-20T14:23:31.235Z",
    //     //   createdBy: 0,
    //     //   modifiedBy: 0,
    //     //   isDelete: true,
    //     // },
    //   ],
    // };

    // onSubmit(payload);

    props.excoData && props?.excoData({ payload });
  };
  const handleFileChange = (fileData, name) => {
    setDocumentFiles([
      ...documentFiles,
      {
        name: name,
        path: fileData?.doclink,
      },
    ]);
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
    // localStorage.setItem("il", true);
    // redirect();
    // history('/dashboard')

    try {
      // setIsLoading(true);
      const data = await proccurementMutation({
        data: { ...values },
      }).unwrap();

      if (data.data) {
        enqueueSnackbar("Procurement Request Successfully Sent", {
          variant: "success",
        });

        onSubmit2();
      }
      // redirect(RouteEnum.DASHBOARD);
    } catch (error) {
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

  useEffect(() => {
    let payload = {
      referenceNumber: props?.procurements?.requisitionId || "",
      fileReference1: formData.fileReference1,
      fileReference2: formData.fileReference2,
      actionInfo1: formData.actionInfo1,
      actionInfo2: formData.actionInfo2,
      meetingOrdinal: +formData.meetingOrdinal,
      meetingDate: fromDate,
      meetingSubject: formData?.meetingSubject,
      memoGC: formData.memoGC,
      memoBy: formData.memoBy,
      conclusionReferenceGC: formData.conclusionReferenceGC,
      conclusionTitle: formData?.conclusionTitle,
      conclusionDetails: formData?.conclusionDetails,
      actioners: [...actioneBy],
    };

    props.excoData && props?.excoData(payload);
  }, [formData, actioneBy, fromDate]);

  const getBudgetItem = ComplianceApi.useGetBudgetItemsQuery({});
  const budgetItem = getBudgetItem?.data?.data || [];

  const getBudgetType = ComplianceApi.useGetBudgetTypeQuery({});
  const budgetType = getBudgetType?.data?.data || [];

  return (
    <div className="w-full flex justify-center">
      <div className="w-full px-[9%]">
        {!preview && (
          <div>
            <Typography
              variant="h3"
              className="text-primary-main text-center font-bold mb-8"
            >
              This Document Is the Property <br /> Of The Executive Council Of{" "}
              <br /> Edo State
            </Typography>
            <Typography
              className="text-center underline underline-offset-2"
              variant="h3"
            >
              Conclusion Extract
            </Typography>
            <Divider className="mt-8 mb-3 w-full" />
            <Typography variant="h5" className="text-center">
              File Reference
            </Typography>
            <ol className="mt-5 w-[85%]">
              <li className="flex gap-3 items-end w-full">
                <Typography>1.</Typography>
                <TextField
                  name="fileReference1"
                  className="w-full"
                  onChange={handleChange}
                  variant="standard"
                />
                <Typography className="w-40">Action Info</Typography>
                <TextField
                  name="fileReference2"
                  onChange={handleChange}
                  className="w-full"
                  variant="standard"
                />
              </li>
              <li className="flex gap-3 items-end w-full">
                <Typography>2.</Typography>
                <TextField
                  name="actionInfo1"
                  className="w-full"
                  onChange={handleChange}
                  variant="standard"
                />
                <Typography className="w-40">Action Info</Typography>
                <TextField
                  name="actionInfo2"
                  className="w-full"
                  onChange={handleChange}
                  variant="standard"
                />
              </li>
            </ol>
            <Divider className="my-8" />
            <div className="w-full">
              <div class="flex items-end max-w-[85%]">
                <TextField
                  type="number"
                  name="meetingOrdinal"
                  className="w-full"
                  onChange={handleChange}
                  variant="standard"
                />
                <Typography className="mr-2 min-w-[160px]">
                  Meeting of GC {fromDate && moment(fromDate).format("YYYY")}{" "}
                  held
                </Typography>
                {/* <TextField variant="standard" /> */}
                <DatePicker
                  // label='Select Date'
                  // toolbarPlaceholder="ji"
                  // disableFuture
                  className="w-[300px]"
                  value={fromDate}
                  onChange={(newValue) => {
                    setfromDate(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      variant="standard"
                      size="small"
                      margin="dense"
                      {...params}
                    />
                  )}
                />
              </div>
              <div className="mt-8">
                <div className="flex items-start gap-3">
                  <Typography>Subject: </Typography>
                  <TextField
                    name="meetingSubject"
                    className="w-[85%]"
                    multiline
                    onChange={handleChange}
                    rows={6}
                  />
                </div>
                <div className="flex items-end mt-6 gap-1 w-4/5">
                  <Typography className="w-[400px]">
                    Memorandum GC {fromDate && moment(fromDate).format("YYYY")}{" "}
                  </Typography>
                  <TextField
                    onChange={handleChange}
                    className="w-full"
                    name="memoGC"
                    variant="standard"
                  />
                  <Typography>by </Typography>
                  <TextField
                    onChange={handleChange}
                    className="w-full"
                    name="memoBy"
                    variant="standard"
                  />
                </div>
                <div className="flex items-end my-6 gap-1 w-4/5">
                  <Typography
                    // onChange={handleChange}
                    className="w-[430px]"
                  >
                    Conclusion Reference GC
                  </Typography>
                  <TextField
                    onChange={handleChange}
                    className="w-full"
                    name="conclusionReferenceGC"
                    variant="standard"
                  />
                  <Typography>
                    {" "}
                    {fromDate && moment(fromDate).format("YYYY")}{" "}
                  </Typography>
                  <TextField
                    onChange={handleChange}
                    className="w-full"
                    name="conclusionTitle"
                    variant="standard"
                  />
                </div>
                <TextField
                  className="mt-5 w-full"
                  onChange={handleChange}
                  multiline
                  rows={8}
                  label="Conclusion Details"
                  name="conclusionDetails"
                />
              </div>
            </div>

            <div className="mt-5">
              <Typography className="font-bold">ACTION BY</Typography>
              <div class="flex mt-3">
                <div className="w-full">
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
                <div className="w-full flex flex-col">
                  <Autocomplete
                    className=" m-2"
                    disablePortal
                    // multiple={}
                    // name="through"
                    onChange={(event, newValue) => {
                      setactioneBy([
                        ...actioneBy,
                        {
                          id: 0,
                          referenceId: props?.procurements?.requisitionId || "",
                          userId: newValue.id,
                          actionBy: newValue.label,
                          isCopied: true,
                          createdAt: new Date(),
                          modifiedAt: new Date(),
                          // id: 0,
                          // key: tempIds + 1,
                          // sequence: 0,
                          // procurementRequestId: 0,
                          // comments: "",
                          // approvalStatus: "",
                          // signature: "",
                          // signature64: "",
                          // name: newValue.label,
                          // userId: newValue.id,
                          // actionTaken: "",
                          // mdaId: 1,
                          // createdAt: "2023-12-20T14:23:31.234Z",
                          // receivedDate: "2023-12-20T14:23:31.235Z",
                          // modifiedAt: "2023-12-20T14:23:31.235Z",
                          // createdBy: 0,
                          // modifiedBy: 0,
                          // isDelete: false,
                        },
                      ]);
                      // settempIds((prev) => prev + 1);
                    }}
                    // onChange={(event, newValue) => handleChangez(event, newValue)}
                    // id="combo-box-demo"
                    options={employees?.map((e) => ({
                      label: e?.name,
                      id: e?.id,
                    }))}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Actioned By" />
                    )}
                  />
                  <div className="items-center">
                    {[...actioneBy].map((e, idx) => (
                      <div className="bg-[#E8FFDA] flex justify-between p-4 mb-1">
                        <Typography>{e.actionBy}</Typography>
                        {/* <div class="flex gap-3 items-center">
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
                          </div> */}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* <Button
              // onClick={() => setpreview((prev) => !prev)}
              onClick={() => postprocurement()}
              className="font-bold text-xs"
            >
              Preview
            </Button> */}
          </div>
        )}

        {preview && (
          <div>
            <div className="">
              <Typography
                className="font-bold underline underline-offset-3"
                variant="h5"
              >
                SSG
              </Typography>
              <Typography className="font-bold mt-2">
                {formData.meetingSubject}
              </Typography>

              <div className="mt-8 flex justify-between w-[85%]">
                <Typography className="w-full font-bold " variant="h5">
                  GC {fromDate && moment(fromDate).format("YYYY")}{" "}
                  {formData?.memoGC}
                </Typography>

                <div className="w-[50%]">
                  <Typography variant="h5" className="underline font-bold">
                    {formData?.conclusionTitle?.toUpperCase()}
                  </Typography>

                  <Typography className="font-semibold">
                    {formData?.conclusionDetails}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EXCOREQ;
