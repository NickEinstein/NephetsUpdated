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
import CompanyRiderCard from "common/CompanyRiderCard";
// import ExportTcoExcel from "./ExportTcoExcel";
import { Link, Navigate } from "react-router-dom";
import { RouteEnum } from "constants/RouteConstants";
import LoginHeader from "common/LoginHeader";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import background from "images/background.png";

// import { RouteEnum } from "constants/RouteConstants";
// import ReactDOM from 'react-dom';
// import trustedBy1 from './images/Vector.png'
import trustedBy2 from "images/Rectangle 7.png";
import trustedBy3 from "images/Rectangle 106.png";
// import LoginHeader from './LoginHeader';
// import trustedBy3 from './images/trustedBy-3.png'
// import trustedBy4 from './images/trustedBy-4.png'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Input,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import WallCards from "common/WallCardsServices";
import { AccountCircle } from "@mui/icons-material";
import ToDoorSearch from "common/ToDoorSearch";
import ManageCompanyCard from "features/manageCompanies/ManageCompanyCard";
import { post, get, put } from "services/fetch";
import SuperAdminApi from "apis/UserApi";

import WarehouseSVGImage from "images/DashboardHeaderNavsImages/Warehouse.svg";
import InventorySVGImage from "images/DashboardHeaderNavsImages/Inventory.svg";
import DocumentationSVGImage from "images/DashboardHeaderNavsImages/Documentation.svg";
import ShipmentSVGImage from "images/DashboardHeaderNavsImages/Shipment.svg";
import SystemAdminSVGImage from "images/DashboardHeaderNavsImages/SystemAdmin.svg";
import DashboardSVGImage from "images/DashboardHeaderNavsImages/Dashboard.svg";
import DashboardCards from "common/DashboardCards";
import DashboardStatisticsCard from "common/DashboardStatisticCard";

import WatermarkSVGImage from "images/dashboardBody/watermark.svg";
import StockDeliveries from "features/stock/StockDeliveries";
import StockTagging from "features/stock/StockTagging";
import StockIntake from "features/stock/StockIntake";
import StockReturns from "features/stock/StockReturns";
import PendingStock from "features/stock/PendingStock";
import MaterialIssueance from "features/issue/MaterialIssueance";
import PartialIssuance from "features/issue/PartialIssueance";
import MaterialAcceptance from "features/issue/MaterialAcceptance";
import IssueCancellation from "features/issue/IssueCancellation";
import IllegalMovement from "features/issue/IllegalMovement";
import ExportToExcel from "./ExportToExcel";

function Signup(props) {
  const [userType, setUserType] = React.useState("");
  const [show, setshow] = React.useState(false);
  const [dataType, setdataType] = React.useState("companies");
  const [filtered, setFiltered] = React.useState([]);

  //  const getUserStatsQueryResult = UserApi.useGetStatsQuery();
  //  console.log(getUserStatsQueryResult);
  //  const userStats = getUserStatsQueryResult?.data?.data;
  // const getStoreProductsQueryResult = UserApi.useGetStoreProductsQuery({});
  // const storeProducts = getStoreProductsQueryResult?.data;

  // console.log(getStoreProductsQueryResult)

  // console.log(companyStatistics);
  // const getAllRIderQueryResult = UserApi.useGetAllQuery({ userType: "rider" });
  // const totalRiders = getAllRIderQueryResult?.data?.data;

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

  return (
    <div>
      <img
        className="absolute h-[89vh] w-[67%] right-0 bottom-0 "
        src={WatermarkSVGImage}
      />

      {/* <ExportToExcel /> */}
      <div className="overflow-x-scroll flex gap-6 pt-3 mb-3 z-10 hide-scrollbar rounded px-3 bg-slate-400">
        <div>
          <DashboardStatisticsCard text1="Warehouses" text2="0" />
        </div>
        <div>
          <DashboardStatisticsCard text1="Stock Items" text2="0" />
        </div>
        <div>
          <DashboardStatisticsCard text1="Users" text2="0" />
        </div>
        <div>
          <DashboardStatisticsCard text1="Purchase Orders" text2="0" />
        </div>
        <div>
          <DashboardStatisticsCard text1="Pending Approvals" text2="0" />
        </div>
        <div>
          <DashboardStatisticsCard text1="Sgipment Orders" text2="0" />
        </div>
        <div>
          <DashboardStatisticsCard text1="Dashboard" text2="0" />
        </div>
      </div>
      <div className=" flex justify-center items-center min-h-[20vh] w-full">
        <div class="grid  w-[70%] grid-cols-12 gap-12">
          <div class="col-span-4">
            {" "}
            <Link to={RouteEnum.WAREHOUSE}>
              <DashboardCards
                image={WarehouseSVGImage}
                text1="Warehouse"
                text2="Management"
              />
            </Link>
          </div>

          <div class="col-span-4">
            <Link to={RouteEnum.INVENTORY}>
              <DashboardCards
                image={InventorySVGImage}
                text1="Inventory"
                text2="Management"
              />
            </Link>
          </div>
          <div class="col-span-4">
            <Link to={RouteEnum.SHIPMENT}>
              <DashboardCards
                image={ShipmentSVGImage}
                text1="Shipment"
                text2="Management"
              />
            </Link>
          </div>

          <div class="col-span-4">
            <Link to={RouteEnum.SYSTEM_ADMIN}>
              {" "}
              <DashboardCards
                image={SystemAdminSVGImage}
                text1="System"
                text2="Admin"
              />
            </Link>
          </div>

          <div class="col-span-4">
            <Link to={RouteEnum.DASHBOARD_REPORTS}>
              {" "}
              <DashboardCards
                image={DashboardSVGImage}
                text1="Dashboards & Reports"
                text2="Admin"
              />{" "}
            </Link>
          </div>

          <div class="col-span-4">
            <Link to={RouteEnum.DOCUMENTATION_SUPPORT}>
              <DashboardCards
                image={DocumentationSVGImage}
                text1="Documentation &"
                text2="Support"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* <StockDeliveries />
      <StockTagging />

      <StockIntake />
      <StockReturns />
      <PendingStock />
      <MaterialIssueance/>
      <PartialIssuance/>
      <MaterialAcceptance/>
      <IssueCancellation/>
      <IllegalMovement/> */}
    </div>
  );
}

export default Signup;
