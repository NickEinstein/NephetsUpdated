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
import ServicesApi from "apis/ServicesApi";

function ComplianceForIDGeneration(props) {
  const user = useAuthUser();
  const { enqueueSnackbar } = useSnackbar();
  const [current, setCurrent] = React.useState(false);
  const [mda, setmda] = React.useState();
  const [tempIds, settempIds] = React.useState(0);
  const [formData, setFormData] = React.useState({});
  const [through, setthrough] = React.useState([]);
  const [standardApprovers, setstandardApprovers] = React.useState([]);
  const [stbArray, setStbArray] = React.useState([]);
  const [excoPayload, setExcoPayload] = React.useState();
  const [show, setshow] = React.useState(false);
  const [dataType, setdataType] = React.useState("companies");
  const [filtered, setFiltered] = React.useState([]);

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

  // console.log(procurements);

  const [approveComplianceMutation, approveComplianceMutationResult] =
    ComplianceApi.useApproveComplianceRequestMutation();
  // console.log(procurements);

  const [addComplianceSTBDecision, addComplianceSTBDecisionResult] =
    ComplianceApi.useComplianceSTBDecisionMutation();

  function numberWithCommas(x) {
    // serPrice.value = x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //  formState.target_amount=cleanupNumber(serPrice.value)
    return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const [comment, setComment] = React.useState();

  const handleChange = (event, newValue) => {
    // console.log(newValue);
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const redirect = useNavigate();

  const todeleteApprovers = (idx) => {
    console.log(idx);
    console.log(through);
    let temp = through?.filter((e) => e.key !== idx);
    setthrough(temp);
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
      compliance: {
        id: 0,
        to: 0,
        requisitionId: "req:jjdhfh",
        vendor: formData.vendorName,
        from: user?.userId,
        initiator: user?.fullName,
        projectDuration: formData?.projectDuration,
        subject: formData?.subject,
        details: formData.details,
        budgetTypeId: 1,
        serviceDescription: formData?.serviceDescription,
        budgetTypeName: "",
        costImplication: 0,
        status: 2,
        companyAddress: formData?.companyAddress,
        mdaId: user.mdaId,
        mdaName: user?.mdaName,
        fileReference1: "string",
        fileReference2: "string",
        actionInfo1: "string",
        actionInfo2: "string",
        meetingOrdinal: 20,
        meetingDate: "2024-01-12T19:03:29.223Z",
        meetingSubject: "string",
        memoGC: "string",
        memoBy: "string",
        conclusionReferenceGC: "string",
        conclusionTitle: "string",
        conclusionDetails: "string",
        advancePercentage: formData?.advancePercentage,
        approvers: [
          {
            approverName: "string",
            approverId: 0,
            sequence: 0,
            approvalStatus: "string",
            comments: "string",
          },
        ],
        documents: [
          {
            id: 0,
            docName: "string",
            docPath: "string",
          },
        ],
        actioners: [
          {
            id: 0,
            referenceId: "",
            userId: 123,
            actionBy: "string",
            isCopied: true,
            createdAt: "2024-01-12T19:03:29.223Z",
            modifiedAt: "2024-01-12T19:03:29.223Z",
          },
        ],
        stbDecisions: [...stbArray],
      },
    };

    // try {
    //   // setIsLoading(true);
    //   const data = await approveComplianceMutation({
    //     data: { ...payload },
    //   }).unwrap();

    //   console.log(data);
    //   // TODO extra login
    //   // setIsLoading(false);
    //   if (data.data) {
    //     enqueueSnackbar("Compliance Request Successfully Approved", {
    //       variant: "success",
    //     });

    //     // submitStbDecisions();
    //   }
    //   // redirect(RouteEnum.DASHBOARD);
    // } catch (error) {
    //   console.log(error);
    //   // setIsLoading(false);
    //   // enqueueSnackbar(
    //   //   error?.data?.message || "Something went wrong",
    //   //   "Failed to login",
    //   //   {
    //   //     variant: "error",
    //   //   }
    //   // );
    // }

    console.log(payload);
  };

  const stbData = (data) => {
    setStbArray(data);
  };

  const excoData = (payload) => {
    setExcoPayload(payload);
    // console.log(payload);
    // props.getExcoInfo(payload);
  };

  useEffect(() => {
    let payload = {
      compliance: {
        id: 0,
        to: 0,
        requisitionId: "yuyuyuy",
        vendor: formData.vendorName,
        from: user?.userId,
        initiator: user?.fullName,
        projectDuration: formData?.projectDuration,
        subject: formData?.subject,
        details: formData.details,
        budgetTypeId: 1,
        serviceDescription: formData?.serviceDescription,
        budgetTypeName: "",
        costImplication: 0,
        status: 2,
        companyAddress: formData?.companyAddress,
        mdaId: user.mdaId,
        mdaName: user?.mdaName,
        fileReference1: "string",
        fileReference2: "string",
        actionInfo1: "string",
        actionInfo2: "string",
        meetingOrdinal: 20,
        meetingDate: "2024-01-12T19:03:29.223Z",
        meetingSubject: "string",
        memoGC: "string",
        memoBy: "string",
        conclusionReferenceGC: "string",
        conclusionTitle: "string",
        conclusionDetails: "string",
        approvers: [],
        documents: [],
        actioners: [
          {
            id: 0,
            referenceId: "",
            userId: 123,
            actionBy: "string",
            isCopied: true,
            createdAt: "2024-01-12T19:03:29.223Z",
            modifiedAt: "2024-01-12T19:03:29.223Z",
          },
        ],
        stbDecisions: [...stbArray],
        ...excoPayload,
        ...formData,
        advancePercentage: +formData?.advancePercentage,
      },
    };
    console.log(payload);
    props.getExcoAndSTBInfo(payload);
  }, [excoPayload, stbArray, formData]);

  return (
    <div className="w-full ">
      {/* <div
        onClick={() => redirect(-1)}
        className="p-5 flex items-center gap-2 cursor-pointer absolute right-10 top-24"
      >
        <BackspaceTwoTone /> <Typography>Back</Typography>
      </div> */}
      <div class="flex gap-8  w-full items-start bg-white px-[10%]">
        <div className="w-full">
          <div className="w-full">
            <div class="flex gap-3 items-center  mb-8">
              {/* <img src={vector} /> */}
            </div>
            <Card className="flex gap-3 flex-col">
              <div class="flex flex-col gap-5">
                <div className="w-full">
                  <Typography className="text-[#3C7E2D] ml-3 text-lg font-bold">
                    Subject
                  </Typography>
                  <TextField
                    variant="outlined"
                    className="bg-white border-2 border-primary-main rounded-full w-full"
                    // label="Vendor Name"
                    name="subject"
                    value={formData?.subject}
                    onChange={handleChange}
                    fullWidth
                    placeholder="Subject"
                  />
                </div>
                <div className="w-full">
                  <Typography className="text-[#3C7E2D] ml-3 text-lg font-bold">
                    Details
                  </Typography>
                  <TextField
                    name="details"
                    variant="outlined"
                    multiline
                    minRows={4}
                    className="bg-white border-2 border-primary-main rounded-full"
                    // label="From"
                    value={formData?.details?.toUpperCase()}
                    onChange={handleChange}
                    fullWidth
                    placeholder="Details"
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
              <Divider className="my-8" />

              <div>
                <div className="flex flex-col gap-4">
                  {/* <Typography className="text-[#3C7E2D] ml-3 mb-4 text-lg font-bold">
                    Enter Vendor Details
                  </Typography> */}
                  <div>
                    <Typography className="text-[#3C7E2D] ml-3 text-lg font-bold">
                      Vendor Name
                    </Typography>
                    <TextField
                      variant="outlined"
                      className="bg-white border-2 border-primary-main rounded-full"
                      // label="Vendor Name"
                      name="vendorName"
                      value={formData?.vendor}
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
                      name="companyAddress"
                      value={formData?.companyAddress}
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
                      value={formData?.serviceDescription?.toUpperCase()}
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
                      name="projectDuration"
                      value={formData?.projectDuration}
                      onChange={handleChange}
                      fullWidth
                      placeholde
                      // r="Subject"
                    />
                  </div>

                  <div>
                    <Typography className="text-[#3C7E2D] ml-3 text-lg font-bold">
                      Advanced Percentage %
                    </Typography>
                    <TextField
                      type="number"
                      variant="outlined"
                      className="bg-white border-2 border-primary-main rounded-lg w-full "
                      // label="Contract Duration"
                      name="advancePercentage"
                      value={formData?.advancePercentage}
                      onChange={handleChange}
                      fullWidth
                      placeholde
                      // r="Subject"
                    />
                  </div>
                </div>
                {/* <img src={cert}/> */}
              </div>

              {/* <div className="flex gap-6 items-center">
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
              </div> */}

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

      <div>
        <div>
          <div className="mt-8">
            <STBMain stbData={stbData} procurements={procurements} />
            {<EXCOREQ excoData={excoData} procurements={procurements} />}
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
          {/* <Button onClick={onSubmit} className="p-3 text-base font-bold">
            Submit Details
          </Button> */}
        </div>
      </div>
    </div>
  );
}

export default ComplianceForIDGeneration;
