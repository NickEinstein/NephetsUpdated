import React, { useState } from "react";
import UserApi from "apis/UserApi";
import { useSnackbar } from "notistack";
// import { Button, TextField, Typography } from "@mui/material";
import { BsFillCircleFill, BsPeople } from "react-icons/bs";
import useAuthUser from "hooks/useAuthUser";
import { Navigate } from "react-router-dom";
import { RouteEnum } from "constants/RouteConstants";
import LoginHeader from "common/LoginHeader";
import customer from "images/tabler_helmet.png";
// import ManageCompanyCard from 'common/ManageCompanyCard'

// import { RouteEnum } from "constants/RouteConstants";
// import ReactDOM from 'react-dom';
// import trustedBy1 from './images/Vector.png'
import gigLogo from "images/Ellipse 56.png";
// import LoginHeader from './LoginHeader';
// import trustedBy3 from './images/trustedBy-3.png'
// import trustedBy4 from './images/trustedBy-4.png'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Input,
  MenuItem,
  Rating,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import ToDoorSearch from "common/ToDoorSearch";
import moment from "moment";
import { get, post } from "services/fetch";
import { useEffect } from "react";
function Categories(props) {
  const [age, setAge] = React.useState("");
  const [categoryView, setCategoryView] = React.useState(true);
  const [categoryName, setCategoryName] = useState(false);
  const [bike, setbike] = useState();

  const [currencySymbol, setcurrencySymbol] = useState();

  const [basefare, setbasefare] = useState();
  const [farepermin, setfarepermin] = useState();
  const [fareperKM, setfareperKM] = useState();

  const [displayBasefare, setdisplayBasefare] = useState();
  const [displayFareperKM, setdisplayFareperKM] = useState();

  // const handleChange = (event) => {
  //   setAge(event.target.value);
  //   console.log(event)
  // };

  useEffect(() => {
    getConfig();
  }, []);
  const getCategoriesQueryResult = UserApi.useGetCategoriesQuery({ age: age });
  const categories = getCategoriesQueryResult?.data;

  console.log(categories);

  const history = useNavigate();

  const redirect = () => {
    history("/complete-signUp");
  };

  const createCategories = async () => {
    let payload = { name: categoryName };
    const res = await post({
      endpoint: `api/category`,
      body: { ...payload },
      auth: true,
    });
    enqueueSnackbar("Category Created successfully", { variant: "success" });

    setAge(!age);
    setCategoryName("");
  };

  const updateConfig = async () => {
    let payload = {
      googleMapsApiKey: "AIzaSyAXW-WDp0MF5si6oFXaukDQuThTr1wqmDE",
      cash: true,
      flutterwave: false,
      enableGoogle: true,
      enableFacebook: true,
      flutterwaveConfig: {
        key: "",
      },
      tripPrice: {
        farePerMin: +farepermin,
        farePerKm: +fareperKM,
        baseFare: +basefare,
        currencySymbol: "N",
      },
      googleAuth: {
        iosClientId:
          "805539794872-s9o2jt8l5er0mp5uidj9ak0f1h3chpqp.apps.googleusercontent.com",
        androidClientId:
          "805539794872-jb1vv12mh1k90fpuo7ki3cku1ietb30e.apps.googleusercontent.com",
      },
      facebookAuth: {
        authToken: "1919559661598816",
      },
      sendConfig: {
        email: {
          onForgotPassword: true,
          onRegistrationRider: true,
          onRegistrationDriver: true,
          onEndTripRider: true,
          onEndTripDriver: true,
          rideAcceptRider: true,
        },
        sms: {
          otpVerify: true,
          onEndTripRider: true,
          onEndTripDriver: true,
          rideAcceptRider: true,
        },
      },
      approveConfig: {
        autoApproveRider: true,
        autoApproveDriver: true,
      },
    };
    const res = await post({
      endpoint: `api/config/appConfig`,
      body: { ...payload },
      auth: true,
    });
    enqueueSnackbar("Config updated successfully", { variant: "success" });
    getConfig();

    // setAge(!age);
    // setCategoryName("");
  };

  const getConfig = async () => {
    const res = await get({
      endpoint: `api/config/appConfig`,
      auth: true,
    });
    console.log(res);
    // enqueueSnackbar("Config updated successfully", { variant: "success" });

    if (res.status == 200) {
      setdisplayBasefare(res?.data?.tripPrice?.baseFare);
      setdisplayFareperKM(res?.data?.tripPrice?.farePerKm);
      setcurrencySymbol(res?.data?.tripPrice?.currencySymbol);
    }
    // setAge(!age);
    // setCategoryName("");
  };

  const tableArray = categories?.map((e) => ({
    name: e?.name,
    date: e?.createdAt,
    key: e?._id,
  }));

  const authUser = useAuthUser();
  console.log(categoryName);

  const { enqueueSnackbar } = useSnackbar();
  const [loginMuation, loginMutationResult] = UserApi.useLoginMutation();

  return (
    <div>
      {/* <ToDoorSearch /> */}

      {
        <div className=" mt-8 ">
          <div className="mb-4 flex gap-4">
            <Typography
              onClick={() => setCategoryView(true)}
              style={{ borderBottom: categoryView && "2px solid #0C3BAA" }}
              className="mr-4 p-1 font-bold cursor-pointer"
            >
              CATEGORIES
            </Typography>

            <Typography
              onClick={() => setCategoryView(false)}
              style={{ borderBottom: !categoryView && "2px solid #0C3BAA" }}
              className="mr-4 p-1 font-bold cursor-pointer"
            >
              FARES
            </Typography>
            {/* <div className="flex items-center">
              <p className="p-1">Unread</p>
              <BsFillCircleFill color="blue" fontSize={6} />
            </div> */}
          </div>

          {categoryView && (
            <div className="flex w-full gap-5">
              <div className="w-2/5">
                <TextField
                  label="Category Name"
                  placeholder="Enter Category Name"
                  className="w-full mt-8"
                  onChange={(e) => setCategoryName(e.target.value)}
                />
                <Button onClick={createCategories} className="mt-4">
                  Create
                </Button>
              </div>
              <div className="w-full">
                <div className="flex justify-between">
                  <Typography className="font-bold text-base">
                    Category Name
                  </Typography>
                  <Typography className="font-bold text-base">
                    Date Created
                  </Typography>
                </div>
                {tableArray?.map((e) => (
                  <div
                    style={{ border: "1px solid #DADADA" }}
                    className=" px-5 mt-1 py-2 flex justify-between border2 background-table"
                  >
                    <div className="w-full flex">
                      {/* <img src={gigLogo} className="rounded-full" /> */}
                      <div className="w-full  justify-between">
                        <div className="flex justify-between">
                          <Typography variant="">{e?.name}</Typography>

                          <Typography variant="">
                            {moment(e?.createdAt).format("ll")}
                          </Typography>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!categoryView && (
            <div className="flex gap-8 mt-8 w-full ">
              <div className="w-1/3 ">
                <TextField
                  fullWidth
                  label="Select Bike"
                  placeholder="Select Bike"
                  className="w-full"
                  onChange={(e) => setbike(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Base Fare"
                  placeholder="Base Fare"
                  className="w-full mt-4"
                  value={basefare}
                  onChange={(e) => {
                    const regex = /^[0-9\b]+$/;
                    if (e.target.value === "" || regex.test(e.target.value)) {
                      setbasefare(e.target.value);
                      // setNum(e.target.value);
                    }
                  }}
                  // onChange={(e) => setbasefare(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Fare per KM"
                  placeholder="Fare per Min"
                  className="w-full mt-4"
                  value={fareperKM}
                  onChange={(e) => {
                    const regex = /^[0-9\b]+$/;
                    if (e.target.value === "" || regex.test(e.target.value)) {
                      setfareperKM(e.target.value);
                      // setNum(e.target.value);
                    }
                  }}
                />
                <TextField
                  disabled
                  fullWidth
                  label="Fare per Min"
                  placeholder="Fare per Min"
                  className="w-full mt-4"
                  onChange={(e) => setfarepermin(e.target.value)}
                />
                <Button onClick={updateConfig} className="mt-4">
                  Update
                </Button>
              </div>

              <div className="w-full">
                <div
                  style={{ border: "1px solid #DADADA" }}
                  className=" px-5 mt-1 py-2 flex justify-between border2 background-table"
                >
                  <div className="w-full flex">
                    {/* <img src={gigLogo} className="rounded-full" /> */}
                    <div className="w-full  justify-between">
                      <div className="flex justify-between">
                        <Typography variant="">BASE FARE</Typography>

                        <Typography variant="">{`${currencySymbol}${displayBasefare}`}</Typography>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  style={{ border: "1px solid #DADADA" }}
                  className=" px-5 mt-1 py-2 flex justify-between border2 background-table"
                >
                  <div className="w-full flex">
                    {/* <img src={gigLogo} className="rounded-full" /> */}
                    <div className="w-full  justify-between">
                      <div className="flex justify-between">
                        <Typography variant="">FARE PER KM</Typography>

                        <Typography variant="">{`${currencySymbol}${displayFareperKM}`}</Typography>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      }
    </div>
  );
}

export default Categories;
