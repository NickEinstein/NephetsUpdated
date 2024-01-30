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

function ProcurementExpense(props) {
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

  const [age, setAge] = React.useState();

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div className="w-full ">
      <div class="flex gap-8  w-full items-start bg-white">
        <Card className="flex gap-3 w-2/5 flex-col">
          <FormControl className="mt-5" fullWidth>
            <InputLabel id="demo-simple-select-label">
              Select Budget Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="   Select Budget Type "
              variant="standard"
              onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControl className="mt-5" fullWidth>
            <InputLabel id="demo-simple-select-label">
              Select Budget Item Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Select Budget Item Category"
              onChange={handleChange}
              variant="standard"
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="outlined"
            className="bg-[#E8FFDA] border-[#3C7E2D] text-black w-full px-8 "
          >
            View Approved Initiatives
          </Button>
        </Card>
        <div className="w-full">
          <Typography className="text-center w-full">
            Procurement Requisition Expense Request
          </Typography>
          <div>
            <div>
              <ExpenseStepper />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProcurementExpense;
