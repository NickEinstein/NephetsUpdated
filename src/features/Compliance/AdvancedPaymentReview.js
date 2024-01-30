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
import ProcurementDocument from "features/Compliance/AdvancedPaymentDetails";
import ExpenseStepper from "common/ExpenseStepper";
import ProcurementApi from "apis/ProcurementApi.js";
import moment from "moment";
import ComplianceApi from "apis/ComplianceApi.js";
import MuiDialog from "common/CustomDialog";

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

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  console.log(location);
  // console.log(getStoreProductsQueryResult)

  // console.log(companyStatistics);
  // const getrecentprocurements =
  //   ProcurementApi.useGetProcurementPendingApproversQuery({
  //     // userType: "rider",
  //   });
  // const recentprocurements = getrecentprocurements?.data?.data;
  // console.log(recentprocurements);

  const getRequestsReadyForAdvancedPayment =
    ProcurementApi.useGetPendingAdvancePaymentRequestQuery({
      // userType: "customer",
    });
  const readyForAdvancedPayment =
    getRequestsReadyForAdvancedPayment?.data?.data || [];

  console.log(readyForAdvancedPayment);

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

  const [row, setRow] = React.useState();

  // console.log(listForApproval)
  // "Subject",
  //   "Description",
  //   "Initiated By",
  //   "Agency/MDA",
  //   "Date Created",
  //   "Status",
  let columns = [
    "Subject",
    "Procurement Method",
    "Vendor",
    "MDA",
    "Date Created",
    // "Status",
  ];
  let dataflex = readyForAdvancedPayment?.map((e, idx) => ({
    id: e.id,
    column1: e.advancePaymentSubject,
    column2: e?.procurementMethod,
    column3: e?.vendor,
    column4: e?.mdaName,
    column5: moment(e?.createdAt).format("LL"),
    column6: e,

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

  // useEffect(() => {
  //   getPendingApprovers();
  //   getActionedProcurements();
  // }, []);

  const redirectToDetailsPage = (id) => {
    isOnPending
      ? redirect(`${RouteEnum.ADVANCEDPAYMENT_DETAIL}/${id}`)
      : redirect(`${RouteEnum.PROCUREMENT_DETAIL_NO_ACTION}/${id}`);
  };

  const redirectToComplianceInitiation = (id) => {
    // isOnPending
    // redirect(`${RouteEnum.ADVANCEDPAYMENT_INITIATION}/${id}`);
    // : redirect(`${RouteEnum.PROCUREMENT_DETAIL_NO_ACTION}/${id}`);
  };

  const handleClick = (id, booleans, row) => {
    handleOpenDialog();
    setRow(row?.column6);
    // console.log(id);
    // redirectToComplianceInitiation(id);
  };

  const initiateProcurement = (id) => {
    redirectToComplianceInitiation(id);
    // redirectToComplianceInitiation(id);
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
            adjustTableFiller(readyForAdvancedPayment);
            setisOnPending(true);
          }}
        >
          <WallCards
            count={readyForAdvancedPayment?.length || 0}
            name="Approved Compliance Requests"
          />
        </div>
        {/* <div
          className="cursor-pointer"
          onClick={() => {
            adjustTableFiller(procurementIApproved);
            setisOnPending(false);
          }}
        >
          <WallCards
            count={listApproved?.data?.length || 0}
            name="Approved Compliance Request"
          />
        </div> */}
        {/* <div
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
        </div> */}
      </div>

      {authUser?.isEDPPA && (
        <MyTable
          dataz={readyForAdvancedPayment}
          dataflex={dataflex}
          onClick={handleClick}
          column={columns}
        />
      )}
      <MuiDialog
        sx={{ width: "2000px" }}
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        contentComponent={<ProcurementDocument procurementData={row} />}
      />

      {/* <REQUEST TYPE */}
    </div>
  );
}

export default ComplianceReview;
