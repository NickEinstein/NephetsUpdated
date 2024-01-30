import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import useAuthUser from "hooks/useAuthUser";
import { Link, Navigate, useLocation } from "react-router-dom";
import { RouteEnum } from "constants/RouteConstants";
import parser from "html-react-parser";

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

function Dashboard(props) {
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

  const getApprovedCompliances = ComplianceApi.useGetInitiatorsApprovedQuery(
    {}
  );

  const approvedCompliances = getApprovedCompliances?.data;

  console.log(approvedCompliances);
  // "Subject",
  //   "Description",
  //   "Initiated By",
  //   "Agency/MDA",
  //   "Date Created",
  //   "Status",

  let columns = [
    "Subject",
    "Description",
    "Initiated By",
    "MDA",
    "Date Created",
    // "Status",
  ];

  let dataflex2 = approvedCompliances?.map((e, idx) => ({
    id: e.id,
    column1: e.subject,
    column2: parser(e?.details),
    column3: e?.initiator,
    column4: e?.mdaName,
    column5: moment(e?.createdAt).format("LL"),

    // column6:
    //   e?.status && e.status == 3 ? (
    //     <div className="flex items-center gap-1">
    //       <div className="p-2 bg-yellow-400 rounded-full"></div>
    //       <Typography>Saved</Typography>
    //     </div>
    //   ) : e.status == 7 || e?.status?.toLowerCase() == "approved" ? (
    //     <div className="flex items-center gap-1">
    //       <div className="p-2 bg-green-400 rounded-full"></div>
    //       <Typography>Pending</Typography>
    //     </div>
    //   ) : e.status == 8 || e?.status?.toLowerCase() == "declined" ? (
    //     <div className="flex items-center gap-1">
    //       <div className="p-2 bg-red-400 rounded-full"></div>
    //       <Typography>Pending</Typography>
    //     </div>
    //   ) : (
    //     e.status
    //   ),
  }));

  let dataflex = tablefiller?.data?.map((e, idx) => ({
    id: e.id,
    column1: e.subject,
    column2: parser(e?.details),
    column3: e?.from,
    column4: e?.mdaAddress?.name,
    column5: moment(e?.createdAt).format("LL"),

    column6:
      e?.status && e.status == 0 ? (
        <div className="flex items-center gap-1">
          <div className="p-2 bg-slate-400 rounded-full"></div>
          <Typography>Saved</Typography>
        </div>
      ) : e.status == 2 || e?.status?.toLowerCase() == "pending" ? (
        <div className="flex items-center gap-1">
          <div className="p-2 bg-yellow-400 rounded-full"></div>
          <Typography>Pending</Typography>
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
  //   status: "Approved ",
  // },
  const { enqueueSnackbar } = useSnackbar();

  const [pendingApprovalsMutation, procurementMutationResult] =
    ProcurementApi.useGetPendingApprovalsMutation();

  const [actionedProcurementsMutation, actionedProcurementMutationResult] =
    ProcurementApi.useGetApprovedProcurementsMutation();

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

  useEffect(() => {
    // getPendingApprovers();
    getActionedProcurements();
  }, []);

  const redirectToDetailsPage = (id) => {
    redirect(`${RouteEnum.COMPLIANCE_REQUEST}/${id}`);
  };

  const handleClick = (id) => {
    redirectToDetailsPage(id);
  };

  const redirectToComplianceInitiation = (id) => {
    isOnPending
      ? redirect(`${RouteEnum.PROCUREMENT_DETAIL}/${id}`)
      : redirect(`${RouteEnum.PROCUREMENT_DETAIL_NO_ACTION}/${id}`);
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
        {/* <div
          className="cursor-pointer"
          onClick={() => {
            adjustTableFiller(procurementsPendingApprovals);
            setisOnPending(true);
          }}
        >
          <WallCards
            count={procurementsPendingApprovals?.totalCount || 0}
            name="Pending Procurement Requests"
          />
        </div> */}
        <div
          className="cursor-pointer"
          onClick={() => {
            adjustTableFiller(procurementIApproved);
            setisOnPending(true);
          }}
        >
          <WallCards
            count={procurementIApproved?.totalCount || 0}
            name="Requests Ready For Compliance Initiation"
          />
        </div>
        <div
          className="cursor-pointer"
          onClick={() => {
            adjustTableFiller(approvedCompliances);
            setisOnPending(false);
          }}
        >
          <WallCards
            count={approvedCompliances?.length || 0}
            name="Approved Compliance Request"
          />
        </div>
      </div>

      <MyTable
        dataz={[]}
        dataflex={isOnPending ? dataflex : dataflex2}
        onClick={handleClick}
        buttonTitle={"Initiate Request"}
        removeButton={isOnPending ? false : true}
        column={!isOnPending ? columns : null}
      />

      {/* <REQUEST TYPE */}
    </div>
  );
}

export default Dashboard;
