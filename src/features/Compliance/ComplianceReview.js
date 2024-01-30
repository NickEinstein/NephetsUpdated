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
// import DashboardTable from "./DashboardTable";
import { Link, Navigate, useLocation } from "react-router-dom";
import { RouteEnum } from "constants/RouteConstants";
import LoginHeader from "common/LoginHeader";
import FormGroup from "@mui/material/FormGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import {
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
import { AccountCircle, Wallet } from "@mui/icons-material";
import ToDoorSearch from "common/ToDoorSearch";
import { post, get, put } from "services/fetch";
import SuperAdminApi from "apis/UserApi";
import MyTable from "common/MyTable";
import ExpenseStepper from "common/ExpenseStepper";
import ProcurementApi from "apis/ProcurementApi.js";
import moment from "moment";
import ComplianceApi from "apis/ComplianceApi.js";
import STBMain from "./STBMain";
import EXCOREQ from "features/procurementRequest/EXCOREQ";

function ComplianceReview(props) {
  const [userType, setUserType] = React.useState("");
  const [isOnPending, setisOnPending] = React.useState(true);
  const [procurementsPendingApprovals, setProcurementsPendingApprovals] =
    React.useState([]);
  const [procurementIApproved, setProcurementIApproved] = React.useState([]);
  const [procurementIDeclined, setProcurementIDeclined] = React.useState([]);
  const [tablefiller, settablefiller] = React.useState([]);
  const [filtered, setFiltered] = React.useState([]);

  //  const getUserStatsQueryResult = UserApi.useGetStatsQuery();
  //  console.log(getUserStatsQueryResult);
  //  const userStats = getUserStatsQueryResult?.data?.data;
  // const getStoreProductsQueryResult = UserApi.useGetStoreProductsQuery({});
  // const storeProducts = getStoreProductsQueryResult?.data;
  const location = useLocation();
  const redirect = useNavigate();

  console.log(location);
  // console.log(getStoreProductsQueryResult)

  // console.log(companyStatistics);
  // const getrecentprocurements =
  //   ProcurementApi.useGetProcurementPendingApproversQuery({
  //     // userType: "rider",
  //   });
  // const recentprocurements = getrecentprocurements?.data?.data;
  // console.log(recentprocurements);

  const getComplianceRequestForApproval =
    ComplianceApi.useGetComplianceLitForApprovalQuery({
      // userType: "company",
    });
  const listForApproval = getComplianceRequestForApproval;

  const getComplianceRequestApproved =
    ComplianceApi.useGetComplianceListApprovedQuery({
      // userType: "company",
    });
  const listApproved = getComplianceRequestApproved;

  const getComplianceRequestDeclined =
    ComplianceApi.useGetComplianceListDeclinedQuery({
      // userType: "company",
    });
  const listDeclined = getComplianceRequestDeclined;

  // const getAllCustomerQueryResult = UserApi.useGetAllQuery({
  //   userType: "customer",
  // });
  // const totalCustomers = getAllCustomerQueryResult?.data?.data;

  //  console.log(getAllQueryResult.data.data);

  const history = useNavigate();

  // const redirect = () => {
  //   history("/complete-signUp");
  // };

  const authUser = useAuthUser();

  function numberWithCommas(x) {
    // serPrice.value = x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //  formState.target_amount=cleanupNumber(serPrice.value)
    return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const [age, setAge] = React.useState();

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  // console.log(listForApproval)
  // "Subject",
  //   "Description",
  //   "Initiated By",
  //   "Agency/MDA",
  //   "Date Created",
  //   "Status",

  let dataflex = listForApproval?.data?.map((e, idx) => ({
    id: e.id,
    column1: e.subject,
    column2: e?.details,
    column3: e?.initiator,
    column4: e?.mdaName,
    column5: moment(e?.createdAt).format("LL"),

    column6:
      e?.status && e.status == 3 ? (
        <div className="flex items-center gap-1">
          <div className="p-2 bg-yellow-400 rounded-full"></div>
          <Typography>Pending</Typography>
        </div>
      ) : e.status == 7 || e?.status?.toLowerCase() == "approved" ? (
        <div className="flex items-center gap-1">
          <div className="p-2 bg-green-400 rounded-full"></div>
          <Typography>Approved</Typography>
        </div>
      ) : e.status == 8 || e?.status?.toLowerCase() == "declined" ? (
        <div className="flex items-center gap-1">
          <div className="p-2 bg-red-400 rounded-full"></div>
          <Typography>Declined</Typography>
        </div>
      ) : (
        e.status
      ),
  }));
  // {
  //   id: 1,
  //   subject: "Procurement of Industrial Laboratory Equipments",
  //   initiatedBy: "Williams Humphrey",
  //   mda: "Ministry of Industries",
  //   dateCreated: "10.10.2023",
  //   status: "Declined ",
  // },
  const { enqueueSnackbar } = useSnackbar();
  const [pendingApprovalsMutation, procurementMutationResult] =
    ProcurementApi.useGetPendingApprovalsMutation();

  const [actionedProcurementsMutation, actionedProcurementMutationResult] =
    ProcurementApi.useGetActionedProcurementsMutation();

  const getPendingApprovers = async () => {
    const values = {
      pageNumber: 1,
      status: "",
      queryFilter: "",
      pageSize: 30,
    };

    try {
      // setIsLoading(true);
      const data = await pendingApprovalsMutation({
        data: { ...values },
      }).unwrap();

      setProcurementsPendingApprovals(data);
      settablefiller(data);
      // TODO extra login
      // setIsLoading(false);
      // if (data.data)
      // enqueueSnackbar("Logged in successful", { variant: "success" });
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
  const getActionedProcurements = async () => {
    const values = {
      pageNumber: 1,
      status: "",
      queryFilter: "",
      pageSize: 30,
    };

    try {
      // setIsLoading(true);
      const data = await actionedProcurementsMutation({
        data: { ...values },
      }).unwrap();

      setProcurementIApproved(data);
      // TODO extra login
      // setIsLoading(false);
      // if (data.data)
      // enqueueSnackbar("Logged in successful", { variant: "success" });
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

  useEffect(() => {
    // getPendingApprovers();
    // getActionedProcurements();
  }, []);

  const redirectToDetailsPage = (id) => {
    isOnPending
      ? redirect(`${RouteEnum.COMPLIANCE_DETAIL}/${id}`)
      : redirect(`${RouteEnum.PROCUREMENT_DETAIL_NO_ACTION}/${id}`);
  };

  const redirectToComplianceInitiation = (id) => {
    isOnPending
      ? redirect(`${RouteEnum.COMPLIANCE_DETAILS}/${id}`)
      : redirect(`${RouteEnum.PROCUREMENT_DETAIL_NO_ACTION}/${id}`);
  };

  const handleClick = (id) => {
    redirectToDetailsPage(id);
  };

  const initiateProcurement = (id) => {
    redirectToComplianceInitiation(id);
  };
  const adjustTableFiller = (data) => {
    settablefiller(data);
  };
  return (
    <div className="w-full ">
      <div className="flex gap-6 items-center w-3/4">
        <div
          className="cursor-pointer"
          onClick={() => {
            adjustTableFiller(procurementsPendingApprovals);
            setisOnPending(true);
          }}
        >
          <WallCards
            count={listForApproval?.data?.length || 0}
            name="Compliance Requests Pending Approval"
          />
        </div>
        <div
          className="cursor-pointer"
          onClick={() => {
            adjustTableFiller(procurementIApproved);
            setisOnPending(false);
          }}
        >
          <WallCards
            count={listApproved?.data?.length || 0}
            name="Compliance Requests Approved"
          />
        </div>
        <div
          className="cursor-pointer"
          onClick={() => {
            adjustTableFiller(procurementIDeclined);
            setisOnPending(false);
          }}
        >
          <WallCards
            count={listDeclined?.data?.length || 0}
            name="Declined Compliance Request"
          />
        </div>
      </div>

      <MyTable
        // dataz={recentprocurements}
        dataflex={dataflex}
        onClick={handleClick}
        // column={columns}
      />

      {/* <REQUEST TYPE */}
    </div>
  );
}

export default ComplianceReview;
