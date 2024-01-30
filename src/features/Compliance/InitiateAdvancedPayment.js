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
import ProcurementDocument from "common/ComplianceCertificate";
import FileUploadComponent from "common/FileUploadComponent";
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
  const [standardApprovers, setstandardApprovers] = React.useState([]);
  const [from, setFrom] = React.useState();
  const [formData, setFormData] = React.useState({ costImplication: 23 });

  const user = useAuthUser();
  console.log(user);

  const { id } = useParams();

  // const getMdas = ServicesApi.useGetMdasQuery({});
  // const mdas = getMdas?.data;

  // const getEmployee = ServicesApi.useGetEmployeesQuery({
  //   id: mda,
  // });
  // const employees = getEmployee?.data || []; // const getEmployeesByMda = getMdas?.data

  // const getApprovers = ProcurementApi.useGetProcurementApproversQuery({
  //   // id: mda,
  //   costs: formData?.costImplication,
  //   requestType,
  // });
  // const approvers = getApprovers?.data?.data || [];
  // console.log(approvers);

  const getReadyForAdvancedPayment = ComplianceApi.useGetComplianceRequestQuery(
    {
      id,
    }
  );
  const readyForAdvancedPayment = getReadyForAdvancedPayment?.data;

  console.log(readyForAdvancedPayment);

  // const getBudgetItem = ComplianceApi.useGetBudgetItemsQuery({});
  // const budgetItem = getBudgetItem?.data?.data || [];

  // const getBudgetType = ComplianceApi.useGetBudgetTypeQuery({});
  // const budgetType = getBudgetType?.data?.data || [];

  // const getprocurements = ComplianceApi.useGetComplianceRequestQuery({
  //   id,
  // });

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
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

  const handleFileChange = (fileData, name) => {
    console.log(fileData);
    setDocumentFiles([
      ...documentFiles,
      {
        docName: name,
        docPath: fileData?.doclink,
      },
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

  const handleChange = (event, newValue) => {
    console.log(newValue);
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
      requisitionId: readyForAdvancedPayment?.requisitionId,
      subject: formData.subject,
      vendorName: readyForAdvancedPayment?.vendor,
      advancePayment: 0,
      percentage: +formData.percentage,
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
  const [proccurementMutation, procurementMutationResult] =
    ProcurementApi.useSubmitAdvancePaymentRequestMutation();

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
        redirect(RouteEnum.ADVANCED_PAYMENT);
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

  return (
    <div className="w-full ">
      {!readyForAdvancedPayment ? (
        <LoadingModalEdoGov />
      ) : (
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
                  value={readyForAdvancedPayment?.budgetTypeName}
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
                  value={numberWithCommas(
                    readyForAdvancedPayment?.costImplication
                  )}
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
                Advanced Payment Request
                {/* {procurements?.title?.toUpperCase()} */}
              </Typography>
            </div>
            <div className="flex flex-col gap-3">
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

              <TextField
                type="number"
                variant="outlined"
                className="bg-white border-2 border-primary-main rounded-full mt-2"
                label="Percentage (%)"
                name="percentage"
                value={formData.percentage}
                onChange={handleChange}
                fullWidth
                placeholder="Percentage"
              />
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
                    value={readyForAdvancedPayment?.vendor}
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
                    value={readyForAdvancedPayment?.companyAddress}
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
                    value={readyForAdvancedPayment?.serviceDescription?.toUpperCase()}
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
                      value={readyForAdvancedPayment?.projectDuration}
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
                    value={readyForAdvancedPayment?.requisitionId?.toUpperCase()}
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
              </div> */}
                <div>
                  <Typography className="text-[#3C7E2D] ml-3 mb-1 font-bold">
                    Project Details
                  </Typography>
                  <TextField
                    variant="outlined"
                    // color="error"
                    className="bg-white  border-2 border-primary-main rounded-full"
                    // label="Field 1"
                    // label="Details"
                    name="approvalDetails"
                    value={readyForAdvancedPayment?.details}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    fullWidth
                    placeholder="Approval Details "
                  />
                </div>
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
      <MuiDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        contentComponent={
          <ProcurementDocument procurementData={readyForAdvancedPayment} />
        }
      />
    </div>
  );
}

export default InitiateComplianceRequest;
