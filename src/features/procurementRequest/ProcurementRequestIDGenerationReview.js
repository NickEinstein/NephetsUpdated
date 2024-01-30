import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import useAuthUser from "hooks/useAuthUser";
import { Link, Navigate } from "react-router-dom";
import { RouteEnum } from "constants/RouteConstants";
import vector from "images/Vector.svg";

import {
  Autocomplete,
  Avatar,
  Button,
  Card,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { BackspaceTwoTone } from "@mui/icons-material";
import SSBRequest from "./EXCOREQ";
import { post, get, put } from "services/fetch";
import MyTable from "common/MyTable";
import docIcon from "images/DocuploadIcon.svg";
import ServicesApi from "apis/ServicesApi";
import ProcurementApi from "apis/ProcurementApi.js";
import ComplianceApi from "apis/ComplianceApi.js";
import ExpenseApi from "apis/ExpenseApi";
import moment from "moment";

function InitiateProcurementRequest(props) {
  const { enqueueSnackbar } = useSnackbar();

  const [documentFiles, setDocumentFiles] = React.useState([]);
  const [approversComment, setApproversComment] = React.useState("Approved");
  const [tablefiller, settablefiller] = React.useState([]);
  const [show, setshow] = React.useState(false);
  const [mda, setmda] = React.useState();
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
  const budItemz = getBudItemz?.data?.capitalExpenditure || []; // const getEmployeesByMda = getMdas?.data

  const getApprovers = ProcurementApi.useGetProcurementApproversQuery({});
  const approvers = getApprovers?.data?.data || [];

  const [
    existingPendingProcurementMutation,
    processProcurementMethodMutationResult,
  ] = ProcurementApi.useGetPendingExistingProcurementsMutation();

  const getProcurementMethodTypesz =
    ProcurementApi.useGetProcurementMethodTypesQuery({
      // id: mda,
    });
  const procurementMethodTypesz = getProcurementMethodTypesz?.data?.data || [];

  const handleChange = (event, newValue) => {
    console.log(newValue);
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const postprocurement = (id) => {
    // status: 3,
    // mdaId: user.mdaId,
    console.log(formData);
    let payload = {
      requestId: formData.procurement.id,
      comment: approversComment,
      action: "approved",
      approverDocuments: [],
      assignees: [],
    };

    onSubmit(payload);
    console.log(payload);
  };
  const handleFileChange = (fileData, name) => {
    setDocumentFiles([
      ...documentFiles,
      {
        name: name,
        path: fileData?.doclink,
      },
    ]);
    // Handle the selected file, for example, you can upload it to a server
    // console.log('Selected File:', file);
  };

  const authUser = useAuthUser();

  function numberWithCommas(x) {
    // serPrice.value = x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //  formState.target_amount=cleanupNumber(serPrice.value)
    return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const [approveExistingProcurementMutation, procurementMutationResult] =
    ProcurementApi.useSubmitApprovedExistingProcurementMethodMutation();

  const onSubmit = async (values) => {
    console.log(values);

    try {
      const data = await approveExistingProcurementMutation({
        data: { ...values },
      }).unwrap();

      console.log(data);
      if (data.data) {
        enqueueSnackbar("Procurement Request Successfully Sent", {
          variant: "success",
        });
      }
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

  const getBudgetItem = ComplianceApi.useGetBudgetItemzQuery({});
  const budgetItem = getBudgetItem?.data?.data || [];

  const getBudgetType = ComplianceApi.useGetBudgetTypeQuery({});
  const budgetType = getBudgetType?.data?.data || [];

  const [budgettypeId, setbudgettypeId] = React.useState([]);

  const getPendingExistingProcurement = async () => {
    let payload = { pageNumber: 1, status: "", queryFilter: "", pageSize: 10 };
    try {
      // setIsLoading(true);
      const data = await existingPendingProcurementMutation({
        data: { ...payload },
      }).unwrap();

      console.log(data);
      // TODO extra login
      // setIsLoading(false);
      if (data.data) {
        // enqueueSnackbar("Procurement Method Successfully Processed", {
        //   variant: "success",
        // });
        console.log(data.data);
        settablefiller(data);
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

    // setExcoInfo();
  };

  useEffect(() => {
    getPendingExistingProcurement();
  }, []);

  let columns = [
    "Subject",
    "Initiator",
    "MDA",
    "Budget Item",
    "Approved Amount",
    "Date Created",
    "Status",
  ];

  const handleClick = (id, isEdppa, row) => {
    console.log(row?.column8);
    setFormData(row?.column8);
    setshow(true);

    // isEdppa ? redirectToMethodsPage(id) : redirectToDetailsPage(id);
  };
  const handleClickMethods = (id) => {
    // redirectToDetailsPage(id);
  };

  let dataflex = tablefiller?.data?.map((e, idx) => ({
    id: e?.procurement?.id,
    column1: e?.procurement?.subject,
    column2: e?.procurement?.from,
    column3: e?.procurement?.mda,
    column4: e?.procurement?.budgetTypeName,
    column5: numberWithCommas(e?.procurement?.costImplication),
    column6: moment(e?.procurement?.createdAt).format("LL"),

    column7:
      (e?.status || e?.procurement?.status) &&
      (e.status || e?.procurement?.status) == 0 ? (
        <div className="flex items-center gap-1">
          <div className="p-2 bg-slate-400 rounded-full"></div>
          <Typography>Saved</Typography>
        </div>
      ) : (e.status || e?.procurement?.status) == 2 ||
        (e?.status?.toLowerCase() || e?.procurement?.status.toLowerCase()) ==
          "pending" ? (
        <div className="flex items-center gap-1">
          <div className="p-2 bg-yellow-400 rounded-full"></div>
          <Typography>Pending</Typography>
        </div>
      ) : (
        e.status
      ),
    column8: e || e,
  }));

  return (
    <div className="w-full ">
      {!show && (
        <MyTable
          dataz={tablefiller}
          dataflex={dataflex}
          onClick={handleClick}
          onClick2={handleClickMethods}
          column={columns}
        />
      )}
      {show && (
        <div>
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
                  {/* <FormControl className="" fullWidth>
                 
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
                  </FormControl> */}
                  {/* <div>
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
                  </div> */}
                  <div className="ml-2">
                    <Typography className="text-[#3C7E2D] ml-3 text-base font-bold">
                      Cost Implication
                    </Typography>
                    <TextField
                      variant="outlined"
                      className="bg-white border-2 border-primary-main rounded-full"
                      // label="Field 1"
                      name="costImplication"
                      value={formData?.procurement?.costImplication}
                      onChange={handleChange}
                      fullWidth
                    />
                  </div>
                </div>

                <div className="w-3/4 flex justify-between flex-col items-center">
                  <div>
                    <Typography>Initiator's Documents</Typography>
                    {formData?.procurement?.memoRequestDocuments.map((e) => (
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
              </div>
            </Card>
            <div className="w-full">
              <div className="w-full">
                <Typography className="text-[#3C7E2D] ml-3 mb-4 text-lg font-bold">
                  Reference ID: {formData?.compliance?.requisitionId}
                </Typography>
                <Card className="flex gap-3 flex-col">
                  <TextField
                    variant="outlined"
                    className="bg-white border-2 border-primary-main rounded-full mt-2"
                    // label="Subject"
                    name="subject"
                    value={formData.procurement?.subject}
                    onChange={handleChange}
                    fullWidth
                    placeholder="Subject"
                  />
                  {/* <TextField
                  variant="outlined"
                  className="bg-white border-2 border-primary-main rounded-full"
                  label="Transaction ID/Reference Number"
                  name=""
                  // value={formData.procurement?.quantity}
                  onChange={handleChange}
                  fullWidth
                  placeholder="Trans ID/Reference Number"
                /> */}
                  <div class="flex gap-6">
                    <div className="w-full">
                      {/* <Typography>MDA</Typography> */}
                      <FormControl className="" fullWidth>
                        {/* <InputLabel id="demo-simple-select-label">
                        Select Budget Item Category
                      </InputLabel> */}
                        <TextField
                          variant="outlined"
                          className="bg-white border-2 border-primary-main rounded-full mt-2"
                          name="mda"
                          value={formData.procurement?.mdaId}
                          onChange={handleChange}
                          fullWidth
                          placeholder="mda"
                        />
                      </FormControl>
                    </div>
                    {/*  */}
                  </div>
                  <TextField
                    variant="outlined"
                    // color="error"
                    className="bg-white  border-2 border-primary-main rounded-full"
                    // label="Field 1"
                    label="Project Description"
                    // name="approvalDetails"
                    value={formData.procurement?.details}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    fullWidth
                    placeholder="Approval Details "
                  />
                </Card>
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
                  // label="Procurement Method Subject"
                  name="procurementMethodSubject"
                  value={formData.procurement?.procurementMethodSubject}
                  onChange={handleChange}
                  fullWidth
                  placeholder="Procurement Method Subject"
                />
                <div className="flex gap-6 items-center ">
                  <FormControl className="" fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Procurement Method
                    </InputLabel>
                    <Select
                      value={formData.procurement?.procurementMethodId}
                      // disabled
                      readOnly
                      // labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Select Procurement Methid "
                      // variant="standard"
                      // onChange={(e) => setprocurementMethodString(e.target.value)}
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
                      // label="Service Description"
                      multiline
                      rows={2}
                      name="serviceDescription"
                      value={formData?.procurement?.serviceDescription}
                      onChange={handleChange}
                      fullWidth
                      // placeholde
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
          {/* <ComplianceForIDGeneration getExcoAndSTBInfo={getExcoInfo} /> */}
          <div className="w-full ">
            <div
              onClick={() => setshow(false)}
              className="p-5 flex items-center gap-2 cursor-pointer absolute right-10 top-24"
            >
              <BackspaceTwoTone /> <Typography>Back</Typography>
            </div>
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
                          value={formData?.compliance?.subject}
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
                          value={formData?.compliance?.details?.toUpperCase()}
                          onChange={handleChange}
                          fullWidth
                          placeholder="Details"
                        />
                      </div>
                    </div>
                    <Divider className="my-8" />
                    <div>
                      <div className="flex flex-col gap-4">
                        <div>
                          <Typography className="text-[#3C7E2D] ml-3 text-lg font-bold">
                            Vendor Name
                          </Typography>
                          <TextField
                            variant="outlined"
                            className="bg-white border-2 border-primary-main rounded-full"
                            // label="Vendor Name"
                            name="vendorName"
                            value={formData?.compliance?.vendor}
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
                            value={formData?.compliance?.companyAddress}
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
                            value={formData?.compliance?.serviceDescription?.toUpperCase()}
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
                            value={formData?.compliance?.projectDuration}
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
                            value={formData?.compliance?.advancePercentage}
                            onChange={handleChange}
                            fullWidth
                            placeholde
                            // r="Subject"
                          />
                        </div>
                      </div>
                      {/* <img src={cert}/> */}
                    </div>
                  </Card>
                </div>
              </div>
            </div>
            <div>
              <div>
                <div className="mt-8">
                  {/* <STBMain stbData={stbData} procurements={procurements} /> */}
                  {/* {<EXCOREQ excoData={excoData} procurements={procurements} />} */}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full flex-col flex gap-4 my-4">
            <Button
              onClick={() => postprocurement(2)}
              className="w-full h-12 font-bold"
            >
              Approve Request
            </Button>
          </div>
        </div>
      )}
      {/* <SSBRequest /> */}
    </div>
  );
}

export default InitiateProcurementRequest;
