import React, { useEffect, useState } from "react";
import UserApi from "apis/UserApi";
import { useFormik } from "formik";
import { MdRefresh, MdOutlineSearch, MdSearch } from "react-icons/md";
import * as yup from "yup";
import { useSnackbar } from "notistack";
import parser from "html-react-parser";

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

function ProcurementReview(props) {
  const [userType, setUserType] = React.useState("");
  const [isOnPending, setisOnPending] = React.useState(true);
  const [isOnAssigned, setisOnAssigned] = React.useState(false);
  const [procurementsPendingApprovals, setProcurementsPendingApprovals] =
    React.useState([]);
  const [procurementIApproved, setProcurementIApproved] = React.useState([]);
  const [procurementIDeclined, setProcurementIDeclined] = React.useState([]);
  const [procurementIAssigned, setProcurementIAssigned] = React.useState([]);
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
  const getrecentprocurements =
    ProcurementApi.useGetProcurementPendingApproversQuery({
      // userType: "rider",
    });
  const recentprocurements = getrecentprocurements?.data?.data;
  console.log(recentprocurements);

  const getAssignedQueryResult = UserApi.useGetAssignedProcurementsQuery({
    page: 1,
    pageSize: 10,
  });
  const totalAssigned = getAssignedQueryResult?.data;

  // console.log(totalAssigned)

  // const getAllCompanyQueryResult = UserApi.useGetAllQuery({
  //   userType: "company",
  // });
  // const totalCompanies = getAllCompanyQueryResult?.data?.data;

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

  // "Subject",
  //   "Description",
  //   "Initiated By",
  //   "Agency/MDA",
  //   "Date Created",
  //   "Status",

  let dataflex = tablefiller?.data?.map((e, idx) => ({
    id: e.id || e?.procurementRequest?.id,
    column1: e.subject || e?.procurementRequest?.subject,
    column2: parser(e?.details) || parser(e?.procurementRequest?.details),
    column3: e?.from || e?.procurementRequest?.fromName,
    column4:
      e?.mdaName || e?.procurementRequest?.mdaName || e?.mdaAddress?.name,
    column5:
      moment(e?.createdAt).format("LL") || e?.procurementRequest?.subject,

    column6:
      (e?.status || e?.procurementRequest?.status) &&
      (e.status || e?.procurementRequest?.status) == 0 ? (
        <div className="flex items-center gap-1">
          <div className="p-2 bg-slate-400 rounded-full"></div>
          <Typography>Saved</Typography>
        </div>
      ) : (e.status || e?.procurementRequest?.status) == 2 ||
        (e?.status?.toLowerCase() ||
          e?.procurementRequest?.status.toLowerCase()) == "pending" ? (
        <div className="flex items-center gap-1">
          <div className="p-2 bg-yellow-400 rounded-full"></div>
          <Typography>Pending</Typography>
        </div>
      ) : (
        e.status
      ),
    column7: e || e?.procurementRequest,
  }));
  // {
  //   id: 1,
  //   subject: "Procurement of Industrial Laboratory Equipments",
  //   initiatedBy: "Williams Humphrey",
  //   mda: "Ministry of Industries",
  //   dateCreated: "10.10.2023",
  //   status: "Approved ",
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
    getPendingApprovers();
    getActionedProcurements();
  }, []);

  const redirectToDetailsPage = (id) => {
    isOnPending
      ? redirect(`${RouteEnum.PROCUREMENT_DETAIL}/${id}`)
      : redirect(`${RouteEnum.PROCUREMENT_DETAIL_NO_ACTION}/${id}`);
  };

  const redirectToMethodsPage = (id) => {
    isOnPending && redirect(`${RouteEnum.PROCUREMENT_METHODs}/${id}`);
    // : redirect(`${RouteEnum.PROCUREMENT_DETAIL_NO_ACTION}/${id}`);
  };

  const redirectToAssignedPage = (id) => {
    // alert('ko')
    // isOnPending
    redirect(`${RouteEnum.PROCUREMENT_ASSIGNs}/${id}`);
    // : redirect(`${RouteEnum.PROCUREMENT_DETAIL_NO_ACTION}/${id}`);
  };

  const handleClick = (id, isEdppa) => {
    if (isOnAssigned) redirectToAssignedPage(id);
    else isEdppa ? redirectToMethodsPage(id) : redirectToDetailsPage(id);
  };

  const handleClickMethods = (id) => {
    redirectToDetailsPage(id);
  };

  // const initiateProcurement = (id) => {
  //   redirectToComplianceInitiation(id);
  // };
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
            setisOnAssigned(false);
            setisOnPending(true);
          }}
        >
          <WallCards
            count={procurementsPendingApprovals?.totalCount || 0}
            name="Pending Procurement Requests"
          />
        </div>
        <div
          className="cursor-pointer"
          onClick={() => {
            adjustTableFiller(procurementIApproved);
            setisOnPending(false);
            setisOnAssigned(false);
          }}
        >
          <WallCards
            count={procurementIApproved?.totalCount || 0}
            name="Approved Procurement Request"
          />
        </div>
        <div
          className="cursor-pointer"
          onClick={() => {
            adjustTableFiller(procurementIDeclined);
            setisOnAssigned(false);
            setisOnPending(false);
          }}
        >
          <WallCards
            count={procurementIDeclined?.totalCount || 0}
            name="Declined Procurement Request"
          />
        </div>

        <div
          className="cursor-pointer"
          onClick={() => {
            adjustTableFiller(totalAssigned);
            setisOnPending(false);
            setisOnAssigned(true);
            // alert('')
          }}
        >
          <WallCards
            count={totalAssigned?.totalCount || 0}
            name="Revert Requests"
          />
        </div>
      </div>

      <MyTable
        dataz={tablefiller}
        dataflex={dataflex}
        onClick={handleClick}
        onClick2={handleClickMethods}

        // column={columns}
      />

      {/* <REQUEST TYPE */}
    </div>
  );
}

export default ProcurementReview;
