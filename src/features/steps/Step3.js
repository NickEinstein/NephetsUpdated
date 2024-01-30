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
import { Link, Navigate } from "react-router-dom";
import { RouteEnum } from "constants/RouteConstants";
import LoginHeader from "common/LoginHeader";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
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
import filez from "images/Group 4963.svg";

function Step3(props) {
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
  //   history("/complete-Step1");
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

  return (
    <div className="w-full">
      <div className="w-full flex flex-col gap-4 justify-center items-center">
        <img className="w-1/2" src={filez} />
      </div>
      <div class="px-[20%] mt-12">
        <div className="flex items-center gap-3 mb-8">
          <Typography className="font-bold">Urgency Status:</Typography>
          <div className="flex gap-2 ">
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
        </div>
        <div>
          <Typography>Attach Documents</Typography>
          <Button>Upload Document</Button>
        </div>
        <div className="w-full flex-col flex gap-2">
          <Button className="w-full bg-[#E8FFDA] text-black font-bold">
            Save Draft
          </Button>
          <Button className="w-full font-bold">Submit Request</Button>
        </div>
      </div>
    </div>
  );
}

export default Step3;
