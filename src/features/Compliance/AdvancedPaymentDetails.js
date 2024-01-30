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
import cert from "images/Certificate of Compliance.png";
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
  DeleteOutlineOutlined,
  Home,
  Wallet,
} from "@mui/icons-material";
import ToDoorSearch from "common/ToDoorSearch";
import { post, get, put } from "services/fetch";
import SuperAdminApi from "apis/UserApi";
import MyTable from "common/MyTable";
import ExpenseStepper from "common/ExpenseStepper";
import ServicesApi from "apis/ServicesApi";
import ProcurementApi from "apis/ProcurementApi.js";
import vector from "images/Vector.svg";
import ComplianceApi from "apis/ComplianceApi.js";
import MuiDialog from "common/CustomDialog";
import docIcon from "images/DocuploadIcon.svg";
import ComplianceDocument from "common/ComplianceCertificate";
import FileUploadComponent from "common/FileUploadComponent";
import STBDisplay from "./STBMainDisplay";
import ProcurementDocument from "common/ProcurementCertificate";

function InitiateComplianceRequest({ procurementData }) {
  const { enqueueSnackbar } = useSnackbar();

  const [userType, setUserType] = React.useState("");
  const [documentFiles, setDocumentFiles] = React.useState([]);
  const [budgetItemId, setbudgetItemId] = React.useState("companies");
  const [budgettypeId, setbudgettypeId] = React.useState([]);
  const [mda, setmda] = React.useState();
  const [employee, setemployee] = React.useState();
  const [tempIds, settempIds] = React.useState(0);
  const [costs, setCosts] = React.useState();
  const [requestType, setRequestType] = React.useState("ComplianceRequest");
  const [through, setthrough] = React.useState([]);
  const [standardApprovers, setstandardApprovers] = React.useState([]);
  const [from, setFrom] = React.useState();
  const [formData, setFormData] = React.useState({ costImplication: 23 });

  const user = useAuthUser();

  const { id } = useParams();

  const getComplianceDetails = ComplianceApi.useGetComplianceByReferenceIdQuery(
    {
      id: procurementData?.referenceNumber,
    }
  );
  const complianceDetails = getComplianceDetails?.data;

  const getProcurementDetails =
    ProcurementApi.useGetProcurementByReferenceIdQuery({
      id: procurementData?.referenceNumber,
    });
  const ProcurementDetails = getProcurementDetails?.data;

  // console.log(readyForAdvancedPayment);

  // const getBudgetItem = ComplianceApi.useGetBudgetItemsQuery({});
  // const budgetItem = getBudgetItem?.data?.data || [];

  // const getBudgetType = ComplianceApi.useGetBudgetTypeQuery({});
  // const budgetType = getBudgetType?.data?.data || [];

  // const getprocurements = ComplianceApi.useGetComplianceRequestQuery({
  //   id,
  // });

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogOpen2, setIsDialogOpen2] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };
  const handleOpenDialog2 = () => {
    setIsDialogOpen2(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleCloseDialog2 = () => {
    setIsDialogOpen2(false);
  };

  // console.log
  // {
  //   "sequence": 0,
  //   "userId": 0,
  //   "roleId": 0,
  //   "mdaId": 0
  // }
  // useEffect(() => {
  //   ...through,
  //   ...approvers?.map((newValue, idx) => ({
  //     sequence: idx + 1,
  //     userId: newValue?.userId,
  //     name: newValue?.approverName,
  //     mdaId: newValue?.mdaId,
  //     roleId: 0,
  //   })),

  //   approvers &&
  //     setstandardApprovers([
  //       ...standardApprovers,
  //       ...approvers?.map((newValue, idx) => ({
  //         sequence: idx + 1,
  //         userId: newValue?.userId,
  //         name: newValue?.approverName,
  //         mdaId: newValue?.mdaId,
  //         roleId: 0,
  //       })),
  //     ]);
  // }, [approvers]);

  const redirect = useNavigate();

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
  // useEffect(() => {
  //   ...through,

  //   approvers &&
  //     setstandardApprovers([
  //       ...standardApprovers,
  //       ...approvers?.map((newValue, idx) => ({
  //         sequence: idx + 1,
  //         userId: newValue?.userId,
  //         name: newValue?.approverName,
  //         mdaId: newValue?.mdaId,
  //         roleId: 0,
  //       })),
  //     ]);
  // }, [approvers]);
  const postprocurement = (status) => {
    let payload = {
      requisitionId: procurementData?.referenceNumber,
      subject: procurementData.advancePaymentSubject,
      vendorName: procurementData?.vendor,
      advancePayment: 0,
      percentage: +procurementData.advancePercentage,
      mdaId: user?.mdaId,
    };
    // let payload = {
    //   requisitionId: readyForAdvancedPayment?.referenceNumber,
    //   from: +user.id,
    //   budgetTypeId: +budgettypeId.id,
    //   vendor: formData.vendorName,
    //   companyAddress: formData.vendorCompanyAddress,
    //   projectDuration: formData?.contractDuration,
    //   budgetTypeName: budgettypeId.label,
    //   subject: formData.subject,
    //   details: formData.projectDescription,
    //   costImplication: +formData.costImplication,
    //   status: +status,
    //   mdaId: +user.mdaId,
    //   approvers: [
    //     ...through,
    //     ...approvers?.map((newValue, idx) => ({
    //       sequence: idx + 1,
    //       userId: newValue?.userId,
    //       name: newValue?.approverName,
    //       mdaId: newValue?.mdaId,
    //       roleId: 0,
    //     })),
    //   ]?.map((e, idx) => ({
    //     sequence: idx + 1,
    //     userId: +e?.userId,
    //     roleId: e?.roleId,
    //     mdaId: +e?.mdaId,
    //   })),
    //   documents: [...documentFiles],
    // };

    console.log(payload);
    onSubmit(payload);
  };
  const [result, setResult] = React.useState();

  const authUser = useAuthUser();

  function numberWithCommas(x) {
    // serPrice.value = x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //  formState.target_amount=cleanupNumber(serPrice.value)
    return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const [processAdvancedPayment, procurementMutationResult] =
    ProcurementApi.useApproveAdvancePaymentRequestMutation();

  const onSubmit = async (values) => {
    // localStorage.setItem("il", true);
    // redirect();
    // history('/dashboard')

    try {
      // setIsLoading(true);
      const data = await processAdvancedPayment({
        data: { ...values },
      }).unwrap();

      console.log(data);
      // TODO extra login
      // setIsLoading(false);
      if (data.status == "Success") {
        enqueueSnackbar("Procurement Request Successfully Sent", {
          variant: "success",
        });
        // setIsDialogOpen(false);
        // isDialogOpen2(false);
        redirect(RouteEnum.ADVANCED_PAYMENT_REVIEW);
        window.location.reload();
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

  function numberWithCommas(x) {
    // serPrice.value = x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //  formState.target_amount=cleanupNumber(serPrice.value)
    return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div className="w-full ">
      <div class="flex gap-8 w-full items-start bg-white">
        <Card className="flex gap-3 w-2/5 flex-col">
          <div className="border-2 border-primary-main flex gap-3 flex-col  p-4 py-10 w-full">
            <div className="w-full">
              <Typography className="text-primary-main font-bold text-sm ml-3">
                budgetType
              </Typography>
              <TextField
                variant="outlined"
                className="bg-white border-2 border-primary-main  rounded-full"
                // label="Cost"
                name="budgetType"
                value={"Capital"}
                onChange={handleChange}
                fullWidth
                // placeholder="Cost"
              />
            </div>
            <div>
              <Typography className="text-primary-main font-bold text-sm ml-3">
                Cost Implication
              </Typography>
              <TextField
                variant="outlined"
                className="bg-white border-2 border-primary-main rounded-full"
                // label="Cost"
                name="costImplication"
                value={`N ${numberWithCommas(
                  procurementData?.costImplication
                )}`}
                onChange={handleChange}
                fullWidth
                placeholder="Cost"
              />
            </div>
          </div>
          {/* <Button
              variant="outlined"
              className="bg-[#E8FFDA] border-[#3C7E2D] h-12 mt-5 text-black w-full px-8 "
            >
              View Approved Initiatives
            </Button> */}
          <div>
            <Typography variant="h6" className="text-center mt-5 font-bold">
              Compliance Attachments
            </Typography>
            <div className="flex flex-col items-center">
              <div className="relative cursor-pointer group ">
                <img src={cert} className="h-[200px]" />
                <div className=" z-[100]">
                  <div className="hover:bg-black absolute top-0 bottom-0 flex justify-center items-center left-0 right-0 op hover:opacity-30 z-[10]"></div>
                  <Button
                    onClick={handleOpenDialog}
                    className="bg-primary-main hidden group-hover:block z-[20] bottom-1/2 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white"
                  >
                    Click to View
                  </Button>
                </div>
              </div>
              <Paper
                elevation={6}
                className="mt-4 w-full bg-slate-200 p-2 flex justify-center flex-col items-center"
              >
                <Typography>Compliance Documents</Typography>
                {complianceDetails?.documents?.map((e) => (
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
              </Paper>
            </div>
          </div>

          <div>
            <Typography variant="h6" className="text-center mt-5 font-bold">
              Procurement Attachments
            </Typography>
            <div className="flex flex-col items-center">
              <div className="relative cursor-pointer group ">
                <img src={cert} className="h-[200px]" />
                <div className=" z-[100]">
                  <div className="hover:bg-black absolute top-0 bottom-0 flex justify-center items-center left-0 right-0 op hover:opacity-30 z-[10]"></div>
                  <Button
                    onClick={handleOpenDialog2}
                    className="bg-primary-main hidden group-hover:block z-[20] bottom-1/2 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white"
                  >
                    Click to View
                  </Button>
                </div>
              </div>
              <Paper
                elevation={6}
                className="mt-4 w-full bg-slate-200 p-2 flex justify-center flex-col items-center"
              >
                <Typography>Procurement Documents</Typography>
                {ProcurementDetails?.documents?.map((e) => (
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
              </Paper>
            </div>
          </div>
        </Card>
        <div className="w-full">
          <div class="flex gap-3 items-center  mb-8">
            <img src={vector} />
            <Typography className="text-primary-main font-bold text-xl">
              Advanced Payment Details
              {/* {procurements?.title?.toUpperCase()} */}
            </Typography>
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <Typography className="text-[#3C7E2D] ml-3 mb-1 text-lg font-bold">
                Subject
              </Typography>

              <TextField
                variant="outlined"
                className="bg-white border-2 border-primary-main rounded-full"
                // label="Subject"
                name="subject"
                value={procurementData.advancePaymentSubject}
                onChange={handleChange}
                fullWidth
                placeholder="Subject"
              />
            </div>

            <div>
              <Typography className="text-[#3C7E2D] ml-3 mb-1 text-lg font-bold">
                Percentage
              </Typography>

              <TextField
                type="text"
                variant="outlined"
                className="bg-white border-2 border-primary-main rounded-full"
                // label="Percentage (%)"
                name="percentage"
                value={`${procurementData.advancePercentage}%`}
                onChange={handleChange}
                fullWidth
                placeholder="Percentage"
              />
            </div>
          </div>
          <div>
            <div className="flex flex-col gap-4 mt-5">
              <Typography className="text-[#3C7E2D] ml-3 mb-4 text-lg font-bold">
                Enter Vendor Details
              </Typography>

              <div>
                <Typography className="text-[#3C7E2D] ml-3 mb-1 font-bold">
                  Vendor
                </Typography>
                <TextField
                  variant="outlined"
                  className="bg-white border-2 border-primary-main rounded-full"
                  // label="Vendor Name"
                  name="vendorName"
                  value={procurementData?.vendor}
                  onChange={handleChange}
                  fullWidth
                  placeholder="Vendor Name"
                />
              </div>
              <div>
                <Typography className="text-[#3C7E2D] ml-3 mb-1 font-bold">
                  Vendor Address
                </Typography>
                <TextField
                  variant="outlined"
                  className="bg-white border-2 border-primary-main rounded-full"
                  // label="Vendor Company Address"
                  name="vendorCompanyAddress"
                  value={complianceDetails?.companyAddress}
                  onChange={handleChange}
                  fullWidth
                  placeholder="Vendor Company Address"
                />
              </div>
              <div className="w-full">
                <Typography className="text-[#3C7E2D] ml-3 mb-1 font-bold">
                  Service Description
                </Typography>
                <TextField
                  variant="outlined"
                  className="bg-white border-2 border-primary-main rounded-lg w-full"
                  // label="Service Description"
                  multiline
                  rows={2}
                  name="serviceDescription"
                  value={complianceDetails?.serviceDescription?.toUpperCase()}
                  onChange={handleChange}
                  fullWidth
                  placeholde
                  // r="Subject"
                />

                <div className="mt-5">
                  <Typography className="text-[#3C7E2D] ml-3 mb-1 font-bold">
                    Project Duration
                  </Typography>
                  <TextField
                    type="text"
                    variant="outlined"
                    className="bg-white border-2 border-primary-main rounded-lg w-full "
                    // label="Contract Duration"
                    name="contractDuration"
                    value={`${procurementData?.contractDuration} Years`}
                    onChange={handleChange}
                    fullWidth
                    placeholde
                    // r="Subject"
                  />
                </div>
              </div>
            </div>
            {/* <img src={cert}/> */}
          </div>
          <Divider className="my-8" />
          <div className="w-full">
            <Card className="flex gap-3 flex-col">
              {/* <TextField
                  // type="number"
                  variant="outlined"
                  className="bg-white border-2 border-primary-main rounded-lg w-full mt-4"
                  label="Contract Duration"
                  name="contractDuration"
                  value={formData?.contractDuration}
                  onChange={handleChange}
                  fullWidth
                  placeholder="Contract Duration"
                  // r="Subject"
                /> */}

              <div>
                <Typography className="text-[#3C7E2D] ml-3 font-bold">
                  Transaction ID/Reference No.
                </Typography>
                <TextField
                  variant="outlined"
                  className="bg-white border-2 border-primary-main rounded-full"
                  // label="Transaction ID/Reference Number"
                  name=""
                  value={procurementData?.referenceNumber?.toUpperCase()}
                  // onChange={handleChange}
                  fullWidth
                  // placeholder="Transaction ID/Reference Number"
                />
              </div>
              {/* <div class="flex gap-6">
                <div className="w-full">

                  <div className="items-center">
                    {[
                      ...through,
                      ...approvers?.map((newValue, idx) => ({
                        sequence: idx + 1,
                        userId: newValue?.userId,
                        name: newValue?.approverName,
                        mdaId: newValue?.mdaId,
                        roleId: 0,
                      })),
                    ]?.map((e, idx) => (
                      <div className="bg-[#E8FFDA] flex justify-between p-4 mb-1">
                        <Typography className="font-bold">{e.name}</Typography>
                        <Typography>Approver</Typography>
                        {[...through, ...approvers].length - (idx + 1) >= 1 && (
                          <DeleteOutlineOutlined
                            onClick={() => todeleteApprovers(e?.key)}
                            sx={{ fontSize: 26 }}
                            className="text-red-500 cursor-pointer"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div>
                <Typography className="text-[#3C7E2D] ml-3 mb-1 font-bold">
                  Project Details
                </Typography>
                <TextField
                  variant="outlined"
                  className="bg-white  border-2 border-primary-main rounded-full"
                  name="approvalDetails"
                  value={readyForAdvancedPayment?.details}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  fullWidth
                  placeholder="Approval Details "
                />
              </div> */}
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
            </div> */}
            {/* <div className="my-4">
              <Typography>Attach Documents</Typography>
              <FileUploadComponent onFileChange={handleFileChange} />

              <div>
                {documentFiles.map((e) => (
                  <Typography className="p-3 bg-green-400 text-black font-bold">
                    {e?.docName}
                  </Typography>
                ))}
              </div>
            </div> */}
          </div>

          <STBDisplay dataz={complianceDetails?.stbDecisions} />

          <div className="w-full flex-col flex gap-4 my-4">
            {/* <Button
              onClick={() => postprocurement(4)}
              className="w-full h-12 bg-[#E8FFDA] text-black font-bold"
            >
              Save Draft
            </Button> */}
            <Button
              onClick={() => postprocurement(3)}
              className="w-full h-12 font-bold"
            >
              Approve Request
            </Button>
          </div>
        </div>
      </div>

      <MuiDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        contentComponent={
          <ComplianceDocument procurementData={complianceDetails} />
        }
      />

      <MuiDialog
        isOpen={isDialogOpen2}
        onClose={handleCloseDialog2}
        contentComponent={
          <ProcurementDocument procurementData={ProcurementDetails} />
        }
      />
    </div>
  );
}

export default InitiateComplianceRequest;
