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
import ProcurementDocument from "common/ProcurementCertificate";
import FileUploadComponent from "common/FileUploadComponent";
import STBForm from "./STBForm";
import STBMain from "./STBMain";
import ExpenseApi from "apis/ExpenseApi";
import LoadingModalEdoGov from "common/LoadingModalEdoGov";

function InitiateComplianceRequest(props) {
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
  const [stbArray, setstbArray] = React.useState([]);
  const [from, setFrom] = React.useState();
  const [formData, setFormData] = React.useState({ costImplication: 1 });

  const user = useAuthUser();
  const redirect = useNavigate();
  console.log(user);

  const { id } = useParams();

  const getMdas = ServicesApi.useGetMdasQuery({});
  const mdas = getMdas?.data;

  const getEmployee = ServicesApi.useGetEmployeesQuery({
    id: mda,
  });
  const employees = getEmployee?.data || []; // const getEmployeesByMda = getMdas?.data

  const getprocurements = ProcurementApi.useGetprocurementByIdQuery({
    id,
  });
  const procurements = getprocurements?.data?.data;
  const getApprovers = ProcurementApi.useGetProcurementApproversQuery({
    // id: mda,
    costs: formData?.costImplication,
    requestType,
    procurementMethod:
      +formData?.costImplication >= 20000000
        ? procurements?.procurementMethod
        : null,
  });

  const approvers = getApprovers?.data?.data || [];

  // const getBudgetItem = ComplianceApi.useGetBudgetItemsQuery({});
  // const budgetItem = getBudgetItem?.data?.data || [];

  // const getBudgetType = ComplianceApi.useGetBudgetTypeQuery({});
  // const budgetType = getBudgetType?.data?.data || [];

  const getBudItemz = ExpenseApi.useGetBudgetItemzQuery({
    // id: mda,
    id: +user.mdaId,
  });
  // console.log(getBudItemz)
  const budItemz = getBudItemz?.data?.capitalExpenditure || []; // const getEmployeesByMda = getMdas?.data

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleFileChange = (fileData, name) => {
    console.log(fileData);
    setDocumentFiles([
      ...documentFiles,
      { key: fileData?.doclink, docName: name, docPath: fileData?.doclink },
    ]);
    // Handle the selected file, for example, you can upload it to a server
    // console.log('Selected File:', file);
  };
  const todeleteApprovers = (idx) => {
    console.log(idx);
    console.log(through);
    let temp = through?.filter((e) => e.key !== idx);
    setthrough(temp);
  };

  const todeleteDocuments = (idx) => {
    console.log(idx);
    console.log(through);
    let temp = documentFiles?.filter((e) => e.key !== idx);
    setDocumentFiles(temp);
  };

  const handleChange = (event, newValue) => {
    console.log(newValue);
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: name == "costImplication" ? removeCommasFromNumber(value) : value,
    });
  };

  const postprocurement = (status) => {
    let payload = {
      requisitionId: procurements?.referenceNumber,
      from: +user.id,
      budgetTypeId: +procurements?.budgetTypeId,
      vendor: formData.vendorName,
      companyAddress: formData.vendorCompanyAddress,
      serviceDescription: formData.serviceDescription,
      projectDuration: formData?.contractDuration,
      budgetTypeName: procurements?.budgetTypeName,
      subject: formData.subject,
      details: formData.projectDescription,
      costImplication: +formData.costImplication,
      status: +status,
      mdaId: +user.mdaId,
      approvers: [
        ...through,
        ...approvers?.map((newValue, idx) => ({
          sequence: idx + 1,
          userId: newValue?.userId,
          name: newValue?.approverName,
          mdaId: newValue?.mdaId,
          roleId: 0,
        })),
      ]?.map((e, idx) => ({
        sequence: idx + 1,
        userId: +e?.userId,
        roleId: e?.roleId,
        mdaId: +e?.mdaId,
      })),
      documents: [...documentFiles],
    };

    onSubmit(payload);
    // onSubmit(payload);
  };
  const [result, setResult] = React.useState();

  const authUser = useAuthUser();

  function numberWithCommas(x) {
    // serPrice.value = x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //  formState.target_amount=cleanupNumber(serPrice.value)
    return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const [proccurementMutation, procurementMutationResult] =
    ComplianceApi.useComplianceRequestMutation();

  const onSubmit = async (values) => {
    console.log(values);

    try {
      // setIsLoading(true);
      const data = await proccurementMutation({
        data: { ...values },
      }).unwrap();

      console.log(data);
      // TODO extra login
      // setIsLoading(false);
      if (data) {
        enqueueSnackbar("Compliance Request Successfully Sent", {
          variant: "success",
        });
        redirect(RouteEnum.COMPLIANCE_DASHBOARD);
      }
      // redirect(RouteEnum.DASHBOARD);
    } catch (error) {
      console.log(error);
      // setIsLoading(false);
      enqueueSnackbar(
        error?.data?.title || "Something went wrong",
        "Failed to login",
        {
          variant: "error",
        }
      );
    }
  };
  function numberWithCommas(x) {
    // serPrice.value = x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //  formState.target_amount=cleanupNumber(serPrice.value)
    return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function removeCommasFromNumber(numberWithCommas) {
    // Convert the number to a string and replace all commas
    return numberWithCommas.toString().replace(/,/g, "");
  }

  return (
    <div className="w-full ">
      {!procurements ? (
        <LoadingModalEdoGov />
      ) : (
        <div class="flex gap-8 w-full items-start bg-white">
          <Card className="flex gap-3 w-2/5 flex-col">
            <div className="border-2 border-primary-main flex gap-3 flex-col  p-4 py-10 w-full">
              <FormControl className="" fullWidth>
                {/* <InputLabel id="demo-simple-select-label">
              Select Budget Type
            </InputLabel> */}
                <Typography className="ml-2 text-[#3C7E2D] font-bold">
                  Budget Type
                </Typography>
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
              <FormControl className="mt-3" fullWidth>
                {/* <InputLabel id="demo-simple-select-label">
              Select Budget Item Category
            </InputLabel> */}
                <Typography className="ml-2 text-[#3C7E2D] font-bold">
                  Budget Item
                </Typography>

                <TextField
                  variant="outlined"
                  className="bg-white border-2 border-primary-main rounded-full "
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
              <FormControl className="mt-3" fullWidth>
                {/* <InputLabel id="demo-simple-select-label">
              Select Budget Item Category
            </InputLabel> */}
                <Typography className="ml-2 text-[#3C7E2D] font-bold">
                  Current Available Budget Amount
                </Typography>

                <TextField
                  variant="outlined"
                  className="bg-white border-2 border-primary-main rounded-full"
                  // label="Field 1"
                  value={numberWithCommas(
                    budItemz.find(
                      (e) =>
                        e?.name?.toLowerCase() ==
                        procurements?.budgetTypeName?.toLowerCase()
                    )?.amount
                  )}
                  name=""
                  // value={procurements?.referenceNumber?.toUpperCase()}
                  onChange={handleChange}
                  fullWidth
                  // placeholde
                  // r="Subject"
                />
              </FormControl>

              {/* <Typography className="ml-2">Project Cost</Typography> */}
              <TextField
                variant="outlined"
                className="bg-white border-2 border-primary-main mt-2 rounded-full"
                label="Project Cost"
                name="costImplication"
                value={numberWithCommas(formData?.costImplication)}
                onChange={handleChange}
                fullWidth
                placeholder="Project Cost"
              />
            </div>
            {/* <Button
              variant="outlined"
              className="bg-[#E8FFDA] border-[#3C7E2D] h-12 mt-5 text-black w-full px-8 "
            >
              View Approved Initiatives
            </Button> */}
            <Typography className="text-center mt-5">
              Additional Supporting Document
            </Typography>
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
          </Card>
          <div className="w-full">
            <div class="flex gap-3 items-center  mb-8">
              <img src={vector} />
              <Typography className="text-primary-main font-bold text-xl">
                Certificate Of Compliance Request
                {/* {procurements?.title?.toUpperCase()} */}
              </Typography>
            </div>

            <Paper elevation={3} className="p-4 mb-5">
              <Typography
                variant="h5"
                className="ml-3 font-bold text-primary-main mb-8"
              >
                Approved Procurement Method
              </Typography>
              <div className="flex gap-6 items-center ">
                <div className="w-full">
                  <Typography className="ml-3">Procurement Method</Typography>
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
                  <Typography className="ml-3">Service Description</Typography>
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
                    // onChange={handleChange}
                    fullWidth
                    placeholde
                    // r="Subject"
                  />
                </div>
              </div>
            </Paper>

            <TextField
              variant="outlined"
              className="bg-white border-2 mb-4 border-primary-main rounded-full mt-2"
              label="Compliance Subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              fullWidth
              placeholder="Subject"
            />
            <div>
              <div className="flex flex-col gap-4">
                <Typography className="text-[#3C7E2D] ml-3 mb-4 text-lg font-bold">
                  Enter Vendor Details
                </Typography>
                <TextField
                  variant="outlined"
                  className="bg-white border-2 border-primary-main rounded-full"
                  label="Vendor Name"
                  name="vendorName"
                  value={formData?.vendorName}
                  onChange={handleChange}
                  fullWidth
                  placeholder="Vendor Name"
                />

                <TextField
                  variant="outlined"
                  className="bg-white border-2 border-primary-main rounded-full"
                  label="Vendor Company Address"
                  name="vendorCompanyAddress"
                  value={formData?.vendorCompanyAddress}
                  onChange={handleChange}
                  fullWidth
                  placeholder="Vendor Company Address"
                />
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
                    value={formData?.serviceDescription?.toUpperCase()}
                    onChange={handleChange}
                    fullWidth
                    placeholde
                    // r="Subject"
                  />

                  <TextField
                    type="text"
                    variant="outlined"
                    className="bg-white border-2 border-primary-main rounded-lg w-full mt-5"
                    label="Contract Duration"
                    name="contractDuration"
                    value={formData?.contractDuration}
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
                  <Typography className="text-[#3C7E2D] ml-3 text-lg font-bold">
                    Transaction ID/Reference No.
                  </Typography>
                  <TextField
                    variant="outlined"
                    className="bg-white border-2 border-primary-main rounded-full"
                    // label="Transaction ID/Reference Number"
                    name=""
                    value={procurements?.referenceNumber?.toUpperCase()}
                    // onChange={handleChange}
                    fullWidth
                    // placeholder="Transaction ID/Reference Number"
                  />
                </div>

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
                            key: tempIds + 1,

                            sequence: 0,
                            userId: newValue.id,
                            name: newValue.label,
                            mdaId: mda,
                            roleId: 0,
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
                          <Typography>{e.name}</Typography>
                          <Typography>Approver {idx + 1}</Typography>
                          {[...through, ...approvers].length - (idx + 1) >=
                            approvers?.length && (
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
                <TextField
                  variant="outlined"
                  className="bg-white border-2 border-primary-main rounded-full"
                  // label="Field 1"
                  label="Project Description"
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleChange}
                  multiline
                  rows={3}
                  fullWidth
                  placeholder="Project Description:"
                />
                <TextField
                  variant="outlined"
                  // color="error"
                  className="bg-white  border-2 border-primary-main rounded-full"
                  // label="Field 1"
                  label="Details"
                  name="approvalDetails"
                  value={formData.approvalDetails}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  fullWidth
                  placeholder="Approval Details "
                />
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
              <div className="my-4">
                <Typography className="font-bold ml-2">
                  Attach Documents
                </Typography>
                <FileUploadComponent onFileChange={handleFileChange} />

                <div>
                  {documentFiles?.map((e) => (
                    <div className="flex justify-between items-center p-3 bg-green-400 my-2 rounded-2xl">
                      <Typography className=" text-white font-bold">
                        {e?.docName}
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
                Submit Request
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* <STBMain/> */}
      <MuiDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        contentComponent={
          <ProcurementDocument procurementData={procurements} />
        }
      />
    </div>
  );
}

export default InitiateComplianceRequest;
