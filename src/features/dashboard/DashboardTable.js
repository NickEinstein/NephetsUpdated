import React, { useEffect, useState } from "react";
import UserApi from "apis/UserApi";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSnackbar } from "notistack";
// import { Button, TextField, Typography } from "@mui/material";
import PasswordTextField from "common/PasswordTextField";
import { getTextFieldFormikProps } from "utils/FormikUtils";
import useAuthUser from "hooks/useAuthUser";
import { Navigate } from "react-router-dom";
import { RouteEnum } from "constants/RouteConstants";
import LoginHeader from "common/LoginHeader";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import toDoorLogo from "images/Ellipse 30.png";
// import ManageCompanyCard from 'common/ManageCompanyCard'
import ManageTripsTable from "features/trips/ManageTripsTable";
// import { RouteEnum } from "constants/RouteConstants";
// import ReactDOM from 'react-dom';
// import trustedBy1 from './images/Vector.png'
import gigLogo from "images/Ellipse 56.png";
import trustedBy3 from "images/Rectangle 106.png";
// import LoginHeader from './LoginHeader';
// import trustedBy3 from './images/trustedBy-3.png'
// import trustedBy4 from './images/trustedBy-4.png'
import {
  Button,
  TableBody,
  TableCell,
  Table,
  TextField,
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  Typography,
  Badge,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import WallCards from "common/WallCardsServices";
// import TripsMap from "./TripsMap";
import { selectRowsFn } from "@tanstack/react-table";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

// import ManageCompanyCard from '.features/manageCompanies/ManageCompanyCard';
// import { makeStyles } from "@material-ui/core/styles";
// import Paper from "@material-ui/core/Paper";
// import { makeStyles } from '@mui/styles';
import { RiArrowLeftSLine } from "react-icons/ri";
import { LocalizationProvider } from "@mui/x-date-pickers";
import ToDoorSearch from "common/ToDoorSearch";
import moment from "moment";

function Trips({ riders, companies, customers, tableType }) {
  const [age, setAge] = React.useState("");
  const [tripz, setTripz] = React.useState([]);
  const [show, setShow] = React.useState(false);
  const [route, setRoute] = React.useState({});
  const handleChange = (event) => {
    setAge(event.target.value);
    console.log(event);
  };
  const history = useNavigate();

  const redirect = () => {
    history("/complete-signUp");
  };

  const getAllCompanyQueryResult = UserApi.useGetAllTripsQuery({
    //  userType: "company",
  });
  const totalTrips = getAllCompanyQueryResult?.data;
  let trips = totalTrips;
  console.log("++___+_+_+_+");
  console.log(totalTrips);
  //  setTrips(totalTrips)
  useEffect(() => {
    // if (trips.length > 0) setTripz(trips);
    setTripz(totalTrips);
  }, [totalTrips]);

  console.log("++___+_+_+_+ rider");

  console.log(riders);
  console.log("------ customer");
  console.log(customers);
  console.log("------ company");
  console.log(companies);

  const getRider = (id) => {
    // console.log(id)
    console.log(riders);
    let pp = riders?.find((e) => e?._id == id);
    return pp?.fname;
  };

  function createData(
    origin,
    destination,
    rider,
    orderId,
    status,
    fee,
    departureDate,
    arrivalDate,
    timeDelay
  ) {
    return {
      origin,
      destination,
      rider,
      orderId,
      status,
      fee,
      departureDate,
      arrivalDate,
      timeDelay,
    };
  }

  const rows = [
    createData(
      "Ikeja, Lagos",
      "Apapa, Lagos",
      "Taiwo Daniel",
      "WXHDGDJKGG",
      "Delivered",
      "N200,000",
      "11 Sept. 9:00am",
      "15 Sept. 1:00am",
      "-"
    ),
    createData(
      "Lekki, Lagos",
      "Apapa, Lagos",
      "Taiwo Daniel",
      "WXHDGDJKGG",
      "Delivered",
      "N200,000",
      "11 Sept. 9:00am",
      "15 Sept. 1:00am",
      "-"
    ),
    createData(
      "Yaba, Lagos",
      "Apapa, Lagos",
      "Taiwo Daniel",
      "WXHDGDJKGG",
      "Delivered",
      "N200,000",
      "11 Sept. 9:00am",
      "15 Sept. 1:00am",
      "-"
    ),
    createData(
      "Sabo, Kaduna",
      "Apapa, Lagos",
      "Taiwo Daniel",
      "WXHDGDJKGG",
      "Delivered",
      "N200,000",
      "11 Sept. 9:00am",
      "15 Sept. 1:00am",
      "-"
    ),
    // createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    // createData('Eclair', 262, 16.0, 24, 6.0),
    // createData('Cupcake', 305, 3.7, 67, 4.3),
    // createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];

  const tableArray = totalTrips
    ?.slice(0, 7)

    ?.map(function (e, idx) {
      return {
        pickUpAddress: e?.riderId?.fname,
        destAddress: e?.pickUpAddress,
        rider: e?.destAddress,
        riderId: e?.tripAmt,
        riderInfo: e?.riderId,
        tripRequestStatus: moment(e?.requestTime)?.format("ll"),
        tripAmt: e?.tripRequestStatus,
      };
    });

  //   [
  //     {
  //       pickUpAddress: 12121212,
  //       destAddress: `
  //       97 Osolua street
  // off omokaro street `,
  //       rider: `97, Osolua street
  // off omokaro street`,
  //       riderId: "NGN 20,098",
  //       tripRequestStatus: "2/12/2022",
  //       tripAmt: "Success",
  //     },

  //   ];

  function numberWithCommas(x) {
    // serPrice.value = x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //  formState.target_amount=cleanupNumber(serPrice.value)
    return x?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const authUser = useAuthUser();

  const { enqueueSnackbar } = useSnackbar();
  const [loginMuation, loginMutationResult] = UserApi.useLoginMutation();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: yup.object({
      username: yup.string().trim().required(),
      password: yup.string().trim().required(),
    }),
    onSubmit: async (values) => {
      console.log(values);
      // localStorage.setItem('location', values.location)
      redirect();

      try {
        const data = await loginMuation({ data: values }).unwrap();
        // TODO extra login
        // redirect()
        enqueueSnackbar("Logged in successful", { variant: "success" });
      } catch (error) {
        enqueueSnackbar(error?.data?.message, "Failed to login", {
          variant: "error",
        });
      }
    },
  });

  const handleShow = (e) => {
    setShow(true);
    setRoute(e);
  };

  const filterTrips = (type) => {
    trips = totalTrips.filter((e) => e?.tripRequestStatus == type);
    if (trips.length > 0) setTripz(trips);
    else setTripz(totalTrips);
    //  tripz.length > 0 ? tripz : totalTrips;
    //  setTripz(trips)
  };

  return (
    <div>
      {!show && tableType === "companies" && (
        <div>
          <div
            className="flex justify-between mb-8 items-center"
            style={{ backgroundColor: "white" }}
          >
            {/* <img src = {gigLogo}/> */}

            {/* <div>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <div className="flex-between">
                  <DatePicker
                    className=" mr-8 w-full"
                    // label="Basic example"
                    // value={start_date}
                    onChange={(newValue) => {
                      // console.log(newValue)
                      // setWorkList({ ...workList, start_date: newValue });
                      // setStart_date(newValue);
                      // setValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </div>
              </LocalizationProvider>
            </div> */}
          </div>

          <div
            sx={{ minWidth: 650, backgroundColor: "white" }}
            aria-label="simple table"
          >
            <div
              //   onClick={openBelow}
              style={{ border: "1px solid #DADADA" }}
              className=" cursor-pointer mt-2 flex border2  min-h-[50%]"
            >
              <div className="w-[19%] text-center  px-3 py-3">
                <h6 className="font-bold text-[#454647]">Company Name</h6>
                <Typography variant="h6"></Typography>
              </div>
              <div className="w-[19%] text-center  px-3 py-3">
                <h6 className="font-bold text-[#454647]">Location</h6>
                {/* <Typography variant="h6">{companies?.company}</Typography> */}
              </div>

              <div className="w-[19.11%] text-center  px-3 py-3">
                <h6 className="font-bold text-[#454647]">Phone Number</h6>
              </div>
              <div className="w-[19%] text-center  px-3 py-3">
                <h6 className="font-bold text-[#454647]">Email</h6>
              </div>
              <div className="w-[19%] text-center  px-3 py-3">
                <h6 className="font-bold text-[#454647]">Date</h6>
              </div>
              <div className="w-[19%] text-center  px-3 py-3">
                <h6 className="font-bold text-[#454647]">Status</h6>
              </div>

              {/* *Put back Action */}

              {/* <div className="w-[19%] text-center  px-3 py-3">
                <h6 className="font-bold text-[#454647]">Action</h6>
              </div> */}
            </div>
            <div className="mt-3 ">
              {companies?.map((row, idx) => (
                <div
                  className="flex"
                  key={idx}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    marginTop: 10,
                    backgroundColor: "",
                  }}
                >
                  <div className="w-[19%] border3b px-3 py-3  text-center">
                    {row?.fname}
                  </div>
                  <div className="w-[19%]  px-3 py-3  border3b text-center">
                    {row?.country} {row?.state ? ", " + row?.state : ""}{" "}
                    {row?.city ? ", " + row?.city : ""}
                  </div>
                  <div className="w-[19%]  px-3 py-3  border3b text-center">
                    {row?.phoneNo}
                  </div>
                  <div className="w-[19.11%]  px-3 py-3  border3b text-center">
                    {row?.email}
                  </div>
                  <div className="w-[19%]  px-3 py-3  border3b text-center">
                    <p className=" px-3 py-1 text-[#0C3BAA] font-semibold">
                      {moment(row?.created_at).format("MMMM DD, YYYY")}
                    </p>
                  </div>
                  <div className="w-[19%]  px-3 py-3  border3b text-center">
                    <Button>
                      {row?.verified ? "Verified" : "Not Verified"}
                    </Button>
                  </div>

                  {/* <div className="w-[15%]  px-3 py-3  border3b text-center">
                    <Button
                      onClick={() => {
                        handleShow(row);
                      }}
                    >
                      View Route
                    </Button>
                  </div> */}
                </div>
              ))}
            </div>
          </div>

          {/* <Table
            sx={{ minWidth: 650, backgroundColor: "#EBEBEB" }}
            aria-label="simple table"
          >
            <TableHead
              sx={{
                padding: "100px",
                backgroundColor: "#EBEBEB",
                border: "2px solid red",
              }}
              className="mb-4"
            >
              <TableRow sx={{ marginBottom: 5, backgroundColor: "#EBEBEB" }}>
                <TableCell sx={{ marginBottom: 5, backgroundColor: "#EBEBEB" }}>
                  Origin
                </TableCell>
                <TableCell sx={{ marginBottom: 5, backgroundColor: "#EBEBEB" }}>
                  Destination
                </TableCell>
                <TableCell
                  sx={{ marginBottom: 5, backgroundColor: "#EBEBEB" }}
                  align="right"
                >
                  Rider
                </TableCell>
                <TableCell
                  sx={{ marginBottom: 5, backgroundColor: "#EBEBEB" }}
                  align="right"
                >
                  Order ID&nbsp;(g)
                </TableCell>
                <TableCell
                  sx={{ marginBottom: 5, backgroundColor: "#EBEBEB" }}
                  align="right"
                >
                  Status&nbsp;(g)
                </TableCell>
                <TableCell
                  sx={{ marginBottom: 5, backgroundColor: "#EBEBEB" }}
                  align="right"
                >
                  Fee&nbsp;(g)
                </TableCell>
                <TableCell
                  sx={{ marginBottom: 5, backgroundColor: "#EBEBEB" }}
                  align="right"
                >
                  Departure Date&nbsp;(g)
                </TableCell>
                <TableCell
                  sx={{ marginBottom: 5, backgroundColor: "#EBEBEB" }}
                  align="right"
                >
                  Arrival Date&nbsp;(g)
                </TableCell>
                <TableCell
                  sx={{ marginBottom: 5, backgroundColor: "#EBEBEB" }}
                  align="right"
                >
                  Action&nbsp;(g)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    marginTop: 10,
                    backgroundColor: "",
                  }}
                >
                  <TableCell component="th" scope="row">
                    {row.origin}
                  </TableCell>
                  <TableCell align="right">{row.destination}</TableCell>
                  <TableCell align="right">{row.rider}</TableCell>
                  <TableCell align="right">{row.orderId}</TableCell>
                  <TableCell align="right">{row.status}</TableCell>
                  <TableCell align="right">{row.fee}</TableCell>
                  <TableCell align="right">{row.departureDate}</TableCell>
                  <TableCell align="right">{row.arrivalDate}</TableCell>
                  <TableCell align="right">
                    <Button
                      onClick={() => {
                        handleShow(row);
                      }}
                    >
                      View Route
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table> */}
        </div>
      )}
      {!show && tableType === "riders" && (
        <div>
          <div
            className="flex justify-between mb-8 items-center"
            style={{ backgroundColor: "white" }}
          >
            {/* <img src = {gigLogo}/> */}

            {/* <div>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <div className="flex-between">
                  <DatePicker
                    className=" mr-8 w-full"
                    // label="Basic example"
                    // value={start_date}
                    onChange={(newValue) => {
                      // console.log(newValue)
                      // setWorkList({ ...workList, start_date: newValue });
                      // setStart_date(newValue);
                      // setValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </div>
              </LocalizationProvider>
            </div> */}
          </div>

          <div
            sx={{ minWidth: 650, backgroundColor: "white" }}
            aria-label="simple table"
          >
            <div
              //   onClick={openBelow}
              style={{ border: "1px solid #DADADA" }}
              className=" cursor-pointer mt-2 flex border2  min-h-[50%]"
            >
              <div className="w-[19%] text-center  px-3 py-3">
                <h6 className="font-bold text-[#454647]">Full Name</h6>
                <Typography variant="h6" className="text-[10px]">
                  Company Name
                </Typography>
              </div>
              <div className="w-[19%] text-center  px-3 py-3">
                <h6 className="font-bold text-[#454647]">Email</h6>
                <Typography variant="h6"></Typography>
              </div>

              <div className="w-[19.11%] text-center  px-3 py-3">
                <h6 className="font-bold text-[#454647]">Phone Number</h6>
              </div>
              <div className="w-[19%] text-center  px-3 py-3">
                <h6 className="font-bold text-[#454647]">Location</h6>
              </div>
              <div className="w-[19%] text-center  px-3 py-3">
                <h6 className="font-bold text-[#454647]">Reg Date</h6>
              </div>
              <div className="w-[19%] text-center  px-3 py-3">
                <h6 className="font-bold text-[#454647]">Status</h6>
              </div>

              {/* *Put back Action */}

              {/* <div className="w-[19%] text-center  px-3 py-3">
                <h6 className="font-bold text-[#454647]">Action</h6>
              </div> */}
            </div>
            <div className="mt-3 ">
              {riders?.map((row, idx) => (
                <div
                  className="flex"
                  key={idx}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    marginTop: 10,
                    backgroundColor: "",
                  }}
                >
                  <div className="w-[19%] border3b px-3 py-3  text-center">
                    <p className="font-bold">{row?.fname}</p>
                    <p className="text-[10px]">{row?.companyName}</p>
                  </div>
                  <div className="w-[19%]  px-3 py-3  border3b text-center">
                    {row?.email}
                  </div>
                  <div className="w-[19%]  px-3 py-3  border3b text-center">
                    {row?.phoneNo}
                  </div>
                  <div className="w-[19.11%]  px-3 py-3  border3b text-center">
                    {row?.country} {row?.state ? ", " + row?.state : ""}{" "}
                    {row?.city ? ", " + row?.city : ""}
                  </div>
                  <div className="w-[19%]  px-3 py-3  border3b text-center">
                    <p className=" px-3 py-1 text-[#0C3BAA] font-semibold">
                      {moment(row?.created_at).format("MMMM DD, YYYY")}
                    </p>
                  </div>
                  <div className="w-[19%]  px-3 py-3  border3b text-center">
                    <Button>
                      {row?.verified ? "Verified" : "Not Verified"}
                    </Button>
                  </div>

                  {/* <div className="w-[15%]  px-3 py-3  border3b text-center">
                    <Button
                      onClick={() => {
                        handleShow(row);
                      }}
                    >
                      View Route
                    </Button>
                  </div> */}
                </div>
              ))}
            </div>
          </div>

          {/* <Table
            sx={{ minWidth: 650, backgroundColor: "#EBEBEB" }}
            aria-label="simple table"
          >
            <TableHead
              sx={{
                padding: "100px",
                backgroundColor: "#EBEBEB",
                border: "2px solid red",
              }}
              className="mb-4"
            >
              <TableRow sx={{ marginBottom: 5, backgroundColor: "#EBEBEB" }}>
                <TableCell sx={{ marginBottom: 5, backgroundColor: "#EBEBEB" }}>
                  Origin
                </TableCell>
                <TableCell sx={{ marginBottom: 5, backgroundColor: "#EBEBEB" }}>
                  Destination
                </TableCell>
                <TableCell
                  sx={{ marginBottom: 5, backgroundColor: "#EBEBEB" }}
                  align="right"
                >
                  Rider
                </TableCell>
                <TableCell
                  sx={{ marginBottom: 5, backgroundColor: "#EBEBEB" }}
                  align="right"
                >
                  Order ID&nbsp;(g)
                </TableCell>
                <TableCell
                  sx={{ marginBottom: 5, backgroundColor: "#EBEBEB" }}
                  align="right"
                >
                  Status&nbsp;(g)
                </TableCell>
                <TableCell
                  sx={{ marginBottom: 5, backgroundColor: "#EBEBEB" }}
                  align="right"
                >
                  Fee&nbsp;(g)
                </TableCell>
                <TableCell
                  sx={{ marginBottom: 5, backgroundColor: "#EBEBEB" }}
                  align="right"
                >
                  Departure Date&nbsp;(g)
                </TableCell>
                <TableCell
                  sx={{ marginBottom: 5, backgroundColor: "#EBEBEB" }}
                  align="right"
                >
                  Arrival Date&nbsp;(g)
                </TableCell>
                <TableCell
                  sx={{ marginBottom: 5, backgroundColor: "#EBEBEB" }}
                  align="right"
                >
                  Action&nbsp;(g)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    marginTop: 10,
                    backgroundColor: "",
                  }}
                >
                  <TableCell component="th" scope="row">
                    {row.origin}
                  </TableCell>
                  <TableCell align="right">{row.destination}</TableCell>
                  <TableCell align="right">{row.rider}</TableCell>
                  <TableCell align="right">{row.orderId}</TableCell>
                  <TableCell align="right">{row.status}</TableCell>
                  <TableCell align="right">{row.fee}</TableCell>
                  <TableCell align="right">{row.departureDate}</TableCell>
                  <TableCell align="right">{row.arrivalDate}</TableCell>
                  <TableCell align="right">
                    <Button
                      onClick={() => {
                        handleShow(row);
                      }}
                    >
                      View Route
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table> */}
        </div>
      )}
      {!show && tableType === "trips" && (
        <div>
          <div
            className="flex justify-between mb-8 items-center"
            style={{ backgroundColor: "white" }}
          >
            {/* <img src = {gigLogo}/> */}

            {/* <div>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <div className="flex-between">
                  <DatePicker
                    className=" mr-8 w-full"
                    // label="Basic example"
                    // value={start_date}
                    onChange={(newValue) => {
                      // console.log(newValue)
                      // setWorkList({ ...workList, start_date: newValue });
                      // setStart_date(newValue);
                      // setValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </div>
              </LocalizationProvider>
            </div> */}
          </div>

          <div
            sx={{ minWidth: 650, backgroundColor: "white" }}
            aria-label="simple table"
          >
            <div
              //   onClick={openBelow}
              style={{ border: "1px solid #DADADA" }}
              className=" cursor-pointer mt-2 flex border2  min-h-[50%]"
            >
              <div className="w-[19%] text-center  px-3 py-3">
                <h6 className="font-bold text-[#454647]">Rider</h6>
                <Typography variant="h6"></Typography>
              </div>
              <div className="w-[19%] text-center  px-3 py-3">
                <h6 className="font-bold text-[#454647]">Picked UP</h6>
                <Typography variant="h6">{tableArray?.company}</Typography>
              </div>

              <div className="w-[19.11%] text-center  px-3 py-3">
                <h6 className="font-bold text-[#454647]">Dropped</h6>
              </div>
              <div className="w-[19%] text-center  px-3 py-3">
                <h6 className="font-bold text-[#454647]">Price</h6>
              </div>
              <div className="w-[19%] text-center  px-3 py-3">
                <h6 className="font-bold text-[#454647]">Date</h6>
              </div>
              <div className="w-[19%] text-center  px-3 py-3">
                <h6 className="font-bold text-[#454647]">Status</h6>
              </div>

              {/* *Put back Action */}

              {/* <div className="w-[19%] text-center  px-3 py-3">
                <h6 className="font-bold text-[#454647]">Action</h6>
              </div> */}
            </div>
            <div className="mt-3 ">
              {tableArray?.map((row, idx) => (
                <div
                  className="flex"
                  key={idx}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    marginTop: 10,
                    backgroundColor: "",
                  }}
                >
                  <div className="w-[19%] border3b px-3 py-3  text-center">
                    {row?.pickUpAddress}
                  </div>
                  <div className="w-[19%]  px-3 py-3  border3b text-center">
                    {row?.destAddress}
                  </div>
                  <div className="w-[19%]  px-3 py-3  border3b text-center">
                    {row?.rider || "-"}
                  </div>
                  <div className="w-[19.11%]  px-3 py-3  border3b text-center">
                    ₦ {numberWithCommas(row?.riderId.toFixed(2))}
                  </div>
                  <div className="w-[19%]  px-3 py-3  border3b text-center">
                    <p className=" px-3 py-1 text-[#0C3BAA] font-semibold">
                      {row?.tripRequestStatus}
                    </p>
                  </div>
                  <div className="w-[19%]  px-3 py-3  border3b text-center">
                    <Button>Successful</Button>
                  </div>

                  {/* <div className="w-[15%]  px-3 py-3  border3b text-center">
                    <Button
                      onClick={() => {
                        handleShow(row);
                      }}
                    >
                      View Route
                    </Button>
                  </div> */}
                </div>
              ))}
            </div>
          </div>

          {/* <Table
            sx={{ minWidth: 650, backgroundColor: "#EBEBEB" }}
            aria-label="simple table"
          >
            <TableHead
              sx={{
                padding: "100px",
                backgroundColor: "#EBEBEB",
                border: "2px solid red",
              }}
              className="mb-4"
            >
              <TableRow sx={{ marginBottom: 5, backgroundColor: "#EBEBEB" }}>
                <TableCell sx={{ marginBottom: 5, backgroundColor: "#EBEBEB" }}>
                  Origin
                </TableCell>
                <TableCell sx={{ marginBottom: 5, backgroundColor: "#EBEBEB" }}>
                  Destination
                </TableCell>
                <TableCell
                  sx={{ marginBottom: 5, backgroundColor: "#EBEBEB" }}
                  align="right"
                >
                  Rider
                </TableCell>
                <TableCell
                  sx={{ marginBottom: 5, backgroundColor: "#EBEBEB" }}
                  align="right"
                >
                  Order ID&nbsp;(g)
                </TableCell>
                <TableCell
                  sx={{ marginBottom: 5, backgroundColor: "#EBEBEB" }}
                  align="right"
                >
                  Status&nbsp;(g)
                </TableCell>
                <TableCell
                  sx={{ marginBottom: 5, backgroundColor: "#EBEBEB" }}
                  align="right"
                >
                  Fee&nbsp;(g)
                </TableCell>
                <TableCell
                  sx={{ marginBottom: 5, backgroundColor: "#EBEBEB" }}
                  align="right"
                >
                  Departure Date&nbsp;(g)
                </TableCell>
                <TableCell
                  sx={{ marginBottom: 5, backgroundColor: "#EBEBEB" }}
                  align="right"
                >
                  Arrival Date&nbsp;(g)
                </TableCell>
                <TableCell
                  sx={{ marginBottom: 5, backgroundColor: "#EBEBEB" }}
                  align="right"
                >
                  Action&nbsp;(g)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    marginTop: 10,
                    backgroundColor: "",
                  }}
                >
                  <TableCell component="th" scope="row">
                    {row.origin}
                  </TableCell>
                  <TableCell align="right">{row.destination}</TableCell>
                  <TableCell align="right">{row.rider}</TableCell>
                  <TableCell align="right">{row.orderId}</TableCell>
                  <TableCell align="right">{row.status}</TableCell>
                  <TableCell align="right">{row.fee}</TableCell>
                  <TableCell align="right">{row.departureDate}</TableCell>
                  <TableCell align="right">{row.arrivalDate}</TableCell>
                  <TableCell align="right">
                    <Button
                      onClick={() => {
                        handleShow(row);
                      }}
                    >
                      View Route
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table> */}
        </div>
      )}
      {!show && tableType === "customers" && (
        <div>
          <div
            className="flex justify-between mb-8 items-center"
            style={{ backgroundColor: "white" }}
          >
            {/* <img src = {gigLogo}/> */}

            {/* <div>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <div className="flex-between">
                  <DatePicker
                    className=" mr-8 w-full"
                    // label="Basic example"
                    // value={start_date}
                    onChange={(newValue) => {
                      // console.log(newValue)
                      // setWorkList({ ...workList, start_date: newValue });
                      // setStart_date(newValue);
                      // setValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </div>
              </LocalizationProvider>
            </div> */}
          </div>

          <div
            sx={{ minWidth: 650, backgroundColor: "white" }}
            aria-label="simple table"
          >
            <div
              //   onClick={openBelow}
              style={{ border: "1px solid #DADADA" }}
              className=" cursor-pointer mt-2 flex border2  min-h-[50%]"
            >
              <div className="w-[19%] text-center  px-3 py-3">
                <h6 className="font-bold text-[#454647]">Full Name</h6>
                {/* <Typography variant="h6" className="text-[10px]">Company Name</Typography> */}
              </div>
              <div className="w-[19%] text-center  px-3 py-3">
                <h6 className="font-bold text-[#454647]">Email</h6>
                <Typography variant="h6"></Typography>
              </div>

              <div className="w-[19.11%] text-center  px-3 py-3">
                <h6 className="font-bold text-[#454647]">Phone Number</h6>
              </div>
              <div className="w-[19%] text-center  px-3 py-3">
                <h6 className="font-bold text-[#454647]">Location</h6>
              </div>
              <div className="w-[19%] text-center  px-3 py-3">
                <h6 className="font-bold text-[#454647]">Reg Date</h6>
              </div>
              <div className="w-[19%] text-center  px-3 py-3">
                <h6 className="font-bold text-[#454647]">Status</h6>
              </div>

              {/* *Put back Action */}

              {/* <div className="w-[19%] text-center  px-3 py-3">
                <h6 className="font-bold text-[#454647]">Action</h6>
              </div> */}
            </div>
            <div className="mt-3 ">
              {customers?.map((row, idx) => (
                <div
                  className="flex"
                  key={idx}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    marginTop: 10,
                    backgroundColor: "",
                  }}
                >
                  <div className="w-[19%] border3b px-3 py-3  text-center">
                    <p className="font-bold">{row?.fname}</p>
                    {/* <p className="text-[10px]">{row?.companyName}</p> */}
                  </div>
                  <div className="w-[19%]  px-3 py-3  border3b text-center">
                    {row?.email}
                  </div>
                  <div className="w-[19%]  px-3 py-3  border3b text-center">
                    {row?.phoneNo}
                  </div>
                  <div className="w-[19.11%]  px-3 py-3  border3b text-center">
                    {row?.country} {row?.state ? ", " + row?.state : ""}{" "}
                    {row?.city ? ", " + row?.city : ""}
                  </div>
                  <div className="w-[19%]  px-3 py-3  border3b text-center">
                    <p className=" px-3 py-1 text-[#0C3BAA] font-semibold">
                      {moment(row?.created_at).format("MMMM DD, YYYY")}
                    </p>
                  </div>
                  <div className="w-[19%]  px-3 py-3  border3b text-center">
                    <Button>
                      {row?.verified ? "Verified" : "Not Verified"}
                    </Button>
                  </div>

                  {/* <div className="w-[15%]  px-3 py-3  border3b text-center">
                    <Button
                      onClick={() => {
                        handleShow(row);
                      }}
                    >
                      View Route
                    </Button>
                  </div> */}
                </div>
              ))}
            </div>
          </div>

          {/* <Table
            sx={{ minWidth: 650, backgroundColor: "#EBEBEB" }}
            aria-label="simple table"
          >
            <TableHead
              sx={{
                padding: "100px",
                backgroundColor: "#EBEBEB",
                border: "2px solid red",
              }}
              className="mb-4"
            >
              <TableRow sx={{ marginBottom: 5, backgroundColor: "#EBEBEB" }}>
                <TableCell sx={{ marginBottom: 5, backgroundColor: "#EBEBEB" }}>
                  Origin
                </TableCell>
                <TableCell sx={{ marginBottom: 5, backgroundColor: "#EBEBEB" }}>
                  Destination
                </TableCell>
                <TableCell
                  sx={{ marginBottom: 5, backgroundColor: "#EBEBEB" }}
                  align="right"
                >
                  Rider
                </TableCell>
                <TableCell
                  sx={{ marginBottom: 5, backgroundColor: "#EBEBEB" }}
                  align="right"
                >
                  Order ID&nbsp;(g)
                </TableCell>
                <TableCell
                  sx={{ marginBottom: 5, backgroundColor: "#EBEBEB" }}
                  align="right"
                >
                  Status&nbsp;(g)
                </TableCell>
                <TableCell
                  sx={{ marginBottom: 5, backgroundColor: "#EBEBEB" }}
                  align="right"
                >
                  Fee&nbsp;(g)
                </TableCell>
                <TableCell
                  sx={{ marginBottom: 5, backgroundColor: "#EBEBEB" }}
                  align="right"
                >
                  Departure Date&nbsp;(g)
                </TableCell>
                <TableCell
                  sx={{ marginBottom: 5, backgroundColor: "#EBEBEB" }}
                  align="right"
                >
                  Arrival Date&nbsp;(g)
                </TableCell>
                <TableCell
                  sx={{ marginBottom: 5, backgroundColor: "#EBEBEB" }}
                  align="right"
                >
                  Action&nbsp;(g)
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row.name}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    marginTop: 10,
                    backgroundColor: "",
                  }}
                >
                  <TableCell component="th" scope="row">
                    {row.origin}
                  </TableCell>
                  <TableCell align="right">{row.destination}</TableCell>
                  <TableCell align="right">{row.rider}</TableCell>
                  <TableCell align="right">{row.orderId}</TableCell>
                  <TableCell align="right">{row.status}</TableCell>
                  <TableCell align="right">{row.fee}</TableCell>
                  <TableCell align="right">{row.departureDate}</TableCell>
                  <TableCell align="right">{row.arrivalDate}</TableCell>
                  <TableCell align="right">
                    <Button
                      onClick={() => {
                        handleShow(row);
                      }}
                    >
                      View Route
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table> */}
        </div>
      )}

      {/* <ManageTripsTable tableArray={tableArray} /> */}

      {show && (
        <div>
          <div>
            <div
              onClick={() => setShow(!show)}
              className="flex items-center mb-8 cursor-pointer w-16 p-2"
            >
              <div
                style={{ border: "1px solid #494949" }}
                className="border-solid w-5 mr-2 rounded h-5 flex justify-center items-center"
              >
                <RiArrowLeftSLine
                  className=""
                  style={{ fontSize: "22px", color: "#494949" }}
                />
              </div>
              <p style={{ color: "#494949" }} className="text-base">
                Back
              </p>
            </div>
          </div>
        </div>
      )}
      {/* <div className="w-full flex items-center justify-center">
        <TripsMap route={route} width={show} />
      </div> */}
    </div>
  );
}

export default Trips;
